import { PracticumModule } from 'src/entities/models/practicum-module.entity';
import { IGenericRepository } from './generic-repo.interface';

export interface IPracticumModuleRepository
  extends IGenericRepository<PracticumModule> {
  seed(practicumModules: PracticumModule[]): void;
}
