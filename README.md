## Yune

> 이 프로젝트는 웹 기반의 엘리먼트 에디터로, HTML 요소들을 자유롭게 추가하고, 그룹화하며, 정렬할 수 있는 기능을 제공합니다.

<div align ="center">

<img width="1171" alt="image" src="https://github.com/user-attachments/assets/c81b4ed6-214a-4518-8900-e42952ee251f">

</div>

### 📝 구현 문서

프로젝트의 상세 구현 내용은 [노션 문서](https://hyunzsu.notion.site/Yune-test-155d18f1f868807e8ffdff1828c9b2d1?pvs=4)에서 확인하실 수 있습니다.

- 컴포넌트 구조 및 기능
- 상태 관리 (zustand)
- 성능 최적화

### 🚀 프로젝트 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 🛠 기술 스택

**React + TypeScript**

- 타입 안정성
- 컴포넌트 기반 아키텍처

**Zustand**

- 간단한 상태 관리
- 선택적 구독으로 성능 최적화

```typescript
// ✅ 최적화된 상태 구독
const selectedIds = useElementStore((state) => state.selectedIds);
```

**Tailwind CSS**

- 유틸리티 클래스로 빠른 스타일링
- 드래그 앤 드롭 상태 스타일 관리

**html-to-image**

- 뷰포트 SVG 변환

### 💡 주요 기능

**1. 엘리먼트 생성 및 관리**

- 다양한 HTML 요소 (div, span, p) 생성
- 생성 시 랜덤 배경색 자동 적용
- 마우스 클릭으로 요소 선택 (단일/다중)
- 뷰포트와 레이어 패널 양방향 동기화

**2. 그룹 기능**

- 다중 선택된 요소 그룹화 (Ctrl + G)
- 그룹 해제 (Ctrl + Shift + G)

**3. 정렬 시스템 (Flexbox 기반)**

- 전체 요소 수직/수평 정렬
- 그룹 내부 요소 수직/수평 정렬

**4. 드래그 앤 드롭**

- 요소 순서 자유롭게 변경
- 뷰포트와 레이어 패널 양방향 동기화

**5. 내보내기**

- SVG 형식으로 작업물 다운로드
- 현재 뷰포트 상태 그대로 저장

### 📁 폴더 구조

```
src/
├── components/
│   ├── @common/
│   │   └── Button.tsx
│   ├── Panel/
│   │   ├── ButtonPanel.tsx
│   │   ├── LayerPanel.tsx
│   │   └── index.tsx
│   └── Viewport/
│       ├── Element.tsx
│       └── index.tsx
├── store/
│   └── elementStore.ts
├── hooks/
│   └── useDownloadImage.ts
└── types/
    └── element.ts
```
