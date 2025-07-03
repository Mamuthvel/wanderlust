import type { Meta, StoryObj } from '@storybook/react-vite';

import AvailabilityResults from './AvailabilityResults';

const meta = {
  component: AvailabilityResults,
} satisfies Meta<typeof AvailabilityResults>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};