import * as colors from "https://deno.land/std@0.78.0/fmt/colors.ts";

export class Board {
  row = 10;
  column = 10;

  toString() {
    return new Array(this.row).fill(0).map(() => "▮ " + new Array(this.column).fill(0).map((_, i) => i % 2 ? colors.bgBlack("  ") :colors.bgBrightBlack("  ")).join("") + " ▮").join("\n") + "\n◼ " + new Array(this.column * 2).fill("▬").join("") + " ◼\n"
  }
}
