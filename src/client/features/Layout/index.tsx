import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHighscores } from '../Highscore/store/actions'
import Login from '../Login'

interface Props {
  children?: any
}

export default function Layout({ children }: Props) {
  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.common.authenticated)

  useEffect(() => {
    // FIXME
    // dispatch(updateDate())
  }, [])

  useEffect(() => {
    if (authenticated) {
      // FIXME
      // dispatch(fetchHighscores())
    }
  }, [authenticated])

  if (authenticated) {
    return children
  }

  return <Login />
}
