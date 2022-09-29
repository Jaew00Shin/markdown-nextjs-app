import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { getAllPostIds, getPostData } from "../../lib/post";
import Head from "next/head";
import homeStyles from "../../styles/Home.module.css";

const Post = ({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingLg}>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />{" "}
        {/* html 렌더링해주는 속성 */}
      </article>
    </div>
  );
};

export default Post;

// Post 데이터를 가져와야 하는 경로 목록을 가져오기
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  // [{params: {id: 'pre-rendering'}}, {params:{id:'ssg-ssr'}}]
  return {
    paths,
    fallback: false,
  };
};

// 전달받은 아이디를 이용해서 해당 포스트의 데이터 가져오기
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params 는 {id:'ssg-ssr'}
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
