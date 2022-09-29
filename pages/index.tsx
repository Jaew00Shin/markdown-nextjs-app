import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "../lib/post";
import homeStyles from "../styles/Home.module.css";

// props로 포스트 데이터 가져오기
const Home = ({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) => {
  return (
    <div className={homeStyles.container}>
      <Head>
        {/* 앱 이름 설정 */}
        <title>Jaewoo</title>
        <meta name="description" content="Generated by create next app" />
        {/* 앱 아이콘 설정 */}
        <link
          rel="icon"
          href="https://images.chosun.com/resizer/LBHLdv9vB0M4sCv7V03liNNTqdc=/464x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/EYJJLS4XTNCBU3S6BP3STTVXFY.jpg"
        />
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Jaewoo SHin Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.headingMd}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {/* 리스트 나열하기 */}
          {allPostsData.map(({ id, title, date }) => (
            <li className={homeStyles.listItme} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={homeStyles.lightText}>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;

// 빌드 타임에 포스트 자료 가져오기
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
