import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router } from 'react-router-dom';
import FeatureSideNav from './FeatureSideNav';
import FeatureSideNavLinks from './FeatureSideNavLinks';
import FeatureSideNavFooter from './FeatureSideNavFooter';
import FeatureSideNavHeader from './FeatureSideNavHeader';
import FeatureSideNavLink from '../FeatureSideNavLink';
import { Search, Accordion, AccordionItem, Button } from 'carbon-components-react';
import { Rocket16 } from '@carbon/icons-react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

storiesOf('FeatureSideNav', module)
  .add('Default Feature Sidenav Link', () => {
    return (
      <Router history={history}>
        <FeatureSideNav border="right" small>
          <FeatureSideNavLinks>
            <FeatureSideNavLink to="/home" children="Home" hasDivider />
            <FeatureSideNavLink to="/link1" children="Link1" />
            <FeatureSideNavLink to="/link2" children="Link2" />
            <FeatureSideNavLink to="/link3" children="Link3" />
          </FeatureSideNavLinks>
        </FeatureSideNav>
      </Router>
    );
  })
  .add('Default Feature Sidenav Link with Header and custom Links', () => {
    return (
      <Router history={history}>
        <FeatureSideNav border="left">
          <FeatureSideNavHeader>
            <h1>Test Title</h1>
            <Search />
          </FeatureSideNavHeader>
          <FeatureSideNavLinks>
            <Accordion>
              <FeatureSideNavLink to="/link1" children="Link1" />
              <FeatureSideNavLink to="/link2" children="Link2" />
              <AccordionItem title="Item 1">
                <FeatureSideNavLink to="/link3" children="Link3" />
                <FeatureSideNavLink to="/link4" children="Link4" />
              </AccordionItem>
              <FeatureSideNavLink to="/link5" children="Link5" />
              <FeatureSideNavLink to="/link6" children="Link6" />
              <FeatureSideNavLink to="/link7" children="Link7" />
              <FeatureSideNavLink to="/link8" children="Link8" />
              <FeatureSideNavLink to="/link9" children="Link9" />
              <FeatureSideNavLink to="/link10" children="Link10" />
            </Accordion>
          </FeatureSideNavLinks>
          <FeatureSideNavFooter>
            <Button>Click here</Button>
            <Button>Click here again</Button>
          </FeatureSideNavFooter>
        </FeatureSideNav>
      </Router>
    );
  })
  .add('Feature Sidenav Loading', () => {
    return (
      <Router history={history}>
        <FeatureSideNav border="right" isLoading={true}>
          <FeatureSideNavLink to="/link1" children="Link1" />
          <FeatureSideNavLink to="/link2" children="Link2" />
        </FeatureSideNav>
      </Router>
    );
  })
  .add('Feature Sidenav Components Loading', () => {
    return (
      <Router history={history}>
        <FeatureSideNav border="left">
          <FeatureSideNavHeader isLoading={true}>
            <h1>Test Title</h1>
            <Search />
          </FeatureSideNavHeader>
          <FeatureSideNavLinks isLoading={true}>
            <Accordion>
              <FeatureSideNavLink to="/link1" children="Link1" />
              <FeatureSideNavLink to="/link2" children="Link2" />
            </Accordion>
          </FeatureSideNavLinks>
          <FeatureSideNavFooter isLoading={true}>
            <Button>Click here</Button>
          </FeatureSideNavFooter>
        </FeatureSideNav>
      </Router>
    );
  });
