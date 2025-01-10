import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CampaignsStatus } from './campaigns-status.enum';
import { User } from 'src/user/entities/user.entity';
import { Donation } from 'src/donations/entities/donation.entity';

@Entity()
export class Campaigns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  goal_amount: number;

  @CreateDateColumn()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ type: 'enum', enum: CampaignsStatus })
  status: CampaignsStatus;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.campaign, { nullable: false })
  user: User;

  @OneToMany(() => Donation, (donation) => donation.campaign)
  donation: Donation;
}
