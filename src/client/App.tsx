import React from 'react'
import 'test.css'
// import Admin from './features/Admin'
import Test from './features/NewDash'

export class App extends React.Component<any, any> {
  render() {
    return (
      <div className="h-screen bg-horse-gray">
        <Test />
      </div>
    )
  }
}
