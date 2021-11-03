import React from 'react'
import PropTypes from 'prop-types'

const TextBox = ( {placeholder, onChange} ) => {
    return (
        <div>
            <input type="text" placeholder={placeholder} onChange={onChange}/>
        </div>
    )
}

TextBox.propTypes = {
    placeholder: PropTypes.string.isRequired,
}

export default TextBox
