import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(true);
  const [cache, setCache] = useState({});

  const fetchData = useCallback(async () => {
    if (cache[input]) {
      setResults(cache[input]);
      return;
    }
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await res.json();

    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  }, [cache, input]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [fetchData]);

  return (
    <div>
      <p>Auto complete search bar</p>
      <input
        type="text"
        className="search-bar"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onBlur={() => setShow(false)}
        onFocus={() => setShow(true)}
      />
      {show && (
        <ul className="result-list">
          {results.map((result) => (
            <li className="result" key={result.id}>
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
