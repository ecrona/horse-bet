import firebase from 'firebase/app'
import 'firebase/firestore'
import { User } from 'models/user'

class Firebase {
  public db: any

  private initApp() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCORZRoazLmtY_Eq7KEchA4EW2-MYagi7Y',
      authDomain: 'horse-bet-caa6d.firebaseapp.com',
      databaseURL: 'https://horse-bet-caa6d.firebaseio.com',
      projectId: 'horse-bet-caa6d',
      storageBucket: 'horse-bet-caa6d.appspot.com',
      messagingSenderId: '127142746923'
    })
  }

  private initDb() {
    this.db = firebase.firestore()
  }

  private getDb() {
    if (!this.db) {
      this.initDb()
    }

    return this.db
  }

  public init() {
    if (!firebase.apps.length) {
      this.initApp()
      this.initDb()
    }
  }

  public async get(endpoint: string) {
    const response = await this.getDb()
      .collection(endpoint)
      .get()
    return response.docs.map((doc: any) => doc.data())
  }
}

export default new Firebase()
