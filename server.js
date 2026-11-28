const path = require('path');
const express = require('express');
const weatherRouter = require('./src/api/weather');

require('dotenv').config({
  path: ['.env.local', '.env'].map(file => path.join(__dirname, file))
});

const app = express();
const build = path.join(__dirname, 'build');

app.use('/api', weatherRouter);
app.use(express.static(build));
app.get('/{*path}', (req, res) => res.sendFile(path.join(build, 'index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
