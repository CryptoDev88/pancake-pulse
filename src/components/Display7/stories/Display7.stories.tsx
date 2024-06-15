import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Display7 } from '../components/Display7'

export default {
  title: 'Example/Display7',
  component: Display7,
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
} as ComponentMeta<typeof Display7>

const Template: ComponentStory<typeof Display7> = (args) => <Display7 {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'red',
  height: 250,
  value: '0',
  count: 2,
  backgroundColor: 'black',
  skew: false,
}
