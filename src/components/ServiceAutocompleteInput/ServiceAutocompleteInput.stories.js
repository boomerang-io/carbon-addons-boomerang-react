import React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import ServiceAutocompleteInput from './index';

export default {
  title: 'Modal',
};

export const Default = () => {
  return (
    <div>
      <ServiceAutocompleteInput
        id="default-autocomplete-text-input"
        handleChange={action('Service text input change')}
        placeholder={text('placeholder', 'Placeholder')}
        labelText={text('labelText', 'Label Text')}
        enableOptions={false}
        onSelect={action('Service text input change')}
        optionsResolver={action('Resolver action')}
        optionsUrl={(query)=>`https://test.com/${query}`}
        type="text"
      />
    </div>
  );
};

Default.story = {
  name: 'default',
};
