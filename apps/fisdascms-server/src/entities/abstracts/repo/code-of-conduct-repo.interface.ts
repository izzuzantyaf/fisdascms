import { CodeOfConduct } from '../../models/code-of-conduct.entity';
import { IGenericRepository } from './generic-repo.interface';

export interface ICodeOfConductRepository
  extends IGenericRepository<CodeOfConduct> {
  seed(codeOfConduct: CodeOfConduct): void;
}
