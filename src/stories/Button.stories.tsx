import { Button, type ButtonProps } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import "../index.css";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ['autodocs'], // Enables Docs tab with auto-props
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Red: Story = {
  args: {
    children: "Don't Press Me",
    className: 'bg-red-500 hover:bg-red-600 text-white',
    size: "sm",
    asChild: false,
    variant: "outline"
  },
};

export const Green: Story = {
  args: {
    children: 'Press Me',
    className: 'bg-green-500 hover:bg-green-600 text-white',
    size: 'lg',
  },
};
