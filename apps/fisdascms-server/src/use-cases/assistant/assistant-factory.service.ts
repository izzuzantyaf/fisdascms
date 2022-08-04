import { Injectable } from '@nestjs/common';
import {
  Assistant,
  AssistantConstructorProps,
} from 'src/core/entities/assistant.entity';

@Injectable()
export class AssistantFactoryService {
  create(props: AssistantConstructorProps) {
    return new Assistant(props);
  }

  createMany(assistantsProps: AssistantConstructorProps[]) {
    return assistantsProps.map((props) => new Assistant(props));
  }
}
