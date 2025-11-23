# 👟 신발 공동구매 앱 (Shoe Split Purchase App)

신발가게의 1+1 할인(두 번째 신발 50% 할인)을 근처 사람과 함께 구매하여 비용을 절약하는 모바일 웹 앱입니다.

## 🎯 주요 기능

### 1. 신발 딜 등록
- 신발 가게 이름, 모델, 정가 입력
- 현재 위치 또는 수동으로 위치 설정
- 연락처 및 유효기간 설정

### 2. 근처 공동구매 파트너 찾기
- 사용자 위치 기반 근처 딜 표시
- 거리 필터링 (1km ~ 20km)
- 거리별 정렬

### 3. 비용 계산
- 1+1 할인 적용 시 1인당 부담금 자동 계산
- 절약 금액 및 비율 표시
- 상세 비용 분석

## 💰 비용 계산 방식

```
예시: 신발 정가 150,000원

첫 번째 신발: 150,000원 (정가)
두 번째 신발:  75,000원 (50% 할인)
─────────────────────────
총 금액:      225,000원
÷ 2명
─────────────────────────
1인당 부담:   112,500원

절약 금액: 37,500원 (25%)
```

## 📁 프로젝트 구조

```
src/shoeSplit/
├── actions.js              # Redux 액션 생성자
├── reducer.js              # Redux 리듀서
├── types.js                # 액션 타입 상수
├── utils.js                # 비용 계산 및 거리 계산 유틸리티
└── components/
    ├── ShoeSplitApp.js     # 메인 앱 컴포넌트
    ├── ShoeSplitApp.css
    ├── ShoeDealForm.js     # 딜 등록 폼
    ├── ShoeDealForm.css
    ├── DealList.js         # 딜 목록
    ├── DealList.css
    ├── DealCard.js         # 개별 딜 카드
    ├── DealCard.css
    ├── CostCalculator.js   # 비용 계산기
    └── CostCalculator.css
```

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

## 🛠️ 기술 스택

- **React 16.11.0** - UI 프레임워크
- **Redux** - 상태 관리
- **Geolocation API** - 위치 기반 서비스
- **CSS3** - 스타일링

## 📱 주요 화면

### 1. 딜 찾기
- 근처 등록된 공동구매 딜 목록 표시
- 거리, 가격, 절약 금액 표시
- 거리 필터링 기능

### 2. 딜 등록
- 신발 정보 입력
- 위치 자동 감지 또는 수동 입력
- 연락처 및 유효기간 설정

### 3. 비용 계산
- 간단한 계산기
- 정가 입력 시 자동으로 1인당 부담금 계산
- 비용 분석 및 비교

## 🎨 특징

- **반응형 디자인**: 모바일 및 데스크톱 지원
- **실시간 위치 추적**: Geolocation API 활용
- **거리 계산**: Haversine 공식 사용
- **직관적인 UI**: 탭 기반 네비게이션
- **비용 투명성**: 상세한 비용 분석 제공

## 🔧 주요 함수

### calculateSplitCost(originalPrice)
1+1 할인 적용 시 비용을 계산합니다.

**반환값:**
- `originalPrice`: 원가
- `firstShoePrice`: 첫 번째 신발 가격
- `secondShoePrice`: 두 번째 신발 가격 (50% 할인)
- `totalPrice`: 총 가격
- `costPerPerson`: 1인당 부담금
- `savings`: 절약 금액
- `savingsPercent`: 절약 비율

### calculateDistance(location1, location2)
두 지점 간의 거리를 계산합니다 (Haversine formula).

**매개변수:**
- `location1`: {lat, lng}
- `location2`: {lat, lng}

**반환값:** 거리 (km)

### getNearbyDeals(deals, userLocation, maxDistance)
근처 딜을 필터링하고 정렬합니다.

**매개변수:**
- `deals`: 전체 딜 배열
- `userLocation`: 사용자 위치 {lat, lng}
- `maxDistance`: 최대 거리 (km, 기본값: 5)

**반환값:** 거리순으로 정렬된 근처 딜 배열

## 📝 Redux 스토어 구조

```javascript
{
  shoeSplit: {
    deals: [
      {
        id: Number,
        storeName: String,
        shoeModel: String,
        originalPrice: Number,
        location: { lat: Number, lng: Number },
        contactInfo: String,
        expiryDate: String,
        status: String,
        createdAt: String
      }
    ],
    userLocation: { lat: Number, lng: Number },
    matches: { [dealId]: partnerId }
  }
}
```

## 🎯 사용 시나리오

1. **딜 등록자**:
   - 신발가게에서 1+1 행사 발견
   - 앱에서 딜 등록 (위치, 가격, 연락처)
   - 근처 사람이 연락하기를 대기

2. **딜 참여자**:
   - 앱에서 근처 딜 검색
   - 관심있는 딜 선택
   - 비용 확인 후 연락하기
   - 만나서 함께 구매 및 비용 분할

## 🔒 개인정보 보호

- 위치 정보는 딜 등록 시에만 저장
- 연락처는 등록자가 직접 입력한 정보만 표시
- 실제 앱 배포 시 추가 보안 조치 필요

## 🚧 향후 개발 계획

- [ ] 사용자 인증 및 프로필
- [ ] 실시간 채팅 기능
- [ ] 거래 완료 확인 시스템
- [ ] 리뷰 및 평점 시스템
- [ ] 푸시 알림
- [ ] 지도 UI 통합
- [ ] 백엔드 API 연동
- [ ] 모바일 앱 (React Native)

## 📄 라이선스

MIT License

## 👨‍💻 개발자

개발 시작: 2025년 11월 23일
