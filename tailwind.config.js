module.exports = {
  content: ['./src/index.html', './src/**/*.tsx'],
  theme: {
    fontFamily: {
      display: ['Roboto'],
      body: ['Roboto'],
    },
    extend: {
      colors: {
        yellow: {
          100: '#FFF7CC',
          200: '#FFF0A5',
          300: '#FDE87E',
          400: '#D9C24F',
          500: '#B9A12B',
        },

        purple: {
          100: '#D7BAE5',
          200: '#B285C9',
          300: '#8E58A9',
          400: '#733A91',
          500: '#5D217B',
        },

        blue: {
          100: '#BDC8E6',
          200: '#8A9CCA',
          300: '#5E73AA',
          400: '#3F5792',
          500: '#273F7C',
        },

        indigo: {
          100: '#C8BEE7',
          200: '#9C8CCC',
          300: '#7460AE',
          400: '#564195',
          500: '#3E287F',
        },

        red: {
          100: '#D44848',
        },

        green: {
          100: '#4CAF50',
        },

        gray: {
          100: '#525252',
          200: '#484848',
          300: '#333333',
          400: '#2C2C2C',
          500: '#2f2f2feb',
        },
      },
    },
  },
}
