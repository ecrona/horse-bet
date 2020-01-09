import React, { useState } from 'react'
import Colors from '../Colors'

enum Pages {
  Tournaments = 'Tournaments',
  Create = 'Create',
  Edit = 'Edit'
}

interface Props {}

export default function Admin({  }: Props) {
  const [page, setPage] = useState(Pages.Tournaments)

  function handleSetPage(page: Pages) {
    console.log('settingPage', page)
    setPage(page)
  }

  if (page === Pages.Create) {
    return <TournamentForm setPage={handleSetPage} />
  }

  if (page === Pages.Edit) {
    return <TournamentForm setPage={handleSetPage} />
  }

  return (
    <>
      <Tournaments setPage={handleSetPage} />
      <TournamentForm setPage={handleSetPage} />
      <Colors />
    </>
  )
}

export function Tournaments({ setPage }) {
  return (
    <div>
      <header className="p-4">
        <h1 className="text-2xl font-semibold text-purple-400">Tournaments</h1>
      </header>

      <div className="px-4">
        <div
          onClick={() => setPage(Pages.Edit)}
          className="bg-yellow-300 hover:bg-yellow-400 cursor-pointer h-32 my-2 flex justify-center items-center rounded-lg"
        >
          <span className="text-lg font-medium text-gray-900">
            Champions league
          </span>
        </div>
      </div>
    </div>
  )
}

export function TournamentForm({ setPage }) {
  return (
    <form>
      <header className="p-4">
        <h1 className="text-2xl font-semibold text-purple-400">
          Create tournament
        </h1>
      </header>

      <section className="px-4 pb-8">
        <h2 className="text-xl font-medium">Details</h2>

        <div className="py-3">
          <label className="block pb-1">Title</label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full max-w-sm p-2 border border-gray-700 hover:border-yellow-500 rounded-sm focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div className="py-3">
          <label className="block pb-1">Starting round</label>
          <select className="w-full max-w-sm p-2 border border-gray-700 hover:border-yellow-500 rounded-sm focus:border-primary-500 focus:outline-none">
            <option>Round of 32</option>
            <option>Round of 16</option>
            <option>Round of 8</option>
            <option>Round of 4</option>
            <option selected>Community shield</option>
          </select>
        </div>

        <div className="py-3">
          <div className="flex items-center py-1">
            <input id="bronzeMatch" type="checkbox" />
            <label htmlFor="bronzeMatch" className="pl-2">
              Bronze match
            </label>
          </div>

          <div className="flex items-center py-1">
            <input id="doubleFixtures" type="checkbox" />
            <label htmlFor="doubleFixtures" className="pl-2">
              Double fixtures
            </label>
          </div>
        </div>
      </section>

      <section className="px-4">
        <h2 className="text-xl font-medium">First round encounters</h2>

        <div className="flex pb-2">
          <div className="w-1/2 pr-2">
            <h3 className="font-medium text-gray-600">Home</h3>
          </div>

          <div className="w-1/2 pl-2">
            <h3 className="font-medium text-gray-600">Away</h3>
          </div>
        </div>

        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <div className="flex pb-16">
            <div className="w-1/2 pr-3">
              <div className="pb-1">
                <label className="block">Name</label>
                <input
                  type="text"
                  className="w-full max-w-sm p-2 border border-gray-700 hover:border-yellow-500 rounded-sm focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block">Logo</label>
                <input
                  type="text"
                  className="w-full max-w-sm p-2 border border-gray-700 hover:border-yellow-500 rounded-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="w-1/2 pl-3">
              <div className="pb-1">
                <label className="block">Name</label>
                <input
                  type="text"
                  className="w-full max-w-sm p-2 border border-gray-700 hover:border-yellow-500 rounded-sm focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block">Logo</label>
                <input
                  type="text"
                  className="w-full max-w-sm p-2 border border-gray-700 hover:border-yellow-500 rounded-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="fixed bottom-0 flex justify-end items-center px-4 w-full h-16 bg-yellow-300">
        <button className="px-3 py-2 w-24 rounded bg-purple-300 hover:bg-purple-400 text-white font-medium uppercase">
          Save
        </button>
      </div>
    </form>
  )
}

export function RoundForm({}) {
  return null
}
