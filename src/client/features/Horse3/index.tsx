import React, { useEffect } from 'react'
import Toolbar from '@client/shared/components/Toolbar'
import LockIcon from '@material-ui/icons/lock'
import { useSelector, useDispatch } from 'react-redux'

import './styles.scss'
import { Fixture } from '@client/models/fixture'
import { DashboardFixture } from '../Dashboard/models/dashboard-fixture'
import clsx from 'clsx'
import { getFixtures } from '../Dashboard/store/actions'
import { BetPlacement } from '@client/../shared/models/bet-placement'
import { Link } from 'react-router-dom'

interface BetButtonProps {
  disabled?: boolean
  children?: any
  selected?: boolean
  state: 'winner' | 'loser' | 'none'
}

function BetButton({ disabled, children, state, selected }: BetButtonProps) {
  const classes = clsx('bet-button', {
    'bet-button--selected': selected,
    'bet-button--loser': state === 'loser',
    'bet-button--winner': state === 'winner'
  })

  return (
    <button className={classes} disabled={disabled}>
      {children}
    </button>
  )
}

function Separator() {
  return <div className="bet-fixture__separator"></div>
}

interface FixProps {
  fixture: DashboardFixture
}

function Fixture({ fixture }: FixProps) {
  const [homeScore, awayScore] = fixture.score.split('-')
  const isDisabled = !fixture.placeable

  return (
    <>
      <div className="bet-fixture">
        <BetButton
          disabled={isDisabled}
          state="none"
          selected={fixture.betPlacement === BetPlacement.Home}
        >
          <img className="bet-button__logo" src={fixture.homeTeam.logo} />
          <span className="pl-3 flex-1 font-medium">
            {fixture.homeTeam.name}
          </span>
          <span className="font-medium text-right">{homeScore}</span>
        </BetButton>

        <Separator />

        <BetButton
          disabled={isDisabled}
          state="none"
          selected={fixture.betPlacement === BetPlacement.Away}
        >
          <img className="bet-button__logo" src={fixture.awayTeam.logo} />
          <span className="pl-3 flex-1 font-medium">
            {fixture.awayTeam.name}
          </span>
          <span className="font-medium text-right">{awayScore}</span>
        </BetButton>
      </div>

      <div className="pb-3"></div>

      <footer className="text-center">
        <Link
          to={`/fixture/${fixture.homeTeam.name}/${fixture.awayTeam.name}`}
          title="Click to view fixture details"
        >
          <button className="bet-fixture__details">View details</button>
        </Link>
      </footer>
    </>
  )
}

export default function Horse3() {
  const dispatch = useDispatch()
  const fixtures: DashboardFixture[] = useSelector(
    state => state.dashboard.fixtures
  )

  useEffect(() => {
    dispatch(getFixtures())
  }, [])

  return (
    // Background etc
    <div className="bg-gray-200">
      <Toolbar />

      <div className="bg-gray-300 pt-6 px-6 pb-10 text-yellow-300 relative">
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

      <div className="px-6 text-white">
        <h3 className="text-xl font-bold">Round of 16th</h3>
        <span style={{ color: 'rgba(255,255,255,0.75)' }}>8 fixtures</span>
      </div>

      <div className="pb-6"></div>

      {fixtures.map(fixture => (
        <div key={fixture.awayTeam.name} className="pb-10">
          <Fixture fixture={fixture} />
        </div>
      ))}
    </div>
  )
}
