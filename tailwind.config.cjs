const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.svelte', './src/**/*.css'],
    theme: {
        colors: {
            white: colors.white,
            //   gray: colors.warmGray,
            //   'svelte-prime': '#ff5030',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
