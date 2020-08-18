import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { addStoryQuery } from '../utils/queries/Story'
import { useMutation } from '@apollo/client'
import Preloader from '../components/Preloader'

const AddStory = () => {

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);

    const { handleSubmit, errors, register } = useForm();

    const [addStory, { loading, error, data }] = useMutation(addStoryQuery);

    const onAdd = formData => {

        addStory({
            variables: formData
        });

        // router.push('/');
    }

    if (error) {
        console.error(error);
    }

    if (loading) {
        return <Preloader />
    }

    console.log(data);

    return (
        <div className='container'>
            <h1>Add Story</h1>
            <form onSubmit={handleSubmit(onAdd)}>
                <div className="input-field">
                    <input type="text" name='title' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="title">Title</label>
                    {errors.title ? <span className="red-text helper-text">
                        {errors.title.message}
                    </span> : null}
                </div>
                <div className="input-field">
                    <input type="text" name='description' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="description">Description</label>
                    {errors.description ? <span className="red-text helper-text">
                        {errors.description.message}
                    </span> : null}
                </div>
                <div className="input-field">
                    <button disabled={submitting} type="submit" className='btn red'>
                        Add Story
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddStory
