import { Injectable } from '@nestjs/common';
import {
  CodeOfConduct,
  CodeOfConductConstructorProps,
} from 'src/core/entities/code-of-conduct.entity';

@Injectable()
export class CodeOfConductFactoryService {
  create(props: CodeOfConductConstructorProps) {
    return new CodeOfConduct(props);
  }
}
