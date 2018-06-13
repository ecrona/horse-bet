import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import { User } from 'models/user'

export class Firebase {
  private dbInstance: any
  private functionsInstance: any

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
    this.dbInstance = firebase.firestore()
  }

  private initFunctions() {
    this.functionsInstance = firebase.functions()
  }

  public get db(): firebase.firestore.Firestore {
    if (!this.dbInstance) {
      this.initDb()
    }

    return this.dbInstance
  }

  public get functions(): firebase.functions.Functions {
    if (!this.functionsInstance) {
      this.initFunctions()
    }

    return this.functionsInstance
  }

  public init() {
    if (!firebase.apps.length) {
      this.initApp()
      this.initDb()
    }
  }

  public call(functionName: string) {
    return this.functions.httpsCallable(functionName)
  }
}

export default new Firebase()
