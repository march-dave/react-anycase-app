const { chromium } = require('playwright');

async function getBlueJaysResultsFromESPN() {
  // 브라우저 시작
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('ESPN 사이트에 접속 중...');
    // ESPN 토론토 블루제이스 팀 페이지 접속
    await page.goto('https://www.espn.com/mlb/team/_/name/tor/toronto-blue-jays', { timeout: 60000 });
    console.log('ESPN 페이지 로드 완료');
    
    // 스크린샷 저장
    await page.screenshot({ path: 'bluejays-espn.png' });
    console.log('ESPN 페이지 스크린샷이 bluejays-espn.png 파일로 저장되었습니다.');
    
    // 팀 정보 추출
    console.log('팀 정보 추출 중...');
    
    try {
      // 팀 기록 정보 (승-패, 순위 등)
      const teamRecordSelector = '.TeamHeader__Record';
      const teamRecord = await page.textContent(teamRecordSelector).catch(() => '팀 기록 정보를 찾을 수 없습니다.');
      
      console.log('─'.repeat(50));
      console.log('토론토 블루제이스 팀 정보:');
      console.log('─'.repeat(50));
      console.log('팀 기록:', teamRecord.trim());
      
      // 최근 경기 결과
      console.log('\n최근 경기 결과:');
      console.log('─'.repeat(50));
      
      // ESPN에서 사용하는 경기 결과 선택자
      const gameModules = await page.$$('.Schedule__Game');
      
      if (gameModules.length > 0) {
        console.log(`${gameModules.length}개의 경기 정보 발견`);
        
        for (const gameModule of gameModules.slice(0, 5)) { // 최근 5개 경기만 표시
          const gameInfo = await gameModule.textContent();
          console.log(gameInfo.trim());
          console.log('-'.repeat(30));
        }
      } else {
        console.log('경기 정보를 찾을 수 없습니다. 다른 선택자 시도 중...');
        
        // 다른 가능한 선택자들 시도
        const alternativeSelectors = [
          '.gameModules',
          '.Scoreboard',
          '.ResponsiveTable',
          '.EventCard',
          '.events-table'
        ];
        
        let found = false;
        for (const selector of alternativeSelectors) {
          const elements = await page.$$(selector);
          if (elements.length > 0) {
            console.log(`선택자 ${selector}로 ${elements.length}개 요소 발견`);
            
            for (const element of elements.slice(0, 3)) {
              const text = await element.textContent();
              console.log(text.trim());
              console.log('-'.repeat(30));
            }
            
            found = true;
            break;
          }
        }
        
        if (!found) {
          console.log('경기 정보를 찾을 수 없습니다.');
        }
      }
    } catch (err) {
      console.log('팀 정보 추출 중 오류:', err.message);
    }
    
    // 일정 페이지로 이동
    console.log('\n토론토 블루제이스 일정 페이지로 이동합니다...');
    await page.goto('https://www.espn.com/mlb/team/schedule/_/name/tor/toronto-blue-jays', { timeout: 60000 });
    console.log('일정 페이지 로드 완료');
    
    // 일정 페이지 스크린샷
    await page.screenshot({ path: 'bluejays-espn-schedule.png' });
    console.log('일정 페이지 스크린샷이 bluejays-espn-schedule.png 파일로 저장되었습니다.');
    
    // 일정 정보 추출
    console.log('\n일정 정보 추출 중...');
    
    try {
      // 테이블 헤더와 행 추출
      const tableHeaders = await page.$$('thead th');
      const headers = [];
      for (const header of tableHeaders) {
        headers.push(await header.textContent());
      }
      
      if (headers.length > 0) {
        console.log('일정 헤더:', headers.join(' | '));
        
        // 테이블 행 추출
        const tableRows = await page.$$('tbody tr');
        console.log(`${tableRows.length}개의 경기 일정 발견`);
        
        console.log('─'.repeat(50));
        console.log('토론토 블루제이스 일정:');
        console.log('─'.repeat(50));
        
        // 최근 5개 행만 출력
        for (let i = 0; i < Math.min(5, tableRows.length); i++) {
          const rowText = await tableRows[i].textContent();
          console.log(rowText.trim());
          console.log('-'.repeat(30));
        }
      } else {
        console.log('일정 테이블 헤더를 찾을 수 없습니다.');
        
        // 대체 방법: 전체 일정 페이지 내용에서 관련 정보 추출
        const scheduleContent = await page.textContent('.Page__Content');
        if (scheduleContent) {
          console.log('일정 페이지 내용 일부:');
          console.log(scheduleContent.substring(0, 500).trim());
        } else {
          console.log('일정 정보를 찾을 수 없습니다.');
        }
      }
    } catch (err) {
      console.log('일정 정보 추출 중 오류:', err.message);
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
getBlueJaysResultsFromESPN(); 