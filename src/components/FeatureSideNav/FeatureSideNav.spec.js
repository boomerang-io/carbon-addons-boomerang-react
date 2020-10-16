import React from 'react';
import { render } from '@testing-library/react';
import {
  FeatureSideNav,
  FeatureSideNavFooter,
  FeatureSideNavHeader,
  FeatureSideNavLinks,
} from '../FeatureSideNav';

test('render FeatureSideNav and components with correct classes', async () => {
  const { container, getByText } = render(
    <FeatureSideNav>
      <FeatureSideNavHeader>Test Header</FeatureSideNavHeader>
      <FeatureSideNavLinks>Test Links</FeatureSideNavLinks>
      <FeatureSideNavFooter>Test Footer</FeatureSideNavFooter>
    </FeatureSideNav>
  );
  expect(container.firstChild).toHaveClass('bx--bmrg-feature-sidenav-container');
  expect(getByText('Test Header')).toHaveClass('bx--bmrg-feature-sidenav-header');
  expect(getByText('Test Links')).toHaveClass('bx--bmrg-feature-sidenav-links');
  expect(getByText('Test Footer')).toHaveClass('bx--bmrg-feature-sidenav-footer');
});
