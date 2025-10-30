import Background from '../../../components/Background';
import { useState } from 'react';
import BackToHomeButton from '../../../components/BackToHomeButton';

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button 
      className={`square ${isWinningSquare ? 'winning' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!squares.includes(null)) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  
  return (
    <>
      <div className="status">{status}</div>
      <div>
        {[0, 1, 2].map(rowIndex => (
          <div className="board-row" key={rowIndex}>
            {[0, 1, 2].map(colIndex => {
              const index = rowIndex * 3 + colIndex;
              const isWinningSquare = winningLine.includes(index);
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  isWinningSquare={isWinningSquare}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default function TictacToePage() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true); 
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, moveIndex) {
    const row = Math.floor(moveIndex / 3);
    const col = moveIndex % 3;
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: { row, col } }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    
    if (move === currentMove) {
      description = move > 0
        ? `You are at move #${move}`
        : 'You are at game start';
      
      return (
        <li key={move}>
          <span>{description}</span>
        </li>
      );
    }


    if (move > 0) {
      const { row, col } = squares.location;
      description = `Go to move #${move} (${row + 1}, ${col + 1})`;
    }
    else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();
  
  return (
    <div className="tictactoe relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <BackToHomeButton />
      <Background starCount={5} speed={8}/>

      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        🌌 Tic Tac Toe
      </h1>

      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <button onClick={() => setIsAscending(!isAscending)}>
            {isAscending ? 'Sort Descending' : 'Sort Ascending'}
          </button>
          <ol>{sortedMoves}</ol>
        </div>
      </div>
    </div>
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
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}
