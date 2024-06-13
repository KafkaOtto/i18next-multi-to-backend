import i18next, { BackendModule } from 'i18next'
import multiResourcesBackend from '../../'
import { expectType } from 'tsd'

import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend'

expectType<BackendModule>(multiResourcesBackend({ en: { translations: { key: 'value' } } }))
expectType<BackendModule>(multiResourcesBackend((lng: string, ns: string, clb) => ({ key: 'value' })))
expectType<BackendModule>(multiResourcesBackend(async (lng: string, ns: string) => ({ key: 'value' })))

i18next.use(ChainedBackend).init<ChainedBackendOptions>({
  backend: {
    backends: [
      multiResourcesBackend({ en: { translations: { key: 'value' } } }),
      multiResourcesBackend((lng: string, ns: string, clb) => ({ key: 'value' })),
      multiResourcesBackend(async (lng: string, ns: string) => ({ key: 'value' }))
    ]
  }
})
