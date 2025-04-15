const { chromium } = require('playwright');

async function getBlueJaysResults() {
  // 브라우저 시작 - headless를 false로 설정하여 디버깅 
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('구글에 접속 중...');
    // 구글 접속
    await page.goto('https://www.google.com/', { timeout: 60000 });
    console.log('구글 페이지 로드 완료');
    
    // 잠시 대기
    await page.waitForTimeout(3000);
    
    // 쿠키 수락 버튼이 있다면 클릭
    try {
      const cookieButtons = [
        'button:has-text("Accept all")', 
        'button:has-text("동의")', 
        'button:has-text("I agree")',
        'button[id="L2AGLb"]',
        'div[id="L2AGLb"]'
      ];
      
      for (const selector of cookieButtons) {
        const button = await page.$(selector);
        if (button) {
          console.log(`쿠키 버튼 발견: ${selector}`);
          await button.click();
          await page.waitForTimeout(2000);
          break;
        }
      }
    } catch (e) {
      console.log('쿠키 수락 버튼 처리 실패:', e.message);
    }
    
    // 검색어 입력 - 다양한 셀렉터 시도
    console.log('검색창 찾는 중...');
    const searchInputSelectors = [
      'input[name="q"]',
      'input[title="검색"]',
      'input[title="Search"]',
      'textarea[name="q"]',
      'textarea[title="검색"]',
      'textarea[title="Search"]'
    ];
    
    let searchInput = null;
    for (const selector of searchInputSelectors) {
      searchInput = await page.$(selector);
      if (searchInput) {
        console.log(`검색창 발견: ${selector}`);
        break;
      }
    }
    
    if (!searchInput) {
      throw new Error('검색창을 찾을 수 없습니다');
    }
    
    // 검색어 입력
    await searchInput.fill('Toronto Blue Jays score today');
    console.log('검색어 입력 완료');
    
    // 검색 실행
    await searchInput.press('Enter');
    console.log('검색 실행');
    
    // 결과가 로드될 때까지 대기
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    console.log('검색 결과 로드 완료');
    
    // 스크린샷 저장 (디버깅용)
    await page.screenshot({ path: 'bluejays-results.png' });
    console.log('검색 결과 스크린샷이 bluejays-results.png 파일로 저장되었습니다.');
    
    // 경기 결과 페이지 내용 캡처
    const pageContent = await page.content();
    
    // 페이지 텍스트 추출
    const pageText = await page.textContent('body');
    
    // Blue Jays 관련 정보 찾기
    if (pageText.includes('Blue Jays') || pageText.includes('Toronto')) {
      console.log('토론토 블루제이스 관련 정보를 찾았습니다.');
      
      // 다양한 선택자로 스포츠 결과 정보 추출 시도
      const possibleSelectors = [
        '.imso-hov',
        '.sports-app',
        '.IzNS7c',
        '.imspo_mt__lg-st-co',
        '[data-sports-app]',
        '.imso-ani',
        '.hCL63c',
        '.iKeLeb',
        '.KFFQ0c'
      ];
      
      let resultFound = false;
      
      for (const selector of possibleSelectors) {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          console.log(`선택자 ${selector}로 ${elements.length}개 요소 발견`);
          resultFound = true;
          
          for (const element of elements) {
            const text = await element.textContent();
            console.log(text.trim());
          }
          
          break;
        }
      }
      
      if (!resultFound) {
        // 일반 검색 결과에서 정보 추출
        console.log('스포츠 결과 요소를 찾을 수 없어, 일반 검색 결과에서 정보 찾는 중...');
        
        const searchResults = await page.$$('.g');
        if (searchResults.length > 0) {
          console.log('검색 결과:');
          for (let i = 0; i < Math.min(3, searchResults.length); i++) {
            const resultText = await searchResults[i].textContent();
            console.log(`[${i + 1}] ${resultText.substring(0, 200).trim()}...`);
          }
        } else {
          console.log('검색 결과를 찾을 수 없습니다.');
        }
      }
    } else {
      console.log('토론토 블루제이스 관련 정보를 찾을 수 없습니다.');
    }
    
    // 사용자가 결과를 확인할 수 있도록 잠시 대기
    console.log('브라우저를 5초 후 종료합니다...');
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    // 브라우저 종료
    await browser.close();
  }
}

// 함수 실행
getBlueJaysResults(); 