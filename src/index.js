const multiResourcesBackend = (res, k) => ({
  type: 'backend',
  init (services, backendOptions, i18nextOptions) {
    // Initialization logic (if any)
  },
  read (language, namespace, callback) {
    if (typeof res === 'function') {
      if (res.length < 3) {
        try {
          const r = res(language, namespace)
          if (r && typeof r.then === 'function') {
            r.then((module) => {
              const mainContent = (module && module.default) || module
              if (typeof mainContent === 'string') {
                fetch(mainContent)
                  .then(res => res.text())
                  .then(res => {
                    const result = {}
                    result[k || 'content'] = res
                    callback(null, result)
                  })
              } else {
                if (k) {
                  const result = {}
                  result[k] = mainContent
                  callback(null, result)
                } else {
                  callback(null, mainContent)
                }
              }
            }).catch((err) => {
              callback(err, false)
            })
          } else {
            callback(null, r)
          }
        } catch (err) {
          callback(err)
        }
        return
      }

      res(language, namespace, callback)
      return
    }
    callback(null, res && res[language] && res[language][namespace])
  }
})

export default multiResourcesBackend
