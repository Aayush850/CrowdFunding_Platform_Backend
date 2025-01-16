import { faker } from '@faker-js/faker';
import { Campaigns } from '../campaigns/entities/campaigns.entity';
import { User } from '../user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('seeding users');
    //add 10 new users
    const UserFactory = factoryManager.get(User);
    const users = await UserFactory.saveMany(10);

    console.log('seeding campaigns');
    const campaigsFactory = factoryManager.get(Campaigns);
    const campaigns = await Promise.all(
      Array(30)
        .fill('')
        .map(async () => {
          const campaign = await campaigsFactory.make({
            user: faker.helpers.arrayElement(users),
          });
          return campaign;
        }),
    );
    const CampaignsRepo = dataSource.getRepository(Campaigns);
    await CampaignsRepo.save(campaigns);
  }
}
