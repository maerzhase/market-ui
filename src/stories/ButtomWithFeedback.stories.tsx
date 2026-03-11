import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, Feedback } from "@/components/primitives";

const meta: Meta<typeof Button> = {
  title: "Trading UI/Feedback",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "md"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    active: {
      control: "boolean",
    },
  },
};

export default meta;

export const Primary: StoryObj<typeof Button> = {
  render() {
    const [showFeedback, setShowFeedback] = useState(false);
    return (
      <Feedback.Root show={showFeedback}>
        <Button onClick={() => setShowFeedback(!showFeedback)}>Test</Button>
        <Feedback.Content className="w-full">
          <span className="rounded-md bg-solid px-2 py-1 text-sm text-background-primary">
            feedback
          </span>
        </Feedback.Content>
      </Feedback.Root>
    );
  },
};

export const ChainedFeedback: StoryObj<typeof Button> = {
  render() {
    const [message, setMessage] = useState<string | null>(null);

    const handleClick = async () => {
      setMessage("Waiting for confirmation...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage("Transaction confirmed!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage(null);
    };

    return (
      <Feedback.Root show={!!message}>
        <Button onClick={handleClick} loading={!!message}>
          Submit Transaction
        </Button>
        <Feedback.Content className="w-full">
          <div className="mt-0.5 rounded-md bg-solid px-2 py-1 text-sm whitespace-nowrap text-background-primary">
            {message}
          </div>
        </Feedback.Content>
      </Feedback.Root>
    );
  },
};
