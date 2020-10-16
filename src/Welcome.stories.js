import React from 'react';
import { storiesOf } from '@storybook/react';
import './welcome-story.css';
import BoomerangLogo from '../.storybook/assets/boomerang';
import {
  Accordion,
  AccordionItem,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from './index';

//const carbonExports = Object.keys(require('carbon-components-react'));
const boomerangAddonsExports = Object.keys(require('./index'));

storiesOf('Getting Started|Welcome', module).add('About Storybook', () => (
  <div className="storybook-welcome">
    <BoomerangLogo style={{ marginLeft: '1rem' }} />
    <p>
      Storybook is a development environment for UI components. It allows you to browse the
      component library, view the different states of each component, and interactively develop and
      test components.
    </p>
    <p>
      <strong>Boomerang</strong> - Components that are either extensions of Carbon components with
      added functionality, or custom components beyond Carbon.
    </p>
    <p>
      <strong>Boomerang Experimental</strong> - Similar to above, but these components are not yet
      finalized or stable. The APIs of these components may change rapidly and are not required to
      have associated tests, including snapshots.
    </p>
    <p>
      <strong>Carbon</strong> - Components imported from Carbon and re-exported with no
      modifications. Carbon's stories are not included in our storybook, please reference their
      <a href="https://react.carbondesignsystem.com/" style={{ marginLeft: '0.15rem' }}>
        Carbon Storybook
      </a>
    </p>

    <p>
      For additional guidance, see the
      <a href="https://www.carbondesignsystem.com/" style={{ marginLeft: '0.15rem' }}>
        Carbon Design Site
      </a>
    </p>
    <Accordion>
      <AccordionItem title={'Carbon and Boomerang Addons Component Exports table'} open={false}>
        <p>
          The following table displays a list of the total exported components: including our custom
          Boomerang compoonents and unaltered carbon-components
        </p>
        <StructuredListWrapper>
          <StructuredListHead>
            <StructuredListRow head></StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {[...new Set(boomerangAddonsExports)].map((item) => (
              <StructuredListRow key={item}>
                <StructuredListCell>{item === 'styles' ? null : item}</StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </AccordionItem>
    </Accordion>
  </div>
));
