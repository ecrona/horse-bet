import { Fixture } from '@client/../shared/models/fixture'
import { MatchWinner } from '@client/../shared/models/match-winner'
import Toolbar from '@client/shared/components/Toolbar'
import { MenuItem, Select, TextField } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { getRounds } from '../Dashboard/store/selectors'

interface Props {

}

export default function Admin({}: Props) {
  const rounds = useSelector(getRounds)

  return (
    <>
    <Toolbar />
    <div className="bg-white h-full min-h-full pt-6 px-6 pb-10">

      {Object.values(rounds).map((round: any) => (
        <div key={round.name}>
          <h3 className="pb-6 text-xl font-bold">{round.name}</h3>

          {round.fixtures.map((fixture: Fixture) => 
            <div key={fixture.awayTeam.name} className="pb-10">
              <div className="flex pb-2">
                <TextField variant="outlined" label="Away team" className="flex-1" value={fixture.homeTeam.name} disabled />
                <div className="px-1"></div>
                <TextField variant="outlined" label="Home team" className="flex-1" value={fixture.awayTeam.name} disabled />
              </div>

              <div className="flex pb-2">
                <TextField variant="outlined" label="First match" className="flex-1" value={fixture.firstMatchStart} />
                <div className="px-1"></div>
                <TextField variant="outlined" label="Second match" className="flex-1" value={fixture.secondMatchStart} />
              </div>
              
              <div className="flex pb-2">
                <TextField variant="outlined" label="Score" value={fixture.score}  className="flex-1"/>
                <div className="px-1"></div>
                <Select variant="outlined" value={fixture.matchWinner} className="flex-1">
                  <MenuItem value={MatchWinner.None}>Both suck</MenuItem>
                  <MenuItem value={MatchWinner.Home}>Home</MenuItem>
                  <MenuItem value={MatchWinner.Away}>Away</MenuItem>
                </Select>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  )
}