import { gql } from '@apollo/client'

export const allInOne = gql`
{
    addStory(title:"Story3", description:"lorem3"){
      title
    }
    stories{
      title,
      _id,
      description
    },
    story(id: "5f3ba9e24beaac0bacd431f7"){
      title
    }
  }
`;