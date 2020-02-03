import React, { useEffect } from 'react'
import Toolbar from '@client/shared/components/Toolbar'
import LockIcon from '@material-ui/icons/lock'
import { useSelector, useDispatch } from 'react-redux'

import './styles.css'
import { Fixture } from '@client/models/fixture'
import { DashboardFixture } from '../Dashboard/models/dashboard-fixture'
import clsx from 'clsx'
import { getFixtures, placeBet } from '../Dashboard/store/actions'
import { BetPlacement } from '@client/../shared/models/bet-placement'
import { Link } from 'react-router-dom'
import { getRounds } from '../Dashboard/store/selectors'

interface BetButtonProps {
  disabled?: boolean
  children?: any
  selected?: boolean
  state: 'winner' | 'loser' | 'none'
  title?: string
  onClick: () => void
}

function BetButton({
  disabled,
  children,
  state,
  selected,
  title,
  onClick
}: BetButtonProps) {
  const classes = clsx('bet-button', {
    'bet-button--selected': selected,
    'bet-button--loser': state === 'loser',
    'bet-button--winner': state === 'winner'
  })

  return (
    <button
      className={classes}
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function Separator() {
  return <div className="bet-fixture__separator"></div>
}

interface FixProps {
  fixture: DashboardFixture
  placeBet: (
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) => void
}

function Fixture({ fixture, placeBet }: FixProps) {
  const [homeScore, awayScore] = fixture.score.split('-')
  const isDisabled = !fixture.placeable
  const homeDisabled = isDisabled || fixture.betPlacement === BetPlacement.Home
  const awayDisabled = isDisabled || fixture.betPlacement === BetPlacement.Away

  const handlePlaceBet = (placement: BetPlacement) => () => {
    placeBet(fixture.awayTeam.name, fixture.homeTeam.name, placement)
  }

  return (
    <>
      <div className="bet-fixture">
        <BetButton
          disabled={homeDisabled}
          state="none"
          selected={fixture.betPlacement === BetPlacement.Home}
          title={
            homeDisabled ? 'Locked' : `Click to bet on ${fixture.homeTeam.name}`
          }
          onClick={handlePlaceBet(BetPlacement.Home)}
        >
          <img className="bet-button__logo" src={fixture.homeTeam.logo} />
          <span className="pl-3 flex-1 font-medium">
            {fixture.homeTeam.name}
          </span>
          <span className="font-medium text-right">{homeScore}</span>
        </BetButton>

        <Separator />

        <BetButton
          disabled={awayDisabled}
          state="none"
          selected={fixture.betPlacement === BetPlacement.Away}
          title={
            awayDisabled ? 'Locked' : `Click to bet on ${fixture.awayTeam.name}`
          }
          onClick={handlePlaceBet(BetPlacement.Away)}
        >
          <img className="bet-button__logo" src={fixture.awayTeam.logo} />
          <span className="pl-3 flex-1 font-medium">
            {fixture.awayTeam.name}
          </span>
          <span className="font-medium text-right">{awayScore}</span>
        </BetButton>

        <div className="bet-fixture__state">
          <span>vs</span>
        </div>
      </div>

      <div className="pb-3"></div>

      <footer className="text-center">
        <Link
          className="inline-block"
          to={`/fixture/${fixture.homeTeam.name}/${fixture.awayTeam.name}`}
          title="Click to view fixture details"
        >
          <button className="bet-fixture__details">View details</button>
        </Link>
      </footer>
    </>
  )
}

export default function Dashboard() {
  const dispatch = useDispatch()
  const rounds = useSelector(getRounds)

  useEffect(() => {
    dispatch(getFixtures())
  }, [])

  function handlePlaceBet(
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) {
    dispatch(placeBet(awayTeam, homeTeam, placement))
  }

  return (
    <>
      <Toolbar />

      <div className="bg-gray-400 pt-6 px-6 pb-10 text-yellow-300 relative">
        <span className="block font-medium">Gneigh,</span>
        <span className="block font-bold text-2xl">Piotr Sköldström</span>

        <div
          className="bg-purple-300 text-2xl font-bold rounded-full absolute right-0 bottom-0 mr-6 -mb-8 shadow text-white flex items-center justify-center"
          style={{ height: 64, width: 64, fontFamily: 'rockwell' }}
        >
          5
          <sup>
            <small>th</small>
          </sup>
        </div>
      </div>

      <div className="pb-8"></div>

      {Object.values(rounds).map((round: any) => (
        <div key={round.name}>
          <div className="px-6 text-white">
            <h3 className="text-xl font-bold">{round.name}</h3>
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>
              {round.fixtures.length}{' '}
              {round.fixtures.length > 1 ? 'fixtures' : 'fixture'}
            </span>
          </div>

          <div className="pb-6"></div>

          {round.fixtures.map(fixture => (
            <div key={fixture.awayTeam.name} className="pb-10">
              <Fixture fixture={fixture} placeBet={handlePlaceBet} />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
