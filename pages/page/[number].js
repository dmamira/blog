import React from 'react';
import PostCard from '../../components/postCard'
import Router from 'next/router'

export const getStaticProps = async ctx => {
  const p = ctx.params ? Number(ctx.params.number) - 1 : 0;
  const fetch = require('node-fetch');
  const posts = await fetch(`https://dai.microcms.io/api/v1/posts?limit=5&offset=${p * 5}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': process.env.APIKEY
    }
  });
  return { props: { posts: await posts.json(), number: ctx.params.number } };
}

export const getStaticPaths = async () => {
  const fetch = require('node-fetch');
  const response = await fetch(`https://dai.microcms.io/api/v1/posts?limit=5`, {
    method: 'GET',
    headers: {
      'X-API-KEY': process.env.APIKEY
    }
  });
  const posts = await response.json();
  const totalCount = posts.totalCount
  const limit = posts.limit;
  const numberArray = [];
  for (let i = 1; i <= Math.ceil(totalCount / limit); i++) {
    numberArray.push({ params: { number: i.toString() } });
  }
  return {paths:numberArray,fallback:false}
}

class Home extends React.Component {
  render() {
    return (
      <PostCard posts={this.props.posts} number={this.props.number} />
    )
  }
}

export default Home;