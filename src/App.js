import React, { useState, useEffect } from "react";
import "./App.css";
import { MenuItem, FormControl, Select, CardContent } from "@material-ui/core";
import InfoBox from "./Infobox";
import Map from "./Map";
import { Card } from "@material-ui/core";
import Table from "./Table";
import { sortData, prettyPrintStats } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [countryHeader, setCountryHeader] = useState("World Wide");
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            id: country.countryInfo._id,
          }));
          const sortedData = sortData(data);
          setMapCountries(data);
          setCountries(countries);
          setTableData(sortedData);
        })
        .catch((error) => console.log("Error >>> ", error));
    };
    getCountriesData();
  }, []);
  console.log(countries);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setCountryHeader(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  console.log("countryHeader >>> ", countryHeader);
  // console.log("tableData >>>", tableData);
  console.log("countryInfo >>>>", countryInfo);
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldWide">World Wide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="country_header">
          {/* Header country name */}
          <h1 className="Country_header_stats">
            {countryInfo.country ? countryInfo.country : "World Wide"} Stats
          </h1>
        </div>
        <div className="app_stats">
          {/* InfoBoxes */}
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Corona Virus Cases"
            cases={prettyPrintStats(countryInfo.todayCases)}
            total={prettyPrintStats(countryInfo.cases)}
          />
          <InfoBox
            className="info_recovered"
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStats(countryInfo.todayRecovered)}
            total={prettyPrintStats(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStats(countryInfo.todayDeaths)}
            total={prettyPrintStats(countryInfo.deaths)}
          />
        </div>

        {/* Tables */}
        {/* Graph */}
        {/* Map */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h1>Live Cases by Country</h1>
          <Table countries={tableData} />
          <h3>Worldwide new Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
