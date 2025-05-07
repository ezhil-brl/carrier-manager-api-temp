import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rules } from './entities/rule.entity';
import { Organizations } from '../organizations/entities/organization.entity';

@Module({
  controllers: [RulesController],
  providers: [RulesService],
  imports: [TypeOrmModule.forFeature([Rules, Organizations])],
  exports: [TypeOrmModule],
})
export class RulesModule {}
