import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router, Link } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from './index';
import { default as Tabs } from '../FeatureNavTabs';
import { default as Tab } from '../FeatureNavTab';
import { Button, Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import { Save16, View16 } from '@carbon/icons-react';

const Nav = () => {
  return (
    <Breadcrumb noTrailingSlash>
      <BreadcrumbItem>
        <Link to="/teams">Teams</Link>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <Link to="/teams/123">Testing Team</Link>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

const Footer = () => {
  return (
    <Tabs>
      <Tab label="Services" to="/services" />
      <Tab label="Members" to="/members" />
      <Tab label="Service Requests" to="/service-requests" />
      <Tab label="Members Requests" to="/members-requests" />
      <Tab label="Settings" to="/settings" />
    </Tabs>
  );
};

const DataList = () => {
  return (
    <dl style={{ display: 'flex', width: '100%', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
        <dt>
          <strong>Term</strong>
        </dt>
        <dd>Definition</dd>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
        <dt>
          <strong>Term</strong>
        </dt>
        <dd>Definition</dd>
      </div>
    </dl>
  );
};

const Actions = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '1rem' }}>
    <Button
      kind="ghost"
      renderIcon={View16}
      style={{ marginRight: '1rem', width: '10rem' }}
      size="field"
    >
      View component
    </Button>
    <Button renderIcon={Save16} style={{ width: '10rem' }} size="field">
      Save
    </Button>
  </div>
);

storiesOf('FeatureHeader', module)
  .add('default', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader
          header={
            <>
              <FeatureHeaderTitle>With Header</FeatureHeaderTitle>
              <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
            </>
          }
        />
      </div>
    );
  })
  .add('subtitle first', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader
          header={
            <>
              <FeatureHeaderSubtitle style={{ fontSize: '0.875rem', fontWeight: '300' }}>
                Subtitle as label
              </FeatureHeaderSubtitle>
              <FeatureHeaderTitle style={{ fontSize: '1.5rem' }}>I'm smaller</FeatureHeaderTitle>
            </>
          }
        />
      </div>
    );
  })
  .add('without border', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader
          includeBorder={false}
          header={
            <>
              <FeatureHeaderTitle>Withouth Border</FeatureHeaderTitle>
              <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
            </>
          }
        ></FeatureHeader>
      </div>
    );
  })
  .add('loading', () => {
    return (
      <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
        <FeatureHeader
          isLoading
          header={
            <>
              <FeatureHeaderTitle>It is Loading</FeatureHeaderTitle>
              <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
            </>
          }
        ></FeatureHeader>
      </div>
    );
  })
  .add('with footer', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader footer={<Footer />} />
        </div>
      </Router>
    );
  })
  .add('with nav', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader
            nav={<Nav />}
            header={
              <>
                <FeatureHeaderTitle>With Header</FeatureHeaderTitle>
                <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
              </>
            }
          />
        </div>
      </Router>
    );
  })
  .add('only nav', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader nav={<Nav />} />
        </div>
      </Router>
    );
  })
  .add('with actions', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader
            actions={<Actions />}
            header={<FeatureHeaderTitle>With Actions</FeatureHeaderTitle>}
          ></FeatureHeader>
        </div>
      </Router>
    );
  })
  .add('only children', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader>
            <div style={{ marginBottom: '1rem' }}>
              <FeatureHeaderTitle>Rendered as Child</FeatureHeaderTitle>
            </div>
            <DataList />
          </FeatureHeader>
        </div>
      </Router>
    );
  })
  .add('with nav, header, footer, actions, and children', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <div style={{ backgroundColor: '#f2f4f8', height: '100vh', width: '100vw' }}>
          <FeatureHeader
            nav={<Nav />}
            footer={<Footer />}
            actions={<Actions />}
            header={
              <>
                <FeatureHeaderTitle>With Everything</FeatureHeaderTitle>
                <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
              </>
            }
          >
            <DataList />
          </FeatureHeader>
        </div>
      </Router>
    );
  });
