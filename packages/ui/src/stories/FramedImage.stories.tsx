import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components";
import { FramedImage } from "@/components/primitives/framed-image";

// Classical painting from Wikimedia Commons (public domain)
const ARTWORK_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1920px-1665_Girl_with_a_Pearl_Earring.jpg";

const meta: Meta<typeof FramedImage> = {
  title: "Primitives/FramedImage",
  component: FramedImage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof FramedImage>;

export const Editorial: Story = {
  render: () => (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-8">
      <article className="flex w-full max-w-md flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Girl with a Pearl Earring</h1>
          <h2 className="text-lg text-muted-foreground">Johannes Vermeer</h2>
        </div>
        <div className="h-100">
          <FramedImage src={ARTWORK_URL} alt="Girl with a Pearl Earring" />
        </div>
        <p className="leading-relaxed text-muted-foreground">
          A unique digital artwork exploring the intersection of color and form.
          Click the image to open a morphing dialog preview.
        </p>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Current bid</p>
            <p className="text-xl font-semibold">0.85 ETH</p>
          </div>
          <Button type="button">Place bid</Button>
        </div>
      </article>
    </div>
  ),
};
