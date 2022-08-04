import { PracticumModule } from 'src/core/entities/practicum-module.entity';

export class PracticumModuleFactory {
  create(props: {}) {
    return new PracticumModule(props);
  }

  createMany(propsArr: object[]) {
    return propsArr.map((props) => new PracticumModule(props));
  }
}
