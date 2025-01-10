import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignDto } from './create-campaigns.dto';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {}
