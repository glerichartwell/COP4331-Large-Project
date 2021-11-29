import { useState, useEffect } from "react";
import { Dialog, 
        DialogTitle, 
        DialogContent, 
        DialogContentText, 
        Grid, Autocomplete, 
        TextField, 
        Button } from "@mui/material";
import { DesktopDatePicker } from '@mui/lab';
import { DatePicker } from "@mui/lab";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getAuth } from "@firebase/auth";


const AssignBox = ({info, closeAssignBox}) => {
    
    const [open, setOpen] = useState(true)
    const [chosenClient, setChosenClient] = useState(null)
    const [client, setClient] = useState();
    const [dateType, setDateType] = useState("text")
    const [date, setDate] = useState()

    const [assignError, setAssignError] = useState("")

    useEffect(() => {
        loadClients();
    })
    const auth = getAuth();
    const user = auth.currentUser;
    const trainerID = user.email
    var clients = [];
    const getClients = async (event) => {

        var obj1 = { trainerID: trainerID };
        var js = JSON.stringify(obj1);
    
        try {
          const response = await fetch(
            "http://localhost:5000/api/view-clients-by-trainer",
            {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            }
          );
          var txt = await response.text();
          var res = JSON.parse(txt);
          // save number of clients
          const numClients = res.results.length;
    
          // Convert to obj literal {}, current is causing error
          for (var i = 0; i < numClients; i++) {
            var obj = {
                email: res.results[i].email,
                label: res.results[i].firstName + " " + res.results[i].lastName,
                id: info.id,
            }
            clients.push(obj);
          }
    
          if (res.error.length > 0) {
            console.log("API Error: " + res.error);
          } else {
            console.log("Clients returned");
          }
        } catch (error) {
          console.log(error.toString());
        }
    };

    const loadClients = () => {
        if (clients.length <= 0)
        {
        // Call search api
        getClients()
        }
    }

    const deleteClient = (name) => {
        var index = chosenClient.findIndex(client => client.name == name);
        setChosenClient(chosenClient.slice(0, index).concat(chosenClient.slice(index+1, chosenClient.length)))
    }
    
    // const chooseClient = (client) => {
    //     console.log("Client: ", client)
    //     //chooseClient(client)
    //     if (client === undefined || date === undefined)
    //     {
    //         setAssignError("Please choose a client and date.")
    //     }
    //     else
    //     {
    //         setChosenClient(client);
    //     }
    //     console.log("Chosen client: ", chosenClient)
    // }

    const assignClient = async event => {

        // console.log("Chosen client before assign: ",chosenClient)
        try {
            var obj = {
                email: chosenClient.email,
                workoutID: chosenClient.id,
                date: date,
            }
            var js = JSON.stringify(obj)
            console.log("JSON: ", js)
            const response = await fetch(
              "http://localhost:5000/api/add-workout-to-client",
              {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" },
              }
            );
            var txt = await response.text();
            var res = JSON.parse(txt);
            // save number of clients
      
            if (res.error.length > 0) {
              console.log("API Error: " + res.error);
            } else {
              console.log("Workouts assigned");
            }
          } catch (error) {
            console.log(error.toString());
          }
    }

    
    const handleClose = () => {
        closeAssignBox();
    }

    const handleAssign = () => {
        // chooseClient(client);
        assignClient();
        setAssignError("Workout assigned successfully!")
    }

    const sxBasicTextField = {
        marginBottom: '5px', 
        marginLeft: '30px', 
        marginRight: '10px', 
        width: '330px'
      }

    return (
        <Dialog open={open} fullWidth={true} maxWidth='xs' onBackdropClick={handleClose}>
          <DialogTitle textAlign='center'sx={{marginTop: '10px', marginBottom: '-20px'}}>Assign Workout: {info.name}</DialogTitle>
          <DialogContent>
            <Grid container direction='column' justifyContent='center' alignItems='center' marginTop='25px'>
                <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                            console.log("date: ", date);
                            console.log("newValue: ", newValue)
                          }}
                        renderInput={(params) => <TextField {...params} sx={{width: '330px', margin:'8px'}}/>}
                        
                    />
                </LocalizationProvider>
                </Grid>
                <Grid item>
                    <Autocomplete 
                        id="exercise-autocomplete"
                        options={clients}
                        isOptionEqualToValue={(option, value) => {return (option.name === value.name)}}
                        onChange={(e, value) => {setChosenClient(value)}}
                        renderInput={(params) => <TextField {...params} label="Clients" />}
                        sx={{ width: '330px', margin:'8px'}}
                        />
                        <div style={{textAlign: 'center', marginTop: '30px', color: 'purple'}}>{assignError}</div>
                </Grid>
                <Grid item>
                    <Button className='add-exercise' variant='text' onClick={handleAssign} sx={{minWidth: '1px'}}>Assign</Button>
                </Grid>
            </Grid>
          </DialogContent>
      </Dialog>
    )
}

export default AssignBox