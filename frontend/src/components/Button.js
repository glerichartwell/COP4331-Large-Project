//rafce to create
import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {


    return (
        <button onClick={onClick} style={{ backgroundColor: color }} 
        className='btn'>{ text }</button>
    )
}

Button.protoType ={//can do this instead to force format and then is required to require entry
    title: PropTypes.string,
    color: PropTypes.string, 
    onClick: PropTypes.func.isRequired,
}
export default Button
