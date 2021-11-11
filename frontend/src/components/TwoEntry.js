import React from 'react'
import PropTypes from 'prop-types'
import TextBox from './TextBox'

const TwoEntry = ({ placeholder1, placeholder2 }) => {
    return (
    <div>
        <TextBox placeholder={placeholder1} />
        <TextBox placeholder={placeholder2} />
    </div>
    )
}

TwoEntry.propTypes = {
    placeholder1: PropTypes.string, 
    placeholder2: PropTypes.string, 
    
}

export default TwoEntry
