import { Language } from "../constants"

type LanguageCodeMap = Record<Language, string>

const langCodeMap: LanguageCodeMap = {
  id: "Bahasa Indonesia",
  en: "English",
}

export const languageCodeMapper = (languageCode: Language) => {
  if (!Object.keys(langCodeMap).includes(languageCode))
    return "Unknown language"
  return langCodeMap[languageCode]
}
