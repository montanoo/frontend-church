import type { Meta, StoryObj } from "@storybook/react";

import StoryBookButtonTest from "@/tests/StoryBookTest/StoryBookTest";

const meta: Meta<typeof StoryBookButtonTest> = {
  title: "Example/Button",
  component: StoryBookButtonTest,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "accent", "success", "error"],
    },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof StoryBookButtonTest>;

export const Primary: Story = {
  args: {
    label: "Primary Button",
    variant: "primary",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
    variant: "secondary",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    label: "Large Button",
    size: "large",
    variant: "accent",
  },
};

export const Small: Story = {
  args: {
    label: "Small Button",
    size: "small",
    variant: "success",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    variant: "error",
    disabled: true,
  },
};
