import 'isomorphic-fetch'
import * as admin from 'firebase-admin'
import { Data } from '../models/data'
import { Fixture, IdentifableFixture } from '../models/fixture'
import { Winner } from '../models/winner'

class Firestore {
  constructor(private firestore: admin.firestore.Firestore) {}

  private getFixture(fixture: IdentifableFixture): Fixture {
    const { competitionId, home, away, date, stage, winner } = fixture

    return { competitionId, home, away, date, stage, winner }
  }

  public async getFixtures() {
    const fixtures = await this.firestore.collection('fixtures').get()

    return fixtures.docs.map(
      a => ({ id: a.id, ...a.data() } as IdentifableFixture)
    )
  }

  public async updateFixtures(
    newFixtures: Array<Fixture>,
    updatedFixtures: Array<IdentifableFixture>
  ) {
    const batch = this.firestore.batch()
    const collection = this.firestore.collection('fixtures')

    newFixtures.forEach(fixture => batch.set(collection.doc(), fixture))
    updatedFixtures.forEach(fixture =>
      batch.update(collection.doc(fixture.id), this.getFixture(fixture))
    )

    return await batch.commit()
  }
}

// Factory
export const createFirestore = () => {
  const firestore = admin.firestore()
  return new Firestore(firestore)
}
