import { Assistant } from 'src/entities/models/assistant.entity';
import { IGenericRepository } from './generic-repo.interface';

export interface IAssistantRepository extends IGenericRepository<Assistant> {
  seed(assistants: Assistant[]): void;
}
