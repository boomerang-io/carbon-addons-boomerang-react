import React from 'react';
import { storiesOf } from '@storybook/react';
import MemberBar from './index';

storiesOf('MemberBar', module).add('default', () => {
  return (
    <ul style={{ listStyle: 'none', width: '30rem' }}>
      <MemberBar name="Panda Black White" email="panda@email.com" isPartner />
      <MemberBar name="Mico Leao Dourado" email="mico@email.com" removeUser />
      <MemberBar name="Coruja Owl" email="owl@email.com" isPartner removeUser />
      <MemberBar name="Gato Neko" email="neko@email.com" />
    </ul>
  );
});
