import { Handout } from '../models/handout.entity';
import { IGenericRepository } from './generic-repo.interface';

export interface IHandoutGenericRepository
  extends IGenericRepository<Handout> {}
