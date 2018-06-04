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

  private getDb(): firebase.firestore.Firestore {
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

  public async get(endpoint: string, from: string, to: string) {
    const response = await this.getDb()
      .collection(endpoint)
      .where('date', '>=', from)
      .where('date', '<=', to)
      .get()
    return response.docs.map(doc => doc.data())
  }

  public async add(endpoint: string, data: any) {
    const response = await this.getDb()
      .collection(endpoint)
      .add(data)
    return true
  }
}

export default new Firebase()
