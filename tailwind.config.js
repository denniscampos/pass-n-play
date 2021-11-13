module.exports = {
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      50: "50px",
    },
    extend: {
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
      },
      height: {
        100: "576px",
        102: "600px",
      },
      width: {
        100: "704px",
      },
      screens: {
        iphones: "375px",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        darknavy: "#0B0E11",
        containcolor: "#151A21",
        fontc: "#DEE3EA",
        fontcs: "#82AABF",
        richblack: "#0B0E11",
        richblack_light: "#151A21",
        gunmetal: "#242C37",
        charcoal: "#323D4D",
        blue_yonger: "#5D7290",
        blue_crayola: "#B2BDCD",
        gainsboro: "#DEE3EA",
        tart_orange: "#FD4D4D",
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hdwallpapers.in%2Fdownload%2Ffree_fire_squad_4k_hd_games-2560x1440.jpg&f=1&nofb=1')",
      },
    },

    // container is the name of the class in the index file
    container: {
      center: true,
      padding: "2rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
