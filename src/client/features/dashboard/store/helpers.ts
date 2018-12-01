import { ViewState } from '../models/view-state'

export const toggleViewState = (viewState: ViewState): ViewState => {
  switch (viewState) {
    case ViewState.Details:
      return ViewState.Bets
    case ViewState.Bets:
      return ViewState.Details
    default:
      return viewState
  }
}
