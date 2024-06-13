import i18next from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import multiResourcesBackend from '../index.js'
import should from 'should'

describe('basic chained-backend', () => {
  it('should transform normal resources to a backend', async () => {
    const resA = {
      en: {
        translation: {
          welcome: 'hello world'
        }
      },
      de: {
        translation: {
          welcome: 'hallo welt'
        }
      }
    }
    const resB = {
      en: {
        translationFlb: {
          welcome: 'hello world from local fallback'
        }
      },
      de: {
        translationFlb: {
          welcome: 'hallo welt vom lokalen fallback'
        }
      }
    }
    const resC = {
      en: {
        translationFlbTwo: {
          welcome: 'hello world from local fallback 2'
        }
      },
      de: {
        translationFlbTwo: {
          welcome: 'hallo welt vom lokalen fallback 2'
        }
      }
    }
    const resD = {
      en: {
        translationFlbThree: {
          welcome: 'hello world from local fallback 3'
        }
      },
      de: {
        translationFlbThree: {
          welcome: 'hallo welt vom lokalen fallback 3'
        }
      }
    }

    const i18n = i18next.createInstance()
    await i18n.use(ChainedBackend).init({
      // debug: true,
      lng: 'en',
      fallbackLng: 'en',
      preload: ['en', 'de'],
      ns: ['translation', 'translationFlb', 'translationFlbTwo', 'translationFlbThree'],
      defaultNS: 'translation',
      backend: {
        backends: [
          multiResourcesBackend(resA),
          multiResourcesBackend((lng, ns, clb) => clb(null, resB && resB[lng] && resB[lng][ns])),
          multiResourcesBackend(async (lng, ns) => resC && resC[lng] && resC[lng][ns]),
          multiResourcesBackend(async (...args) => resD && resD[args[0]] && resD[args[0]][args[1]])
        ]
      }
    })
    should(i18n.t('welcome')).eql('hello world')
    should(i18n.t('welcome', { lng: 'de' })).eql('hallo welt')
    should(i18n.t('welcome', { ns: 'translationFlb' })).eql('hello world from local fallback')
    should(i18n.t('welcome', { lng: 'de', ns: 'translationFlb' })).eql('hallo welt vom lokalen fallback')
    should(i18n.t('welcome', { ns: 'translationFlbTwo' })).eql('hello world from local fallback 2')
    should(i18n.t('welcome', { lng: 'de', ns: 'translationFlbTwo' })).eql('hallo welt vom lokalen fallback 2')
    should(i18n.t('welcome', { ns: 'translationFlbThree' })).eql('hello world from local fallback 3')
    should(i18n.t('welcome', { lng: 'de', ns: 'translationFlbThree' })).eql('hallo welt vom lokalen fallback 3')
  })
})
