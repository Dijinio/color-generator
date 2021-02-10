import React, { useState, useEffect } from "react";
import SingleColor from "./SingleColor";
import Values from "values.js";

function App() {
  const [color, setColor] = useState("#ED871C");
  const [error, setError] = useState(false);
  const [shades, setShades] = useState(10);
  const [list, setList] = useState(new Values("#ED871C").all(shades));

  useEffect(() => {
    setList(new Values(color).all(shades));
  }, [shades]);

  const randomizeHex = () => {
    let hexColor = ["#"];
    const hexValues = ["a", "b", "c", "d", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    for (let i = 0; i < 6; i++) {
      const randNum = Math.floor(Math.random() * 14);
      hexColor.push(hexValues[randNum]);
    }
    hexColor = hexColor.join("").toUpperCase();
    setColor(hexColor);
    setList(new Values(hexColor).all(shades));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(shades);
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleShades = (e) => {
    const shadesValue = parseInt(e.target.value);
    if (shadesValue >= 1 && shadesValue < 100) {
      console.log(shadesValue);
      setShades(shadesValue);
    }
  };

  return (
    <>
      <section className="container">
        <h3>Color Generator</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={color}
              placeholder="#ED871C"
              className={error ? "error" : ""}
              onChange={(e) => setColor(e.target.value)}
            />
            <button className="btn btn-submit" type="submit">
              Generate
            </button>
            <button
              className="btn btn-random"
              onClick={randomizeHex}
              style={{ backgroundColor: color }}
              onMouseOver={(e) => {
                e.target.style.color = color;
                e.target.style.backgroundColor = "#fff";
                e.target.style.border = `1px solid ${color}`;
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#fff";
                e.target.style.backgroundColor = color;
                e.target.style.border = "1px solid #f1f5f8";
              }}
            >
              Random Color
            </button>
          </div>
          <div className="input-group">
            <input
              type="number"
              id="shades"
              value={shades}
              min="1"
              max="99"
              onChange={handleShades}
            />
            <label htmlFor="shades"> Shades (1-99)</label>
          </div>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              size={list.length}
              hex={color.hex}
              index={index}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
