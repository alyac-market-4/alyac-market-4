# 4조 막내온탑 알약 마켓
## 목차
- [1. 프로젝트 소개](#1프로젝트-소개)
- [2. 주요 기능](#2주요-기능)
- [3. 기술 스택](#3기술-스택)
- [4. 설치 및 실행 방법](#4설치-및-실행-방법)
- [5. 배포 URL](#5배포-url)
- [6. 팀원 소개](#6팀원-소개)
---
## 1.프로젝트 소개
- Alyac Market은 소셜 미디어 및 전자상거래 기능을 제공하는 웹 퍼블리싱 입니다. JWT 기반 인증, 게시글 관리, 팔로우 시스템, 상품 관리 등의 기능을 포함합니다.

## 2.주요 기능
**👤 사용자/관리자 관리**
- 로그인한 사용자는 자신의 게시글 및 상품을 등록/수정/삭제 가능
- 사용자의 행동이 즉각 반영되도록 알림 메시지 구현

**📂 게시글 및 상품 관리**
- 게시글 및 상품 등록(제목, 설명, 이미지, URL 등)
- 이미지 업로드
- 게시글 목록/상세 페이지 구현
- 썸네일 및 이미지 확대 구현

**🔍 부가 기능**
- 계정 ID 검색
- 페이지네이션
- 채팅 기능
- 반응형 레이아웃(모바일·태블릿·데스크톱 대응)

## 3.기술 스택
#### Frontend

* **React**
  확장성과 유지보수성이 높고, 활발하고 성숙한 생태계를 보유한 UI 라이브러리

* **TypeScript**
  정적 타입을 통해 코드 안정성과 협업 효율 향상

* **Vite**
  빠른 개발 서버와 빌드 속도로 개발 생산성 향상

---

#### State Management

* **Zustand**
  간결한 API로 전역 상태 관리를 단순하게 구성

---

#### Server State & API

* **Axios**
  공통 설정을 적용하여 API 호출 구조를 일관되게 관리

* **TanStack Query**
  서버 상태 캐싱 및 비동기 데이터 관리를 통해 API 통신 효율 향상

---

#### Form & Validation

* **React Hook Form**
  성능 중심의 폼 상태 관리

* **Zod**
  스키마 기반 데이터 검증 및 TypeScript 타입 추론 지원

---

#### Routing

* **React Router**
  SPA 환경에서 페이지 라우팅 및 URL 관리

---

#### Styling & UI

* **Tailwind CSS**
  유틸리티 기반 스타일링으로 빠른 UI 개발 가능

* **shadcn/ui**
  접근성과 커스터마이징이 용이한 컴포넌트 라이브러리

* **lucide-react**
  가볍고 일관된 아이콘 시스템 제공

---

#### Backend / BaaS

* **Firebase**
  BaaS 기반 백엔드 서비스로 빠른 개발 환경 제공
  NoSQL 구조의 유연성과 낮은 학습 곡선

---

#### Deployment

* **Vercel**
  정적 사이트 배포 최적화 및 CI/CD 자동화 지원

## 4.설치 및 실행 방법
#### 4 - 1. Clone Repository

레포지토리를 클론합니다.

```bash
git clone https://github.com/alyac-market-4/alyac-market-4.git
cd project-name
```

#### 4 - 2. Install Dependencies

프로젝트에 필요한 패키지를 설치합니다.

```bash
npm install
```

#### 4 - 3. Environment Variables

프로젝트 실행을 위해 `.env` 파일을 생성합니다.

```bash
cp .env.example .env
```

필요한 환경 변수 예시

```
VITE_API_URL=your_api_url
```

#### 4 - 4. Run Development Server

개발 서버를 실행합니다.

```bash
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```
http://localhost:5173
```

#### 4 - 5. Build

프로덕션 빌드를 생성합니다.

```bash
npm run build
```

#### 4 - 6. Preview Build

빌드된 프로젝트를 로컬에서 미리 확인할 수 있습니다.

```bash
npm run preview
```

---


## 5.배포 URL
- 추가예정
## 6.팀원 소개
| 이름     |  역할  | 세부역할                |             github url               |
| -------- | ----- | ---------------------- |-------------------------------------- |
| 정성민   | 팀장   | - 피드, 검색 카테고리   | https://github.com/sungminjung066-lang |
| 신영환   | 팀원   | - 프로필, 채팅 카테고리 | https://github.com/Catailog            |
| 박재영   | 팀원   | - 인증 카테고리         | https://github.com/wodud2626          |
| 김연화   | 팀원   | - 제품 카테고리         | https://github.com/yeonaa95           |
| 장화연   | 팀원   | - 기타 카테고리         | https://github.com/Hwayeon842         |
