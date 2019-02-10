import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button', module)
    .add('Normal button', () => ( <Button>Button</Button>))
    .add('Primary button', () => ( <Button primary>Button</Button>));