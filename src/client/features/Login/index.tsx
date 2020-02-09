import React from 'react'
import './styles.css'

interface Props {}

export default function Login({}: Props) {
  return (
    <div className="login">
      <div className="the-sun">
        <img className="the-sun__logo" src="/assets/logotypes/logo2.png" />
      </div>

      <div className="login__container">
        <div className="login__text">
          <span>Hästbett is Back...</span>
        </div>

        <a href="/auth/google">
          <button className="login__button">Log in</button>
        </a>
      </div>
    </div>
  )
}
