import firebase from 'firebase'
import { Firebase } from '.'

export const getUser = async (
  firebase: Firebase
): Promise<firebase.User | false> => {
  await firebase.auth().getRedirectResult()

  const promise = new Promise<firebase.User | false>((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      return resolve(user || false)
    })
  })

  const timeout = new Promise<false>((resolve, reject) =>
    setTimeout(() => resolve(false), 5000)
  )

  return await Promise.race([promise, timeout])
}
