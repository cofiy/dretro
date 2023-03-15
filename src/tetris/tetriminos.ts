import { RotateDirection } from "./directions.ts";

export abstract class Tetrimino {
  protected block = "";
  rotations = [[[0]]];
  state = 0;

  rotate(direction: RotateDirection) {
    if (direction === RotateDirection.ANTICLOCKWISE) {
      this.state = --this.state < 0 ? this.rotations.length - 1 : this.state;
    } else {
      this.state = ++this.state >= this.rotations.length ? 0 : this.state;
    }
  }

  render(row: number, column: number) {
    return this.rotations[this.state][row][column] ? this.block : null;
  }

  toString() {
    return this.rotations[this.state].filter((row) => row.some((el) => el)).map(
      (row: number[]) => row.map((el) => el ? this.block : "  ").join(""),
    ).join("\n");
  }
}

export class TetriminoJ extends Tetrimino {
  block = "🟦";

  rotations = [
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    [[0, 0, 0], [1, 0, 0], [1, 1, 1]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
  ];
}

export class TetriminoL extends Tetrimino {
  block = "🟧";

  rotations = [
    [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [0, 0, 1], [1, 1, 1]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
  ];
}

export class TetriminoT extends Tetrimino {
  block = "⬜";

  rotations = [
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
  ];
}

export class TetriminoO extends Tetrimino {
  block = "🟨";

  rotations = [
    [[1, 1], [1, 1]],
  ];
}

export class TetriminoS extends Tetrimino {
  block = "🟪";

  rotations = [
    [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
  ];
}

export class TetriminoZ extends Tetrimino {
  block = "🟩";

  rotations = [
    [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
  ];
}

export class TetriminoI extends Tetrimino {
  block = "🟥";

  rotations = [
    [[0, 0, 0, 0], [1, 1, 1, 1]],
    [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
  ];
}
