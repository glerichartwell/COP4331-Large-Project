import * as React from "react";
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

export default function BasicCard() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const handleChange = (newValue) => {
    setValueii(newValue);
  };
  const [valuei, setValueii] = React.useState(new Date("2014-08-18T21:11:54"));
  return (
    <Paper
      sx={{
        p: 2,
        margin: "4px 0px 0px 4px",
        width: "150%",
        height: "50%",
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
        <Grid item xs={6} sm container>
          <Grid item xs={2.8}></Grid>
          <Grid item xs container direction="column" spacing={1}>
            <Rating
              name="highlight-selected-only"
              value={value}
              IconContainerComponent={IconContainer}
              highlightSelectedOnly
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              readOnly
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
