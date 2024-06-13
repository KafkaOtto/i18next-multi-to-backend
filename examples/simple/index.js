import i18next from 'i18next'
import multiResourcesBackend from "i18next-multi-to-backend";

i18next
  .use(mdToBackend((language, namespace) => import(`./locales/${language}/${namespace}.md`)))

await i18next.init({
  // debug: true,
  fallbackLng: {
    default: ['en'],
    en: ['en-US']
  }
})

console.log('en: ' + i18next.t('hi'))

await i18next.changeLanguage('en-US')
console.log('en-US: ' + i18next.t('hi'))

await i18next.changeLanguage('de')
console.log('de: ' + i18next.t('hi'))

await i18next.changeLanguage('de-CH')
console.log('de-CH: ' + i18next.t('hi'))
