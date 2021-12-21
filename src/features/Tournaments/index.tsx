import Toolbar from '@client/shared/components/Toolbar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTournaments } from './store/actions'
import { getListOfTournaments } from './store/selectors'

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
        {tournaments.map(({ id, name, slug }) => (
          <Link to={`/${id}/${slug}`}>
            <div className="flex items-center justify-center p-6 cursor-pointer bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 text-purple-300 shadow-md rounded-lg h-36">
              <span className="font-bold text-2xl">{name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
