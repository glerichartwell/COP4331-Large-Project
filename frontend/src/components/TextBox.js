import React from 'react'
import PropTypes from 'prop-types'

const TextBox = ( {placeholder, onChange, reference} ) => {
    return (
        <div>
            <input type="text" placeholder={placeholder} onChange={onChange} ref={reference}/>
        </div>
    )
}

TextBox.propTypes = {
    placeholder: PropTypes.string.isRequired,
}

export default TextBox
