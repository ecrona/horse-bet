import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { createDataManager } from './services/data-manager'
import { Fixture, IdentifableFixture } from './models/fixture'
import { createFirestore } from './services/firestore'

admin.initializeApp({
  databaseURL: 'https://horse-bet-caa6d.firebaseio.com',
  projectId: 'horse-bet-caa6d',
  storageBucket: 'horse-bet-caa6d.appspot.com'
})

function compareFixtures(a: Fixture, b: Fixture) {
  return a.home === b.home && a.away === b.away && a.stage === b.stage
}

function getNewFixtures(
  allFixtures: Array<Fixture>,
  existingFixtures: Array<IdentifableFixture>
) {
  return allFixtures.filter(
    match =>
      !existingFixtures.some(existingMatch =>
        compareFixtures(match, existingMatch)
      )
  )
}

function getUpdatedFixtures(
  allFixtures: Array<Fixture>,
  existingFixtures: Array<IdentifableFixture>
) {
  return allFixtures.reduce(
    (fixtures, fixture) => {
      const matchingFixtures = existingFixtures
        .filter(
          existingFixture =>
            compareFixtures(fixture, existingFixture) &&
            fixture.winner !== existingFixture.winner
        )
        .map(existingFixture => ({
          ...existingFixture,
          winner: fixture.winner
        }))

      return fixtures.concat(matchingFixtures)
    },
    [] as Array<IdentifableFixture>
  )
}

export const test = functions.https.onRequest(async (request, response) => {
  const dataManager = await createDataManager()
  const firestore = createFirestore()

  const allFixtures = dataManager.getFixtures()
  const existingFixtures = await firestore.getFixtures()
  const newFixtures = getNewFixtures(allFixtures, existingFixtures)
  const updatedFixtures = getUpdatedFixtures(allFixtures, existingFixtures)

  const a = await firestore.updateFixtures(newFixtures, updatedFixtures)
  console.log(a)

  response.send('Hello from Firebase!\n\n')
})
