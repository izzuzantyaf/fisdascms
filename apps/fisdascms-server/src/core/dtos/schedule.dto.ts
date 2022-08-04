import { ScheduleConstructorProps } from '../entities/schedule.entity';

export type UpdateScheduleDto = Required<
  Pick<ScheduleConstructorProps, '_id'>
> &
  Omit<ScheduleConstructorProps, '_id'>;
