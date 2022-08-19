/* eslint-disable global-require, import/no-extraneous-dependencies */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  whitelistPatterns: [],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              fontWeight: null,
              fontStyle: null,
              quotes: 'none',
            },
            table: {
              width: null,
              marginTop: null,
              marginBottom: null,
            },
            figure: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
