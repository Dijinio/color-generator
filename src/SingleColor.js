import React, { useState, useEffect } from "react";

function SingleColor({ rgb, weight, hex, size, index }) {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(",");
  const hexValue = `#${hex}`.toUpperCase();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);

  const handleCopy = () => {
    setAlert(true);
    navigator.clipboard.writeText(hexValue);
  };

  return (
    <div
      className={`color ${index > size / 2 && "color-light"}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={handleCopy}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </div>
  );
}

export default SingleColor;
