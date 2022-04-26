import { Injectable } from '@nestjs/common';
import { Organigram } from 'src/entities/models/organigram.entity';

@Injectable()
export class OrganigramFactoryService {
  create(props: object) {
    return new Organigram(props);
  }
}
