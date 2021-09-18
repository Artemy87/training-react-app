export function calculateWinner(squares) {
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

export function getRow(el) {
    let row;
    if (el <= 2) {
        row = 1;
    } else if (el >= 6) {
        row = 3;
    } else {
        row = 2
    }
    return row;
}

export function getColumn(el) {
    let col;
    if (el === 0 || el === 3 || el === 6) {
        col = 1;
    } else if (el === 1 || el === 4 || el === 7) {
        col = 2;
    } else if (el === 2 || el === 5 || el === 8) {
        col = 3;
    }
    return col;
}

export function getStatus(current, xIsNext) {
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Выиграл: ' + winner;
    } else {
      status = 'Следующий ход: ' + (xIsNext ?
        'X' : 'O');
    }
    return status
}