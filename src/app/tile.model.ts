export class Tile {
  bomb: boolean = false;
  clicked: boolean = false;
  adjacent: number = 0;
  flagged: boolean = false;
  constructor(public coords: number[], public difficulty: number) {
    var decide = Math.random();
    if (decide < this.difficulty) {
      this.bomb = true;
    }
  }
}
