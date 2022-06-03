import { PracticumModule } from 'src/database/entity/practicum-module.entity';

export class PracticumModuleFactory {
  create(props: {}) {
    return new PracticumModule(props);
  }

  createMany(propsArr: object[]) {
    return propsArr.map((props) => new PracticumModule(props));
  }
}
