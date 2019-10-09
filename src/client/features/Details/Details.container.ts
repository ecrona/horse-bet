import { connect } from 'react-redux'
import { mapDispatch, mapState } from 'store'
import { Details as Component } from './Details.component'
// import { RouteChildrenProps } from 'react-router'
import { getFixture } from './selectors'

const mapStateToProps = mapState(
  (state, ownProps: { homeTeam: string; awayTeam: string; match: any }) => ({
    fixture: getFixture(
      state,
      ownProps.match.params.homeTeam,
      ownProps.match.params.awayTeam
    )
  })
)

const mapDispatchToProps = mapDispatch({})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Details = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
