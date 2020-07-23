import React from "react";
import PostCard from "../components/postCard";
import Head from "next/head";
import Pagination from "@material-ui/lab/Pagination";
import Router from "next/router";


interface Props {
  posts: {
    contents: [
      {
        id: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        body: string;
        tags: [
          {
            id: string;
            createdAt: string;
            updatedAt: string;
            tags: string;
          }
        ];
        description: string;
        image?: {
          url: string;
        };
      }
    ];
    totalCount: number;
    limit: number;
    offset: number;
  };
}

export const getStaticProps = async () => {
  const p = 0;
  const fetch = require("node-fetch");
  const response = await fetch(`https://dai.microcms.io/api/v1/posts?limit=5`, {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.APIKEY,
    },
  });
  const posts = await response.json();
  return { props: { posts: posts } };
};

const Home = (props: Props) => {
  const onChangePage = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, p) => {
    if (p == 1) {
      Router.push("/");
    }
    Router.push(`/page/[number]`, `/page/${p}`);
  };
  return (
    <>
      <Head>
        <title>Dai's Blog</title>
        <meta name="description" content="思ったことを書き連ねます。" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@dmarai0422" />
        <meta name="og:title" content="Dai's Blog" />
        <meta name="og:description" content="思ったことを書き連ねます。" />
        <meta name="og:url" content={`https://blog.dai.gd/`} />
        <meta name="og:image" content="https://blog.dai.gd/icon.png" />
      </Head>
      {props.posts.contents.map((one) => {
        return <PostCard post={one} />;
      })}
      <div className="paginationWrapper">
        <Pagination
          onChange={onChangePage}
          defaultPage={1}
          count={Math.ceil(props.posts.totalCount / props.posts.limit)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>
      <style jsx>{`
        .paginationWrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default Home;
