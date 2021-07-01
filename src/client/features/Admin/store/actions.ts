import { getFixtures } from '@client/features/Dashboard/store/actions'
import { Fixture } from '@shared/models/fixture'
import { ActionsUnion, createAction, ThunkAction } from 'store'

export enum ActionTypes {
  requestUpdateFixture = '[Admin] Request update fixture',
  receiveUpdateFixture = '[Admin] Receive update fixture',
}

export const actions = {
  requestUpdateFixture: () => createAction(ActionTypes.requestUpdateFixture),
  receiveUpdateFixture: (fixture: Fixture) =>
    createAction(ActionTypes.receiveUpdateFixture, fixture),
}

export const updateFixture = (tournamentId: number, fixture: Fixture): ThunkAction => async (
  dispatch,
  getState,
  endpoints
) => {
  console.log(endpoints.fixtures.update)

  dispatch(actions.requestUpdateFixture())
  dispatch(actions.receiveUpdateFixture(await endpoints.fixtures.update({
    ...fixture,
    homeTeam: fixture.homeTeam.name,
    awayTeam: fixture.awayTeam.name,
    tournamentId
  })))
  dispatch(getFixtures())
}

export type Actions = ActionsUnion<typeof actions>
