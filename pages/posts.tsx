import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { MyPost } from '../interfaces/post';

interface PostsPageProps {
  posts: MyPost[];
}

export default function Posts({ posts: serverPosts }: PostsPageProps) {
  const [posts, setPosts] = useState(serverPosts);

  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.API_URL}/posts`);
      const json = await response.json();
      setPosts(json);
    }

    if (!serverPosts) {
      load();
    }
  }, []);

  if (!posts) {
    return (
      <Layout>
        <p>Loading ...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Posts Page | Next Course</title>
      </Head>
      <h1>Posts Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/[id]`} as={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps({ query, req }: NextPageContext) {
  if (!req) {
    return { posts: null };
  }

  const response = await fetch(`${process.env.API_URL}/posts`);
  const posts = await response.json();

  return { props: { posts } };
}
