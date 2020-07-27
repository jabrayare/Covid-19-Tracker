import React from "react";
import NumberFormat from "react-number-format";

function Table({ countries }) {
  // var NumberFormat = require("react-number-format");
  console.log(countries.length);
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <NumberFormat
              value={cases}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
