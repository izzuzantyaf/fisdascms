export interface IFactoryService<T> {
  create(data: object): T;
}
