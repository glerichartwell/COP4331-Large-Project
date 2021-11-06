import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'

const TrainerDashboard = props => {



    return (
        <div>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              wrap="nowrap"
            >
                <Grid item xs={4}>
                    Trainer Dashboard
                </Grid>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4}>

                </Grid>
                
            </Grid>
        </div>
    )
}

TrainerDashboard.propTypes = {

}

export default TrainerDashboard
