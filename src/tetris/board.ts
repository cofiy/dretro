import * as colors from "https://deno.land/std@0.78.0/fmt/colors.ts";
import { play } from "https://deno.land/x/audio@0.1.0/mod.ts";
import { Randomizer } from "./randomizer.ts";
import { Tetrimino } from "./tetriminos.ts";

export class Board {
  row = 20;
  column = 10;
  grid = new Array(this.row).fill(0).map(() =>
    new Array(this.column).fill(undefined)
  );
  currentTetrimino?: Tetrimino = undefined;
  nextTetrimino?: Tetrimino = undefined;
  currentPosition = { row: 0, column: 0 };

  constructor() {
    this.newTetrimino();
    this.constantDrop();
  }

  placeAt() {
    const tetrimino = this.currentTetrimino!;
    const offsetRow = this.currentPosition.row;
    const offsetColumn = this.currentPosition.column;

    this.grid = this.grid.map((row) =>
      row.map((el) => el?.tetrimino === tetrimino ? undefined : el)
    );

    const tetriminoState = tetrimino.rotations[tetrimino.state];
    for (let i = 0; i < tetriminoState.length; i++) {
      for (let j = 0; j < tetriminoState[i].length; j++) {
        if (tetriminoState[i][j]) {
          this.grid[i + offsetRow][j + offsetColumn] = {
            tetrimino,
            row: i,
            column: j,
          };
        }
      }
    }

    this.render();
  }

  newTetrimino() {
    if (!this.nextTetrimino) {
      this.nextTetrimino = Randomizer.getInstance().next();
    }

    this.currentTetrimino = this.nextTetrimino;
    this.nextTetrimino = Randomizer.getInstance().next();
    this.currentPosition = {
      row: 0,
      column: Math.floor(
        (this.column -
          this.currentTetrimino.rotations[this.currentTetrimino.state][0]
            .length) / 2,
      ),
    };
    this.placeAt();
  }

  rotate(direction: string) {
    play("audio/rollover6.ogg");
    this.currentTetrimino?.rotate(direction);
    this.placeAt();
  }

  move(direction = "left") {
    const position = this.currentPosition;
    const tetrimino = this.currentTetrimino!;
    const tetriminoState = tetrimino.rotations[tetrimino.state];
    let tetriminoBody: number[][] = [];

    for (let i = 0; i < tetriminoState.length; i++) {
      for (let j = 0; j < tetriminoState[i].length; j++) {
        if (tetriminoState[i][j] !== 0) {
          tetriminoBody =  [ ...tetriminoBody, [i + position.row, j + position.column]];
        }
      }
    }

    if (direction === "left") {
      if (tetriminoBody.every(([i, j]) => j > 0)) {
        this.currentPosition.column -= 1;
      }
    } else if (direction === "right") {
      if (tetriminoBody.every(([i, j]) => j < this.column - 1)) {
        this.currentPosition.column += 1;
      }
    } else {
      if (
        this.currentPosition.row +
              this.currentTetrimino!.rotations[this.currentTetrimino!.state]
                .length >= this.row ||
        this.grid.some((row, i) =>
          row.some((el, j) => {
            return el?.tetrimino === this.currentTetrimino &&
              this.grid[i + 1][j] &&
              this.grid[i + 1][j].tetrimino !== this.currentTetrimino;
          })
        )
      ) {
        this.releaseFullRow();
        this.newTetrimino();
        return;
      }

      this.currentPosition.row += 1;
    }

    this.placeAt();
  }

  async constantDrop() {
    await new Promise((resolve) =>
      setTimeout(() => resolve(this.move("down")), 1000)
    );
    this.constantDrop();
  }

  releaseFullRow() {
    this.grid.forEach((row, rowNumber) => {
      if (row.every((el) => el?.tetrimino)) {
        for (let i = rowNumber; i >= 0; i--) {
          this.grid[i] = this.grid[i].map((_, columnNumber) =>
            this.grid[i - 1]?.[columnNumber]
          );
        }
      }
    });
  }

  render() {
    console.clear();
    console.log(this.toString());
  }

  toString() {
    const wall = "🔳";
    const wallRow = "\n" + new Array(this.column + 2).fill(wall).join("") +
      "\n";

    const next = "next: \n" + this.nextTetrimino?.toString() + "\n";

    return next + wallRow +
      this.grid.map((row, i) =>
        wall + row.map((tetrimino, j) => {
          const block = tetrimino?.tetrimino?.render(
            tetrimino?.row,
            tetrimino?.column,
          );

          return colors.bgRgb8(block ?? "  ", 234);
        }).join("") + wall
      ).join("\n") + wallRow;
  }
}
