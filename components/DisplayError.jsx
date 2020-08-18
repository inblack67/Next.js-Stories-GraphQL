import React from 'react'
import PropTypes from 'prop-types'

const DisplayError = ({ message }) => {
    return (
        <div className='container'>
            <p className="red-text flow-text">
                {message}
            </p>
        </div>
    )
}

DisplayError.propTypes = {
    message: PropTypes.string.isRequired,
}

export default DisplayError
