import * as colors from "https://deno.land/std@0.78.0/fmt/colors.ts";
import { readKeypress } from "https://deno.land/x/keypress@0.0.4/mod.ts";
import { Board } from "./src/board.ts";
import {
  Tetrimino,
  TetriminoJ,
  TetriminoL,
  TetriminoT,
} from "./src/tetriminos.ts";

interface TetriminoMap<T extends Tetrimino> {
  [key: string]: () => T;
}

const tetriminosFactory: TetriminoMap<Tetrimino> = {
  j: () => new TetriminoJ(),
  l: () => new TetriminoL(),
  t: () => new TetriminoT(),
};

const tetriminosTypes = Object.keys(tetriminosFactory);
let typeIndex = 0;

let tetrimino: Tetrimino = tetriminosFactory[tetriminosTypes[typeIndex]]();
console.clear();
// console.log(tetrimino.toString());
let board = new Board();
board.newTetrimino(tetrimino);
console.log(board.toString());

for await (const keypress of readKeypress()) {
  if (keypress.key === "w") {
    console.clear();
    board.rotate();
    console.log(board.toString());
  }

  if (keypress.key === "a") {
    console.clear();
    board.move("left");
    console.log(board.toString());
  }

  if (keypress.key === "d") {
    console.clear();
    board.move("right");
    console.log(board.toString());
  }

  if (keypress.key === "s") {
    console.clear();
    board.move("down");
    console.log(board.toString());
  }

  if (keypress.ctrlKey && keypress.key === "c") {
    Deno.exit(0);
  }
}
