import { Injectable } from '@nestjs/common';
import {
  Schedule,
  ScheduleConstructorProps,
} from 'src/domains/schedule/entities/schedule.entity';

@Injectable()
export class ScheduleFactoryService {
  create(props: ScheduleConstructorProps) {
    return new Schedule(props);
  }

  createMany(arrayOfProps: ScheduleConstructorProps[]) {
    return arrayOfProps.map((props) => new Schedule(props));
  }
}
