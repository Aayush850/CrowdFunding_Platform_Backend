import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../dto/user-role.enum';
import { Campaigns } from 'src/campaigns/entities/campaigns.entity';
import { Donation } from 'src/donations/entities/donation.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('text')
  address: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Campaigns, (campaign) => campaign.user)
  campaign: Campaigns;

  @OneToMany(() => Donation, (donation) => donation.user)
  donation: Donation;
}
