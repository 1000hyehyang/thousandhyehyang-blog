import { useState } from "react";
import styled from "styled-components";
import TextEditor from "../components/TextEditor";
import { FaChevronDown } from "react-icons/fa";
import { createPost } from "../api/postApi";
import { uploadImage } from "../api/imageApi";

const categories = ["개발", "데이터/ML", "디자인"];

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [content, setContent] = useState(""); // ✨ 에디터 연동용 상태

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTag.trim()) {
      e.preventDefault();
      setTags((prev) => [...prev, inputTag.trim()]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const url = await uploadImage(file);
        setThumbnailUrl(url);
      } catch (err) {
        console.error(err);
        alert("썸네일 업로드 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSubmit = async () => {
    if (!title || !category || !content) {
      alert("제목, 카테고리, 본문은 필수입니다.");
      return;
    }

    const payload = {
      title,
      category,
      content,
      tags: tags.join(","),
      thumbnailUrl,
    };

    try {
      const id = await createPost(payload);
      alert("글이 성공적으로 등록되었습니다.");
      window.location.href = `/post/${id}`;
    } catch (err) {
      console.error(err);
      alert("글 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <Header>글 작성하기</Header>

      <Field>
        <Input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>

      <Field>
        <SelectWrapper>
          <StyledSelect
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리를 선택하세요</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </StyledSelect>
          <ArrowIcon />
        </SelectWrapper>
      </Field>

      <Field>
        <SmallTagInput
          type="text"
          placeholder="태그를 입력하고 Enter를 누르세요"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={handleAddTag}
        />
        <TagList>
          {tags.map((tag) => (
            <Tag key={tag} onClick={() => handleRemoveTag(tag)}>
              #{tag} <RemoveTag>&times;</RemoveTag>
            </Tag>
          ))}
        </TagList>
      </Field>

      <Field>
        <ThumbnailInput>
          <UploadButton htmlFor="thumbnail">썸네일 업로드</UploadButton>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </ThumbnailInput>
        {thumbnailPreview && (
          <ThumbnailPreview src={thumbnailPreview} alt="썸네일 미리보기" />
        )}
      </Field>

      <Field>
        <TextEditor value={content} onChange={setContent} />
      </Field>

      <Field>
        <ButtonWrapper>
          <SubmitButton onClick={handleSubmit}>게시하기</SubmitButton>
        </ButtonWrapper>
      </Field>
    </PageWrapper>
  );
};

export default WritePage;

const PageWrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #d1d5db;

  &:focus {
    outline: none;
    border-color: #ffa726;
    background-color: #ffffff;
  }
`;

const SmallTagInput = styled(Input)`
  font-size: 0.9rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const ArrowIcon = styled(FaChevronDown)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.9rem;
  color: #6b7280;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #fff;
  color: #374151;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;

  &:focus {
    outline: none;
    border-color: #ffa726;
  }

  option {
    background: #ffffff;
    color: #111827;
    padding: 0.5rem;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  background-color: #fff5e1;
  color: #ffb94f;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #ffe8c2;
  }
`;

const RemoveTag = styled.span`
  margin-left: 0.5rem;
  color: #f59e0b;
`;

const ThumbnailInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UploadButton = styled.label`
  background-color: #ffb94f;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #ffa726;
  }
`;

const SubmitButton = styled.label`
  background-color: #ffb94f;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #ffa726;
  }
`;

const ThumbnailPreview = styled.img`
  margin-top: 1rem;
  max-width: 50%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
