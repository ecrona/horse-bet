import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Details as Component } from './Details.component'
import { RouteChildrenProps } from 'react-router'
import { getFixture } from './selectors'

const mapStateToProps = mapState(
  (
    state,
    ownProps: RouteChildrenProps<{ homeTeam: string; awayTeam: string }>
  ) => ({
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
