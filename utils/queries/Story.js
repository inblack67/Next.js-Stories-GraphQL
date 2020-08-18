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

export const fetchSingleStoryQuery = gql`
query Query($id: ID!) {
  story(id: $id) {
    title
    description
    _id
  }
}
`;

export const addStoryQuery = gql`
mutation StoryMutation($title: String!, $description: String!){
  addStory(title: $title, description: $description){
    title,
    description,
    _id
  }
}
`;

export const updateStoryQuery = gql`
mutation StoryMutation($id: ID!, $title: String, $description: String!){
  updateStory(id:$id, title: $title, description: $description){
    title,
    description,
    _id
  }
}
`;

export const deleteStoryQuery = gql`
mutation StoryMutation($id: ID!){
  deleteStory(id:$id){
    title
  }
}

`;

