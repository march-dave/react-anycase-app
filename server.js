require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const path = require('path');
const weatherRouter = require('./src/api/weather');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));
app.use(weatherRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
}); 