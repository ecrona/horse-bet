export const createMockPromise =
  <T>(data?: T) =>
  (): Promise<T> =>
    new Promise<any>(async (resolve) => {
      await new Promise((timeoutResolve) =>
        setTimeout(timeoutResolve, Math.ceil(Math.random() * 3000))
      )
      return resolve(data)
    })
