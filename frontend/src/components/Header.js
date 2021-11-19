import PropTypes from 'prop-types'
import Button from './Button'

const Header = (props) => {
// or you can do
//const Header = ({ title }) => {

    const onClick = () =>{
        console.log('click')
    }

    return (
        <header className='header'>
            {/* <h1 style={{ color: 'red' , backgroundColor: 'black'}}>{props.title}</h1> */}
            <h1>{props.title}</h1>
            <Button color='green' text='add' onClick={onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: "task tracker"
}
// force formating 
Header.protoType ={//can do this instead to force format and then is required to require entry
    title: PropTypes.string.isRequired,
}
//or use this for styling non-inline, css in js
//<h1 style={ headingStyle }>{props.title}</h1>
// const headingStyle = {
//     color: 'red' , backgroundColor: 'black'
// }

export default Header
