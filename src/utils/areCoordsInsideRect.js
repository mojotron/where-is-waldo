const areCoordsInsideRect = (coords, rectCoords) => {
  return (
    coords.x >= rectCoords.topLeft.x &&
    coords.y >= rectCoords.topLeft.y &&
    coords.x <= rectCoords.bottomRight.x &&
    coords.y <= rectCoords.bottomRight.y
  );
};

export default areCoordsInsideRect;
