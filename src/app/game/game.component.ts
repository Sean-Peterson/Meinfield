import { Component, OnInit } from '@angular/core';
import { Tile } from '../tile.model'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: Tile[][] = [];
  difficulty: number = null;

  constructor() { }

  ngOnInit() {
  }

  mode(difficulty){
    this.difficulty = difficulty;
    this.board = [];
    for (var i=0; i<10; i++) {
      this.board.push([])
      for (var j=0; j<10; j++) {
        this.board[i].push(new Tile([i,j], difficulty));
      }
    }
  }

  endGame(){
    var winCount = 0;
    for(var i=0; i<10; i++){
      for(var j=0; j<10; j++){
        if(this.board[i][j].clicked && this.board[i][j].bomb){
          alert('You Lose!');
          this.mode(this.difficulty);
        } else if (this.board[i][j].clicked || (this.board[i][j].bomb && this.board[i][j].flagged)){
          winCount += 1;
        }
      }
    }
    if(winCount === 100) {
      alert('you win!')
      this.ngOnInit();
      var newWindow = window.open("", "", "width=280,height=230");
      newWindow.document.write("<h1 style='position:absolute;top:50px;left:40px;text-align:center;color:white'>YOU WIN</h1><img src='http://i.imgur.com/PC0lG0h.gif' style='top:0px;left:0px'>")
    }
  }

  userClick(tile) {
    if (!tile.clicked && !tile.flagged) {

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
      this.endGame();
    }
  }

  userFlag(tile) {
    if (!tile.flagged && !tile.clicked) {
      tile.flagged = true;
    } else {
      tile.flagged = false;
    }
    this.endGame();

  }

}
