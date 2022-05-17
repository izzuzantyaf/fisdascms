import { Injectable } from '@nestjs/common';
import { Assistant } from 'src/entities/models/assistant.entity';

@Injectable()
export class AssistantFactoryService {
  create(props: object) {
    return new Assistant(props);
  }

  createMany(assistantsProps: object[]) {
    return assistantsProps.map((props) => new Assistant(props));
  }
}