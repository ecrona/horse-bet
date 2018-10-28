export const createMockPromise = <T>(data?) => (): Promise<T> =>
  new Promise(async resolve => {
    await new Promise(timeoutResolve =>
      setTimeout(timeoutResolve, Math.ceil(Math.random() * 3000))
    )
    return resolve(data)
  })
