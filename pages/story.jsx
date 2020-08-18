import React from 'react'
import { useRouter } from 'next/router'

const SingleStory = () => {

    const router = useRouter();

    const onDelete = async e => {
        try {
            console.log('delete story');
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='container'>
            {/* <h3>
                {title}
            </h3>
            <p className="flow-text">
                {description}
            </p> */}
            <button className="btn red" onClick={onDelete}>Delete</button>
        </div>
    )
}

export default SingleStory
