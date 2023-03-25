import { OrganigramConstructorProps } from '../entities/organigram.entity';

export type UpdateOrganigramDto = Required<
  Pick<OrganigramConstructorProps, '_id'>
> &
  Omit<OrganigramConstructorProps, '_id'>;
