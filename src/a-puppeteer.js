const puppeteer = require('puppeteer');
const fs = require('fs');

let status = '';

// (A) 로딩 애니메이션
function loadingAnimation(chars = ['⠙','⠘','⠰','⠴','⠤','⠦','⠆','⠃','⠋','⠉'], delay = 100) {
  let x = 0;
  return setInterval(() => {
    console.clear();
    process.stdout.write(`\r${chars[x++] % chars.length} ${status}`);
    x %= chars.length;

    if (status === 'Complete  \n') {
      process.exit(0);
    }
  }, delay);
}

// (B) .env 파일 업데이트용 함수
function setKeyValue(envContent, key, value) {
  const regex = new RegExp(`^(${key}=)(.*)$`, 'm');
  if (regex.test(envContent)) {
    // 이미 key가 있으면 치환
    return envContent.replace(regex, `$1${value}`);
  } else {
    // 없으면 맨 끝에 추가
    if (!envContent.endsWith('\n')) envContent += '\n';
    return envContent + `${key}=${value}\n`;
  }
}

// (C) 로그인 함수
async function doLogin(page) {
  const loginSelector = 'button[data-testid="pdp-login-user"]';
  status = 'Subscribing (login)...  ';

  // 1) 로그인 버튼 클릭
  await page.waitForSelector(loginSelector, { timeout: 30000 });
  await page.click(loginSelector);
  status = 'Clicked Login...  ';

  // 2) 쿠키/동의 배너 처리
  const acceptBtn = 'button[data-testid="PrimaryButtonTest"]';
  await page.waitForSelector(acceptBtn, { visible: true, timeout: 30000 });
  const acceptButtonExists = await page.evaluate((selector) => {
    return !!document.querySelector(selector);
  }, acceptBtn);
  if (acceptButtonExists) {
    await page.click('[data-testid="PrimaryButtonTest"]:nth-of-type(1)');
  }
  status = 'Closing cookie banner...  ';

  // 3) 계정 정보 입력
  const emailSelector = 'input[aria-label="Email"]';
  const passwordSelector = 'input[type="password"]';
  // 실제 사용 시 적절한 계정 정보로 바꾸세요.
  const email = 'pm-lab1a-4336@mailinator.com';
  const password = 'Test@1234';

  await page.waitForSelector(emailSelector, { timeout: 30000 });
  await page.type(emailSelector, email);
  await page.type(passwordSelector, password);
  status = 'Entering credentials...  ';

  // 4) 로그인 버튼 클릭
  await page.evaluate(() => {
    document.querySelectorAll('div[role="button"]')[1].click();
  });

  // 5) OTP(2FA) 필드 대기 & 입력
  await page.waitForSelector('#code0', { visible: true, timeout: 60000 });
  status = 'Entering PIN...  ';
  await page.type('#code0', '123456', { delay: 300 }); // 예시

  status = 'Confirming PIN...  ';
  await page.evaluate(() => {
    document.querySelectorAll('div[role="button"]')[2].click();
  });

  // 6) 잠깐 대기
  await new Promise(resolve => setTimeout(resolve, 3000));
}

