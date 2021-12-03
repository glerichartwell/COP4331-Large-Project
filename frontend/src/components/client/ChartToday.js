import Chart from "react-google-charts";
import Paper from "@mui/material/Paper";

export default function Charts({todayMacros}) {

  var proteins = 0;
  var carbs = 0;
  var fats = 0;
  if (todayMacros)
  {
    proteins = parseInt(todayMacros.proteins);
    carbs = parseInt(todayMacros.carbs);
    fats = parseInt(todayMacros.fats);
  }
  console.log("today's macros: ", todayMacros)






  return (
    <Paper
      sx={{
        p: 2,
        margin: "4px 0px 0px 4px",
        width: 510,
        height: 250,
        flexGrow: 1,
        borderColor: "gray",
      }}
      variant="outlined"
    >
      <Chart
        width={"100%"}
        height={"100%"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Name", "macro"],
          ["Carbs", carbs],
          ["Fat", fats],
          ["Protein", proteins],
        ]}
        options={{
          title: "Today's Macro Goal",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </Paper>
  );
}
