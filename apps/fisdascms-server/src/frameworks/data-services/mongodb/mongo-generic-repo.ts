import { Model } from 'mongoose';
import { IGenericRepository } from 'src/core/abstracts/generic-repository.abstract';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  getAll(): Promise<T[]> {
    return this._repository.find().exec();
  }

  getById(id: any): Promise<T> {
    return this._repository.findById(id).exec();
  }

  getByEmail(email: string): Promise<T> {
    return this._repository.findOne({ email: email }).exec();
  }

  update(id: string, newItem: T): Promise<T> {
    return this._repository.findByIdAndUpdate(id, newItem).exec();
  }

  deleteById(id: string): Promise<T> {
    return this._repository.findByIdAndDelete(id).exec();
  }
  deleteByEmail(email: string): Promise<T> {
    return this._repository.findOneAndDelete({ email: email }).exec();
  }
}
