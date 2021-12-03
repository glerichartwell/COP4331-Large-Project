import { useState, useEffect } from "react";
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
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

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

export default function BasicCard({info, moodRating}) {

  const [rating, setRating] = useState(0)

  useEffect(() => {
    setRating(moodRating)
    console.log("MOOD: ", moodRating)
  }, [moodRating])

  // console.log("Incoming rating: ", rating)
  return (
    <Paper
      sx={{
        p: 2,
        position: 'relative',
        margin: "4px 0px 0px 4px",
        flexGrow: 1,
        borderColor: "gray",
      }}
      variant="outlined"
    >
      <Box sx={{display: 'flex', position: 'absolute', top: 20, left: 30, width: '50%', }}>
        <Typography variant="header2" gutterBottom style={{ fontWeight: "bold", fontSize: 24 }}>
          Mood
        </Typography>
      </Box>
      <Box sx={{display: 'flex', position: 'absolute', bottom: 120, left: 40, width: '50%',}}>
      <Rating
              name="highlight-selected-only"
              readOnly
              value={rating}
              IconContainerComponent={IconContainer}
              highlightSelectedOnly
            />
            {/* <Box sx={{display: 'flex', position: 'absolute', bottom: -30, left: 30, width: '50%',}}>
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
            </Box> */}
      </Box>
      
    </Paper>
  );
}
