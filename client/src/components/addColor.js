import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  color: "",
  code: { hex: "" }
};

export default function AddColor({ color, updateColors }) {
  const [colorToAdd, setColorToAdd] = useState(initialState);

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", colorToAdd)
      .then(res => {
        console.log(res);
        updateColors(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="add-form">
      <form onSubmit={addColor}>
        <p>Add Color</p>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
}
