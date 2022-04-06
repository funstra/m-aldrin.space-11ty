function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(var(${variable}))`;
    }
    return `hsl(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  content: ["./src/index.njk", "./src/**/*.njk"],
  theme: {
    /* @link https://utopia.fyi/type/calculator?c=320,16,1.2,1140,21,1.333,4,1,&s=0.75|0.5|0.25,1.5|2|3|4|6,2xs-m|l-3xl */
    fontSize: {
      "-1": "clamp(0.98rem, calc(0.77rem + 0.30vw), 0.83rem)",
      0: "clamp(1.00rem, calc(0.88rem + 0.61vw), 1.31rem)",
      1: "clamp(1.20rem, calc(0.99rem + 1.07vw), 1.75rem)",
      2: "clamp(1.44rem, calc(1.09rem + 1.74vw), 2.33rem)",
      3: "clamp(1.73rem, calc(1.19rem + 2.69vw), 3.11rem)",
      4: "clamp(2.07rem, calc(1.27rem + 4.04vw), 4.14rem)",
    },
    /* @link https://utopia.fyi/space/calculator?c=320,16,1.2,1140,21,1.333,4,1,&s=0.75|0.5|0.25,1.5|2|3|4|6,2xs-m|l-3xl */
    spacing: {
      "3xs": "clamp(0.25rem, calc(0.23rem + 0.12vw), 0.31rem)",
      "2xs": "clamp(0.50rem, calc(0.43rem + 0.37vw), 0.69rem)",
      xs: "clamp(0.75rem, calc(0.65rem + 0.49vw), 1.00rem)",
      s: "clamp(1.00rem, calc(0.88rem + 0.61vw), 1.31rem)",
      m: "clamp(1.50rem, calc(1.30rem + 0.98vw), 2.00rem)",
      l: "clamp(2.00rem, calc(1.76rem + 1.22vw), 2.63rem)",
      xl: "clamp(3.00rem, calc(2.63rem + 1.83vw), 3.94rem)",
      "2xl": "clamp(4.00rem, calc(3.51rem + 2.44vw), 5.25rem)",
      "3xl": "clamp(6.00rem, calc(5.27rem + 3.66vw), 7.88rem)",
      "2xs-m": "clamp(0.50rem, calc(-0.09rem + 2.93vw), 2.00rem)",
      "l-3xl": "clamp(2.00rem, calc(-0.29rem + 11.46vw), 7.88rem)",
    },
    colors: {
      primary: withOpacityValue("--col-primary"),
      secondary: withOpacityValue("--col-secondary"),
    },
    backgroundColor: ({ theme }) => theme("colors"),
  },
  plugins: [],
};
