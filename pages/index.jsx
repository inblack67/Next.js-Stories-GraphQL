import { useQuery, gql } from '@apollo/client';
import { fetchStoriesQuery } from '../utils/queries/Story';
import Preloader from '../components/Preloader';
import Link from 'next/link'
import { initializeApollo } from '../utils/apollo'

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
          <Link as={`/story/${story._id}`} href='/story/[id]'>
            <a>
              {story.title}
            </a>
          </Link>
        </li>)}
      </ul>
    </div>
  )
}


export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: fetchStoriesQuery
  });
  return { props: {
    initialApolloState: apolloClient.cache.extract()
  } }
}