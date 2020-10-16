import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ModalConfirmEdit from './ModalConfirmEdit';

const detailsItems = [
  { name: 'Title', value: 'Boomerang' },
  {
    name: 'Example with times',
    value: '12:00 am 12 january 2018, 3:00 pm 15 october 2017, 2:00 am 28 august 2017',
  },
  { name: 'Description', value: 'This is a new Item' },
];

const arrayItems = [
  'AutoBot',
  'NewRelic',
  'Github',
  'Jira',
  'Boomerang',
  'Urban Code',
  'GitLab',
  'Maas360',
];

storiesOf('ModalConfirmEdit', module)
  .add('details', () => {
    return (
      <ModalConfirmEdit
        items={detailsItems}
        onEdit={action('pencil clicked')}
        title="Some details"
      />
    );
  })
  .add('array', () => {
    return (
      <ModalConfirmEdit
        items={arrayItems}
        onEdit={action('pencil clicked')}
        title="Array of items"
        type="array"
      />
    );
  });
