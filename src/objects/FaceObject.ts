// possible values for facing
let FaceObject = {
  NORTH: {
    name: `NORTH`,
    xStep: 0,
    yStep: 1
  },
  SOUTH: {
    name: `SOUTH`,
    xStep: 0,
    yStep: -1
  },
  WEST: {
    name: `WEST`,
    xStep: 1,
    yStep: 0
  },
  EAST: {
    name: `EAST`,
    xStep: -1,
    yStep: 0
  }
};

// we could have additional faces later like southeast

export { FaceObject };
