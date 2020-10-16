import React from 'react';
import { render } from '@testing-library/react';
import MemberBar from './index.js';

const props = {
  name: 'Mister Owl',
  email: 'owl@email.com',
  avatarSrc: '',
};

test('render member bar', () => {
  const { queryByText } = render(<MemberBar {...props} />);
  expect(queryByText(/Mister Owl/i)).toBeInTheDocument();
  expect(queryByText(/owl@email.com/i)).toBeInTheDocument();
});
