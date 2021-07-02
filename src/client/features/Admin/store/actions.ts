import { getFixtures } from '@client/features/Dashboard/store/actions'
import { Fixture, FixtureModel } from '@shared/models/fixture'
import { ActionsUnion, createAction, ThunkAction } from 'store'

export enum ActionTypes {
  requestUpdateFixture = '[Admin] Request update fixture',
  receiveUpdateFixture = '[Admin] Receive update fixture',
  requestConcludeRound = '[Admin] Request conclude round',
  receiveConcludeRound = '[Admin] Receive conclude round',
}

export const actions = {
  requestUpdateFixture: () => createAction(ActionTypes.requestUpdateFixture),
  receiveUpdateFixture: (fixture: Fixture) =>
    createAction(ActionTypes.receiveUpdateFixture, fixture),
  requestConcludeRound: () => createAction(ActionTypes.requestConcludeRound),
  receiveConcludeRound: (payload) => createAction(ActionTypes.receiveConcludeRound, payload),
}

export const updateFixture = (tournamentId: number, fixture: FixtureModel): ThunkAction => async (
  dispatch,
  getState,
  endpoints
) => {
  dispatch(actions.requestUpdateFixture())
  dispatch(actions.receiveUpdateFixture(await endpoints.fixtures.update({
    ...fixture,
    homeTeam: fixture.homeTeam.name,
    awayTeam: fixture.awayTeam.name,
    tournamentId
  })))
  dispatch(getFixtures())
}

export const concludeRound = (tournamentId: number, fixtures: FixtureModel[]): ThunkAction => async (
  dispatch,
  getState,
  endpoints
) => {
  const payload = {
    id: tournamentId,
    fixtures: fixtures.map(f => (
      {
        ...f,
        homeTeam: f.homeTeam.name,
        awayTeam: f.awayTeam.name,
      }
    ))
  }

  dispatch(actions.requestConcludeRound())
  dispatch(actions.receiveConcludeRound(await endpoints.tournaments.concludeRound(payload)))
  dispatch(getFixtures())
}

export type Actions = ActionsUnion<typeof actions>
