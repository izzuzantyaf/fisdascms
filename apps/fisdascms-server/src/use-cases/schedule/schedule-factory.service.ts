import { Injectable } from '@nestjs/common';
import { Schedule } from 'src/entities/models/schedule.entity';

@Injectable()
export class ScheduleFactoryService {
  create(props: object) {
    return new Schedule(props);
  }

  createMany(schedulesProps: object[]) {
    return schedulesProps.map((props) => new Schedule(props));
  }
}
