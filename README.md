## Yune

> 이 프로젝트는 웹 기반의 엘리먼트 에디터로, HTML 요소들을 자유롭게 추가하고, 그룹화하며, 정렬할 수 있는 기능을 제공합니다.

<div align ="center">

<img width="1171" alt="image" src="https://github.com/user-attachments/assets/c81b4ed6-214a-4518-8900-e42952ee251f">

</div>

### 🚀 프로젝트 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 🛠 주요 기술 스택

- React
- TypeScript
- Tailwind CSS
- html-to-image

### 💡 주요 기능

**1. 엘리먼트 생성 및 관리**

- div, span, p 태그 생성 기능
- 생성 시 랜덤 배경색 자동 적용
- 선택된 요소 border 하이라이트 (2px)
- 뷰포트와 레이어 패널 양방향 동기화

**2. 그룹 기능**

- 단축키를 통한 그룹 생성 (Ctrl + G)
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
