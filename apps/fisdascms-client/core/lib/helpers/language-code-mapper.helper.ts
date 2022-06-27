const langCodeMap = {
  id: "Bahasa Indonesia",
  en: "English",
}

export const languageCodeMapper = (languageCode: string) => {
  if (!Object.keys(langCodeMap).includes(languageCode))
    return "Unknown language"
  return langCodeMap[languageCode]
}
