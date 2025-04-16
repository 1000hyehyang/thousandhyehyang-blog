import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import debounce from "lodash.debounce";
import { uploadImage } from "../api/imageApi";

interface TextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [images, setImages] = useState<
    { id: number; file: File; url: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(value);
  const debouncedPreview = useRef(debounce(setPreview, 300)).current;

  useEffect(() => {
    debouncedPreview(value);
  }, [value, debouncedPreview]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newImages = Array.from(e.target.files).map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const insertImageToMarkdown = async (image: { file: File }) => {
    try {
      const url = await uploadImage(image.file);
      const markdown = `![이미지](${url})`;
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.slice(0, start) + markdown + value.slice(end);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          start + markdown.length;
        textarea.focus();
      }, 0);
    } catch (err) {
      console.error(err);
      alert("이미지 업로드 중 오류 발생");
    }
  };

  const removeImage = (id: number) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
  };

  return (
    <EditorContainer>
      <TabMenu>
        <Tab active={activeTab === "edit"} onClick={() => setActiveTab("edit")}>
          글쓰기
        </Tab>
        <Tab
          active={activeTab === "preview"}
          onClick={() => setActiveTab("preview")}
        >
          미리보기
        </Tab>
      </TabMenu>

      {activeTab === "edit" ? (
        <>
          <EditorHeader>
            <ImageUploadButton onClick={() => fileInputRef.current?.click()}>
              <FaImage size={18} /> 이미지 삽입
            </ImageUploadButton>
            <HiddenInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </EditorHeader>

          <EditorTextarea
            ref={textareaRef}
            placeholder="마크다운 문법으로 작성해보세요!"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />

          <ImagePreviewContainer>
            {images.map((img) => (
              <ImagePreview key={img.id}>
                <img src={img.url} alt="preview" />
                <PreviewButtonGroup>
                  <InsertButton onClick={() => insertImageToMarkdown(img)}>
                    삽입
                  </InsertButton>
                  <RemoveButton onClick={() => removeImage(img.id)}>
                    삭제
                  </RemoveButton>
                </PreviewButtonGroup>
              </ImagePreview>
            ))}
          </ImagePreviewContainer>
        </>
      ) : (
        <MarkdownWrapper>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview}</ReactMarkdown>
        </MarkdownWrapper>
      )}
    </EditorContainer>
  );
};

export default TextEditor;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TabMenu = styled.div`
  display: flex;
  border-bottom: 2px solid #e5e7eb;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  color: ${({ active }) => (active ? "#ffb94f" : "#6b7280")};
  border-bottom: ${({ active }) => (active ? "2px solid #ffb94f" : "none")};
  background: none;
  cursor: pointer;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const ImageUploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  color: #fff;
  background-color: #ffb94f;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #ffa726;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const EditorTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  border: none;
  resize: none;
  font-size: 1rem;
  line-height: 1.5;
  color: #374151;
  background-color: #f9fafb;
  padding: 12px;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border: 1px solid #ffa726;
    background-color: #ffffff;
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const PreviewButtonGroup = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 8px 8px;
`;

const InsertButton = styled.button`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
`;

const RemoveButton = styled(InsertButton)`
  background-color: rgba(255, 59, 48, 0.8);

  &:hover {
    background-color: rgba(255, 59, 48, 1);
  }
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

  img {
    max-width: 100%;
    border-radius: 6px;
    margin: 1rem 0;
  }

  code {
    background-color: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: Consolas, monospace;
    font-size: 0.9rem;
  }

  pre {
    background-color: #f4f4f4;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1rem 0;
  }
`;
