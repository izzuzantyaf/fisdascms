export interface IDatabaseSeeder {
  seedAdmin(): void;
  seedHandout(): void;
  seedCodeOfConduct(): void;
  seedOrganigram(): void;
  seedSchedule(): void;
  seedAssistant(): void;
  seedPracticumModule(): void;
}
