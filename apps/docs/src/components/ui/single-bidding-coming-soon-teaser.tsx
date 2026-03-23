"use client";

import {
  Button,
  Price,
  Receipt,
  SteppedInput,
  Text,
  cn,
} from "@m3000/market";
import Image from "next/image";
import { useState } from "react";
import { artworkUrl } from "../docs/examples/auction/shared";

const ITEM_PRICE = 148000n;
const SHIPPING = 1800n;
const INSURANCE = 900n;




export function SingleBiddingComingSoonTeaser({
  className,
}: {
  className?: string;
}) {
  const [quantity, setQuantity] = useState<bigint>(1n);
  const [showReceipt, setShowReceipt] = useState(false);

  const subtotal = ITEM_PRICE * quantity;
  const total = subtotal + SHIPPING + INSURANCE;

  return (
    <div className="flex justify-center">
      <div className={cn("relative p-4 pt-10 border border-border rounded-xl flex flex-col", className)}>
        <div className="flex h-[300] w-full">
          <img src={artworkUrl} alt="artwork" width="100%" height="auto" className="object-contain" />
        </div>
        <h3>The Great Wave off Kanagawa</h3>
      </div></div>
  );
}
