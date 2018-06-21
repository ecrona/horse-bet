import { Firebase } from '.'

export const isAuthenticated = async (firebase: Firebase) => {
  await firebase.auth().getRedirectResult()

  const promise = new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      return resolve(!!user)
    })
  })

  const timeout = new Promise((resolve, reject) =>
    setTimeout(() => resolve(false), 5000)
  )

  return await Promise.race([promise, timeout])
}
