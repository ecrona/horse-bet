import { Firebase } from '.'
import { Fixture } from 'models/fixture'
import { User } from 'models/user'

export const getUsers = async (firebase: Firebase) => {
  const users = await firebase.db.collection('users').get()
  return users.docs.map(doc => ({ id: doc.id, ...doc.data() } as User))
}

export const getFixtures = async (firebase: Firebase) => {
  const fixtures = await firebase.db.collection('fixtures').get()
  return fixtures.docs.map(doc => ({ id: doc.id, ...doc.data() } as Fixture))
}
