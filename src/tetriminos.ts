import * as colors from "https://deno.land/std@0.78.0/fmt/colors.ts";

export abstract class Tetrimino {
  color = 0;

  states = [
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    [[0, 0, 0], [1, 0, 0], [1, 1, 1]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
  ];

  state = 0;

  rotate() {
    this.state = ++this.state >= this.states.length ? 0 : this.state;
  }

  toString() {
    // Object.values(this.states).forEach((state) => {
    return this.states[this.state].map((row: number[]) => {
      return row.map((el) => el ? colors.bgRgb8("  ", this.color) : "  ").join(
        "",
      );
    }).join("\n");
    // });
  }

  render(row: number, column: number) {
    return this.states[this.state][row][column]
      ? colors.bgRgb8("  ", this.color)
      : null;
  }
}

export class TetriminoJ extends Tetrimino {
  color = 12;

  states = [
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    [[0, 0, 0], [1, 0, 0], [1, 1, 1]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
  ];
}

export class TetriminoL extends Tetrimino {
  color = 202;

  states = [
    [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [0, 0, 1], [1, 1, 1]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
  ];
}

export class TetriminoT extends Tetrimino {
  color = 13;

  states = [
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
  ];
}
