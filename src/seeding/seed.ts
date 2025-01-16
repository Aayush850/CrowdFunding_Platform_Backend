import { config } from 'dotenv';
config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from '../user/entities/user.entity';
import { Campaigns } from '../campaigns/entities/campaigns.entity';
import { Donation } from '../donations/entities/donation.entity';
import { UserFactory } from './user.factory';
import { CampaignsFactory } from './campaigs.factory';
import { MainSeeder } from './main.seeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Campaigns, Donation],
  synchronize: true,
  factories: [UserFactory, CampaignsFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
