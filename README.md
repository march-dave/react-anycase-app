## Wallaby.js

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github)](https://wallabyjs.com/oss/)

This repository contributors are welcome to use
[Wallaby.js OSS License](https://wallabyjs.com/oss/) to get
test results immediately as you type, and see the results in
your editor right next to your code.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


## yarn test --coverage
yarn test --env=jsdom --coverage


## free images url
https://pngtree.com/so/hamburger

## 토론토 날씨 컴포넌트

이 프로젝트에는 토론토의 현재 날씨와 5일 예보를 보여주는 날씨 컴포넌트가 포함되어 있습니다.

### 설정 방법

1. Node.js 24에서 `npm ci`로 의존성을 설치하세요. Chromium 다운로드가 제한된 환경에서 날씨 앱만 실행할 때는 `PUPPETEER_SKIP_DOWNLOAD=true npm ci`를 사용할 수 있습니다.
2. [OpenWeatherMap](https://openweathermap.org/)에서 현재 날씨 및 5일 예보를 조회할 수 있는 API 키를 발급받으세요. 프로젝트 루트의 `.env.example`을 `.env.local`로 복사하고 `OPENWEATHER_API_KEY`에 발급받은 값을 입력하세요. 배포 환경에서는 같은 이름의 서버 환경 변수로 설정할 수 있습니다.
3. `npm start`로 개발 서버를 실행하세요. 이 서버가 화면과 `/api/weather`를 함께 제공합니다. 프로덕션에서는 `npm run build` 후 `npm run serve`로 실행하세요. 두 모드 모두 기본 포트는 3000이며, 키를 변경한 뒤에는 서버를 재시작하세요.

브라우저는 같은 서버의 `/api/weather`를 호출하고, 서버가 `api.openweathermap.org`에 접속합니다. 키가 없으면 서버가 HTTP 503을 반환하고 화면에 설정 안내가 표시됩니다. 제공업체 오류는 HTTP 502, 시간 초과는 HTTP 504로 반환됩니다.

Docker로 개발할 때는 키를 입력한 `.env.local`이 있는 디렉터리에서 `docker compose --env-file .env.local up --build`를 실행하세요. 호스트의 8082번 포트에서 앱을 열 수 있습니다.

### 사용 방법

Weather 컴포넌트를 다음과 같이 임포트하여 사용할 수 있습니다:

```jsx
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <Weather />
    </div>
  );
}
```

### 특징

- 토론토의 현재 온도, 날씨 상태, 체감 온도, 습도, 풍속 표시
- 5일 날씨 예보 (일별 최고/최저 온도 및 날씨 상태)
- 반응형 디자인
- 스타일드 컴포넌트를 사용한 세련된 UI
