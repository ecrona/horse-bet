import React from 'react'
import clsx from 'clsx'

const colors = ['yellow', 'purple', 'blue', 'indigo', 'gray']
const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export default function Colors() {
  return (
    <>
      {colors.map(color => (
        <div key={color} className="flex">
          {shades.map(shade => (
            <div
              key={shade}
              className={clsx(
                'w-1/9 h-16 flex justify-center items-center',
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
