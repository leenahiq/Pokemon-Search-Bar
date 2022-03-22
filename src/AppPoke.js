import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pokemonData);

  return (
    <div className="App">
      <h1>PokeSearch Bar</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="enter pokemon name"
          />
        </label>
      </form>
      <br />

      {pokemonData.map((data) => {
        return (
          <div className="container">
            <img src={data.sprites["front_default"]} />
            <br />

            <div className="box">
              <b> Type </b>

              <div>
                <p>{pokemonType}</p>
              </div>
            </div>
            <div className="box">
              <b> Height </b>
              <div>
                <p>{Math.round(data.height * 3.9)}</p>
              </div>
            </div>
            <div className="box">
              <b> Weight</b>
              <div>
                <p> {Math.round(data.weight / 4.3)} lbs</p>
              </div>
            </div>
            <div className="box">
              <b> Number of Battles</b>
              <div>
                <p>{data.game_indices.length}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
