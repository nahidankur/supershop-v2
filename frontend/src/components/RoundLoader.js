import React from 'react'
import { Spinner} from 'react-bootstrap'

const RoundLoader = () => {
    return (
        <Spinner animation="grow" variant="primary"
        style={{width: '40px',
        height: '40px',
        margin: 'auto',
        display: 'block'             
}}
        >
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
}

export default RoundLoader
