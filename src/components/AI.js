const getEmptySquares = (squares) => {
  return squares
    .map((val, idx) => [val, idx])
    .filter((item) => item[0] === null);
};

const isMoveLeft = (squares) => {
  const emptySquares = getEmptySquares(squares);
  return emptySquares.length > 0;
};

export const replace = (squares, index, value) => {
  return [
    ...squares.slice(0, index),
    value,
    ...squares.slice(index + 1, squares.length),
  ];
};

const evaluate = (squares, computerType) => {
  const lines = [
    [0, 1, 2], // h.h0
    [3, 4, 5], // h.h1
    [6, 7, 8], // h.h2
    [0, 3, 6], // v.v0
    [1, 4, 7], // v.v1
    [2, 5, 8], // v.v2
    [0, 4, 8], // d.d0
    [2, 4, 6], // d.d1
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
  if (!isMoveLeft(squares)) return 0;

  const lengthSquares = squares.length;
  let best;

  if (isMax) {
    best = -1000;

    for (let i = 0; i < lengthSquares; i++) {
      const cell = squares[i];

      if (cell === null) {
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
      const cell = squares[i];

      if (cell === null) {
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

  const lengthSquares = squares.length;
  for (let i = 0; i < lengthSquares; i++) {
    const cell = squares[i];

    if (cell === null) {
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
