/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        navbarMenuTopAnimation: {
          "0%": {
            transform: "rotate(0deg)",
            marginBottom: "7px",
            width: "100%"
          },
          "25%": {
            transform: "rotate(-11.25deg)",
            marginBottom: "5.25px",
          },
          "50%": {
            transform: "rotate(-22.5deg)",
            marginBottom: "3.5px",
            width: "90%"
          },
          "75%": {
            transform: "rotate(-33.75deg)",
            marginBottom: "1.75px",
          },
          "100%": {
            transform: "rotate(-45deg)",
            marginBottom: "0px",
            width: "80%"
          }
        },
        navbarMenuBottomAnimation: {
          "0%": {
            transform: "rotate(0deg)"
          },
          "25%": {
            transform: "rotate(11.25deg) translateY(-0.625px)"
          },
          "50%": {
            transform: "rotate(22.5deg) translateY(-1.25px)"
          },
          "75%": {
            transform: "rotate(33.75deg) translateY(-1.50px)"
          },
          "100%": {
            transform: "rotate(45deg) translateY(-1.75px)"
          }
        },
        navbarMenuCenterAnimation: {
          "0%": {},
          "100%": {
            alignItems: "center"
          }
        }
      },
      animation: {
        navbarMenuTopAnimation: "navbarMenuTopAnimation .2s ease-in-out forwards alternate",
        navbarMenuBottomAnimation: "navbarMenuBottomAnimation .2s ease-in-out forwards alternate"
      },
      height: {
        "navbar-full-height": "80px" 
      },
    },
    colors: {
      "navbar-dark-gray-color": "#2E2E38",
      "light-gray-background-color": "#F1F1F4",
      "light-gray-element-color": "#FCFCFD"
    }
  },
  plugins: [],
}

