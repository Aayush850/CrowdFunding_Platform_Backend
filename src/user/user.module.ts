import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Campaigns } from 'src/campaigns/entities/campaigns.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Campaigns])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
