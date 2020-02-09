import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDate } from 'store/common/actions'
import Login from '../Login'
import { fetchHighscores } from '../OldHighscore/store/actions'

interface Props {
  children?: any
}

export default function Layout({ children }: Props) {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.common.authenticated)

  useEffect(() => {
    dispatch(updateDate())
  }, [])

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchHighscores())
    }
  }, [authenticated])

  if (authenticated) {
    return children
  }

  return <Login />
}
