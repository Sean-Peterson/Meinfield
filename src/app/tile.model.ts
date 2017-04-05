export class Tile {
  bomb: boolean = false;
  clicked: boolean = false;
  adjacent: number = 0;
  constructor(public coords: number[]) {
    var decide = Math.random();
    if (decide < 0.15) {
      this.bomb = true;
    }
  }
}
