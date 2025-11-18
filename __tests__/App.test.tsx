/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

describe('App Component', () => {
  it('should render without crashing', () => {
    const tree = renderer.create(<App />);
    expect(tree).toBeTruthy();
  });

  it('should display the app title', () => {
    const tree = renderer.create(<App />);
    const treeJson = tree.toJSON();
    expect(JSON.stringify(treeJson)).toContain('Calorie Workout App');
  });

  it('should have Take Photo button', () => {
    const tree = renderer.create(<App />);
    const treeJson = tree.toJSON();
    expect(JSON.stringify(treeJson)).toContain('Take Photo');
  });
});
