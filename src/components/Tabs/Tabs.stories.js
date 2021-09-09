import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Tabs from '../Tabs';
import Tab from '../Tab';
import TabsSkeleton from '../Tabs/Tabs.Skeleton';
import { Button } from 'carbon-components-react';

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <Tabs scrollIntoView={true}>
        <Tab id="tab-1" label="Tab label 1">
          <p>Content for first tab goes here.</p>
        </Tab>
        <Tab id="tab-2" label="Tab label 2">
          <p>Content for second tab goes here.</p>
          <Button>With a button</Button>
        </Tab>
        <Tab id="tab-3" label="Tab label 3" disabled>
          <p>Content for third tab goes here.</p>
        </Tab>
        <Tab id="tab-4" label="Tab label 4 shows truncation" title="Tab label 4 shows truncation">
          <p>Content for fourth tab goes here.</p>
        </Tab>
        <Tab label={<div>Custom Label</div>}>
          <p>Content for fifth tab goes here.</p>
        </Tab>
      </Tabs>
    ),
    {
      info: {
        text: `
             Tabs are used to quickly navigate between views within the same context. Create individual
             Tab components for each item in the Tabs list.
           `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div className="tabs-container">
        <TabsSkeleton />
      </div>
    ),
    {
      info: {
        text: `
             Placeholder skeleton state to use when content is loading.
           `,
      },
    }
  );
