import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import { MyPost } from '../../interfaces/post';

interface PostPageProps {
  post: MyPost;
}

export default function Post({ post: serverPost }: PostPageProps) {
  const [post, setPost] = useState(serverPost);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.API_URL}/posts/${router.query.id}`);
      const data = await response.json();
      setPost(data);
    }

    if (!serverPost) {
      load();
    }
  }, []);

  if (!post) {
    return (
      <Layout>
        <p>Loading ...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <Link href={'/posts'}>
        <a>Back to all posts</a>
      </Link>
    </Layout>
  );
}

interface PostNextPageContext extends NextPageContext {
  query: {
    id: string;
  };
}

export async function getServerSideProps({ query, req }: PostNextPageContext) {
  if (!req) {
    return { post: null };
  }
  const response = await fetch(`${process.env.API_URL}/posts/${query.id}`);
  const post = await response.json();

  return { props: { post } };
}
