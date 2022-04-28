import { UserEntity } from '../../modules/user/user.entity';
import { define } from 'typeorm-seeding';

define(UserEntity, (faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName);

  const user = new UserEntity();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = '';

  return user;
});
