import Head from 'next/head';
import Link from 'next/link';

export default function MainLayout({ children, title = 'Next App' }) {
  return (
    <>
      <Head>
        <title>{title} | Next Course</title>
        <meta name="keywords" content="next,javascript,nextjs,react" />
        <meta name="description" content="" />
        <meta charSet="utf-8" />
      </Head>
      <nav>
        <Link href={'/'}>
          <a>Home</a>
        </Link>
        <Link href={'/posts'}>
          <a>Posts</a>
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
