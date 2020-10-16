import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import OptionsGrid from './index';
// import { tools, selectedTools } from "../../helpers/mockData";

const tools = [
  {
    id: 1,
    name: 'Assembly Kit',
  },
  {
    id: 2,
    name: 'Client Engagement Assist',
  },
  {
    id: 3,
    name: 'Jira',
  },
  {
    id: 4,
    name: 'Slack',
  },
  {
    id: 5,
    name: 'Urban Code Deploy',
  },
  {
    id: 6,
    name: 'Boomerang',
  },
  {
    id: 7,
    name: 'IBM Github Enterprise',
  },
  {
    id: 8,
    name: 'Send Grid',
  },
  {
    id: 9,
    name: 'Travis CI',
  },
];

export const selectedTools = [
  {
    id: 2,
    name: 'Client Engagement Assist',
  },
  {
    id: 5,
    name: 'Urban Code Deploy',
  },
  {
    id: 6,
    name: 'Boomerang',
  },

  {
    id: 8,
    name: 'Send Grid',
  },

  {
    id: 10,
    name: 'Zeplin',
  },
];

const mockFunc = action('onSelect');
const style = { background: '#1d496d', margin: '2rem', width: '45rem' };

storiesOf('OptionsGrid', module).add('single column', () => {
  return (
    <div style={style}>
      <OptionsGrid columns={1} data={tools} selectedItems={selectedTools} onSelect={mockFunc} />
    </div>
  );
});

storiesOf('OptionsGrid', module)
  .add('double column', () => {
    return (
      <div style={style}>
        <OptionsGrid
          width="5rem"
          columns={2}
          data={tools}
          selectedItems={selectedTools}
          onSelect={mockFunc}
        />
      </div>
    );
  })
  .add('triple column', () => {
    return (
      <div style={style}>
        <OptionsGrid
          width="5rem"
          columns={3}
          data={tools}
          selectedItems={selectedTools}
          onSelect={mockFunc}
        />
      </div>
    );
  });
