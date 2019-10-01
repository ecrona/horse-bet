import React from 'react'

interface Props {}

export default function Admin({  }: Props) {
  return (
    <form>
      <h1>Create tournament</h1>

      <section>
        <h2>Tournament</h2>

        <div>
          <label>Name</label>
          <input type="text" />
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
      </section>

      <section>
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
      </section>
    </form>
  )
}
