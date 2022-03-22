export abstract class IGenericRepository<T> {
  abstract create(item: T): Promise<T>;

  abstract getAll(): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract getByEmail(email: string): Promise<T>;

  abstract update(id: string, newItem: T): Promise<T>;

  abstract delete(id: string): Promise<T>;
}
