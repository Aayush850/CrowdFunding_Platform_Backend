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
  Req,
} from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaigns.dto';
import { CampaignsService } from './campaigns.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateCampaignDto } from './dto/update-campaigns.dto';
import { Roles } from 'src/user/dto/roles.decorator';
import { UserRole } from 'src/user/dto/user-role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('campaigns')
export class CampaignsController {
  constructor(@Inject() private readonly campaignService: CampaignsService) {}

  @Get()
  getAll() {
    return this.campaignService.getAll();
  }

  @Post()
  @Roles(UserRole.ORGANIZER)
  create(@Body(ValidationPipe) createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get(':id')
  getOne(@Param('id') id: number, @Req() request: Request) {
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
