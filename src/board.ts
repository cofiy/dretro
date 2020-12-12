import * as colors from "https://deno.land/std@0.78.0/fmt/colors.ts";
import { Tetrimino, TetriminoJ } from "./tetriminos.ts";

export class Board {
  row = 15;
  column = 10;
  grid = new Array(this.row).fill(0).map(() =>
    new Array(this.column).fill(null)
  );
  currentTetrimino?: Tetrimino = undefined;
  currentPosition = { row: 0, column: 0 };

  placeAt(
    tetrimino: Tetrimino,
    offsetRow = this.currentPosition.row,
    offsetColumn = this.currentPosition.column,
  ) {
    this.grid = this.grid.map(row => row.map(el => el?.tetrimino === tetrimino ? null : el));

    const tetriminoState = tetrimino.states[tetrimino.state];
    for (let i = 0; i < tetriminoState.length; i++) {
      for (let j = 0; j < tetriminoState[i].length; j++) {
        this.grid[i + offsetRow][j + offsetColumn] = {
          tetrimino,
          row: i,
          column: j,
        };
      }
    }
  }

  newTetrimino(tetrimino: Tetrimino) {
    this.currentTetrimino = tetrimino;
    this.currentPosition = { row: 0, column: Math.floor((this.column - tetrimino.states[tetrimino.state][0].length) / 2) };
    this.placeAt(tetrimino);
  }

  rotate() {
    this.currentTetrimino?.rotate();
    this.placeAt(this.currentTetrimino!);
  }

  move(direction = "left") {
    if(direction === "left") {
      this.currentPosition.column -= 1;
    } else if(direction === "right") {
      this.currentPosition.column += 1;
    } else {
      this.currentPosition.row += 1;
    }
    this.placeAt(this.currentTetrimino!);
  }

  toString() {
    return this.grid.map((row) =>
      row.map((tetrimino, i) => {
        if (tetrimino?.tetrimino) {
          const block = tetrimino.tetrimino.render(
            tetrimino.row,
            tetrimino.column,
          );

          if (block) {
            return block;
          }
        }

        return i % 2 ? colors.bgBlack("  ") : colors.bgBrightBlack("  ");
      }).join("")
    ).join("\n");
  }
}
