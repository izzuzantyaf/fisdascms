import { Injectable } from '@nestjs/common';
import {
  Handout,
  HandoutConstructorProps,
} from 'src/domains/handout/entities/handout.entity';

@Injectable()
export class HandoutFactoryService {
  create(props: HandoutConstructorProps) {
    return new Handout(props);
  }

  createMany(arrayOfProps: HandoutConstructorProps[]) {
    return arrayOfProps.map((props) => new Handout(props));
  }
}
