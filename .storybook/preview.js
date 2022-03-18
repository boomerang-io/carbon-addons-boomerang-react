import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import './styles.scss';

addDecorator(withKnobs);
addDecorator(withInfo);
