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
{
  addStory(title: $title, description: $description){
    title,
    description,
    _id
  }
}
`;

