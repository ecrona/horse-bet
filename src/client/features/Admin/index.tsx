import { FixtureModel } from '@client/../shared/models/fixture'
import { MatchWinner } from '@client/../shared/models/match-winner'
import { Round } from '@client/../shared/models/round'
import Toolbar from '@client/shared/components/Toolbar'
import { head, inputSetter, tryCatch } from '@client/utils'
import { Button, MenuItem, Select, TextField } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getRounds } from '../Dashboard/store/selectors'
import { concludeRound, updateFixture } from './store/actions'

interface Model {
  homeTeam: string
  awayTeam: string
  score: string
  firstMatchStart: string
  secondMatchStart: string
  matchWinner: MatchWinner
}

const emptyFixture = () => ({
  homeTeam: '',
  awayTeam: '',
  firstMatchStart: '',
  secondMatchStart: '',
  score: '',
  matchWinner: MatchWinner.None,
})

const fixtureToModel = (fixture: FixtureModel): Model => ({
  homeTeam: fixture.homeTeam.name,
  awayTeam: fixture.awayTeam.name,
  score: fixture.score,
  firstMatchStart: fixture.firstMatchStart,
  secondMatchStart: fixture.secondMatchStart,
  matchWinner: fixture.matchWinner
})

const modelToFixture = (model: Model) => ({
  homeTeam: { name: model.homeTeam, logo: '' },
  awayTeam: { name: model.awayTeam, logo: '' },
  score: model.score,
  firstMatchStart: model.firstMatchStart,
  secondMatchStart: model.secondMatchStart,
  matchWinner: model.matchWinner
})

const nextRoundFixtures = (round: any) => Array(round.fixtures.length / 2).fill({}).map(emptyFixture)

export default function Admin() {
  const rounds = useSelector(getRounds)

  const lastRound = head(Object.values(rounds))

  const canConclude = tryCatch(
    (xs: Round[]) => {
      const fixtures = head(xs).fixtures
      return fixtures.length >= 1 && fixtures.every(f => f.matchWinner === MatchWinner.None)
    },
    () => false,
    Object.values(rounds)
  )

  return (
    <>
      <Toolbar hideHighscore />

      <div className="bg-white h-full min-h-full pt-6 px-6 pb-10">
        {lastRound && lastRound.fixtures && (
          <ConcludeForm round={lastRound} />
        )}

        <div className="flex justify-end">
          <Button disabled={!canConclude} title={!canConclude ? 'I am disabled' : 'I am not disabled'}>Conclude last round</Button>
        </div>

        {Object.values(rounds).map((round: any, idx) => (
          <RoundForm key={round.name} round={round} />
        ))}
      </div>
    </>
  )
}

const ConcludeForm = ({ round }) => {
  const dispatch = useDispatch()
  const {id} = useParams<{id: string}>()
  const [model, setModel] = React.useState(nextRoundFixtures(round))
  
  const winnerTeams = round.fixtures.map(f =>
    f.matchWinner === MatchWinner.Home
      ? f.homeTeam.name
      : f.awayTeam.name
  )
  const canConclude = model.every(f => f.homeTeam && f.awayTeam && f.firstMatchStart)

  React.useEffect(() => {
    if (round.fixtures) {
      setModel(nextRoundFixtures(round))
    }
  }, [round.fixtures])

  const conclude = () => {
    if (canConclude) {
      dispatch(concludeRound(Number(id), model.map(modelToFixture)))
    }
  }

  const handleChange = (idx: number) => (value) => setModel(model.map((f, cIdx) =>
    cIdx === idx ? value : f
  ))

  return (
    <>
      <h3 className="pb-6 text-xl font-bold">
        Conclude {round.name}
      </h3>

      {model.map((fixture, idx) =>
        <div key={idx} className="pb-8">
          <ConcludeFixtureForm teams={winnerTeams} model={fixture} onChange={handleChange(idx)} />
        </div>
      )}

      <Button disabled={!canConclude} onClick={conclude}>Conclude</Button>
    </>
  )
}

const ConcludeFixtureForm = ({model, teams, onChange}: {model: Model, teams: string[], onChange: (model: Model) => void }) =>  {
  const update = (prop: string) => (value: string) => onChange({ ...model, [prop]: value})

  return (
    <>
      <div className="flex pb-2">
        <Select variant="outlined" label="Away team" className="flex-1" value={model.homeTeam} onChange={inputSetter(update('homeTeam'))}>
          {teams.filter(t => t !== model.awayTeam).map((t) => <MenuItem value={t}>{t}</MenuItem>)}
        </Select>
        <div className="px-1"></div>
        <Select variant="outlined" label="Home team" className="flex-1" value={model.awayTeam} onChange={inputSetter(update('awayTeam'))}>
          {teams.filter(t => t !== model.homeTeam).map((t) => <MenuItem value={t}>{t}</MenuItem>)}
        </Select>
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
    </>
  )
}

const RoundForm = ({round}) => {
  const {id} = useParams<{id: string}>()
  const fixtures = React.useMemo<Model[]>(() => round.fixtures.map(fixtureToModel), [round.fixtures])

  return (
    <>
      <h3 className="pb-6 text-xl font-bold">
        {round.name}
      </h3>

      {fixtures.map((f) =>
        <div key={f.homeTeam} className="pb-10">
          <FixtureFormStandalone model={f} tournamentId={Number(id)} />
        </div>
      )}
    </>
  )
}

const FixtureFormStandalone = ({model: _model, tournamentId}: {model: Model, tournamentId: number}) => {
  const [model, setModel] = React.useState(_model)
  const dispatch = useDispatch()

  const handleSave = () => {
    dispatch(updateFixture(tournamentId, modelToFixture(model)))
  }

  return (
    <>
      <FixtureForm model={_model} onChange={setModel} />
      <Button onClick={handleSave}>Save</Button>
    </>
  )
}

const FixtureForm = ({model, onChange}: {model: Model, onChange: (model: Model) => void }) =>  {
  const update = (prop: string) => (value: string) => onChange({ ...model, [prop]: value})

  return (
    <>
      <div className="flex pb-2">
        <TextField variant="outlined" label="Away team" className="flex-1" value={model.homeTeam} disabled />
        <div className="px-1"></div>
        <TextField variant="outlined" label="Home team" className="flex-1" value={model.awayTeam} disabled />
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
    </>
  )
}