import { Fixture } from '@client/../shared/models/fixture'
import { MatchWinner } from '@client/../shared/models/match-winner'
import Toolbar from '@client/shared/components/Toolbar'
import { MenuItem, Select, TextField } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getRounds } from '../Dashboard/store/selectors'
import { concludeRound, updateFixture } from './store/actions'

interface Props {

}

export default function Admin({}: Props) {
  const rounds = useSelector(getRounds)

  return (
    <>
    <Toolbar />

    <div className="bg-white h-full min-h-full pt-6 px-6 pb-10">
      {Object.values(rounds).map((round: any, idx) => (
        <RoundForm key={round.name} round={round} concludeable={idx === 0} />
      ))}
    </div>
    </>
  )
}

const RoundForm = ({round, concludeable}) => {
  const dispatch = useDispatch()
  const {id} = useParams<{id: string}>()
  const canConclude = concludeable && round.fixtures.every(f => f.matchWinner !== MatchWinner.None)

  const handleConclude = () => {
    if (canConclude) {
      dispatch(concludeRound(Number(id), round.fixtures))
    }
  }

  return (
    <>
      <h3 className="pb-6 text-xl font-bold flex items-center justify-between">
        <span className="flex-1">{round.name}</span>
        <button title={!canConclude ? 'I am disabled' : 'I am not disabled'} disabled={!canConclude} onClick={handleConclude}>Conclude round</button>
      </h3>

      {round.fixtures.map((fixture: Fixture) => 
        <div key={fixture.awayTeam.name} className="pb-10">
          <FixtureForm fixture={fixture} tournamentId={Number(id)} />
        </div>
      )}
    </>
  )
}

const FixtureForm = ({fixture, tournamentId}: {fixture: Fixture, tournamentId: number }) =>  {
  const dispatch = useDispatch()
  const [model, setModel] = React.useState(fixture)

  const handleSave = () => {
    dispatch(updateFixture(tournamentId, model))
  }

  const inputSetter = f => evt => f(evt.target.value)
  const update = prop => value => setModel({ ...model, [prop]: value})

  return (
    <>
      <div className="flex pb-2">
        <TextField variant="outlined" label="Away team" className="flex-1" value={model.homeTeam.name} disabled />
        <div className="px-1"></div>
        <TextField variant="outlined" label="Home team" className="flex-1" value={model.awayTeam.name} disabled />
      </div>

      <div className="flex pb-2">
        <TextField
          variant="outlined"
          label="First match"
          className="flex-1"
          value={model.firstMatchStart}
          onChange={inputSetter(update('firstMatchStart'))}
        />
        <div className="px-1"></div>
        <TextField
          variant="outlined"
          label="Second match"
          className="flex-1"
          value={model.secondMatchStart}
          onChange={inputSetter(update('secondMatchStart'))}
        />
      </div>

      <div className="flex pb-2">
        <TextField variant="outlined" label="Score" value={model.score}  className="flex-1" onChange={inputSetter(update('score'))} />
        <div className="px-1"></div>
        <Select variant="outlined" value={model.matchWinner} className="flex-1" onChange={inputSetter(update('matchWinner'))}>
          <MenuItem value={MatchWinner.None}>Both suck</MenuItem>
          <MenuItem value={MatchWinner.Home}>Home</MenuItem>
          <MenuItem value={MatchWinner.Away}>Away</MenuItem>
        </Select>
      </div>

      <button onClick={handleSave}>Save</button>
    </>
  )
}