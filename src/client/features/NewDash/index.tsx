import React from 'react'

interface Props {}

export default function WhatEvs({  }: Props) {
  return (
    <div className="h-full bg-horse-gray">
      <div className="h-16 flex items-center justify-center px-4 text-white">
        <span className="text-green-500 font-semibold">HÄSTBETT</span>
      </div>

      <div className="relative flex mt-2 p-4 shadow bg-yellow-300">
        <div className="flex flex-col flex-1 text-sm leading-tight">
          <span className="font-bold text-xl text-purple-400 text-center">
            Arndtfinn
          </span>
          <span className="font-semibold text-xs text-gray-800">Striker</span>
          <div>
            <span className="font-semibold text-sm text-purple-300">
              Icardi B
            </span>
            <span className="font-medium text-xs text-gray-700">+3pts</span>
          </div>
        </div>

        <div
          className="absolute flex -mb-4 rounded-full bg-purple-300"
          style={{
            right: 16,
            bottom: 0,
            height: 48,
            width: 48,
            fontFamily: 'Rockwell'
          }}
        >
          <span className="m-auto font-bold text-lg text-white">7th</span>
        </div>
      </div>

      <div className="pt-12"></div>

      <div className="flex pb-8">
        <div className="flex w-1/2 hover:bg-green-800 p-4 ml-4 mr-2 rounded bg-gray-800 cursor-pointer">
          <div className="m-auto" style={{ width: 64, height: 64 }}>
            <img src="/assets/logotypes/roma.png" />
          </div>
        </div>

        <div className="flex w-1/2 hover:bg-green-800 p-4 ml-2 mr-4 rounded bg-gray-800 cursor-pointer">
          <div className="m-auto" style={{ width: 64, height: 64 }}>
            <img src="/assets/logotypes/real.png" />
          </div>
        </div>
      </div>

      <div className="flex pb-8">
        <div className="flex w-1/2 hover:bg-green-800 p-4 ml-4 mr-2 rounded bg-gray-800 cursor-pointer">
          <div className="m-auto" style={{ width: 64, height: 64 }}>
            <img src="/assets/logotypes/tottenham.png" />
          </div>
        </div>

        <div className="flex w-1/2 hover:bg-green-800 p-4 ml-2 mr-4 rounded bg-gray-800 cursor-pointer">
          <div className="m-auto" style={{ width: 64, height: 64 }}>
            <img src="/assets/logotypes/barcelona.png" />
          </div>
        </div>
      </div>

      <div className="flex pb-8">
        <div className="flex w-1/2 hover:bg-green-800 p-4 ml-4 mr-2 rounded bg-gray-800 cursor-pointer">
          <div className="m-auto" style={{ width: 64, height: 64 }}>
            <img src="/assets/logotypes/schalke.png" />
          </div>
        </div>

        <div className="flex w-1/2 hover:bg-green-800 p-4 ml-2 mr-4 rounded bg-gray-800 cursor-pointer">
          <div className="m-auto" style={{ width: 64, height: 64 }}>
            <img src="/assets/logotypes/psg.png" />
          </div>
        </div>
      </div>
    </div>
  )
}
