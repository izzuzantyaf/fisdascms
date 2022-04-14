export interface IGenericRepository<T> {
  create(item: T): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  updateById(id: string, newItem: T): Promise<T>;
  deleteById(id: string): Promise<T>;
}