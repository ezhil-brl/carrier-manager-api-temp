import { PartialType } from '@nestjs/swagger';
import { RuleDto } from './create-rule.dto';

export class UpdateRuleDto extends PartialType(RuleDto) {}
