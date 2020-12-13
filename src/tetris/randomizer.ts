// use NES Tetris Randomizer
// source: https://simon.lc/the-history-of-tetris-randomizers

import {
  Tetrimino,
  TetriminoI,
  TetriminoJ,
  TetriminoL,
  TetriminoO,
  TetriminoS,
  TetriminoT,
  TetriminoZ,
} from "./tetriminos.ts";

interface TetriminoMap<T extends Tetrimino> {
  [key: string]: () => T;
}

export class Randomizer {
  private static instance: Randomizer = new Randomizer();
  private history?: string = undefined;
  private tetriminosFactory: TetriminoMap<Tetrimino> = {
    j: () => new TetriminoJ(),
    l: () => new TetriminoL(),
    t: () => new TetriminoT(),
    o: () => new TetriminoO(),
    i: () => new TetriminoI(),
    s: () => new TetriminoS(),
    z: () => new TetriminoZ(),
  };
  private pieces = Object.keys(this.tetriminosFactory);

  private constructor() {}

  static getInstance() {
    return this.instance;
  }

  next() {
    let piece = this.random();

    if (piece === this.history) {
      piece = this.random();
    }

    this.history = piece;
    return this.tetriminosFactory[piece]();
  }

  random() {
    return this.pieces[Math.floor(Math.random() * this.pieces.length)];
  }
}
