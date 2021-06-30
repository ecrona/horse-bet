import Toolbar from '@client/shared/components/Toolbar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTournaments } from './store/actions'
import { getListOfTournaments } from './store/selectors'
import './styles.css'

interface Props {}

export default function Tournaments({}: Props) {
  const dispatch = useDispatch()
  const tournaments = useSelector(getListOfTournaments)

  useEffect(() => {
    dispatch(getTournaments())
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Toolbar hideHighscore hideGoBack />

      <div className="px-6 pt-10 pb-5 text-white">
        <h3 className="text-xl font-bold">Tournaments</h3>
      </div>

      <div className="px-6">
        {
          tournaments.map(({id, name, slug}) => (
            <Link to={`/${id}/${slug}`}>
              <div className="tournament-card">
                <span className="tournament-card__title">{name}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </>
  )
}
