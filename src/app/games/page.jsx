"use client";
import Link from "next/link";

export default function GamesPage() {
  const games = [
    { name: "Snake", slug: "snake", desc: "Classic snake game with difficulty levels." },
    { name: "Tic-Tac-Toe", slug: "tic-tac-toe", desc: "Play against a friend or AI." },
    { name: "Memory Game", slug: "memory", desc: "Test your memory with card flips." },
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-4">🎮 Game Dashboard</h1>
      <div className="row">
        {games.map((game) => (
          <div className="col-md-4 mb-4" key={game.slug}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text flex-grow-1">{game.desc}</p>
                <Link href={`/games/${game.slug}`} className="btn btn-primary mt-auto">
                  Play {game.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
