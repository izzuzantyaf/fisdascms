import {
  faBalanceScale,
  faBook,
  faCalendarMinus,
  faFolderOpen,
  faSitemap,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"

export enum Route {
  HOME = "/",
  SIGN_IN = "/signin",
  CODE_OF_CONDUCT = "/code-of-conduct",
  HANDOUT = "/handout",
  PRACTICUM_MATERIAL = "/practicum-material",
  PRE_TASK = "/pretask",
  PRACTICUM_VIDEO = "/practicum-video",
  SIMULATOR = "/simulator",
  JOURNAL_COVER = "/journal-cover",
  ASSISTANT = "/assistant",
  SCHEDULE = "/schedule",
  ORGANIGRAM = "/organigram",
  SOCIAL_MEDIA = "/social-media",
}

export enum ApiRoute {
  SIGN_IN = "/auth/signin",
  CODE_OF_CONDUCT = "/code-of-conduct",
  ORGANIGRAM = "/organigram",
  HANDOUT = "/handout",
  PRACTICUM_MATERIAL = "/practicum-module",
  SCHEDULE = "/schedule",
  ASSISTANT = "/assistant",
}

export const menu = [
  // {
  //   name: "Dashboard",
  //   faIconName: "pager",
  //   route: Route.HOME,
  // },
  {
    name: "Tata tertib",
    faIconName: faBalanceScale,
    route: Route.CODE_OF_CONDUCT,
  },
  {
    name: "Modul",
    faIconName: faBook,
    route: Route.HANDOUT,
  },
  {
    name: "Konten praktikum",
    faIconName: faFolderOpen,
    route: Route.PRACTICUM_MATERIAL,
  },
  // {
  //   name: "Soal TP",
  //   faIconName: "tasks",
  //   route: Route.PRE_TASK,
  // },
  // {
  //   name: "Video praktikum",
  //   faIconName: "play",
  //   route: Route.PRACTICUM_VIDEO,
  // },
  // {
  //   name: "Simulator",
  //   faIconName: "gamepad",
  //   route: Route.SIMULATOR,
  // },
  // {
  //   name: "Cover jurnal",
  //   faIconName: "file",
  //   route: Route.JOURNAL_COVER,
  // },
  {
    name: "Asisten",
    faIconName: faUsers,
    route: Route.ASSISTANT,
  },
  {
    name: "Jadwal",
    faIconName: faCalendarMinus,
    route: Route.SCHEDULE,
  },
  {
    name: "Organigram",
    faIconName: faSitemap,
    route: Route.ORGANIGRAM,
  },
  // {
  //   name: "Social media",
  //   faIconName: "thumbs-up",
  //   route: Route.SOCIAL_MEDIA,
  // },
]

export const breadcrumpStack = [
  {
    path: Route.CODE_OF_CONDUCT,
    values: ["Tata tertib"],
  },
]

export enum Faculty {
  FTE = "fte",
  FRI = "fri",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum AssistantLevel {
  JUNIOR = "junior",
  SENIOR = "senior",
}

export enum Language {
  ID = "id",
  EN = "en",
}
