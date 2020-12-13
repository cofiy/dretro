#!/usr/bin/env -S deno run --unstable -A

import * as colors from "https://deno.land/std@0.78.0/fmt/colors.ts";
import { play } from "https://deno.land/x/audio@0.1.0/mod.ts";
import { readKeypress } from "https://deno.land/x/keypress@0.0.4/mod.ts";
import { Board } from "./src/tetris/board.ts";

new Promise(async() => {
  while(true) {
    await play("audio/ANightOfDizzySpells.mp3").then(() =>
      new Promise((resolve) => setTimeout(resolve, 3000))
    );
  }
})

const { red, yellow, green, cyan, blue, magenta } = colors;
const colorPatterns = [
  undefined,
  red,
  yellow,
  green,
  cyan,
  blue,
  magenta,
  undefined,
];
const header = `                                                      
  ██████╗ ██████╗ ███████╗████████╗██████╗  ██████╗   
  ██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗  
  ██║  ██║██████╔╝█████╗     ██║   ██████╔╝██║   ██║  
  ██║  ██║██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║  
  ██████╔╝██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝  
  ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   
                                                      `;

const coloredHeader = colors.bgRgb8(
  header.split("\n").map((line, i) => colorPatterns[i]?.(line) ?? line).join(
    "\n",
  ),
  234,
);

console.clear();
console.log(coloredHeader);

// const tetrimino: Tetrimino = tetriminosFactory.o();
// console.log(tetrimino.toString());
const board = new Board();
// board.newTetrimino(tetrimino);

for await (const keypress of readKeypress()) {
  if (keypress.key === "q") {
    board.rotate("anticlockwise");
  }
  if (keypress.key === "e") {
    board.rotate("clockwise");
  }

  if (keypress.key === "a") {
    board.move("left");
  }

  if (keypress.key === "d") {
    board.move("right");
  }

  if (keypress.key === "s") {
    board.move("down");
  }

  if (keypress.ctrlKey && keypress.key === "c") {
    Deno.exit(0);
  }
}
