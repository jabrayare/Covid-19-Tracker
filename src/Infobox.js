import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function Infobox({ title, cases, total, ...props }) {
  return (
    <Card onClick={props.onClick} className="infoBox">
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2 className="infoBox_cases">{cases}</h2>
        <Typography className="infoBox_total">{total} total</Typography>
      </CardContent>
    </Card>
  );
}

export default Infobox;
