import PropTypes from 'prop-types'
import { useState } from 'react'
import Task from './Task'
// make a list
const Tasks = () => {
    const[tasks, setTasks] = useState ([//one way data, use setTask([...task, {new information object}]) to change
        {
            id: 1, 
            text: 'doctors appointment', 
            day: 'feb 5th at 2:30pm', 
            reminder: true,
        },
        {
            id: 2, 
            text: 'meeting at school', 
            day: 'feb 3th at 1:30pm', 
            reminder: true,
        },
        {
            id: 3, 
            text: 'Food shopping', 
            day: 'feb 5th at 2:30pm', 
            reminder: false,
        }, 
    ])

    return (
        <div>
            {tasks.map((task)=> (
            <Task key={task.id} task={task}/>
            // <h3 key={task.id}>{task.text}</h3>

            ))}
        </div>
    )
}

Tasks.propTypes = {

}

export default Tasks
