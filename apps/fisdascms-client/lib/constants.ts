export enum Route {
  HOME = "/",
  SIGN_IN = "/signin",
  CODE_OF_CONDUCT = "/code-of-conduct",
  HANDOUT = "/handout",
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
  CODE_OF_CONDUCT = "/api/code-of-conduct",
  ORGANIGRAM = "/api/organigram",
}

export const menu = [
  // {
  //   name: "Dashboard",
  //   faIconName: "pager",
  //   route: Route.HOME,
  // },
  {
    name: "Tata tertib",
    faIconName: "balance-scale",
    route: Route.CODE_OF_CONDUCT,
  },
  {
    name: "Modul",
    faIconName: "book",
    route: Route.HANDOUT,
  },
  {
    name: "Soal TP",
    faIconName: "tasks",
    route: Route.PRE_TASK,
  },
  {
    name: "Video praktikum",
    faIconName: "play",
    route: Route.PRACTICUM_VIDEO,
  },
  {
    name: "Simulator",
    faIconName: "gamepad",
    route: Route.SIMULATOR,
  },
  {
    name: "Cover jurnal",
    faIconName: "file",
    route: Route.JOURNAL_COVER,
  },
  {
    name: "Asisten",
    faIconName: "users",
    route: Route.ASSISTANT,
  },
  {
    name: "Jadwal",
    faIconName: "calendar-minus",
    route: Route.SCHEDULE,
  },
  {
    name: "Organigram",
    faIconName: "sitemap",
    route: Route.ORGANIGRAM,
  },
  {
    name: "Social media",
    faIconName: "thumbs-up",
    route: Route.SOCIAL_MEDIA,
  },
]

export const breadcrumpStack = [
  {
    path: Route.CODE_OF_CONDUCT,
    values: ["Tata tertib"],
  },
]
