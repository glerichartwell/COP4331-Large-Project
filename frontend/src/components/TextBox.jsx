import React from 'react'
import PropTypes from 'prop-types'

const TextBox = ( {placeholder} ) => {
    return (
        <div>
            <input type="text" placeholder={placeholder}/>
        </div>
    )
}

TextBox.propTypes = {
    placeholder: PropTypes.string.isRequired,
}

export default TextBox
