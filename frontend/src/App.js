import './App.css';
import "./styles.css";
import { useState } from "react";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [move, setMove] = useState(1);
  const toMove = move % 2 === 0;

  function newGame() {
    setSquares(Array(9).fill(null));
    setMove(1);
  }

  function handleClick(i) {
    if (squares[i] || gameOver(move)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = toMove ? "O" : "X";
    setSquares(newSquares);
    setMove(move + 1);
  }

  function gameOver(move) {
    return calculateWinner(squares) || move > 9;
  }

  return (
    <div className="game">
      <div className="newGame" >
        <button onClick={newGame}>New Game</button>
      </div>
      <Board squares={squares} handleClick={handleClick}/>
      <Status squares = {squares} toMove = {toMove} move={move}/>
    </div>
  );
}

export default App;

function Status({squares, toMove, move}) {
  var status = ""
  const winner = calculateWinner(squares);
  if (winner == null) {
    if (move > 9) {
      status = "Draw."
    } else {
      status = (toMove ? "O" : "X") + " to move.";
    }
  } else {
    status = "Game over.  " + winner + " wins.";
  }
  return (
    <div className="game-info">
      <p>
        {status}
      </p>
    </div>
  );
}

function Board({squares, handleClick}) {
  return (
    <div className="game-board">
      <BoardRow squares={squares} handleClick={handleClick} start={0}/>
      <BoardRow squares={squares} handleClick={handleClick} start={3}/>
      <BoardRow squares={squares} handleClick={handleClick} start={6}/>
    </div>
  );
}

function BoardRow({squares, handleClick, start}) {
  const ids = [start, start+1, start+2]
  return (
    <div className="board-row">
      {
        ids.map((id) => (
          <Square value={squares[id]} onSquareClick={() => handleClick(id)}
        />
        ))
      }
  </div>   
  );
}

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
