import React, { useState } from 'react';
import { connect } from 'react-redux';
import { earnPoints } from '../Action';
import styled from 'styled-components';

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 20px 0;
`;

const SearchTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 20px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #667eea;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const SearchButton = styled.button`
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const SearchResults = styled.div`
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const PointsEarned = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  margin-top: 10px;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LimitMessage = styled.div`
  padding: 12px;
  background: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  color: #92400e;
  font-size: 14px;
  margin-top: 10px;
`;

const SearchHistory = styled.div`
  margin-top: 20px;
`;

const SearchHistoryTitle = styled.h4`
  color: #555;
  margin-bottom: 10px;
  font-size: 16px;
`;

const SearchHistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SearchHistoryItem = styled.li`
  padding: 10px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
`;

const SearchWithPoints = ({ dailyPoints, searchCount, earnPoints }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [lastSearchResult, setLastSearchResult] = useState(null);
  const [showLimitMessage, setShowLimitMessage] = useState(false);

  const maxDailyPoints = 90;
  const canSearch = dailyPoints < maxDailyPoints;

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setLastSearchResult({ error: 'Please enter a search query' });
      return;
    }

    if (!canSearch) {
      setShowLimitMessage(true);
      setTimeout(() => setShowLimitMessage(false), 3000);
      return;
    }

    // Earn points
    earnPoints();

    // Add to search history
    const searchEntry = {
      query: searchQuery,
      timestamp: new Date().toLocaleTimeString(),
      pointsEarned: 3
    };
    setSearchHistory([searchEntry, ...searchHistory.slice(0, 9)]);

    // Show search result
    setLastSearchResult({
      query: searchQuery,
      pointsEarned: 3
    });

    // Clear input
    setSearchQuery('');

    // Clear result after 3 seconds
    setTimeout(() => {
      setLastSearchResult(null);
    }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchTitle>Search & Earn Points</SearchTitle>
      <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
        Earn 3 points per search, up to 90 points per day!
      </p>

      <SearchInputContainer>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your search query..."
          disabled={!canSearch}
        />
        <SearchButton onClick={handleSearch} disabled={!canSearch}>
          Search
        </SearchButton>
      </SearchInputContainer>

      {lastSearchResult && !lastSearchResult.error && (
        <SearchResults>
          <div>Search completed for: <strong>{lastSearchResult.query}</strong></div>
          <PointsEarned>+{lastSearchResult.pointsEarned} points earned!</PointsEarned>
        </SearchResults>
      )}

      {lastSearchResult && lastSearchResult.error && (
        <LimitMessage>{lastSearchResult.error}</LimitMessage>
      )}

      {showLimitMessage && (
        <LimitMessage>
          Daily limit reached! You've earned the maximum 90 points today. Come back tomorrow!
        </LimitMessage>
      )}

      {searchHistory.length > 0 && (
        <SearchHistory>
          <SearchHistoryTitle>Recent Searches</SearchHistoryTitle>
          <SearchHistoryList>
            {searchHistory.map((item, index) => (
              <SearchHistoryItem key={index}>
                {item.timestamp} - "{item.query}" (+{item.pointsEarned} points)
              </SearchHistoryItem>
            ))}
          </SearchHistoryList>
        </SearchHistory>
      )}
    </SearchContainer>
  );
};

const mapStateToProps = state => ({
  dailyPoints: state.dailyPoints || 0,
  searchCount: state.searchCount || 0
});

const mapDispatchToProps = {
  earnPoints
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithPoints);
