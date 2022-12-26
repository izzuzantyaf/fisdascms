import { faker } from '@faker-js/faker';
import { AssistantLevel, Gender } from 'src/core/constants';

export const assistantSeeder = Array(50)
  .fill(null)
  .map(() => ({
    name: faker.name.fullName(),
    code: faker.random.alpha(3).toUpperCase(),
    phoneNumber: faker.phone.number('08##########'),
    lineId: faker.internet.userName(),
    gender: Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE,
    level: Math.random() > 0.5 ? AssistantLevel.SENIOR : AssistantLevel.JUNIOR,
    feedbackUrl: faker.internet.url(),
    profilePictureUrl: faker.image.avatar(),
  }));
