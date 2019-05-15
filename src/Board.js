import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nrows: 3,
    ncols: 3,
    chanceLightStartsOn: 0.1
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this._createBoard()
      // board: [ [false,  false, false], [false,  false, true], [false,  true, true] ]
    };
    this._createBoard = this._createBoard.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  _createBoard() {
    //row
    let board = Array.from(
      {length: this.props.nrows}, () => (
        //col
        Array.from({length: this.props.ncols}, () => ( 
          //cell
          Math.random() < this.props.chanceLightStartsOn ))));

    return board;
  }

  /** Internal method to copy a board and then flip the approiate cells **/
  // toggle cells around cell
  _flipCellsAround(b, y, x) {
    let { ncols, nrows } = this.props;

    // Make a copy of the board so that state is not changed outside of setState
    let board = b.map(r => [...r]);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    let aroundCells = [[y, x], [y + 1, x], [y, x + 1], [y - 1, x], [y, x - 1]];
    aroundCells.forEach(function (coords) {
      flipCell(...coords);
    });
    return board;
  }


  /** handle changing a cell: update board & determine if winner */
  flipCellsAndCheckForWin(y, x) {
    let board = this._flipCellsAround(this.state.board, y, x);
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board, hasWon });
  }


  /** Render game board or winning message. */
  render() {
    let { board } = this.state;

    let game = (
      <table>
        {board.map((row, y) => (
          <tr>{row.map((cell, x) => (
            <td>
              <Cell
                key={`${y}-${x}`}
                isLit={cell}
                flipCellsAroundMe={() => this.flipCellsAndCheckForWin(y, x)}
              />
            </td>
          ))}
          </tr>
        ))}
      </table>
    );

    return (
      <div>
        {this.state.hasWon ? <p> $$$ YOU WON $$$ </p> : game}
      </div>
    );
  }
}


export default Board;
