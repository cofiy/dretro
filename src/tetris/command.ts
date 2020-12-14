import { Board } from "./board.ts";

interface KeyMap {
  [key: string]: (board: Board) => void;
}

const keyMap: KeyMap = {
  q: (board) => board.rotate("ainiclockwise"),
  e: (board) => board.rotate("clockwise"),
  a: (board) => board.move("left"),
  d: (board) => board.move("right"),
  s: (board) => board.move("down"),
};

export const command = (key: string | undefined, board: Board) =>
  Object.keys(keyMap).includes(key ?? "")
    ? keyMap[key as keyof KeyMap](board)
    : null;
