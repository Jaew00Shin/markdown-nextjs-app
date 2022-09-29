import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");
// process.cwd() : 현재 작업 디렉토리, node 명령을 실행한 곳
// /Users/shinjaewoo/study/development/nextjs/nextjs-app
// path.join() 쓰면 자동으로 / 처리 해줌

export function getSortedPostsData() {
  // /posts 파일 이름을 잡아주기
  const fileNames = fs.readdirSync(postsDirectory); // 해당 디렉토리 내에 모든 파일 불러오기

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // 확장자 없애주기
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8"); // 파일 내용 읽기 , 'utf-8' 있어야 한글 읽을 수 있음
    const matterResult = matter(fileContents); // Use gray-matter to parse the post metadata section
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  // 날짜 따라 내림차순 정렬
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);
  const processedContent = await remark() // use remark to convert markdown into HTML string
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
