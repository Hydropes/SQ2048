export function direction(vect) {
  if ((vect.x == 0, vect.y == 0)) {
    vect.dir = "noway";
  } else if (Math.abs(vect.x) >= Math.abs(vect.y) && vect.x >= 0) {
    vect.dir = "right";
  } else if (Math.abs(vect.x) < Math.abs(vect.y) && vect.y >= 0) {
    vect.dir = "down";
  } else if (Math.abs(vect.x) >= Math.abs(vect.y) && vect.x < 0) {
    vect.dir = "left";
  } else if (Math.abs(vect.x) < Math.abs(vect.y) && vect.y < 0) {
    vect.dir = "up";
  }
}
