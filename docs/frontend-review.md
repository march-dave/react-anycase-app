# 프런트엔드 검토 결과

2026년 11월 26일에 커밋 `9622b15`를 검토했다. 프로덕션 빌드와 테스트는 해당 커밋의 임시 복사본에서 실행했다. 검토를 시작할 때 원본 체크아웃에는 `node_modules/`와 `build/`가 없었고, 포트 3000은 연결을 거부했다.

## 빌드와 화면 렌더링

Node.js 24.22.3에서 기본 `npm run build`는 webpack이 해시를 생성하는 단계에서 OpenSSL 오류로 종료됐다. `NODE_OPTIONS=--openssl-legacy-provider`를 적용하자 Sass 로더가 `node-sass`를 찾지 못했다. 임시 복사본에서 `node_modules/node-sass`가 설치된 `sass` 패키지를 가리키도록 심볼릭 링크를 추가한 뒤 빌드가 성공했다.

이 빌드를 Chromium에서 열고 `/api/weather`에 테스트용 JSON을 반환하자 현재 날씨 항목 5개와 5일 예보 카드가 모두 표시됐다. 저장된 `install_script`와 `start_skill`은 검토 환경에서 열람할 수 없어 실제 스크립트의 내용은 확인하지 못했다.

## 실시간 날씨

| 확인한 경로 | 관찰 결과 |
| --- | --- |
| 프로덕션 서버 | Express 5.1이 [서버의 와일드카드 경로](../server.js#L12)에서 이름 없는 `*`를 거부해 포트를 열기 전에 종료됐다. |
| 개발 서버 | `npm start`로 실행한 서버에 API 프록시 설정이 없어 `GET /api/weather` 요청에 HTTP 404가 반환됐다. |
| HTML 응답 처리 | `/api/weather`가 HTTP 200으로 앱의 HTML을 반환하는 상황을 재현했다. [날씨 컴포넌트](../src/components/Weather.js#L156)가 `current.temperature`를 읽으며 예외를 일으켰고 화면이 비었다. |
| 외부 API 연결 | 검토 환경의 API 키는 예시 값이었고, 외부 연결 허용 목록에 `api.openweathermap.org`가 없었다. 실제 날씨 데이터 수신은 검증하지 못했다. |

## 테스트

`CI=true npm test -- --watchAll=false --runInBand` 실행 결과, 집계된 테스트 16개 중 4개가 통과하고 12개가 실패했다. Jest는 전체 7개 테스트 스위트를 실패로 보고했다.

- [정렬 테스트](../src/utils.test.js#L1)는 존재하지 않는 `./sort`를 가져오다 중단됐다. 이 파일에 선언된 테스트 4개는 실행 건수에서 빠졌다.
- [App 테스트](../src/test/App.test.js#L18)는 현재 화면에 없는 문단을 찾았고, 기존 스냅샷도 현재 컴포넌트와 달랐다.
- [Counter 테스트](../src/Counter.test.js#L1)는 React를 이름 있는 내보내기로 가져와 렌더링 단계에서 실패했다.
