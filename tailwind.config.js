/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'optician-sans': ['Optician Sans', 'sans-serif']
    },
    screens: {
      "max-xs": {"max": "380px"},

      "xs": '380px',

      "2xs": "420px",

      'sm': '640px',

      "max-sm": {"max": "640px"},

      'md': '768px',

      'max-md': {'max': '768px'},

      "max-lg": {"max": "1024px"},

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',

      '3xl': '2000px'
    },
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
        navbarMenuTopAnimationReverse: {
          "0%": {
            transform: "rotate(-45deg)",
            marginBottom: "0px",
            width: "80%"
          },
          "25%": {
            transform: "rotate(-33.75deg)",
            marginBottom: "1.75px",
          },
          "50%": {
            transform: "rotate(-22.5deg)",
            marginBottom: "3.5px",
            width: "90%"
          },
          "75%": {
            transform: "rotate(-11.25deg)",
            marginBottom: "5.25px",
          },
          "100%": {
            transform: "rotate(0deg)",
            marginBottom: "7px",
            width: "100%"
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
            transform: "rotate(45deg) translateY(-1.97px)"
          }
        },
        navbarMenuBottomAnimationReverse: {
          "0%": {
            transform: "rotate(45deg) translateY(-1.97px)"
          },
          "25%": {
            transform: "rotate(33.75deg) translateY(-1.50px)"
          },
          "50%": {
            transform: "rotate(22.5deg) translateY(-1.25px)"
          },
          "75%": {
            transform: "rotate(11.25deg) translateY(-0.625px)"
          },
          "100%": {
            transform: "rotate(0deg)"
          }
        },
        navbarMenuCenterAnimation: {
          "0%": {},
          "100%": {
            alignItems: "center"
          }
        },
        navbarMenuCenterAnimationReverse: {
          "0%": {
            alignItems: "center"
          },
          "100%": {}
        },
        navbarMobileDropdownAnimation: {
          "0%": {
            transform: "translateX(-100%)"
          },
          "25%": {
            transform: "translateX(-75%)"
          },
          "50%": {
            transform: "translateX(-50%)"
          },
          "75%": {
            transform: "translateX(-25%)"
          },
          "100%": {
            transform: "translateX(0%)"
          }
        },
        navbarMobileColorAnimation: {
          "0%": {
            background: "#2E2E38"
          },
          "100%": {
            background: "#3F3FE4" 
          }
        },
        navbarMobileDropdownAnimationReverse: {
          "0%": {
            transform: "translateX(0%)"
          },
          "25%": {
            transform: "translateX(-25%)"
          },
          "50%": {
            transform: "translateX(-50%)"
          },
          "75%": {
            transform: "translateX(-75%)"
          },
          "100%": {
            transform: "translateX(-100%)"
          }
        },
        navbarMobileColorAnimationReverse: {
          "0%": {
            background: "#3F3FE4"
          },
          "100%": {
            background: "#2E2E38" 
          }
        },
        sidebarOpenAnimation: {
          "0%": {
            transform: "translateX(100%)"
          },
          "25%": {
            transform: "translateX(75%)"
          },
          "50%": {
            transform: "translateX(50%)"
          },
          "75%": {
            transform: "translateX(25%)"
          },
          "100%": {
            transform: "translateX(0%)"
          }
        }
      },
      animation: {
        navbarMenuTopAnimation: "navbarMenuTopAnimation .2s ease-in-out forwards",
        navbarMenuTopAnimationReverse: "navbarMenuTopAnimationReverse .2s ease-in-out forwards",
        navbarMenuBottomAnimation: "navbarMenuBottomAnimation .2s ease-in-out forwards",
        navbarMenuBottomAnimationReverse: "navbarMenuBottomAnimationReverse .2s ease-in-out forwards",
        navbarMobileDropdownAnimation: "navbarMobileDropdownAnimation .2s ease-in-out forwards",
        navbarMobileColorAnimation: "navbarMobileColorAnimation .2s ease-in-out forwards",
        navbarMobileDropdownAnimationReverse: "navbarMobileDropdownAnimationReverse .2s ease-in-out forwards",
        navbarMobileColorAnimationReverse: "navbarMobileColorAnimationReverse .2s ease-in-out forwards",
        sidebarOpenAnimation: "sidebarOpenAnimation .3s ease-in-out forwards"
      },
      boxShadow: {
        "dropdown-shadow": "0 10px 40px -6px rgb(0 0 0 / 0.06)"
      }
    },
    colors: {
      "navbar-dark-gray-color": "#2E2E38",
      "light-gray-background-color": "#F1F1F4",
      "light-gray-element-color": "#FCFCFD",
      "basic-white": "#FFFFFF",
      "muted-grey": "#9D9DAF",
      "muted-purple": "#9898F0",
      "mobile-light-element-color": "#f9f9fb",

      "text-purple": "#3F3FE4",
      "text-default-gray": "#2E2E38",
      "text-muted-gray": "#73738C",
      "input-border-gray": "#C7C7D1",
      "property-name-grey": "#73738C",
      "checkmark-green": "#1ED286",
      "text-dark-gray": "#505062",
      "text-light-grey": "#9D9DAF",
      "text-red": "#D2341E",

      "button-purple": "#1E1ED2"
    },
  },
  plugins: [],
}

