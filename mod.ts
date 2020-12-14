#!/usr/bin/env -S deno run --unstable -A

import * as colors from "https://deno.land/std@0.78.0/fmt/colors.ts";
// import { play } from "https://deno.land/x/audio@0.1.0/mod.ts";
import { readKeypress } from "https://deno.land/x/keypress@0.0.4/mod.ts";
import { Board } from "./src/tetris/board.ts";

// new Promise(async () => {
//   while (true) {
//     await play("audio/ANightOfDizzySpells.mp3");
//     await new Promise((resolve) => setTimeout(resolve, 3000));
//   }
// });

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
const board = new Board();

for await (const keypress of readKeypress()) {
  if (keypress.ctrlKey && keypress.key === "c") {
    Deno.exit(0);
  }

  board.control(keypress.key);
}
