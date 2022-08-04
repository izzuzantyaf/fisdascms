import { Injectable } from '@nestjs/common';
import { CodeOfConduct } from 'src/core/entities/code-of-conduct.entity';

@Injectable()
export class CodeOfConductFactoryService {
  create(props: object) {
    return new CodeOfConduct(props);
  }
}
