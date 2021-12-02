import { useState, useEffect } from "react"
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const labels = {
  1: "Extremely Unmotivated",
  2: "Unmotivated",
  3: "Neutral",
  4: "Motivated",
  5: "Determined",
};

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon fontSize="large" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon fontSize="large" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon fontSize="large" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon fontSize="large" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon fontSize="large" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function BasicCard({todayMoodRating}) {

  const [rating, setRating] = useState(todayMoodRating)
  const [refresh, setRefresh] = useState(true)
  
  console.log("INCOMING MOOD: ", todayMoodRating)

  useEffect(() => {
    setRefresh(!refresh)
  }, [todayMoodRating])

  return (
    <Paper
      sx={{
        p: 2,
        margin: "4px 0px 0px 4px",
        width: 250,
        height: 190,
        flexGrow: 1,
        borderColor: "gray",
      }}
      variant="outlined"
    >
      <Typography variant="header2" gutterBottom style={{ fontWeight: "bold" }}>
        Today's Mood
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs container direction="column" spacing={1}>
          <Rating
            name="highlight-selected-only"
            defaultValue={rating}
            sx={{ position: 'absolute', fontSize: "42 vh", left: "10%", top: "50%" }}
            IconContainerComponent={IconContainer}
            highlightSelectedOnly
            readOnly
          />
          {/* {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )} */}
        </Grid>
      </Grid>
    </Paper>
  );
}
