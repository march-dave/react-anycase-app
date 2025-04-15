const { chromium } = require('playwright');

async function getBlueJaysResultsFromMLB() {
  // 브라우저 시작
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('MLB 사이트에 접속 중...');
    // MLB 토론토 블루제이스 팀 페이지 접속
    await page.goto('https://www.mlb.com/bluejays', { timeout: 60000 });
    console.log('MLB 페이지 로드 완료');
    
    // 스크린샷 저장
    await page.screenshot({ path: 'bluejays-mlb.png' });
    console.log('MLB 페이지 스크린샷이 bluejays-mlb.png 파일로 저장되었습니다.');
    
    // 최근 경기 결과 찾기
    console.log('최근 경기 결과 찾는 중...');
    
    // 다양한 선택자 시도
    const possibleSelectors = [
      '.score-card, .game-card, .game-box',
      '.game-item',
      '.scores-card',
      '.scores-ticker',
      '.game-details',
      '.game-summary',
      '.scores-scoreboard'
    ];
    
    let gameInfoFound = false;
    
    for (const selector of possibleSelectors) {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        console.log(`선택자 ${selector}로 ${elements.length}개 경기 정보 발견`);
        gameInfoFound = true;
        
        console.log('─'.repeat(50));
        console.log('토론토 블루제이스 최근 경기 정보:');
        console.log('─'.repeat(50));
        
        for (const element of elements.slice(0, 3)) { // 최근 3개 경기만 표시
          const text = await element.textContent();
          console.log(text.trim());
          console.log('-'.repeat(30));
        }
        
        break;
      }
    }
    
    if (!gameInfoFound) {
      console.log('경기 정보 요소를 찾을 수 없어, 일반 페이지 내용을 검색합니다...');
      
      // 페이지 텍스트 추출 및 "Blue Jays" 주변 텍스트 분석
      const bodyText = await page.textContent('body');
      
      // Blue Jays 관련 키워드로 검색
      const keywords = ['Blue Jays', 'Toronto', 'game', 'score', 'win', 'lost', 'final'];
      let foundInfo = false;
      
      for (const keyword of keywords) {
        if (bodyText.includes(keyword)) {
          const index = bodyText.indexOf(keyword);
          const start = Math.max(0, index - 100);
          const end = Math.min(bodyText.length, index + 100);
          const contextText = bodyText.substring(start, end);
          
          console.log(`키워드 "${keyword}" 주변 텍스트:`);
          console.log(contextText.trim());
          console.log('-'.repeat(30));
          
          foundInfo = true;
        }
      }
      
      if (!foundInfo) {
        console.log('토론토 블루제이스 관련 정보를 찾을 수 없습니다.');
      }
    }
    
    // MLB 일정 페이지로 이동하여 추가 정보 확인
    console.log('\n토론토 블루제이스 일정 페이지로 이동합니다...');
    await page.goto('https://www.mlb.com/bluejays/schedule', { timeout: 60000 });
    console.log('일정 페이지 로드 완료');
    
    // 일정 페이지 스크린샷
    await page.screenshot({ path: 'bluejays-schedule.png' });
    console.log('일정 페이지 스크린샷이 bluejays-schedule.png 파일로 저장되었습니다.');
    
    // 일정 정보 추출
    const scheduleSelectors = [
      '.schedule-list',
      '.schedule-grid',
      '.schedule-table',
      '.calendar-grid'
    ];
    
    let scheduleFound = false;
    
    for (const selector of scheduleSelectors) {
      const scheduleElement = await page.$(selector);
      if (scheduleElement) {
        console.log(`일정 정보 발견 (${selector})`);
        scheduleFound = true;
        
        console.log('─'.repeat(50));
        console.log('토론토 블루제이스 일정:');
        console.log('─'.repeat(50));
        
        const text = await scheduleElement.textContent();
        // 너무 길지 않게 텍스트 자르기
        console.log(text.substring(0, 1000).trim());
        
        break;
      }
    }
    
    if (!scheduleFound) {
      console.log('일정 정보를 찾을 수 없습니다.');
    }
    
    // 사용자가 결과를 확인할 수 있도록 잠시 대기
    console.log('\n브라우저를 10초 후 종료합니다...');
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    // 브라우저 종료
    await browser.close();
  }
}

// 함수 실행
getBlueJaysResultsFromMLB(); 