export interface IGenericRepository<T> {
  create(item: T): Promise<T>;
  getAll(): Promise<T[]>;
  getFirst(): Promise<T>;
  getById(id: string): Promise<T>;
  updateById(id: string | number, newItem: T): Promise<T>;
  updateMany(items: T[]): Promise<T[]>;
  deleteById(id: string): Promise<T>;
}
