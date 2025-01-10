import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CampaignsStatus } from '../entities/campaigns-status.enum';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  goal_amount: number;

  @IsDateString()
  end_date: Date;

  @IsEnum(CampaignsStatus)
  status: CampaignsStatus;
}
