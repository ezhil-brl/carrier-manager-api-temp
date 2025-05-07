import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarrierDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  service_type: string;

  @IsNotEmpty()
  @IsString()
  provider_scope: string;

  @IsNotEmpty()
  @IsString()
  external_id: string;
}
