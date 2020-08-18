import { gql } from '@apollo/client'

export const fetchStoriesQuery = gql`
{
  stories{
    title,
    description,
    _id
  }
}
`;

export const addStoryQuery = gql`
mutation StoryMutation($title: String, $description: String){
  addStory(title: $title, description: $description){
    title,
    description,
    _id
  }
}
`;

export const updateStoryQuery = gql`
mutation StoryMutation($title: String, $description: String){
  addStory(title: $title, description: $description){
    title,
    description,
    _id
  }
}
`;

export const deleteStoryQuery = gql`
mutation StoryMutation($title: String, $description: String){
  addStory(title: $title, description: $description){
    title,
    description,
    _id
  }
}
`;

