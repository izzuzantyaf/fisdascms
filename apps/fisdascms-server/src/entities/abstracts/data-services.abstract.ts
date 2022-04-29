import { IAdminRepository } from './repo/admin-repo.interface';
import { IAssistantRepository } from './repo/assistant-repo.interface';
import { ICodeOfConductRepository } from './repo/code-of-conduct-repo.interface';
import { IHandoutRepository } from './repo/handout-repo.interface';
import { IOrganigramRepository } from './repo/organigram-repo.interface';
import { IScheduleRepository } from './repo/schedule-repo.interface';

export abstract class IDataServices {
  abstract admins: IAdminRepository;
  abstract handouts: IHandoutRepository;
  abstract codeOfConducts: ICodeOfConductRepository;
  abstract organigrams: IOrganigramRepository;
  abstract schedules: IScheduleRepository;
  abstract assistants: IAssistantRepository;
}
