import Grid from '@mui/material/Grid'

import DashboardDrawer from '../components/DashboardDrawer'

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
                  <DashboardDrawer/>  
                
            </Grid>
        </div>
    )
}

export default TrainerDashboard
