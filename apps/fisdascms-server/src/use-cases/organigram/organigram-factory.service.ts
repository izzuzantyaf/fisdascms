import { Injectable } from '@nestjs/common';
import {
  Organigram,
  OrganigramConstructorProps,
} from 'src/core/entities/organigram.entity';

@Injectable()
export class OrganigramFactoryService {
  create(props: OrganigramConstructorProps) {
    return new Organigram(props);
  }
}
