import React, { useState } from 'react'
import Colors from '../Colors'

enum Pages {
  Tournaments,
  Create,
  Edit
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
        <h1 className="text-2xl font-semibold text-primary-500">Tournaments</h1>
      </header>

      <div>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter name"
          className="p-2 border border-gray-700 rounded-sm focus:border-primary-500 focus:outline-none"
        />
      </div>

      <div>
        <label>First round</label>
        <select>
          <option>Round of 32</option>
          <option>Round of 16</option>
          <option>Round of 8</option>
          <option>Round of 4</option>
          <option selected>Community shield</option>
        </select>
      </div>

      <div>
        <label>Bronze match</label>
        <input type="checkbox" />
      </div>

      <div>
        <label>Double matches</label>
        <input type="checkbox" />
      </div>

      <h2>Encounters</h2>

      <div>
        <div>
          <h3>Home team</h3>

          <div>
            <label>Name</label>
            <input type="text" />
          </div>

          <div>
            <label>Logo</label>
            <input type="file" />
          </div>
        </div>

        <div>
          <h3>Away team</h3>

          <div>
            <label>Name</label>
            <input type="text" />
          </div>

          <div>
            <label>Logo</label>
            <input type="file" />
          </div>
        </div>
      </div>
    </form>
  )
}
