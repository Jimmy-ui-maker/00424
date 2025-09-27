"use client";
import React, { useEffect, useState } from "react";

export default function SudokuGame({ user }) {
  const [difficulty, setDifficulty] = useState("simple");
  const [puzzle, setPuzzle] = useState(() => createEmptyGrid());
  const [initial, setInitial] = useState(() => createEmptyGrid());
  const [solution, setSolution] = useState(() => createEmptyGrid());
  const [message, setMessage] = useState("");
  const [isSolved, setIsSolved] = useState(false);

  const removalByDifficulty = { simple: 36, medium: 46, hard: 54 };

  useEffect(() => {
    newPuzzle(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createEmptyGrid() {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
  }
  function cloneGrid(g) {
    return g.map((r) => r.slice());
  }

  function isValid(grid, r, c, val) {
    for (let i = 0; i < 9; i++) {
      if (grid[r][i] === val) return false;
      if (grid[i][c] === val) return false;
    }
    const br = Math.floor(r / 3) * 3;
    const bc = Math.floor(c / 3) * 3;
    for (let i = br; i < br + 3; i++) {
      for (let j = bc; j < bc + 3; j++) {
        if (grid[i][j] === val) return false;
      }
    }
    return true;
  }

  function solveGrid(grid) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] === 0) {
          for (let val = 1; val <= 9; val++) {
            if (isValid(grid, r, c, val)) {
              grid[r][c] = val;
              if (solveGrid(grid)) return true;
              grid[r][c] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  function generateFullSolution() {
    const g = createEmptyGrid();
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    function generate(grid) {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (grid[r][c] === 0) {
            const candidates = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            for (const val of candidates) {
              if (isValid(grid, r, c, val)) {
                grid[r][c] = val;
                if (generate(grid)) return true;
                grid[r][c] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }
    generate(g);
    return g;
  }

  function removeCellsFromSolution(solvedGrid, removeCount) {
    const grid = cloneGrid(solvedGrid);
    const positions = [];
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) positions.push([r, c]);
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    let removed = 0;
    for (let idx = 0; idx < positions.length && removed < removeCount; idx++) {
      const [r, c] = positions[idx];
      grid[r][c] = 0;
      removed++;
    }
    return grid;
  }

  function newPuzzle(difficultyLevel = "simple") {
    setMessage("");
    setIsSolved(false);
    const solved = generateFullSolution();
    const removeCount =
      removalByDifficulty[difficultyLevel] || removalByDifficulty.simple;
    const puzzleGrid = removeCellsFromSolution(solved, removeCount);
    setSolution(solved);
    setInitial(puzzleGrid.map((r) => r.map((v) => (v === 0 ? 0 : v))));
    setPuzzle(cloneGrid(puzzleGrid));
  }

  function handleInput(r, c, rawVal) {
    if (initial[r][c] !== 0) return;
    const v = rawVal === "" ? 0 : Number(rawVal);
    if (!Number.isInteger(v) || v < 0 || v > 9) return;
    const newGrid = cloneGrid(puzzle);
    newGrid[r][c] = v;
    setPuzzle(newGrid);
    setMessage("");
    setIsSolved(false);
  }

  function handleSolve() {
    const solved = cloneGrid(solution);
    setPuzzle(solved);
    setMessage("Solved (filled).");
    setIsSolved(true);
  }

  function handleCheckAndFinish() {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) {
        if (puzzle[r][c] === 0) {
          setMessage("Board incomplete.");
          return;
        }
      }
    const correct = puzzle.every((row, r) =>
      row.every((v, c) => v === solution[r][c])
    );
    if (correct) {
      setMessage("🎉 Congratulations, solved!");
      setIsSolved(true);
    } else {
      setMessage("❌ Incorrect. Try again or press Solve.");
      setIsSolved(false);
    }
  }

  function handleReset() {
    setPuzzle(cloneGrid(initial));
    setMessage("");
    setIsSolved(false);
  }

  return (
    <div className="sudoku-wrapper">
      <header className="sudoku-header">
        <h3>🧩 Sudoku {user ? `— ${user.name}` : ""}</h3>

        {/* STYLED CONTROLS */}
        <div className="sudoku-controls d-flex flex-wrap align-items-center justify-content-start justify-content-sm-center gap-2">
          <select
            type="select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            aria-label="Difficulty"
          >
            <option value="simple">Simple</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button
            className="btn btn-primary"
            onClick={() => newPuzzle(difficulty)}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>

          <button className="btn btn-secondary" onClick={handleReset}>
            <i className="bi bi-arrow-repeat"></i>
          </button>
        </div>
      </header>

      <main className="sudoku-main">
        <div className="sudoku-board">
          <div className="grid">
            {puzzle.map((row, r) =>
              row.map((val, c) => {
                const fixed = initial[r][c] !== 0;
                return (
                  <input
                    key={`${r}-${c}`}
                    value={val === 0 ? "" : val}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^1-9]/g, "");
                      handleInput(r, c, v === "" ? "" : Number(v));
                    }}
                    className={`sudoku-cell ${fixed ? "fixed" : "editable"}`}
                    disabled={fixed}
                    inputMode="numeric"
                    maxLength={1}
                  />
                );
              })
            )}
          </div>
        </div>

        <aside className="sudoku-sidebar">
          <div className="action-buttons">
            <button onClick={handleCheckAndFinish}>Check / Finish</button>
            <button onClick={handleSolve}>Solve</button>
            <button
              onClick={() => {
                setPuzzle(createEmptyGrid());
                setMessage("");
                setIsSolved(false);
              }}
            >
              Clear
            </button>
          </div>

          <div className="sudoku-tips">
            <p className="tips-title">💡 Tips</p>
            <ul>
              <li>Type numbers 1–9 into empty cells.</li>
              <li>
                Click <em>Check / Finish</em> when done.
              </li>
              <li>
                Press <em>Solve</em> to auto-fill the solution.
              </li>
            </ul>
          </div>

          <div className="sudoku-message">
            {message && <div className="alert">{message}</div>}
            {isSolved && (
              <div className="alert success">🎉 Solved — nice job!</div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
