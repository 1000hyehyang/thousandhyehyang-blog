import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import CategoryTabs from "../components/CategoryTabs";
import Pagination from "../components/Pagination";
import TrendingPosts from "../components/TrendingPosts";
import { getPagedPosts, Post } from "../api/postApi";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPagedPosts(currentPage - 1, pageSize, selectedCategory);
        setPosts(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("게시글 목록 불러오기 실패:", err);
      }
    };

    fetchPosts();
  }, [selectedCategory, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const trending = [
    { id: 101, title: "TPS 1만을 버티기 위한 캐시 적용기", author: "김경윤" },
    { id: 102, title: "토스피플: 이것도 나니까 할 수 있었다", author: "이지윤" },
    { id: 103, title: "복잡한 컴포넌트의 자료구조 설계법", author: "박건영" },
  ];

  return (
    <>
      <Navbar isOwner={true} />
      <Main>
        <Left>
          <CategoryTabs
            selected={selectedCategory}
            onSelect={(tab) => {
              setSelectedCategory(tab);
              setCurrentPage(1);
            }}
          />
          <ArticleList>
            {posts.map((post) => (
              <ArticleCard
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.content.slice(0, 100) + "..."}
                date={new Date(post.createdAt).toLocaleDateString()}
                author="천혜향"
                thumbnail={post.thumbnailUrl}
                category={post.category}
              />
            ))}
          </ArticleList>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Left>
        <Right>
          <TrendingPosts posts={trending} />
        </Right>
      </Main>
    </>
  );
};

export default Home;

// ---------- 스타일 ----------
const Main = styled.main`
  display: flex;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 3;
`;

const Right = styled.aside`
  flex: 1;
  min-width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
`;
