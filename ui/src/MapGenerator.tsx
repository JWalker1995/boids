import SimplexNoise from 'simplex-noise';

import Context from './Context';
import { Hex } from './Grid';

class MapGenerator {
  private noises: SimplexNoise[] = [];

  constructor(context: Context) {}

  isWall(hex: Hex) {
    const freqBase = 0.04;
    const numOctaves = 16;
    const freqMul = 1.2;
    const scaleMul = 1 / 1.25;
    const threshold = -0.2;

    return (
      this.octaveNoise2d(
        hex.x * freqBase,
        hex.y * freqBase,
        numOctaves,
        freqMul,
        scaleMul,
      ) > threshold
    );
  }

  octaveNoise2d(
    x: number,
    y: number,
    numOctaves: number,
    freqMul: number,
    scaleMul: number,
  ) {
    while (this.noises.length < numOctaves) {
      this.noises.push(new SimplexNoise());
    }

    let sum = 0.0;
    let scale = 1.0;
    for (let i = 0; i < numOctaves; i++) {
      sum += this.noises[i].noise2D(x, y) * scale;
      x *= freqMul;
      y *= freqMul;
      scale *= scaleMul;
    }

    return sum;
  }
}

export default MapGenerator;
