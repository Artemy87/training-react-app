import React from "react";

export function getMoves(state, jumpTo) {
    const history = state.history;
    return (<React.Fragment>
        {history.map((step, move) => {
          const desc = move
            ? `Перейти к ходу #${move} колонка #${state.column}, строка #${state.row}` //!
            : 'К началу игры';
          return (
            <li key={move}>
              <button onClick={() =>jumpTo(move)}>
                {desc}
              </button>
            </li>
          );
        })}
    </React.Fragment>)

}