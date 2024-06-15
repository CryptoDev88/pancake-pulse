import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Digit14 } from '../components/Digit14'

export default {
  title: 'Example/Digit',
  component: Digit14,
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
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '-',
      ],
    },
  },
} as ComponentMeta<typeof Digit14>

const Template: ComponentStory<typeof Digit14> = (args) => <Digit14 {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'red',
  height: 250,
  char: '0',
  skew: false,
}
