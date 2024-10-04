/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A55A5",
        secondary: "#1E293B",
        secondary2: "#3B424A",
        heading: "#40444D",
        border_color: "#D0D5DD",
        label: "#344054",
        hover_effect: "#f0f2f5",
        success: "#10B981",
        successBg: "#D1FAE5",
        danger: "#F43F5E",
        dangerBG: "#FFE4E6",
        table_bg: "#F8FAFC",
        table_text: "#4D515A",
        table_row_hover: "#E2E8F0",
        disable: "#F1F2F4",
        disableText: "#B4BFCD",

        background_Purple: "#46479F",
        background_transparent: "#eff0f8",
        headings_Text: "#212B36",
        success_border: "#16B559",
        success_bg: "#D0F0DE",
        disable_border: "#FF3737",
        disable_bg: "#FFD7D7",

      },
      boxShadow: {
        buttonShadow: `2px 4px 10px 0px #B4BFCD33`,
        'boxShadow': `0px 10px 13px 0px #1126920D`,
        dropDown: `4px 4px 16px 0px #0000001A`

      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      backgroundImage: {
        'custom-pattern': "url('/images/pattern.png')",
        custom_gradient: 'linear-gradient(90.6deg, #1A55A5 46.33%, #003F94 99.99%)',

      },
    },
  },
  plugins: [],
}