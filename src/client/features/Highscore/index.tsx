import Toolbar from '@client/shared/components/Toolbar'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHighscores } from '../OldHighscore/store/actions'
import { getHighscores, getMyHighscore } from '../OldHighscore/store/selectors'
import './styles.css'

export default function Highscore() {
  const dispatch = useDispatch()
  const highscores = useSelector(getHighscores)
  const myHighscore = useSelector(getMyHighscore)

  const [query, setQuery] = useState('')
  const filteredHighscores = useMemo(
    () =>
      highscores.filter(highscore =>
        highscore.name.toLowerCase().includes(query.toLowerCase())
      ),
    [highscores, query]
  )

  useEffect(() => {
    dispatch(fetchHighscores())
    window.scrollTo(0, 0)
  }, [])

  function handleChangeQuery(event) {
    setQuery(event.target.value)
  }

  if (!highscores || !highscores.length || !myHighscore) return null

  return (
    <>
      <Toolbar hideHighscore />

      <div className="flex bg-gray-400 pt-6 px-6 pb-8 text-yellow-300 items-center">
        <div className="flex-1">
          <span className="block font-medium">Gneigh,</span>
          <span className="block font-bold text-2xl">{myHighscore.name}</span>
          <span className="block text-sm font-extrabold text-white">
            You have a massive {myHighscore.score} pts
          </span>
        </div>

        <div
          className="bg-purple-300 text-2xl font-bold rounded-full mr-6 shadow text-white flex items-center justify-center"
          style={{ height: 64, width: 64, fontFamily: 'Kameron' }}
        >
          {myHighscore.rank}
          <sup>
            <small>th</small>
          </sup>
        </div>
      </div>

      <div className="p-2">
        <input
          className="highscore-search"
          placeholder="Search for a better..."
          value={query}
          onChange={handleChangeQuery}
        />
      </div>

      {filteredHighscores.map(highscore => (
        <div key={highscore.name} className="highscore-item">
          <span className="highscore-item__rank">{highscore.rank}</span>
          <span className="highscore-item__name">{highscore.name}</span>
          <span className="highscore-item__score">{highscore.score} pts</span>
        </div>
      ))}
    </>
  )
}
