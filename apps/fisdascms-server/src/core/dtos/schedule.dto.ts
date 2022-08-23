import { ScheduleConstructorProps } from '../entities/schedule.entity';

export type UpdateScheduleDto = Required<
  Pick<ScheduleConstructorProps, '_id' | 'url' | 'isActive'>
>;
