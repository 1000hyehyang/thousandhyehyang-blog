// src/data/articles.ts
import { Article } from '../components/ArticleCard'

export const articles: Article[] = [
  {
    id: 1,
    title: 'UX 리서처가 양말 파는 사장님이 된 이유',
    description: '사업자 등록부터 판매까지, 직접 부딪친 이야기.',
    date: '2025년 4월 10일',
    author: '정명화',
    thumbnail: 'https://static.toss.im/illusts-content/img-socks-research-blue-4.png',
    category: '디자인',
  },
  {
    id: 2,
    title: '토스 프론트엔드에 이력서 없이 지원하세요',
    description: '이력서 없이 리포지터리 링크로 지원할 수 있어요.',
    date: '2025년 4월 8일',
    author: '박서진',
    thumbnail: 'https://static.toss.im/ipd-tcs/toss_core/live/eb8c2887-93f5-4e9f-a8d6-4e7403dd3a98/bg.jpg',
    category: '개발',
  },
]
