import { Controller, Get } from '@nestjs/common';
import { SuccessfulResponse } from 'src/lib/dtos/response.dto';
import { AssistantService } from 'src/use-cases/assistant/assistant.service';

@Controller('api/assistant')
export class AssistantController {
  constructor(private assistantService: AssistantService) {}

  @Get()
  async getAll() {
    const assistants = await this.assistantService.getAll();
    return new SuccessfulResponse('Sukses', { assistants });
  }
}
