import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import { User } from 'models/user'
import { clearScreenDown } from 'readline'

export class Firebase {
  private static _instance: Firebase
  private _userId: string

  constructor(
    public db: firebase.firestore.Firestore,
    private functions: firebase.functions.Functions,
    private authProvider: firebase.auth.GoogleAuthProvider
  ) {
    this._userId = ''
  }

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
      firebase.functions(),
      new firebase.auth.GoogleAuthProvider()
    )

    return this._instance
  }

  public get userId() {
    return this._userId
  }

  public set userId(userId: string) {
    if (this._userId === '') {
      this._userId = userId
    }
  }

  public get auth() {
    return firebase.auth
  }

  public selectAuthAccount() {
    this.authProvider.setCustomParameters({
      prompt: 'select_account'
    })
  }

  public async authenticate() {
    await firebase.auth().signInWithRedirect(this.authProvider)
  }

  public call(functionName: string) {
    return this.functions.httpsCallable(functionName)
  }
}

const instance = Firebase.instance

export default instance
