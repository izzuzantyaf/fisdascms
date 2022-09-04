import { HandoutConstructorProps } from '../entities/handout.entity';

export type UpdateHandoutDto = Required<Pick<HandoutConstructorProps, '_id'>> &
  Omit<HandoutConstructorProps, '_id'>;

export type HandoutQuery = Partial<
  Pick<HandoutConstructorProps, 'faculty' | 'language' | 'isActive'>
>;
