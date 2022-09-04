import { ScheduleConstructorProps } from '../entities/schedule.entity';

export type UpdateScheduleDto = Required<
  Pick<ScheduleConstructorProps, '_id' | 'url' | 'isActive'>
>;

export type ScheduleQuery = Partial<
  Pick<ScheduleConstructorProps, 'faculty' | 'isActive'>
>;
