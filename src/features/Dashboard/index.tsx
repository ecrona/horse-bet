import { BetPlacement } from '@client/../shared/models/bet-placement'
import { MatchWinner } from '@client/../shared/models/match-winner'
import Toolbar from '@client/shared/components/Toolbar'
import { getNumberOrdinal } from '@client/utils'
import { getFlag } from '@client/utils/flag'
import LockIcon from '@material-ui/icons/Lock'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import clsx from 'clsx'
import format from 'date-fns/format'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getMyHighscore } from '../Highscore/store/selectors'
import { DashboardFixture } from './models/dashboard-fixture'
import { getFixtures, placeBet } from './store/actions'
import { getRounds } from './store/selectors'
import './styles.css'

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
  onClick,
}: BetButtonProps) {
  const classes = clsx('bet-button', {
    'bet-button--selected': selected,
    'bet-button--loser': state === 'loser',
    'bet-button--winner': state === 'winner',
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
  onPlaceBet: (
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) => void
}

function Fixture({ fixture, onPlaceBet }: FixProps) {
  const { id, slug, name } =
    useParams<{ id: string; slug: string; name: string }>()
  const [homeScore, awayScore] = fixture.score.split('-')
  const isPlaceable = fixture.placeable
  const homeSelected = fixture.betPlacement === BetPlacement.Home
  const awaySelected = fixture.betPlacement === BetPlacement.Away
  const homeDisabled = !isPlaceable || homeSelected
  const awayDisabled = !isPlaceable || awaySelected
  const homeState =
    homeSelected && !isPlaceable
      ? getBetButtonState(MatchWinner.Home, fixture.matchWinner)
      : 'none'
  const awayState =
    awaySelected && !isPlaceable
      ? getBetButtonState(MatchWinner.Away, fixture.matchWinner)
      : 'none'

  const handlePlaceBet = (placement: BetPlacement) => () => {
    onPlaceBet(fixture.awayTeam.name, fixture.homeTeam.name, placement)
  }

  const lockDate = format(fixture.firstMatchStart, 'Do MMMM HH:mm')

  return (
    <>
      {fixture.placeable && (
        <div className="pb-2">
          <div className="bet-fixture__lock-text">
            This fixture will lock at - {lockDate}
          </div>
        </div>
      )}

      <div className="bet-fixture">
        <BetButton
          disabled={homeDisabled}
          selected={homeSelected}
          state={homeState}
          title={
            homeDisabled ? 'Locked' : `Click to bet on ${fixture.homeTeam.name}`
          }
          onClick={handlePlaceBet(BetPlacement.Home)}
        >
          <img
            className="bet-button__logo"
            src={getFlag(fixture.homeTeam.name)}
          />
          <span className="pl-3 flex-1 font-medium">
            {fixture.homeTeam.name}
          </span>
          <span className="font-medium text-right">{homeScore}</span>
        </BetButton>

        <Separator />

        <BetButton
          disabled={awayDisabled}
          selected={awaySelected}
          state={awayState}
          title={
            awayDisabled ? 'Locked' : `Click to bet on ${fixture.awayTeam.name}`
          }
          onClick={handlePlaceBet(BetPlacement.Away)}
        >
          <img
            className="bet-button__logo"
            src={getFlag(fixture.awayTeam.name)}
          />
          <span className="pl-3 flex-1 font-medium">
            {fixture.awayTeam.name}
          </span>
          <span className="font-medium text-right">{awayScore}</span>
        </BetButton>

        <div className="bet-fixture__state">
          {fixture.placeable && <LockOpenIcon style={{ height: 18 }} />}
          {!fixture.placeable && <LockIcon style={{ height: 18 }} />}
        </div>
      </div>

      <div className="pb-3"></div>

      <footer className="text-center">
        <Link
          className="inline-block"
          to={`/${id}/${slug}/${fixture.homeTeam.name}/${fixture.awayTeam.name}`}
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
  // TODO: type?
  const myHighscore: any = useSelector(getMyHighscore)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    dispatch(getFixtures(Number(id)))
    window.scrollTo(0, 0)
  }, [])

  function handlePlaceBet(
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) {
    dispatch(placeBet(Number(id), awayTeam, homeTeam, placement))
  }

  return (
    <>
      <Toolbar />

      <div className="bg-gray-400 pt-6 px-6 pb-10 text-yellow-300 relative">
        <span className="block font-medium">Gneigh,</span>
        <span className="block font-bold text-2xl">
          {myHighscore?.name || 'Möre Standin'}
        </span>
        <span
          className="block font-bold leading-none"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          You have a massive{' '}
          <span className="text-xl font-extrabold text-white">
            {myHighscore?.score}
          </span>{' '}
          points
        </span>

        <div
          className="bg-purple-300 text-2xl font-bold pl-1 rounded-full absolute right-0 bottom-0 mr-6 -mb-8 shadow-md text-white flex items-center justify-center"
          style={{ height: 64, width: 64, fontFamily: 'Kameron' }}
        >
          {myHighscore?.rank || 0}
          <sup style={{ color: 'rgba(255,255,255,0.75)' }}>
            <small>{getNumberOrdinal(myHighscore?.rank)}</small>
          </sup>
        </div>
      </div>

      <div className="pb-10"></div>

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

          {round.fixtures.map((fixture) => (
            <div key={fixture.awayTeam.name} className="pb-10">
              <Fixture fixture={fixture} onPlaceBet={handlePlaceBet} />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

function getBetButtonState(team: MatchWinner, matchWinner: MatchWinner) {
  if (team === matchWinner) {
    return 'winner'
  }

  if (matchWinner !== MatchWinner.None && team !== matchWinner) {
    return 'loser'
  }

  return 'none'
}
