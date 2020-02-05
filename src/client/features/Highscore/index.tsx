import Toolbar from '@client/shared/components/Toolbar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHighscores } from '../OldHighscore/store/actions'
import { getHighscores, getMyHighscore } from '../OldHighscore/store/selectors'
import './styles.css'

export default function Highscore() {
  const dispatch = useDispatch()
  const highscores = useSelector(getHighscores)
  const myHighscore = useSelector(getMyHighscore)

  useEffect(() => {
    dispatch(fetchHighscores())
  }, [])

  if (!highscores || !highscores.length || !myHighscore) return null

  return (
    <>
      <Toolbar hideHighscore />

      <div className="bg-gray-400 pt-6 px-6 pb-8 text-yellow-300 relative">
        <span className="block font-medium">Gneigh,</span>
        <span className="block font-bold text-2xl">{myHighscore.name}</span>
        <span className="block text-sm font-extrabold text-white">
          {myHighscore.score} pts
        </span>

        <div
          className="bg-purple-300 text-2xl font-bold rounded-full absolute right-0 bottom-0 mr-6 -mb-8 shadow text-white flex items-center justify-center"
          style={{ height: 64, width: 64, fontFamily: 'rockwell' }}
        >
          {myHighscore.rank}
          <sup>
            <small>th</small>
          </sup>
        </div>
      </div>

      <div className="pb-10"></div>

      {highscores.map(highscore => (
        <div key={highscore.name} className="highscore-item">
          <span className="highscore-item__rank">{highscore.rank}</span>
          <span className="highscore-item__name">{highscore.name}</span>
          <span className="highscore-item__score">{highscore.score} pts</span>
        </div>
      ))}
    </>
  )
}
