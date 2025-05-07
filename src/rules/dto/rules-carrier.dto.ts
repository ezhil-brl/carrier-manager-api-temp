import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';

export class RulesCarrierDto {
  @IsNotEmpty()
  @IsUUID()
  organization_id: string;

  @IsNotEmpty()
  @IsString()
  origin_facility: string;

  @IsNotEmpty()
  @IsString()
  shipping_service: string;

  @ValidateIf((o: RulesCarrierDto) => !o.state && !o.country)
  @IsString()
  zip_code?: string;

  @ValidateIf((o: RulesCarrierDto) => !o.zip_code && !o.country)
  @IsString()
  state?: string;

  @ValidateIf((o: RulesCarrierDto) => !o.zip_code && !o.state)
  @IsString()
  country?: string;
}
