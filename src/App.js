import { useState, useEffect } from "react";
import axios from "axios";
import Individual from "./Individual";

function App() {
  const [pokemen, setPokemen] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    let fetchPokemon = async () => {
      try {
        const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
        setPokemen(data.results);
        setNextPage(data.next);
      } catch (err) {}
    };

    fetchPokemon();
  }, []);

  let loadMorePokemon = async () => {
    try {
      let { data } = await axios.get(nextPage);
      setNextPage(data.next);
      setPokemen((prevList) => [...prevList, ...data.results]);
    } catch (err) {}
  };

  return (
    <>
      <button onClick={() => loadMorePokemon()}>Load More Pokemon</button>
      <div>
        {pokemen.map((individual) => (
          <div key={individual.name}>
            <Individual url={individual.url} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
