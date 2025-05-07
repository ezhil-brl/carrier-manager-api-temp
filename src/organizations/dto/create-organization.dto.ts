import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CarrierPreference } from '../entities/organization.entity';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(CarrierPreference)
  carrier_preference: CarrierPreference;
}
