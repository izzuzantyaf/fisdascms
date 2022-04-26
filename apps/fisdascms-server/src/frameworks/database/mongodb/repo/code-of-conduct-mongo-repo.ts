import { ICodeOfConductRepository } from 'src/entities/abstracts/repo/code-of-conduct-repo.interface';
import {
  CodeOfConduct,
  CodeOfConductDocument,
} from 'src/entities/models/code-of-conduct.entity';
import { MongoGenericRepository } from './mongo-generic-repo';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';

export class CodeOfConductMongoRepository
  extends MongoGenericRepository<CodeOfConduct>
  implements ICodeOfConductRepository
{
  constructor(repository: Model<CodeOfConductDocument>) {
    super(repository);
  }

  async seed(codeOfConduct: CodeOfConduct) {
    const codeOfConductCollection = await this._repository.findOne().exec();
    if (isEmpty(codeOfConductCollection)) {
      this._repository.create(codeOfConduct);
      console.log('Code of conduct collection seeded successfuly');
    }
  }
}