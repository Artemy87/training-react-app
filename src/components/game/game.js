import React, {Component} from 'react';
import Board from '../board';

import './index.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  getRow(el) {
    let row;
    if(el <= 2 ) {
      row = 1;
    } else if (el >= 6) {
      row = 3;
    } else {
      row = 2
    }
    return row;
  }

  getColumn(el) {
    let col;
    if(el === 0 || el === 3 || el === 6) {
      col = 1;
    } else if(el === 1 || el === 4 || el === 7) {
      col = 2;
    } else if(el === 2 || el === 5 || el === 8) {
      col = 3;
    }
    return col;
  }

  
  handleClick(i) {
    const columnNumber = this.getColumn(i);
    const rowNumber = this.getRow(i);

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      column: columnNumber, //!
      row: rowNumber,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      column: this.columnNumber,
      row: this.rowNumber
    });
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move
        ? `Перейти к ходу #${move} колонка #${this.state.column}, строка #${this.state.row}` //!
        : 'К началу игры';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Выиграл: ' + winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ?
        'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] &&
      squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}