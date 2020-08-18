import { useQuery, gql } from '@apollo/client';
import { fetchStoriesQuery } from '../utils/queries/Story';
import Preloader from '../components/Preloader';

export default function Home() {

  const { data, loading, error } = useQuery(fetchStoriesQuery);

  if (loading) {
    return <Preloader />
  }

  if (error) {
    console.error(error);
  }

  const { stories } = data;

  return (
    <div className='container'>
      <h3>Stories</h3>
      <ul className="collection">
        {stories.map(story => <li key={story._id} className='collection-item'>
          {story.title}
        </li>)}
      </ul>
    </div>
  )
}
