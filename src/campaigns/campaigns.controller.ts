import {
  Body,
  Controller,
  Get,
  ValidationPipe,
  Post,
  Delete,
  Patch,
  Param,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaigns.dto';
import { CampaignsService } from './campaigns.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateCampaignDto } from './dto/update-campaigns.dto';

@UseGuards(AuthGuard)
@Controller('campaigns')
export class CampaignsController {
  constructor(@Inject() private readonly campaignService: CampaignsService) {}

  @Get()
  getAll() {
    return this.campaignService.getAll();
  }

  @Post()
  create(@Body(ValidationPipe) createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.campaignService.getOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.campaignService.delete(id);
  }
}
