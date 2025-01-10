import {
  Injectable,
  NotFoundException,
  Scope,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaigns.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaigns } from './entities/campaigns.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateCampaignDto } from './dto/update-campaigns.dto';

@Injectable({ scope: Scope.REQUEST })
export class CampaignsService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(Campaigns)
    private readonly campaignsRepository: Repository<Campaigns>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    return this.campaignsRepository.find();
  }

  async create(createCampaignDto: CreateCampaignDto) {
    const userId = this.request.user.id;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const campaign = this.campaignsRepository.create({
      ...createCampaignDto,
      user,
    });
    return this.campaignsRepository.save(campaign);
  }

  async getOne(id: number) {
    const campaign = await this.campaignsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!campaign) {
      throw new NotFoundException(`Campaign with the id ${id} was not found.`);
    }
    return campaign;
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto) {
    const campaign = await this.getOne(id);
    if (this.request.user.user_id !== campaign.user.id) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }
    return this.campaignsRepository.update(id, updateCampaignDto);
  }

  async delete(id: number) {
    const campaign = await this.getOne(id);
    if (this.request.user.user_id !== campaign.user.id) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }
    return this.campaignsRepository.delete(id);
  }
}
