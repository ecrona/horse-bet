import { BetPlacement } from '@client/../shared/models/bet-placement'
import { MatchWinner } from '@client/../shared/models/match-winner'
import Toolbar from '@client/shared/components/Toolbar'
import { getFlag } from '@client/utils/flag'
import clsx from 'clsx'
import format from 'date-fns/format'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getFixture } from '../Details/selectors'
import './styles.css'

export default function Details() {
  const { homeTeam, awayTeam } = useParams()
  const fixture = useSelector(state => getFixture(state, homeTeam, awayTeam))

  const [query, setQuery] = useState('')

  const filteredBets = useMemo(
    () =>
      fixture
        ? fixture.bets.filter(bet =>
            bet.name.toLowerCase().includes(query.toLowerCase())
          )
        : [],
    [fixture, query]
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!fixture) {
    return null
  }

  function handleChangeQuery(event) {
    setQuery(event.target.value)
  }

  const homeBetsPercentage = getPercentageOfHomeBets(fixture.bets)
  const awayBetsPercentage = 100 - homeBetsPercentage
  const [homeScore, awayScore] = fixture.score.split('-')
  const hasWinner = fixture.matchWinner !== MatchWinner.None
  const homeWinner = fixture.matchWinner === MatchWinner.Home
  const awayWinner = fixture.matchWinner === MatchWinner.Away
  const hasBets = Boolean(fixture.bets && fixture.bets.length)

  return (
    <>
      <Toolbar />

      <div className="pb-10"></div>

      <div className="px-6 pb-6 text-white">
        <h3 className="text-xl font-bold">Fixture details</h3>
      </div>

      <div className="py-8 bg-gray-400 shadow relative flex justify-around items-center">
        <div
          className={clsx('details-team', {
            'details-team--loser': hasWinner && awayWinner
          })}
        >
          <img className="details-team__logo" src={getFlag(fixture.homeTeam.name)} />
          <span className="details-team__name">{fixture.homeTeam.name}</span>
          <span className="text-green-100" style={{ height: 24 }}>
            {fixture.matchWinner === BetPlacement.Home && 'Winner'}
          </span>
        </div>

        <span className="details-score">
          <span>{homeScore}</span>
          <span className="px-1">-</span>
          <span>{awayScore}</span>
        </span>

        <div
          className={clsx('details-team', {
            'details-team--loser': hasWinner && homeWinner
          })}
        >
          <img className="details-team__logo" src={getFlag(fixture.awayTeam.name)} />
          <span className="details-team__name">{fixture.awayTeam.name}</span>
          <span className="text-green-100" style={{ height: 24 }}>
            {fixture.matchWinner === BetPlacement.Away && 'Winner'}
          </span>
        </div>
      </div>

      <div
        className="py-6 bg-gray-300 flex flex justify-between text-sm text-center"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <div className="flex flex-col flex-1 text-center">
          <span className="text-xs">First match</span>
          <span className="font-medium">
            {format(fixture.firstMatchStart, 'Do MMMM HH:mm')}
          </span>
        </div>

        <div className="flex flex-col flex-1 text-center">
          <span className="text-xs">Second match</span>
          <span className="font-medium">
            {format(fixture.secondMatchStart, 'Do MMMM HH:mm')}
          </span>
        </div>
      </div>

      <div className="pb-4"></div>

      {!hasBets && (
        <div className="pt-10 px-16 text-center">
          <span className="text-yellow-300 font-medium">
            All bets will be displayed here after the first match has started
          </span>
        </div>
      )}

      {hasBets && (
        <>
          <div className="px-6">
            <span
              className="details-compare__title"
              style={{ fontFamily: 'Kameron' }}
            >
              Who picked what
            </span>
          </div>

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

          <div style={{ minHeight: 200 }}>
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

                <span className="details-better__name flex-1">{bet.name}</span>
                <span className="details-better__team">
                  {bet.placement === BetPlacement.Home
                    ? fixture.homeTeam.name
                    : fixture.awayTeam.name}
                </span>
              </div>
            ))}
          </div>
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
