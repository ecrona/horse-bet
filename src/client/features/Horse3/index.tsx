import React from 'react'
import { Toolbar } from '@client/shared/components/Toolbar/component'

export default function Horse3() {
  return (
    // Background etc
    <div className="bg-gray-200 h-full">
      <div className="pb-12">Tullbar here</div>

      <div className="bg-gray-300 pt-6 px-6 pb-12 text-yellow-300 relative">
        <span className="block font-medium">Gneigh,</span>
        <span className="block font-extrabold text-xl">Piotr Sköldström</span>

        <div
          className="bg-purple-300 text-2xl font-bold rounded-full absolute right-0 bottom-0 mr-6 -mb-8 shadow text-white flex items-center justify-center"
          style={{ height: 64, width: 64, fontFamily: 'rockwell' }}
        >
          5
          <sup>
            <small>th</small>
          </sup>
        </div>
      </div>

      <div className="pb-8"></div>

      <div className="px-6 text-white">
        <h3 className="text-xl font-bold">Round of 16th</h3>
        <span style={{ color: 'rgba(255,255,255,0.75)' }}>8 fixtures</span>
      </div>

      <div className="pb-6"></div>

      <div className="pb-10">
        <div className="shadow relative">
          <div
            className="bg-gray-100 px-6 text-white flex items-center hover:bg-yellow-300 hover:text-gray-300"
            style={{ height: 64 }}
          >
            <img
              style={{ width: 48, height: 48 }}
              src="/assets/logotypes/real.png"
            />

            <span className="pl-3 font-medium">Real Madrid</span>
          </div>

          <div style={{ height: 1, backgroundColor: '#3d3d3d' }}></div>

          <div
            className="bg-gray-100 px-6 text-white flex items-center hover:bg-yellow-300 hover:text-gray-300"
            style={{ height: 64 }}
          >
            <img
              style={{ width: 48, height: 48 }}
              src="/assets/logotypes/roma.png"
            />

            <span className="pl-3 font-medium">Roma</span>
          </div>

          <div
            className="absolute bg-gray-300 rounded-full shadow flex items-center justify-center"
            style={{
              height: 36,
              width: 36,
              right: 64,
              top: 'calc(64px - (36px / 2))'
            }}
          >
            <span className="text-white">vs</span>
          </div>
        </div>

        <footer className="pt-3 text-center">
          <span
            style={{
              fontFamily: 'rockwell',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.75)'
            }}
          >
            View details
          </span>
        </footer>
      </div>

      <div className="pb-10">
        <div className="shadow relative">
          <div
            className="bg-gray-100 px-6 text-white flex items-center hover:bg-yellow-300 hover:text-gray-300"
            style={{ height: 64 }}
          >
            <img
              style={{ width: 48, height: 48 }}
              src="/assets/logotypes/psg.png"
            />

            <span className="pl-3 font-medium">PSG</span>
          </div>

          <div style={{ height: 1, backgroundColor: '#3d3d3d' }}></div>

          <div
            className="bg-gray-100 px-6 text-white flex items-center hover:bg-yellow-300 hover:text-gray-300"
            style={{ height: 64 }}
          >
            <img
              style={{ width: 48, height: 48 }}
              src="/assets/logotypes/tottenham.png"
            />

            <span className="pl-3 font-medium">Tottenham</span>
          </div>

          <div
            className="absolute bg-gray-300 rounded-full shadow flex items-center justify-center"
            style={{
              height: 36,
              width: 36,
              right: 64,
              top: 'calc(64px - (36px / 2))'
            }}
          >
            <span className="text-white">vs</span>
          </div>
        </div>

        <footer className="pt-3 text-center">
          <span
            style={{
              fontFamily: 'rockwell',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.75)'
            }}
          >
            View details
          </span>
        </footer>
      </div>
    </div>
  )
}

// {/* Name + rank */}
// <UserStats />Horse3

// <div>
//   <PhaseTitle />

//   <TournamentNavigation />
// </div>

// {/* Bets begin */}

// <div>
//   <BetFixture>
//     <div>
//       <BetFixtureButton>
//         <Logo url={} />

//         <Title>Roma</Title>
//       </BetFixtureButton>

//       <BetFixtureButton>
//         <Logo url={} />

//         <Title>PSG</Title>
//       </BetFixtureButton>

//       {/* Internal */}
//       <div>vs</div>
//     </div>

//     <footer>View details</footer>
//   </BetFixture>
// </div>
// // Existing types
// if !selected => default
// if !noWinnerYet => selectedColor
// if isWinner => green
// loser => red

// // We will add a new state to handle for locked/disabled, theoretically

// if (isSelected) return 'yellow'
// // We might not care about in progress
// //  Might care in combination with not  selected
// if (inProgress) return ''
// if (isWinner) return 'green'
// if (isLoser) return 'red'
