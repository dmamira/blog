import React from 'react';
import PostCard from '../components/postCard';

export const getStaticProps = async () => {
  const p = 0;
  const fetch = require('node-fetch');
  const response = await fetch(`https://dai.microcms.io/api/v1/posts?limit=5`, {
    method: 'GET',
    headers: {
      'X-API-KEY': process.env.APIKEY
    }
  });
  const posts = await response.json()
  return { props: { posts: posts } };
}

const Home = (props) => {
  return (
    <PostCard posts={props.posts} />
  )
}

export default Home;