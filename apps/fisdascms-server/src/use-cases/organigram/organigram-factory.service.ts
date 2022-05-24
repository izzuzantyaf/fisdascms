import { Injectable } from '@nestjs/common';
import { Organigram } from 'src/frameworks/database/mongodb/entity/organigram.entity';

@Injectable()
export class OrganigramFactoryService {
  create(props: object) {
    return new Organigram(props);
  }
}
