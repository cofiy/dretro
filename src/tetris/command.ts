import { Board } from "./board.ts";
import { RotateDirection, MoveDirection } from "./directions.ts";

interface KeyMap {
  [key: string]: (board: Board) => void;
}

const keyMap: KeyMap = {
  q: (board) => board.rotate(RotateDirection.ANTICLOCKWISE),
  e: (board) => board.rotate(RotateDirection.CLOCKWISE),
  a: (board) => board.move(MoveDirection.LEFT),
  d: (board) => board.move(MoveDirection.RIGHT),
  s: (board) => board.move(MoveDirection.DOWN),
};

export const command = (key: string | undefined, board: Board) =>
  Object.keys(keyMap).includes(key ?? "")
    ? keyMap[key as keyof KeyMap](board)
    : null;
