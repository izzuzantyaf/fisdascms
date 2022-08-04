import { Injectable } from '@nestjs/common';
import { Handout } from 'src/core/entities/handout.entity';

@Injectable()
export class HandoutFactoryService {
  create(props: object) {
    return new Handout(props);
  }

  createMany(handoutsProps: object[]) {
    return handoutsProps.map((handoutProps) => new Handout(handoutProps));
  }
}
