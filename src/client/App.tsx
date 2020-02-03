import React from 'react'
import 'global.css'
import Dashboard from './features/Dashboard'

export class App extends React.Component<any, any> {
  render() {
    return (
      <div className="h-screen">
        <Dashboard />
      </div>
    )
  }
}
