import { Logger } from '@nestjs/common/services';
import { FilterQuery, Model, ProjectionType } from 'mongoose';

export class MongoGenericRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];
  protected readonly logger = new Logger(MongoGenericRepository.name);

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  create(item: T) {
    return this._repository.create(item);
  }

  getAll(props?: { filter?: FilterQuery<T>; projection?: ProjectionType<T> }) {
    return this._repository
      .find(props?.filter, props?.projection)
      .sort({ _id: 'asc' })
      .exec();
  }

  getFirst() {
    return this._repository.findOne().exec();
  }

  getById(id: any) {
    return this._repository.findById(id).exec();
  }

  async updateById(id: string, newItem: T): Promise<Awaited<T>> {
    let updatedAssistant;
    try {
      updatedAssistant = await this._repository
        .findByIdAndUpdate(id, newItem, { new: true })
        .exec();
    } catch (error) {
      this.logger.debug(error);
    }
    return updatedAssistant;
  }

  updateMany(items: T[]) {
    throw new Error('Method not implemented.');
  }

  async deleteById(id: string) {
    let deletedAdmin;
    try {
      deletedAdmin = await this._repository.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.debug(error);
    }
    return deletedAdmin;
  }
}
