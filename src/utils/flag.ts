import AT from '@client/assets/flags/AT.svg'
import BE from '@client/assets/flags/BE.svg'
import CH from '@client/assets/flags/CH.svg'
import CZ from '@client/assets/flags/CZ.svg'
import DE from '@client/assets/flags/DE.svg'
import DK from '@client/assets/flags/DK.svg'
import EN from '@client/assets/flags/EN.svg'
import ES from '@client/assets/flags/ES.svg'
import FR from '@client/assets/flags/FR.svg'
import HR from '@client/assets/flags/HR.svg'
import IT from '@client/assets/flags/IT.svg'
import NL from '@client/assets/flags/NL.svg'
import PT from '@client/assets/flags/PT.svg'
import SE from '@client/assets/flags/SE.svg'
import UA from '@client/assets/flags/UA.svg'
import WS from '@client/assets/flags/WS.svg'

export const getFlag = (countryName: string) => (
  {
    'Austria': AT,
    'Belgium': BE,
    'Switzerland': CH,
    'Czech Republic': CZ,
    'Germany': DE,
    'Denmark': DK,
    'England': EN,
    'Spain': ES,
    'France': FR,
    'Croatia': HR,
    'Italy': IT,
    'Netherlands': NL,
    'Portugal': PT,
    'Sweden': SE,
    'Ukraine': UA,
    'Wales': WS,
  }
)[countryName] || '/404'