import React from 'react'
import clsx from 'clsx'

const colors = ['yellow', 'purple', 'blue', 'indigo', 'grey']
const shades = [100, 200, 300, 400, 500]

export default function Colors() {
  return (
    <>
      {colors.map(color => (
        <div key={color} className="flex">
          {shades.map(shade => (
            <div
              key={shade}
              className={clsx(
                'w-1/5 h-16 flex justify-center items-center',
                `bg-${color}-${shade}`
              )}
            >
              {color}-{shade}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
