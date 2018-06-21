import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { User } from 'models/user'
import { clearScreenDown } from 'readline'

export class Firebase {
  private static _instance: Firebase

  constructor(
    public db: firebase.firestore.Firestore,
    public authProvider: firebase.auth.AuthProvider
  ) {}

  public static get instance() {
    if (this._instance) {
      return this._instance
    }

    firebase.initializeApp({
      apiKey: 'AIzaSyCORZRoazLmtY_Eq7KEchA4EW2-MYagi7Y',
      authDomain: 'horse-bet-caa6d.firebaseapp.com',
      databaseURL: 'https://horse-bet-caa6d.firebaseio.com',
      projectId: 'horse-bet-caa6d',
      storageBucket: 'horse-bet-caa6d.appspot.com',
      messagingSenderId: '127142746923'
    })

    this._instance = new this(
      firebase.firestore(),
      new firebase.auth.GoogleAuthProvider()
    )

    return this._instance
  }

  public get auth() {
    return firebase.auth
  }

  public async authenticate() {
    const response = await firebase.auth().getRedirectResult()
    if (!response.user) {
      const r = await firebase.auth().signInWithRedirect(this.authProvider)
    }
  }
}

const instance = Firebase.instance

export default instance