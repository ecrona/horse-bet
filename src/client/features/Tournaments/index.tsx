import Toolbar from '@client/shared/components/Toolbar'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

interface Props {}

export default function Tournaments({}: Props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Toolbar hideHighscore hideGoBack />

      <div className="px-6 pt-10 pb-5 text-white">
        <h3 className="text-xl font-bold">Tournaments</h3>
      </div>

      <div className="px-6">
        <Link to="/champions-league">
          <div className="tournament-card">
            <span className="tournament-card__title">Champions league</span>
          </div>
        </Link>
      </div>
    </>
  )
}
