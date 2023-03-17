import { Injectable } from '@nestjs/common';
import {
  CodeOfConduct,
  CodeOfConductConstructorProps,
} from 'src/domains/code-of-conduct/entities/code-of-conduct.entity';

@Injectable()
export class CodeOfConductFactoryService {
  create(props: CodeOfConductConstructorProps) {
    return new CodeOfConduct(props);
  }
}
