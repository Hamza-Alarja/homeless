import { createContext, useCallback, useEffect, useState, useMemo } from 'react'
import { useLastUpdated } from '@pancakeswap/hooks'
import memoize from 'lodash/memoize'
import omitBy from 'lodash/omitBy'
import reduce from 'lodash/reduce'
import isUndefinedOrNull from '@pancakeswap/utils/isUndefinedOrNull'
import { EN, languages } from './config/languages'
import { ContextApi, ProviderState, TranslateFunction, Language } from './types'
import { LS_KEY, fetchLocale, getLanguageCodeFromLS } from './helpers'

const initialState: ProviderState = {
  isFetching: true,
  currentLanguage: EN,
}

const includesVariableRegex = new RegExp(/%\S+?%/, 'gm')

const translatedTextIncludesVariable = memoize((translatedText: string): boolean => {
  return !!translatedText?.match(includesVariableRegex)
})

const getRegExpForDataKey = memoize((dataKey: string): RegExp => {
  return new RegExp(`%${dataKey}%`, 'g')
})

// Export the translations directly
const languageMap = new Map<Language['locale'], Record<string, string>>()
languageMap.set(EN.locale, {})

export const LanguageContext = createContext<ContextApi | undefined>(undefined)

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { lastUpdated, setLastUpdated: refresh } = useLastUpdated()
  const [state, setState] = useState<ProviderState>(() => {
    const codeFromStorage = getLanguageCodeFromLS()

    return {
      ...initialState,
      currentLanguage: languages[codeFromStorage] || EN,
    }
  })
  const { currentLanguage } = state

  useEffect(() => {
    // تحميل ملفات الترجمة من المسار المحلي بدلاً من الإنترنت
    const fetchInitialLocales = async () => {
      try {
        // قائمة اللغات المدعومة
        const supportedLocales = [
          'ar-SA',
          'bn-BD',
          'de-DE',
          'el-GR',
          'en-US',
          'es-ES',
          'fi-FI',
          'fil-PH',
          'fr-FR',
          'hi-IN',
          'hu-HU',
          'id-ID',
          'it-IT',  
          'ja-JP',
          'ko-KR',
          'nl-NL',
          'pl-PL',
          'pt-BR',
          'pt-PT',
          'ro-RO',
          'ru-RU',
          'sv-SE',
          'ta-IN',
          'tr-TR',
          'uk-UA',
          'vi-VN',
          'zh-CN',
          'zh-TW',
        ]
        // ...existing code...
        for (const locale of supportedLocales) {
          let translations = {}
          try {
            const res = await fetch(`/locales/${locale}.json`)
            if (res.ok) {
              translations = await res.json()
            }
          } catch (e) {
            translations = {}
          }
          languageMap.set(locale, translations)
        }
        setState((prev) => ({ ...prev, isFetching: false }))
      } catch (error) {
        // في حال حدوث خطأ عام
        setState((prev) => ({ ...prev, isFetching: false }))
      }
    }
    fetchInitialLocales()
  }, [refresh])

  const setLanguage = useCallback(async (language: Language) => {
    if (!languageMap.has(language.locale)) {
      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }))

      const locale = await fetchLocale(language.locale)
      if (locale) {
        languageMap.set(language.locale, locale)
        localStorage?.setItem(LS_KEY, language.locale)
        setState((prevState) => ({
          ...prevState,
          isFetching: false,
          currentLanguage: language,
        }))
      } else {
        setState((prevState) => ({
          ...prevState,
          isFetching: false,
        }))
      }
    } else {
      localStorage?.setItem(LS_KEY, language.locale)
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }))
    }
  }, [])

  const translate: TranslateFunction = useCallback(
    (key, data) => {
      const translationSet = languageMap.get(currentLanguage.locale) ?? {}
      const translatedText = translationSet?.[key] || key

      if (data) {
        // Check the existence of at least one combination of %%, separated by 1 or more non space characters
        const includesVariable = translatedTextIncludesVariable(key)
        if (includesVariable) {
          return reduce(
            omitBy(data, isUndefinedOrNull),
            (result, dataValue, dataKey) => {
              return result.replace(getRegExpForDataKey(dataKey), dataValue.toString())
            },
            translatedText,
          )
        }
      }

      return translatedText
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLanguage, lastUpdated],
  )

  const providerValue = useMemo(() => {
    return { ...state, setLanguage, t: translate }
  }, [state, setLanguage, translate])

  return <LanguageContext.Provider value={providerValue}>{children}</LanguageContext.Provider>
}
