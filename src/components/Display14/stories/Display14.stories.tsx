import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Display14 } from '../components/Display14'

export default {
  title: 'Example/Display14',
  component: Display14,
  argTypes: {
    color: { control: 'color' },
    height: { control: 'number' },
    value: {
      control: 'text',
    },
    count: {
      control: 'number',
    },
    backgroundColor: {
      control: 'color',
    },
  },
} as ComponentMeta<typeof Display14>

const Template: ComponentStory<typeof Display14> = (args) => <Display14 {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'red',
  height: 250,
  value: '0',
  count: 2,
  backgroundColor: 'black',
  skew: false,
}
