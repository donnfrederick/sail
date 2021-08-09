import React from 'react'
import Star from './Star'

export default {
  argTypes: {
    sideMargin: { control: { type: 'range', step: 1 } },
    size: { control: { type: 'range', step: 1 } },
    type: {
      control: { type: 'radio' },
      default: 'full',
      options: ['full', 'half', 'empty']
    }
  },
  component: Star,
  title: 'Star'
}

export const Default = (args: any) => <Star {...args} />
