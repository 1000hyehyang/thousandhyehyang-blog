import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CommentSection from "../components/CommentSection";
import { getPostById, Post } from "../api/postApi";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const data = await getPostById(Number(id));
          setPost(data);
        }
      } catch (error) {
        console.error("글 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!post) return <div>존재하지 않는 글입니다.</div>;

  return (
    <>
      <Navbar />
      <PageWrapper>
        <HeaderImage src={post.thumbnailUrl} alt="대표 이미지" />
        <Content>
          <Title>{post.title}</Title>
          <TagWrapper>
            {post.tags.split(",").map((tag) => (
              <Tag key={tag}>#{tag}</Tag>
            ))}
          </TagWrapper>
          <Meta>
            <Author>천혜향</Author>
            <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
          </Meta>
          <MarkdownWrapper>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </MarkdownWrapper>
          <CommentSection postId={post.id} />
        </Content>
      </PageWrapper>
    </>
  );
};

export default PostDetail;

// ---------- 스타일 ----------
const PageWrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: clamp(2rem, 4vw, 4rem) clamp(1.5rem, 5vw, 2rem);
`;

const HeaderImage = styled.img`
  width: 100%;
  max-height: 360px;
  object-fit: contain;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 2vw, 2rem);
`;

const Title = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #111827;
  line-height: 1.4;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 0.85rem;
  color: #ffa726;
  background-color: rgb(255, 242, 221);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: #6b7280;
`;

const Author = styled.span`
  font-size: 0.95rem;
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: #9ca3af;
`;

const MarkdownWrapper = styled.div`
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  line-height: 1.9;
  color: #374151;

  h2 {
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    margin: 1rem 0;
  }

  ul {
    margin-left: 1.25rem;
    list-style: disc;
  }
`;
