import { Injectable } from '@nestjs/common';
import { Handout } from 'src/entities/models/handout.entity';

@Injectable()
export class HandoutFactoryService {
  create(initialProps: object) {
    return new Handout(initialProps);
  }
}
