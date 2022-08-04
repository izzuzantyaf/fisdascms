import { CodeOfConductConstructorProps } from '../entities/code-of-conduct.entity';

export type UpdateCodeOfConductDto = Required<
  Pick<CodeOfConductConstructorProps, '_id'>
> &
  Omit<CodeOfConductConstructorProps, '_id'>;
