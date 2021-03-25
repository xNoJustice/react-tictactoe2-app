const replace = (squares, index, value) => {
  return [
    ...squares.slice(0, index),
    value,
    ...squares.slice(index + 1, squares.length),
  ];
};

const evaluate = (squares, computerType) => {
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

    if (
      squares[a] !== null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      if (squares[a] === computerType) return 10;
      return -10;
    }
  }

  return 0;
};

const minimax = (squares, depth, computerType, isMax) => {
  const score = evaluate(squares, computerType);

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (
    !squares.map((val, i) => [val, i]).filter((item) => item[0] === null)
      .length > 0
  )
    return 0;

  const lengthSquares = squares.length;
  let best;

  if (isMax) {
    best = -1000;

    for (let i = 0; i < lengthSquares; i++) {
      const square = squares[i];

      if (square === null) {
        const nextSquares = replace(squares, i, computerType);

        best = Math.max(
          best,
          minimax(nextSquares, depth + 1, computerType, !isMax)
        );
      }
    }
  } else {
    best = 1000;

    for (let i = 0; i < lengthSquares; i++) {
      const square = squares[i];

      if (square === null) {
        const nextSquares = replace(squares, i, 1 - computerType);

        best = Math.min(
          best,
          minimax(nextSquares, depth + 1, computerType, !isMax)
        );
      }
    }
  }

  return best;
};

export const findBestMove = (squares, computerType) => {
  let bestVal = -1000;
  let bestMove = null;

  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];

    if (square === null) {
      const nextSquares = replace(squares, i, computerType);

      const moveVal = minimax(nextSquares, 0, computerType, false);

      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestMove = i;
      }
    }
  }

  return bestMove;
};
