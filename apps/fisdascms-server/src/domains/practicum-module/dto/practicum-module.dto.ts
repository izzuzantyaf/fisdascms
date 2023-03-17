import { PracticumModuleConstructorProps } from '../entities/practicum-module.entity';

export type UpdatePracticumModuleDto = Required<
  Pick<PracticumModuleConstructorProps, '_id'>
> &
  Omit<PracticumModuleConstructorProps, '_id'>;
