module.exports = {
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      50: "50px",
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        darknavy: "#0B0E11",
        containcolor: "#151A21",
        fontc: "#DEE3EA",
        fontcs: "#82AABF",
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
