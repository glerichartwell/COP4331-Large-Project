import React from 'react'
import Grid from '@mui/material/Grid'
import ClientDrawer from '../components/client/ClientDrawer'

const ClientDashboard = props => {

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
                  <ClientDrawer/>  
                
            </Grid>
        </div>
    )
}

export default ClientDashboard
