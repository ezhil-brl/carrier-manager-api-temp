import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizations } from './entities/organization.entity';
import { Repository, Not } from 'typeorm';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organizations)
    private readonly organizationRepository: Repository<Organizations>,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organizations> {
    // Check if the organization code already exists
    const existingOrganization = await this.organizationRepository.findOne({
      where: { code: createOrganizationDto.code },
    });

    if (existingOrganization) {
      throw new Error(
        `Organization with code ${createOrganizationDto.code} already exists`,
      );
    }

    // Create and save the new organization
    const newOrganization = this.organizationRepository.create(
      createOrganizationDto,
    );
    return await this.organizationRepository.save(newOrganization);
  }

  async findAll(): Promise<Organizations[]> {
    return await this.organizationRepository.find();
  }

  async findOne(id: string): Promise<Organizations> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new Error(`Organization with id ${id} not found`);
    }
    return organization;
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organizations> {
    // Step 1: Check if the organization exists
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new Error(`Organization with id ${id} not found`);
    }

    // Step 2: Check if the new code is already used by another organization
    if (updateOrganizationDto.code) {
      const existingOrganization = await this.organizationRepository.findOne({
        where: { code: updateOrganizationDto.code, id: Not(id) },
      });
      if (existingOrganization) {
        throw new Error(
          `Organization with code ${updateOrganizationDto.code} already exists`,
        );
      }
    }

    // Step 3: Merge and save the updated organization
    const updatedOrganization = this.organizationRepository.merge(
      organization,
      updateOrganizationDto,
    );
    return await this.organizationRepository.save(updatedOrganization);
  }

  async remove(id: string): Promise<Organizations> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new Error(`Organization with id ${id} not found`);
    }
    return await this.organizationRepository.remove(organization);
  }
}