// (D) 회원가입 함수
async function doRegister(page) {
  const registerSelector = 'button[data-testid="pdp-register-user"]';
  status = 'Subscribing (register)...  ';

  // 1) "Register" 버튼 클릭
  await page.waitForSelector(registerSelector, { timeout: 30000 });
  await page.click(registerSelector);
  status = 'Clicked Register...  ';

  // 2) 쿠키/동의 배너 처리
  const acceptBtn = 'button[data-testid="PrimaryButtonTest"]';
  await page.waitForSelector(acceptBtn, { visible: true, timeout: 30000 });
  const acceptButtonExists = await page.evaluate((selector) => {
    return !!document.querySelector(selector);
  }, acceptBtn);
  if (acceptButtonExists) {
    await page.click('[data-testid="PrimaryButtonTest"]:nth-of-type(1)');
  }

  // 3) "Continue" 버튼 클릭 (텍스트가 "Continue"인 것 찾기)
  await page.waitForSelector('div[role="button"]', { visible: true, timeout: 30000 });
  await page.evaluate(() => {
    const allButtons = Array.from(document.querySelectorAll('div[role="button"]'));
    const target = allButtons.find(el => el.innerText.trim() === 'Continue');
    if (target) target.click();
  });

  // 4) 가입 폼 (이메일, 이름 등)
  const firstNameSelector = 'input[aria-label="First name*"]';
  const lastNameSelector  = 'input[aria-label="Last name*"]';
  const emailSelector     = 'input[aria-label="Email"]';

  await page.waitForSelector(firstNameSelector, { timeout: 30000 });
  await page.waitForSelector(lastNameSelector,  { timeout: 30000 });
  await page.waitForSelector(emailSelector,     { timeout: 30000 });

  // 5) 가입 정보 입력
  await page.type(firstNameSelector, 'TestFirst', { delay: 100 });
  await page.type(lastNameSelector,  'TestLast',  { delay: 100 });
  await page.type(emailSelector,     'test-user4@domain.com', { delay: 100 });
  // ↑ 실제로는 매번 다른 이메일 사용 권장 (이미 가입된 메일이면 실패)

  // 6) "회원가입 제출" 버튼
  const registerSubmit = 'div[role="button"]';
  await page.waitForSelector(registerSubmit, { visible: true, timeout: 30000 });
  await page.click(registerSubmit);

  // 7) 가입 후 OTP(2FA) 처리 (사이트 정책에 따라)
  status = 'Entering PIN (register)...  ';
  try {
    await page.waitForSelector('#code0', { visible: true, timeout: 60000 });
    await page.type('#code0', '123456', { delay: 300 });

    status = 'Confirming PIN...  ';
    await page.evaluate(() => {
      document.querySelectorAll('div[role="button"]')[1].click();
    });
  } catch (err) {
    console.log('OTP 단계가 없거나 셀렉터가 달라서 스킵합니다:', err);
  }

  // 8) 잠깐 대기
  await new Promise(resolve => setTimeout(resolve, 3000));

  // 9) 비밀번호 설정 단계 (OTP 완료 후 비밀번호 생성 페이지가 뜨는 경우)
  //    실제 셀렉터를 확인하여 아래 코드를 수정하세요.
  try {
    status = 'Filling in password fields...  ';
    // 첫 번째 비밀번호 입력

    await page.waitForSelector('input[aria-label="Enter Password*"]', { visible: true, timeout: 30000 });
    await page.type('input[aria-label="Enter Password*"]', 'Test@1234', { delay: 100 });

    // 두 번째 비밀번호 입력
    await page.waitForSelector('input[aria-label="Confirm Password*"]', { visible: true, timeout: 30000 });
    await page.type('input[aria-label="Confirm Password*"]', 'Test@1234', { delay: 100 });

    // "Submit" 버튼 클릭
    //  - 실제 버튼의 텍스트가 "Submit"인지, 혹은 다른 셀렉터인지 확인
    await page.waitForSelector('div[role="button"]', { visible: true, timeout: 30000 });
    await page.evaluate(() => {

      // document.querySelectorAll('div[role="button"]')[2].click();

      const allButtons = Array.from(document.querySelectorAll('div[role="button"]'));
      // 여기서는 innerText가 "Submit"인 버튼을 찾아 클릭
      const submitBtn = allButtons.find(el => el.innerText.trim().toLowerCase() === 'confirm');
      if (submitBtn) submitBtn.click();
    });
  } catch (err) {
    console.log('비밀번호 설정 단계가 없거나 이미 완료되어 스킵합니다:', err);
  }

  // 10) 회원가입/비밀번호 설정 완료 후 페이지 이동(또는 세션 확인)을 위해 잠깐 대기
  await new Promise(resolve => setTimeout(resolve, 3000));

  // 11) 회원가입이 끝났어도 자동 로그인 처리되는 데 시간이 걸릴 수 있으므로
  //     추가로 페이지가 바뀌는지(리다이렉트) 기다려보고, 안 바뀌면 수동 reload
  try {
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
  } catch (e) {
    // 페이지 이동이 없다면 강제로 reload
    await page.reload({ waitUntil: 'networkidle2' });
  }
}


// (E) 메인 실행부
(async () => {
  // 1) 어떤 모드인지 (기본은 'login')
  const mode = process.argv[2] || 'login';

  // 2) 로딩 애니메이션 시작
  loadingAnimation();
  status = 'Launching browser...  ';

  // 3) 브라우저 실행
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();

  // 4) 공통 url
  await page.goto('https://digital1a.nga.publicmobile.ca/en/activation/plans/1GB-5Gspeed', {
    waitUntil: 'networkidle2',
  });

  // 5) 회원가입 or 로그인 실행
  if (mode === 'register') {
    await doRegister(page);
  } else {
    await doLogin(page);
  }

  // 6) 여기서 토큰을 가져오기
  //    (회원가입 후에도 사이트가 "로그인 상태"라면 securedUserInfo 접근 가능)
  status = 'Getting securedUserInfo...  ';
  await page.goto('https://digital1a.nga.publicmobile.ca/securedUserInfo', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  status = 'Getting tokens...  ';
  const bodyHandle = await page.evaluateHandle(() => document.body.innerText);
  const bodyText   = await bodyHandle.jsonValue();
  await bodyHandle.dispose();

  let userInfo;
  try {
    userInfo = JSON.parse(bodyText);
  } catch (parseErr) {
    console.error('UserInfo JSON 파싱 오류:', parseErr);
    throw parseErr;
  }

  // 7) .env.digital-one-a 업데이트
  status = 'Updating ENV...  ';
  const envFile = '.env.digital-one-a';
  let envData = '';

  // 파일이 없으면 템플릿 생성
  if (!fs.existsSync(envFile)) {
    envData = [
      'TEST_AUTH_TOKEN=',
      'TEST_X_ID_TOKEN=',
      'TEST_EMAIL=',
      ''
    ].join('\n');
    fs.writeFileSync(envFile, envData, 'utf8');
  } else {
    envData = fs.readFileSync(envFile, 'utf8');
  }

  // userInfo.headers.authorization, userInfo.headers['x-id-token'] 등이 제대로 있는지 확인
  if (!userInfo.headers || !userInfo.headers.authorization || !userInfo.headers['x-id-token']) {
    console.error('로그인(또는 가입 후 자동 로그인) 토큰을 가져오지 못했습니다.');
    // 필요 시 process.exit(1);
  }

  envData = setKeyValue(envData, 'TEST_AUTH_TOKEN', userInfo.headers.authorization || '');
  envData = setKeyValue(envData, 'TEST_X_ID_TOKEN', userInfo.headers['x-id-token'] || '');
  envData = setKeyValue(envData, 'TEST_EMAIL', userInfo.email || '');

  fs.writeFileSync(envFile, envData, 'utf8');

  // 8) 종료
  status = 'Complete  \n';
  await browser.close();

})().catch(e => {
  console.error(e);
  process.exit(1);
});
