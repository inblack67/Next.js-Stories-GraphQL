import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { updateStoryQuery, fetchSingleStoryQuery } from '../utils/queries/Story'
import DisplayError from './DisplayError';
import Preloader from './Preloader';


const EditStory = ({ story: { title, description, _id } }) => {

    const [submitting, setSubmitting] = useState(false);

    const [updateStory, { loading, error, data }] = useMutation(updateStoryQuery, {
        refetchQueries: {
            fetchSingleStoryQuery
        }
    });

    const { handleSubmit, errors, register } = useForm({
        defaultValues: {
            title,
            description
        }
    });

    const onStoryUpdate = ({ title, description }) => {
        setSubmitting(true);
        updateStory({
            variables: {
                id: "123",
                title,
                description
            }
        }).catch(err => {
            M.toast({ html: err });
        });
        setSubmitting(false);
    }

    if (loading) {
        return <Preloader />
    }

    return (
        <div>
            <h3>Edit Story</h3>
            <form onSubmit={handleSubmit(onStoryUpdate)}>
                <div className="input-field">
                    <input type="text" name='title' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="title"></label>
                    {errors.title ? <span className="red-text helper-text">
                        {errors.title.message}
                    </span> : <span className='helper-text'>
                            Title</span>}
                </div>
                <div className="input-field">
                    <input type="text" name='description' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="description"></label>
                    {errors.description ? <span className="red-text helper-text">
                        {errors.description.message}
                    </span> : <span className='helper-text'>
                            Description</span>}
                </div>
                <div className="input-field">
                    <button disabled={submitting} type="submit" className='blue btn'>
                        Update Story
                    </button>
                </div>
            </form>
        </div>
    )
}

EditStory.propTypes = {
    story: PropTypes.object.isRequired,
}


export default EditStory;