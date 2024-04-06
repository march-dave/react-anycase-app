// App2.js 또는 다른 부모 컴포넌트
import React, { useState } from 'react';
import UserCreatePopup from './UserCreatePopup';
import axios from 'axios'; // axios를 사용하여 API 호출

const App2 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCreateUser = async (userData) => {
    const apiUrl = 'https://your-api-endpoint.com/users'; // API 엔드포인트
    await axios.post(apiUrl, userData);
  };

  return (
    <div>
      <button onClick={() => setIsPopupOpen(true)}>유저 생성</button>
      {isPopupOpen && (
        <UserCreatePopup 
          onClose={() => setIsPopupOpen(false)} 
          onSubmit={handleCreateUser} 
        />
      )}
    </div>
  );
};

export default App2;
