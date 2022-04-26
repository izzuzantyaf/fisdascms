import { Organigram } from 'src/entities/models/organigram.entity';
import { IGenericRepository } from './generic-repo.interface';

export interface IOrganigramRepository extends IGenericRepository<Organigram> {
  seed(organigram: Organigram): void;
}
