import React from 'react'
import './styles.css'
import Toolbar from '@client/shared/components/Toolbar'
import { Link } from 'react-router-dom'

interface Props {}

export default function Tournaments({}: Props) {
  return (
    <>
      <Toolbar />

      <h1>Tournaments</h1>

      <Link to="/champions-league">Champions league</Link>
    </>
  )
}
