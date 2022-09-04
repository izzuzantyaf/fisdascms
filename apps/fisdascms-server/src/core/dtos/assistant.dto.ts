import { AssistantConstructorProps } from 'src/core/entities/assistant.entity';

export type CreateAssistantDto = Omit<AssistantConstructorProps, '_id'>;
export type UpdateAssistantDto = Required<
  Pick<AssistantConstructorProps, '_id'>
> &
  CreateAssistantDto;
