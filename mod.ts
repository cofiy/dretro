import { readKeypress } from "https://deno.land/x/keypress@0.0.4/mod.ts";
import {
  Tetriminos,
  TetriminosJ,
  TetriminosL,
  TetriminosT,
} from "./src/tetriminos.ts";

// const row = "|    ▩  |";
// console.log(
//   new Array(10).fill(0).map(() =>
//     row.split("").map((e, i) => i % 2 ? colors.rgb8(e, 10) : e).join("")
//   ).join("\n"),
// );
// console.log("▢-------▩");

function tetriminosFactory(type: string) {
  switch (type) {
    case "j":
      return new TetriminosJ();
    case "l":
      return new TetriminosL();
    case "t":
      return new TetriminosT();
    default:
      throw new Error();
  }
}

const tetriminosTypes = ["j", "l", "t"];
let typeIndex = 0;

let tetriminos: Tetriminos = tetriminosFactory(tetriminosTypes[typeIndex]);
console.clear();
tetriminos.display();

for await (const keypress of readKeypress()) {
  if (keypress.key === "up") {
    console.clear();
    tetriminos.rotate();
    tetriminos.display();
  }

  if (keypress.key === "right") {
    typeIndex = ++typeIndex >= tetriminosTypes.length ? 0 : typeIndex;
    tetriminos = tetriminosFactory(tetriminosTypes[typeIndex]);
    console.clear();
    tetriminos.display();
  }

  if (keypress.ctrlKey && keypress.key === "c") {
    Deno.exit(0);
  }
}
// new TetriminosL().display();
// new TetriminosT().display();

// console.log(
//   `| ${bgBrightBlack(" ")}     |
// | ${bgBrightBlack(" ")}     |
// | ${bgBrightBlack(" ")}     |
// | ${bgBrightBlack(" ")}     |
// | ${bgBrightBlack(" ")}     |
// | ${bgBrightBlack(" ")}     |
// |${brightWhite("■")}${bgBrightBlack(" ")}     |
// |${white(`■${bgBrightBlack("■")}■`)}    |
// ---------`,
// );
