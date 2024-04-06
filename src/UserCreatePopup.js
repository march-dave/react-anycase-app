// UserCreatePopup.js
import React, { useState } from 'react';

const UserCreatePopup = ({ onClose, onSubmit }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    // 필요한 나머지 필드들 추가
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(userData);
      onClose(); // 성공적으로 API 호출 후 팝업 닫기
    } catch (error) {
      console.error('Error creating user:', error);
      alert('유저 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={userData.name} 
          onChange={handleChange} 
          placeholder="이름"
        />
        <input 
          type="email" 
          name="email" 
          value={userData.email} 
          onChange={handleChange} 
          placeholder="이메일"
        />
        {/* 필요한 나머지 입력 필드들 */}
        <button type="submit">생성</button>
        <button type="button" onClick={onClose}>취소</button>
      </form>
    </div>
  );
};

export default UserCreatePopup;
