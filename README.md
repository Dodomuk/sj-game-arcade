# 승진이의 게임 아케이드 🎮

재미있는 게임을 즐길 수 있는 React Native/Expo 기반 모바일 앱입니다.

## 게임 목록

### 1. 연예인 맞추기 🌟
연예인 사진을 보고 이름을 맞혀보세요!
- 3명의 연예인 사진 제시
- "정답 공개" 버튼으로 정답 확인
- 재시작 가능

### 2. 메모리 게임 🎴
카드를 뒤집어 연예인 쌍을 찾으세요!
- 12개의 카드 (6쌍)
- 클릭 횟수 제한 없음
- 최소 클릭으로 모든 쌍을 맞추는 것이 목표

### 3. 반응속도 게임 ⚡
반응속도를 측정하는 게임
- 5라운드 진행
- 색상이 변할 때 빠르게 클릭
- 평균 반응 시간 확인

## 설치 및 실행

### 필수 요구사항
- Node.js 16.x 이상
- npm 또는 yarn
- Expo Go 앱 (모바일 테스트용)

### 개발 환경 실행

```bash
# 의존성 설치
npm install

# Expo 개발 서버 실행
npm start
```

### 모바일 기기에서 테스트

1. iOS: 카메라로 QR코드 스캔 (기본 카메라 앱)
2. Android: Expo Go 앱으로 QR코드 스캔

### 플랫폼별 빌드

```bash
# iOS
npm run ios

# Android
npm run android

# Web (선택사항)
npm run web
```

## 프로젝트 구조

```
sj-game-arcade/
├── App.tsx                   # 메인 앱 (네비게이션)
├── index.tsx                 # 앱 엔트리포인트
├── app.json                  # Expo 설정
├── babel.config.js           # Babel 설정
├── screens/
│   ├── HomeScreen.tsx            # 홈 화면
│   ├── GuessCelebrityScreen.tsx  # 연예인 맞추기
│   ├── MemoryGameScreen.tsx      # 메모리 게임
│   └── ReactionGameScreen.tsx    # 반응속도 게임
├── types/
│   └── game.ts               # 타입 정의
├── data/
│   └── celebrities.ts        # 게임 데이터
└── public/
    └── images/               # 연예인 이미지
        ├── celebrity-1.jpg
        ├── celebrity-2.jpg
        └── ...
```

## 이미지 추가 방법

1. `public/images/` 폴더에 연예인 사진 추가
2. 파일명 형식: `celebrity-1.jpg`, `celebrity-2.jpg`, ...
3. `data/celebrities.ts` 에서 이미지 경로 확인

## EAS 빌드 및 배포

### 빌드 (iOS/Android)

1. [EAS CLI 설치](https://docs.expo.dev/build/setup/)
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. 빌드 실행
   ```bash
   eas build --platform ios
   eas build --platform android
   ```

3. 앱 제출
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

## 기술 스택

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **Styling**: React Native StyleSheet
- **Build**: Expo Application Services (EAS)

## 라이선스

MIT

## 개발자

정동묵 (dodomuk)
