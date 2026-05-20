export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(6px)",
  },

  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export const fadeScale = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },

  show: {
    opacity: 1,
    scale: 1,
  },
};

export const slideLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },

  show: {
    opacity: 1,
    x: 0,
  },
};

export const slideRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },

  show: {
    opacity: 1,
    x: 0,
  },
};

export const fadeBlur = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },

  show: {
    opacity: 1,
    filter: "blur(0px)",
  },
};

export const fadeRotate = {
  hidden: {
    opacity: 0,
    rotate: -5,
    scale: 0.95,
  },

  show: {
    opacity: 1,
    rotate: 0,
    scale: 1,
  },
};