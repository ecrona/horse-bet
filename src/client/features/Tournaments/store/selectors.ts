import { RootState } from '@client/store/reducers'

export const getListOfTournaments = (state: RootState) => state.tournaments.list
