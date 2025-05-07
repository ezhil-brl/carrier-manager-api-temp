import { Module } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CarriersController } from './carriers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carriers } from './entities/carrier.entity';

@Module({
  controllers: [CarriersController],
  providers: [CarriersService],
  imports: [TypeOrmModule.forFeature([Carriers])],
  exports: [TypeOrmModule],
})
export class CarriersModule {}
