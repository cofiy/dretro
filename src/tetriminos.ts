import * as colors from "https://deno.land/std@0.78.0/fmt/colors.ts";

export abstract class Tetriminos {
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
      return row.map((el) => colors.rgb8(el ? "◼ " : "  ", this.color)).join("");
    }).join("\n");
    // });
  }
}

export class TetriminosJ extends Tetriminos {
  color = 12;

  states = [
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    [[0, 0, 0], [1, 0, 0], [1, 1, 1]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
  ];
}

export class TetriminosL extends Tetriminos {
  color = 202;

  states = [
    [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [0, 0, 1], [1, 1, 1]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
  ];
}

export class TetriminosT extends Tetriminos {
  color = 13;

  states = [
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
  ];
}
