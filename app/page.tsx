"use client";
import { useState, useEffect } from "react";

interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
}

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const apiKey = process.env.NEXT_RAWG_API_KEY;
        console.log(apiKey);
        if (!apiKey) {
          throw new Error("APIキーが設定されていません");
        }
        /*const res = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_RAWG_API_KEY}&page_size=10`
        );*/
        const res = await fetch(
          `https://api.rawg.io/api/games?key=e4868727a8b14221aa984ea9e51c58fd&page_size=10`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setGames(data.results);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>ゲームリスト</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <h2>{game.name}</h2>
            <p>{game.released}</p>
            <img src={game.background_image} alt={game.name} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
