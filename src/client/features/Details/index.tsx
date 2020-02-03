import React from 'react'
import './styles.css'
import Toolbar from '@client/shared/components/Toolbar'

interface Props {}

export default function Details({}: Props) {
  return (
    <>
      <Toolbar />

      <div className="pb-10"></div>

      <div className="px-6 pb-6 text-white">
        <h3 className="text-xl font-bold">Fixture details</h3>
      </div>

      <div className="p-6 bg-gray-200"></div>
      <div className="p-6 bg-gray-400"></div>

      <div className="pb-6"></div>

      <div className="px-6">
        <span
          className="text-yellow-300 font-bold"
          style={{ fontFamily: 'Rockwell' }}
        >
          Who picked what
        </span>
      </div>

      <div
        className="bg-purple-300 text-yellow-300 flex items-center"
        style={{ height: 36 }}
      >
        76%
      </div>
    </>
  )
}
