import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { fetchSingleStoryQuery } from '../../../utils/queries/Story'
import Preloader from '../../../components/Preloader'
import DisplayError from '../../../components/DisplayError'
import Link from 'next/link'
import EditStory from '../../../components/EditStory'

const SingleStory = () => {

    const { query: { id } } = useRouter();

    const { data, loading, error } = useQuery(fetchSingleStoryQuery, {
        variables: {
            id
        }
    });

    if (loading) {
        return <Preloader />
    }

    if (error) {
        console.error(error);
        return <DisplayError message={error.message} />;
    }

    const { story, story: { title, description, _id } } = data;

    const onDelete = async e => {
        try {
            console.log('delete story');
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='container'>
            <h3>
                {title}
            </h3>
            <p className="flow-text">
                {description}
            </p>
            <button className="btn red" onClick={onDelete}>
                <i className="material-icons left">delete</i> Delete
            </button>
            <EditStory story={story} />
        </div>
    )
}

export default SingleStory;


