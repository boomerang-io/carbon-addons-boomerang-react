import React from 'react';
import { shallow } from 'enzyme';

import Avatar from './Avatar';

describe('Default Avatar', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Avatar src="ibm.com/fake/path/to/img.png" />);
    it('size should be medium by default', () => {
      expect(wrapper.hasClass('bx--bmrg-avatar --medium')).toEqual(true);
    });
    it('should include child content', () => {
      expect(wrapper.find('img').length).toBe(1);
    });
  });
});
