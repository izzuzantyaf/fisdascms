import { Injectable } from '@nestjs/common';
import {
  Organigram,
  OrganigramConstructorProps,
} from 'src/domains/organigram/entities/organigram.entity';

@Injectable()
export class OrganigramFactoryService {
  create(props: OrganigramConstructorProps) {
    return new Organigram(props);
  }
}
