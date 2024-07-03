import { useState } from 'react'

export const languages = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
}

export type LanguageKeys = keyof typeof languages

export function useLanguage() {
  const [language, setLanguage] = useState<LanguageKeys>('ko')

  const _setLanguage = (language: LanguageKeys) => {
    setLanguage(language)
  }

  return {
    language,
    setLanguage: _setLanguage,
  }
}
