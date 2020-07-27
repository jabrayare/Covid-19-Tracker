import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import NumberFormat from "react-number-format";
export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  // if (a.cases > b.cases) {
  //   return -1;
  // } else {
  //   return 1;
  // }

  return sortedData;
};

const caseTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};
// Draw circles on the map with interactive tooltip.
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[casesType].hex}
      fillColor={caseTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
      }
    >
      <Popup className="popup_info">
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-cases">
            Cases:{" "}
            <NumberFormat
              value={country.cases}
              displayType={"text"}
              thousandSeparator={true}
            />
          </div>
          <div className="info-recovered">
            Recovered:{" "}
            <NumberFormat
              value={country.recovered}
              displayType={"text"}
              thousandSeparator={true}
            />
          </div>
          <div className="info-deaths">
            Deaths:{" "}
            <NumberFormat
              value={country.deaths}
              displayType={"text"}
              thousandSeparator={true}
            />
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const prettyPrintStats = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
