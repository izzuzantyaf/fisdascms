import { Model } from 'mongoose';
// import { IGenericRepository } from 'src/entities/abstracts/repo/generic-repo.interface';

export class MongoGenericRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];

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

  getFirst(): Promise<T> {
    return this._repository.findOne().exec();
  }

  getById(id: any): Promise<T> {
    return this._repository.findById(id).exec();
  }

  updateById(id: string, newItem: T): Promise<T> {
    return this._repository
      .findByIdAndUpdate(id, newItem, { new: true })
      .exec();
  }

  updateMany(items: T[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  deleteById(id: string): Promise<T> {
    return this._repository.findByIdAndDelete(id).exec();
  }
}
