import { Handout } from '../../models/handout.entity';
import { IGenericRepository } from './generic-repo.interface';

export interface IHandoutRepository extends IGenericRepository<Handout> {
  seed(handouts: Handout[]): void;
}
