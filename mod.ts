import * as colors from "https://deno.land/std@0.78.0/fmt/colors.ts";
import { readKeypress } from "https://deno.land/x/keypress@0.0.4/mod.ts";
import { Board } from "./src/board.ts";
import {
  Tetriminos,
  TetriminosJ,
  TetriminosL,
  TetriminosT,
} from "./src/tetriminos.ts";

interface TetriminosMap<T extends Tetriminos> {
  [key: string]: () => T;
}

const tetriminosFactory: TetriminosMap<Tetriminos> = {
  j: () => new TetriminosJ(),
  l: () => new TetriminosL(),
  t: () => new TetriminosT(),
};

const tetriminosTypes = Object.keys(tetriminosFactory);
let typeIndex = 0;

let tetriminos: Tetriminos = tetriminosFactory[tetriminosTypes[typeIndex]]();
console.clear();
console.log(tetriminos.toString());
console.log(new Board().toString());

for await (const keypress of readKeypress()) {
  if (keypress.key === "w") {
    console.clear();
    tetriminos.rotate();
    console.log(colors.bgWhite(tetriminos.toString()));
  }

  if (keypress.key === "a") {
    typeIndex = --typeIndex < 0 ? tetriminosTypes.length - 1 : typeIndex;
    tetriminos = tetriminosFactory[tetriminosTypes[typeIndex]]();
    console.clear();
    console.log(colors.bgWhite(tetriminos.toString()));
  }

  if (keypress.key === "d") {
    typeIndex = ++typeIndex >= tetriminosTypes.length ? 0 : typeIndex;
    tetriminos = tetriminosFactory[tetriminosTypes[typeIndex]]();
    console.clear();
    console.log(colors.bgWhite(tetriminos.toString()));
  }

  if (keypress.ctrlKey && keypress.key === "c") {
    Deno.exit(0);
  }
}
