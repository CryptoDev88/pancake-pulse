import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Digit7 } from '../components/Digit7'

export default {
  title: 'Example/Digit7',
  component: Digit7,
  argTypes: {
    color: { control: 'color' },
    height: { control: 'number' },
    char: {
      control: 'select',
      options: [
        ' ',
        '.',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        '-',
      ],
    },
  },
} as ComponentMeta<typeof Digit7>

const Template: ComponentStory<typeof Digit7> = (args) => <Digit7 {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'red',
  height: 250,
  char: '0',
  skew: false,
}
