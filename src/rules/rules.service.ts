import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rules } from './entities/rule.entity';
import { Repository } from 'typeorm';
import { RulesCarrierDto } from './dto/rules-carrier.dto';
import { Organizations } from '../organizations/entities/organization.entity';

@Injectable()
export class RulesService {
  orgRepo: any;
  constructor(
    @InjectRepository(Rules)
    private readonly rulesRepository: Repository<Rules>,
    @InjectRepository(Organizations)
    private readonly organizationsRepository: Repository<Organizations>,
  ) {}

  async getMatchingCarriers(
    rulesForCarrierDto: RulesCarrierDto,
  ): Promise<Rules[]> {
    const {
      organization_id,
      origin_facility,
      shipping_service,
      zip_code,
      state,
      country,
    } = rulesForCarrierDto;
    // filter the rules available for the organization
    const rules = await this.rulesRepository.find({
      where: { organization_id },
    });
    // if (!rules) {
    //   throw new Error(`No rules found for organization ${organization}`);
    // }

    // filter the rules based on the provided criteria
    const matchingRules = rules.filter(
      (rule) =>
        rule.origin_facility === origin_facility &&
        rule.shipping_service === shipping_service,
    );
    // if (matchingRules.length === 0) {
    //   throw new Error(`No matching rules found for the provided criteria`);
    // }

    // filter the rules based on the zip code, state, and country
    const zipCodeMatches = zip_code
      ? matchingRules.filter((rule) => rule.zip_code === zip_code)
      : [];
    const stateMatches = state
      ? matchingRules.filter((rule) => rule.state === state)
      : [];
    const countryMatches = country
      ? matchingRules.filter((rule) => rule.country === country)
      : [];

    // Combine the results, prioritizing zip code matches, then state matches, then country matches
    const combinedMatches = [
      ...zipCodeMatches,
      ...stateMatches.filter(
        (stateRule) => !zipCodeMatches.includes(stateRule),
      ),
      ...countryMatches.filter(
        (countryRule) =>
          !zipCodeMatches.includes(countryRule) &&
          !stateMatches.includes(countryRule),
      ),
    ];
    // if (combinedMatches.length === 0) {
    //   throw new Error(`No matching rules found for the provided criteria`);
    // }
    return combinedMatches;
  }

  async create(createRuleDto: CreateRuleDto): Promise<number> {
    // Step 1: Check if the organization exists
    const organization = await this.organizationsRepository.findOne({
      where: { id: createRuleDto.organizationId },
    });

    if (!organization) {
      throw new Error(
        `Organization with id ${createRuleDto.organizationId} does not exist`,
      );
    }

    // Step 2: Handle override logic
    if (createRuleDto.override !== false) {
      // Delete existing rules for the organization
      await this.rulesRepository.delete({
        organization_id: createRuleDto.organizationId,
      });
    }

    // Step 3: Save the new rules in bulk
    const newRules = createRuleDto.rules.map((rule) =>
      this.rulesRepository.create({
        ...rule,
        billable_weight: rule.billable_weight
          ? parseFloat(rule.billable_weight as unknown as string)
          : undefined,
        organization_id: createRuleDto.organizationId, // Associate the organization ID with each rule
      }),
    );

    // Perform bulk insert
    const savedRules = await this.rulesRepository.save(newRules);

    // Return the number of rows inserted
    return savedRules.length;
  }

  async findAll(): Promise<Rules[]> {
    return await this.rulesRepository.find();
  }

  async findOne(id: string): Promise<Rules> {
    const rules = await this.rulesRepository.findOne({
      where: { id },
    });
    if (!rules) {
      throw new Error(`Rules with id ${id} not found`);
    }
    return rules;
  }

  async update(id: string, updateRuleDto: UpdateRuleDto): Promise<Rules> {
    const rules = await this.rulesRepository.findOne({
      where: { id },
    });
    if (!rules) {
      throw new Error(`Rules with id ${id} not found`);
    }

    const updatedRules = this.rulesRepository.merge(rules, updateRuleDto);
    return await this.rulesRepository.save(updatedRules);
  }

  async remove(id: string): Promise<Rules> {
    const rules = await this.rulesRepository.findOne({
      where: { id },
    });
    if (!rules) {
      throw new Error(`Rules with id ${id} not found`);
    }
    return await this.rulesRepository.remove(rules);
  }
}
