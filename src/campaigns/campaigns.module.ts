import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaigns } from './entities/campaigns.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaigns, User])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
})
export class CampaignsModule {}
