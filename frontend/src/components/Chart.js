import Chart from "react-google-charts";
import Paper from "@mui/material/Paper";

export default function Charts() {
  const carb = 13;
  const fat = 10;
  const protein = 15;
  var options = {
    title: "How Much Pizza I Ate Last Night",
    width: 350,
    height: 400,
    chartArea: { width: "100%", height: "80%" },
    legend: { position: "bottom" },
  };
  return (
    <Paper
      sx={{
        p: 2,
        margin: "4px 0px 0px 4px",
        width: 250,
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
          ["Task", "Hours per Day"],
          ["Carbs", carb],
          ["Fat", fat],
          ["Protein", protein],
        ]}
        options={{
          title: "Macromolecule Ratio",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </Paper>
  );
}
