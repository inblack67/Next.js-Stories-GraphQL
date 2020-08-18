import StoryModel from '../models/Story'

const stories = [
    {
        "title": "Story1",
        "description": "lorem1"
    },
    {
        "title": "Story2",
        "description": "lorem2"
    },
]

export const editDB = async () => {
    await StoryModel.insertMany(stories);
}