import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  const [word, setWord] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      });
  }, []);

  const searchCountries = countries => {
    return countries.filter(el => {
      return (
        el.name.toLowerCase().includes(word.toLowerCase()) ||
        el.capital?.toLowerCase().includes(word.toLowerCase())
      );
    });
  };

  console.log(searchCountries(countries));

  return (
    <div className="container">
      <div className="search-container">
        <label htmlFor="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="ค้นหาข้อมูลประเทศที่คุณสนใจ (เมืองหลวง,ชื่อประเทศ)"
            value={word}
            onChange={e => setWord(e.target.value)}
          />
        </label>
      </div>
      <ul className="row">
        {searchCountries(countries).map((item, idx) => {
          return (
            <li key={item.id}>
              <div className="card">
                <div className="card-title">
                  <img src={item.flag} alt={item.name} />
                </div>
                <div className="card-body">
                  <div className="card-description">
                    <h2>{item.name}</h2>
                    <ol className="card-list">
                      <li>
                        ประชากร : <span>{item.population}</span>
                      </li>
                      <li>
                        ภูมิภาค : <span>{item.region}</span>
                      </li>
                      <li>
                        เมืองหลวง : <span>{item.capital}</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
