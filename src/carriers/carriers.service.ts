import { Injectable } from '@nestjs/common';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carriers } from './entities/carrier.entity';

@Injectable()
export class CarriersService {
  constructor(
    @InjectRepository(Carriers)
    private readonly carrierRepository: Repository<Carriers>,
  ) {}

  async create(createCarrierDto: CreateCarrierDto): Promise<Carriers> {
    const newCarrier = this.carrierRepository.create(createCarrierDto);
    return await this.carrierRepository.save(newCarrier);
  }

  async findAll(): Promise<Carriers[]> {
    return await this.carrierRepository.find();
  }

  async findOne(id: string): Promise<Carriers> {
    const carrier = await this.carrierRepository.findOne({
      where: { id },
    });
    if (!carrier) {
      throw new Error(`Carrier with id ${id} not found`);
    }
    return carrier;
  }

  async update(
    id: string,
    updateCarrierDto: UpdateCarrierDto,
  ): Promise<Carriers> {
    const carrier = await this.carrierRepository.findOne({
      where: { id },
    });
    if (!carrier) {
      throw new Error(`Carrier with id ${id} not found`);
    }

    const updatedCarrier = this.carrierRepository.merge(
      carrier,
      updateCarrierDto,
    );
    return await this.carrierRepository.save(updatedCarrier);
  }

  async remove(id: string): Promise<Carriers> {
    const carrier = await this.carrierRepository.findOne({
      where: { id },
    });
    if (!carrier) {
      throw new Error(`Carrier with id ${id} not found`);
    }
    return await this.carrierRepository.remove(carrier);
  }
}
