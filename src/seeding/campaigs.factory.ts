import { setSeederFactory } from 'typeorm-extension';
import { Campaigns } from '../campaigns/entities/campaigns.entity';
import { faker } from '@faker-js/faker';
import { CampaignsStatus } from 'src/campaigns/entities/campaigns-status.enum';

export const CampaignsFactory = setSeederFactory(Campaigns, () => {
  const campaign = new Campaigns();
  campaign.title = faker.lorem.sentence();
  campaign.description = faker.lorem.paragraphs();
  campaign.goal_amount = parseInt(
    faker.finance.amount({ min: 100, max: 1000000 }),
  );
  campaign.end_date = faker.date.future();
  campaign.status = faker.helpers.enumValue(CampaignsStatus);
  return campaign;
});
