import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RuleDto {
  @IsNotEmpty()
  @IsString()
  origin_facility: string;

  @IsNotEmpty()
  @IsString()
  shipping_service: string;

  @ValidateIf((o: RuleDto) => !o.state && !o.country)
  @IsString()
  zip_code?: string;

  @ValidateIf((o: RuleDto) => !o.zip_code && !o.country)
  @IsString()
  state?: string;

  @ValidateIf((o: RuleDto) => !o.zip_code && !o.state)
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  billable_weight: number;

  @IsOptional()
  @IsString()
  package_shape: string;

  @IsOptional()
  @IsString()
  dimensions: string;

  @IsOptional()
  @IsString()
  contents_description: string;

  @IsOptional()
  @IsString()
  package_type: string;

  @IsNotEmpty()
  @IsString()
  provider_scope: string;

  @IsNotEmpty()
  @IsString()
  external_id: string;

  @IsNotEmpty()
  @IsString()
  service_type: string;

  @IsNotEmpty()
  @IsString()
  carrier_name: string;

  @IsOptional()
  @IsNumber()
  subtotal_rate: number;

  @IsOptional()
  @IsDateString()
  created_at: Date;

  @IsOptional()
  @IsDateString()
  updated_at: Date;
}

export class CreateRuleDto {
  @IsNotEmpty()
  @IsString()
  organizationId: string;

  @IsNotEmpty()
  @IsArray()
  rules: RuleDto[];

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: boolean }) =>
    value === undefined ? true : value,
  ) // Defaults to true if undefined
  override: boolean;
}
