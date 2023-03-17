import {
  PracticumModule,
  PracticumModuleConstructorProps,
} from 'src/domains/practicum-module/entities/practicum-module.entity';

export class PracticumModuleFactory {
  create(props: PracticumModuleConstructorProps) {
    return new PracticumModule(props);
  }

  createMany(propsArr: PracticumModuleConstructorProps[]) {
    return propsArr.map((props) => new PracticumModule(props));
  }
}
