import { faker } from '@faker-js/faker';
import { User } from 'src/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { UserRole } from 'src/user/dto/user-role.enum';

export const UserFactory = setSeederFactory(User, () => {
  const user = new User();
  user.name = faker.person.fullName();
  user.address = `${faker.location.city()}, ${faker.location.country()}`;
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.role = faker.helpers.enumValue(UserRole);
  return user;
});
