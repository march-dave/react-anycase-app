// 캐나다 토론토의 오늘 날씨를 가져오는 Playwright 스크립트
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  // weather.com의 토론토 날씨 페이지로 이동
  await page.goto('https://weather.com/weather/today/l/CAON0696:1:CA');

  // 날씨 정보 추출 (기온, 상태)
  const weather = await page.evaluate(() => {
    const temp = document.querySelector('[data-testid="TemperatureValue"]')?.textContent;
    const desc = document.querySelector('[data-testid="wxPhrase"]')?.textContent;
    return { temp, desc };
  });

  console.log(JSON.stringify(weather, null, 2));
  await browser.close();
})();
