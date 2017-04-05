import { Component, OnInit } from '@angular/core';
import { Tile } from '../tile.model'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: Tile[][] = [];

  constructor() { }

  ngOnInit() {
    for (var i=0; i<10; i++) {
      this.board.push([])
      for (var j=0; j<10; j++) {
        this.board[i].push(new Tile([i,j]));
      }
    }
    console.log(this.board)
  }

  userClick(tile) {
    if (!tile.clicked) {

      tile.clicked = true;
      for (var i=-1; i<=1; i++) {
        for (var j=-1; j<=1; j++) {
          if (tile.coords[0]+i >= 0 && tile.coords[0]+i <= 9 && tile.coords[1]+j >= 0 && tile.coords[1]+j <= 9){
            if (this.board[tile.coords[0]+i][tile.coords[1]+j].bomb)  {
              tile.adjacent += 1;
            }
          }
        }
      }
      if (tile.adjacent === 0) {
        for (var i=-1; i<=1; i++) {
          for (var j=-1; j<=1; j++) {
            if (tile.coords[0]+i >= 0 && tile.coords[0]+i <= 9 && tile.coords[1]+j >= 0 && tile.coords[1]+j <= 9){
              this.userClick(this.board[tile.coords[0]+i][tile.coords[1]+j])
            }
          }
        }
      }
    }
    }
  }
