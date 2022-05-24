import { Injectable } from '@nestjs/common';
import { Handout } from 'src/frameworks/database/mongodb/entity/handout.entity';

@Injectable()
export class HandoutFactoryService {
  create(props: object) {
    return new Handout(props);
  }

  createMany(handoutsProps: object[]) {
    return handoutsProps.map((handoutProps) => new Handout(handoutProps));
  }
}
