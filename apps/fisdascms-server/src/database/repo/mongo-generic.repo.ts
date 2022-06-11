import { Model } from 'mongoose';

export class MongoGenericRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  create(item: T) {
    return this._repository.create(item);
  }

  getAll() {
    return this._repository.find().exec();
  }

  getFirst() {
    return this._repository.findOne().exec();
  }

  getById(id: any) {
    return this._repository.findById(id).exec();
  }

  updateById(id: string, newItem: T) {
    return this._repository
      .findByIdAndUpdate(id, newItem, { new: true })
      .exec();
  }

  updateMany(items: T[]) {
    throw new Error('Method not implemented.');
  }

  deleteById(id: string) {
    return this._repository.findByIdAndDelete(id).exec();
  }
}
