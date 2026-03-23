import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, MorphDialog } from "@/components";

// Classical painting from Wikimedia Commons (public domain)
const ARTWORK_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1920px-1665_Girl_with_a_Pearl_Earring.jpg";

const meta: Meta<typeof MorphDialog> = {
  title: "Primitives/MorphDialog",
  component: MorphDialog,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof MorphDialog>;

export const Uncontrolled: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <MorphDialog
        popupAriaLabel="Expanded artwork preview"
        trigger={
          <div className="overflow-hidden rounded-xl border border-border bg-accent shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ARTWORK_URL}
              alt="Girl with a Pearl Earring"
              className="block h-[22rem] w-[16rem] object-cover"
            />
          </div>
        }
        content={
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ARTWORK_URL}
              alt="Girl with a Pearl Earring"
              className="block max-h-[85vh] w-auto object-contain"
            />
          </div>
        }
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8">
        <Button type="button" color="secondary" onClick={() => setOpen(true)}>
          Open preview
        </Button>
        <MorphDialog
          open={open}
          onOpenChange={setOpen}
          popupAriaLabel="Expanded artwork preview"
          trigger={
            <div className="overflow-hidden rounded-xl border border-border bg-accent shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ARTWORK_URL}
                alt="Girl with a Pearl Earring"
                className="block h-[18rem] w-[13rem] object-cover"
              />
            </div>
          }
          content={
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ARTWORK_URL}
                alt="Girl with a Pearl Earring"
                className="block max-h-[85vh] w-auto object-contain"
              />
            </div>
          }
        />
      </div>
    );
  },
};
