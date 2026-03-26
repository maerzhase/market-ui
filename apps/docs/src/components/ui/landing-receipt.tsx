"use client";

import { cn, Price, Receipt } from "@m3000/market";
import { useEffect, useRef, useState } from "react";
import { use3dRotation } from "@/components/ui/use3dRotation";

const receiptMeta = [
  { label: "Customer", value: "Ava Thompson" },
  { label: "Order", value: "Spring Table Edit" },
  { label: "Delivery", value: "Standard shipping" },
  { label: "Payment", value: "Visa •••• 4242" },
];

function HeaderRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[0.72rem] tracking-[0.16em] text-stone-700 sm:gap-4 sm:text-[0.78rem] sm:tracking-[0.18em]">
      <span>{label}</span>
      <span className="text-right text-stone-950">{value}</span>
    </div>
  );
}

export function LandingReceipt({ className }: { className?: string } = {}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  const [{ ref: interactiveRef }, pointerHandlers] =
    use3dRotation<HTMLDivElement>({
      maxRotation: 8.2,
      scale: 1.01,
      moveDuration: 110,
      disabled: prefersReducedMotion,
      glowX: "50%",
      glowY: "35%",
      transformRef: cardRef,
    });

  return (
    <div className={cn("relative mx-auto w-full px-2 sm:px-0", className)}>
      <div className="absolute inset-x-10 top-8 -z-10 hidden h-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.68),rgba(255,255,255,0))] blur-3xl sm:block" />
      <div className="absolute inset-x-8 bottom-0 -z-10 hidden h-28 rounded-full bg-[radial-gradient(circle,rgba(180,72,68,0.26),rgba(180,72,68,0))] blur-3xl sm:block" />

      <div className="relative perspective-[1200px] perspective-origin-center">
        <div className="flex justify-center py-4">
          <div
            ref={interactiveRef}
            {...pointerHandlers}
            className="relative w-full"
          >
            <div
              ref={cardRef}
              className="relative w-full will-change-transform"
            >
              <div className="relative pb-4 shadow-[0_22px_36px_rgba(118,42,40,0.18)] sm:shadow-[0_28px_48px_rgba(118,42,40,0.16)]">
                <div className="relative overflow-hidden bg-[#fffaf2] px-5 pt-5 pb-12 text-stone-900 selection:bg-stone-900 selection:text-[#fffaf2] sm:px-6 sm:pt-7 sm:pb-14">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-85 mix-blend-screen"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at var(--landing-receipt-glow-x, 50%) var(--landing-receipt-glow-y, 35%), rgba(255,255,255,0.92), rgba(255,255,255,0) 50%)",
                    }}
                  />
                  <div className="bg-position-center pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(32,24,18,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(32,24,18,0.02)_1px,transparent_1px)] bg-size-[12px_12px] opacity-35" />

                  <Receipt
                    decimals={2}
                    className="relative gap-3 font-mono text-[0.72rem] sm:gap-4 sm:text-[0.78rem] [&_.text-foreground]:text-stone-950 [&_.text-muted-foreground]:text-stone-700 [&>div]:tracking-[0.16em] sm:[&>div]:tracking-[0.18em]"
                  >
                    <Receipt.Price maxDecimals={2}>
                      <Price.Symbol>$</Price.Symbol>
                      <Price.Value />
                    </Receipt.Price>

                    <Receipt.Header className="space-y-4 pb-0 sm:space-y-5">
                      <div className="text-center">
                        <div className="text-[1.35rem] font-black tracking-[0.24em] text-stone-950 uppercase sm:text-[1.5rem] sm:tracking-[0.26em]">
                          Store
                        </div>
                        <div className="mt-1 text-[0.58rem] font-semibold tracking-[0.4em] text-stone-500 uppercase sm:text-[0.62rem]">
                          Order Receipt
                        </div>
                        <div className="mt-3 space-y-1 text-[0.64rem] tracking-[0.16em] text-stone-600 sm:mt-4 sm:text-[0.68rem] sm:tracking-[0.18em]">
                          <div>Fri, Mar 20, 2026</div>
                          <div>09:27 CET</div>
                        </div>
                      </div>

                      <div className="border border-dashed border-stone-500/80 px-3 py-2.5 text-center sm:px-4 sm:py-3">
                        <div className="text-[0.6rem] tracking-[0.4em] text-stone-500 uppercase sm:text-[0.64rem]">
                          Order ID
                        </div>
                        <div className="mt-1.5 text-[1.1rem] font-semibold tracking-[0.16em] text-stone-950 sm:mt-2 sm:text-[1.2rem] sm:tracking-[0.18em]">
                          ORD-20481-031
                        </div>
                      </div>

                      <div className="space-y-2.5 sm:space-y-3">
                        {receiptMeta.map((row) => (
                          <HeaderRow
                            key={row.label}
                            label={row.label}
                            value={row.value}
                          />
                        ))}
                      </div>
                    </Receipt.Header>

                    <Receipt.Separator className="my-0 h-0 border-t border-dashed border-stone-400/80 bg-transparent" />
                    <Receipt.Item label="Hand-thrown Vase" value={6800n} />
                    <Receipt.Item label="Linen Table Runner" value={3400n} />
                    <Receipt.Item label="Oak Candle Set" value={2200n} />
                    <Receipt.Subtotal />
                    <Receipt.Fee label="Shipping" value={1200n} />
                    <Receipt.Separator className="my-0 h-0 border-t border-dashed border-stone-400/80 bg-transparent" />
                    <Receipt.Tax label="Sales Tax (8%)" value={992n} />
                    <Receipt.Total className="pt-1 text-[0.74rem] font-semibold tracking-[0.2em] text-stone-950 uppercase sm:text-[0.8rem] sm:tracking-[0.22em]" />
                    <Receipt.Footer className="flex items-baseline justify-between gap-3 pt-1 text-[0.72rem] tracking-[0.16em] text-stone-700 uppercase sm:gap-4 sm:text-[0.78rem] sm:tracking-[0.18em]">
                      <span>Delivery</span>
                      <span className="text-stone-950">
                        Arrives Tue, Mar 24
                      </span>
                    </Receipt.Footer>
                    <Receipt.Footer className="pt-2 text-center text-sm font-black tracking-[0.08em] text-stone-950 uppercase italic sm:pt-3">
                      @m3000/market
                    </Receipt.Footer>
                  </Receipt>
                </div>
                <div className="w-full h-5 bg-[#fffaf2] absolute bottom-0" />
                <svg
                  aria-hidden
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-5 h-5 w-full fill-[#fffaf2]"
                >
                  <path d="M0 0H200V4L193.33 20L186.67 4L180 20L173.33 4L166.67 20L160 4L153.33 20L146.67 4L140 20L133.33 4L126.67 20L120 4L113.33 20L106.67 4L100 20L93.33 4L86.67 20L80 4L73.33 20L66.67 4L60 20L53.33 4L46.67 20L40 4L33.33 20L26.67 4L20 20L13.33 4L6.67 20L0 4Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
