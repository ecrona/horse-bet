import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

interface Props {
  hideGoBack?: boolean
  hideHighscore?: boolean
  subtitle?: string
}

export default function Toolbar({
  hideGoBack,
  hideHighscore,
  subtitle,
}: Props) {
  const history = useHistory()
  const { id, slug } = useParams<{ id: string; slug: string }>()

  function handleGoBack() {
    history.goBack()
  }

  return (
    <div className="h-16">
      <div className="fixed top-0 right-0 left-0 h-16 bg-gray-500 shadow-xl box-border z-10">
        <div className="flex flex-row items-center max-w-xl m-auto text-white px-3 h-full">
          <span className="text-white opacity-50 hover:opacity-75 flex-1 transition-colors">
            {!hideGoBack && (
              <IconButton
                aria-label="Highscore"
                color="inherit"
                onClick={handleGoBack}
              >
                <ArrowBack />
              </IconButton>
            )}
          </span>

          <div>
            <span className="block uppercase text-green-100 text-xl font-semibold leading-7">
              Hästbett
            </span>

            {subtitle && (
              <span className="block text-lg font-normal">{subtitle}</span>
            )}
          </div>

          <div className="flex-1 text-right">
            {!hideHighscore && (
              <Link to={`/${id}/${slug}/highscore`} title="View highscore">
                <span className="text-white opacity-50 hover:opacity-75 transition-colors">
                  <IconButton aria-label="Highscore" color="inherit">
                    <FormatListNumberedIcon />
                  </IconButton>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
