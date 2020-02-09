import { BetPlacement } from '@client/../shared/models/bet-placement'
import Toolbar from '@client/shared/components/Toolbar'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getFixture } from '../OldDetails/selectors'
import './styles.css'

export default function Details() {
  const { homeTeam, awayTeam } = useParams()
  const fixture = useSelector(state => getFixture(state, homeTeam, awayTeam))

  const [query, setQuery] = useState('')

  const filteredBets = useMemo(
    () => (fixture ? fixture.bets.filter(bet => bet.name.includes(query)) : []),
    [fixture, query]
  )

  if (!fixture) {
    return null
  }

  function handleChangeQuery(event) {
    setQuery(event.target.value)
  }

  const homeBetsPercentage = getPercentageOfHomeBets(fixture.bets)
  const awayBetsPercentage = 100 - homeBetsPercentage

  return (
    <>
      <Toolbar />

      <div className="pb-10"></div>

      <div className="px-6 pb-6 text-white">
        <h3 className="text-xl font-bold">Fixture details</h3>
      </div>

      <div className="py-8 bg-gray-200 flex justify-around items-center">
        <div className="flex flex-1 items-center flex-col">
          <img className="details__logo" src={fixture.homeTeam.logo} />
          <span className="details__name">{fixture.homeTeam.name}</span>
          <span className="text-green-100" style={{ height: 24 }}>
            {fixture.matchWinner === BetPlacement.Home && 'Winner'}
          </span>
        </div>

        <span className="details__score">{fixture.score || '-'}</span>

        <div className="flex flex-1 items-center flex-col">
          <img className="details__logo" src={fixture.awayTeam.logo} />
          <span className="details__name">{fixture.awayTeam.name}</span>
          <span className="text-green-100" style={{ height: 24 }}>
            {fixture.matchWinner === BetPlacement.Away && 'Winner'}
          </span>
        </div>
      </div>

      <div
        className="py-6 px-12 bg-gray-400 flex flex justify-between text-sm text-center"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <div>
          <div>First match</div>
          <div>{fixture.firstMatchStart}</div>
        </div>

        <div>
          <div>Second match</div>
          <div>{fixture.secondMatchStart}</div>
        </div>
      </div>

      <div className="pb-10"></div>

      <div className="px-6">
        <span
          className="details-compare__title"
          style={{ fontFamily: 'Rockwell' }}
        >
          Who picked what
        </span>
      </div>

      {fixture.bets.length && (
        <>
          <div className="flex items-center shadow" style={{ height: 36 }}>
            <div
              className="details-compare details-compare--home"
              style={{ width: `${homeBetsPercentage}%` }}
              title={fixture.homeTeam.name}
            >
              {homeBetsPercentage}%
            </div>

            <div
              className="details-compare details-compare--away"
              title={fixture.awayTeam.name}
            >
              {awayBetsPercentage}%
            </div>
          </div>

          <div className="p-2">
            <input
              className="highscore-search"
              placeholder="Search better..."
              value={query}
              onChange={handleChangeQuery}
            />
          </div>

          {filteredBets.map(bet => (
            <div key={bet.name} className="details-better">
              <img
                className="details-better__logo"
                src={
                  bet.placement === BetPlacement.Home
                    ? fixture.homeTeam.logo
                    : fixture.awayTeam.logo
                }
              />

              <span className="details-better__name">{bet.name}</span>
            </div>
          ))}
        </>
      )}
    </>
  )
}

function getPercentageOfHomeBets(bets) {
  const amountOfHomeBets = bets.filter(
    bet => bet.placement === BetPlacement.Home
  ).length
  const totalBets = bets.length

  return Math.round((amountOfHomeBets / totalBets) * 100)
}
