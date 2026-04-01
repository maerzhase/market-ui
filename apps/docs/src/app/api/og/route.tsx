import { ImageResponse } from "next/og";

export const runtime = "edge";

// jsDelivr fontsource CDN — serves woff (not woff2), which satori requires
const CDN = "https://cdn.jsdelivr.net/npm";

async function font(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch font: ${url} (${res.status})`);
  return res.arrayBuffer();
}

export async function GET() {
  const [interRegular, interBold, monoRegular, monoBold] = await Promise.all([
    font(`${CDN}/@fontsource/inter/files/inter-latin-400-normal.woff`),
    font(`${CDN}/@fontsource/inter/files/inter-latin-700-normal.woff`),
    font(
      `${CDN}/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff`,
    ),
    font(
      `${CDN}/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff`,
    ),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#111111",
        fontFamily: "Inter",
        alignItems: "center",
        padding: "0 72px",
        gap: 0,
      }}
    >
      {/* Left panel — copy */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          paddingRight: 56,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            alignItems: "center",
            backgroundColor: "#191919",
            border: "1px solid #3a3a3a",
            borderRadius: 9999,
            padding: "7px 18px",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.24em",
            color: "#eeeeee",
            textTransform: "uppercase",
          }}
        >
          Marketplace design system
        </div>

        {/* H1 */}
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "#eeeeee",
          }}
        >
          Build interfaces shaped by price, time, and competition.
        </div>

        {/* Subheading */}
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#b4b4b4",
          }}
        >
          Declarative components for transactions, auctions, and dynamic
          marketplace logic.
        </div>
      </div>

      {/* Right panel — receipt */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fffaf2",
            boxShadow: "0 28px 48px rgba(118,42,40,0.22)",
            width: 290,
            fontFamily: "JetBrainsMono",
            position: "relative",
            transform: "rotate(5deg)",
          }}
        >
          {/* Card body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px 20px 44px 20px",
              gap: 11,
            }}
          >
            {/* Header: store name + subtitle + date */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 19,
                  fontWeight: 900,
                  letterSpacing: "0.24em",
                  color: "#0c0a09",
                  textTransform: "uppercase",
                }}
              >
                Store
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 4,
                  fontSize: 8,
                  fontWeight: 600,
                  letterSpacing: "0.4em",
                  color: "#78716c",
                  textTransform: "uppercase",
                }}
              >
                Order Receipt
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 10,
                  gap: 3,
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  color: "#57534e",
                }}
              >
                <div style={{ display: "flex" }}>Fri, Mar 20, 2026</div>
                <div style={{ display: "flex" }}>09:27 CET</div>
              </div>
            </div>

            {/* Order ID box */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px dashed rgba(120,113,108,0.8)",
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 8,
                  letterSpacing: "0.4em",
                  color: "#78716c",
                  textTransform: "uppercase",
                }}
              >
                Order ID
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  color: "#0c0a09",
                }}
              >
                ORD-20481-031
              </div>
            </div>

            {/* Meta rows */}
            {(
              [
                ["Customer", "Ava Thompson"],
                ["Order", "Spring Table Edit"],
                ["Delivery", "Standard shipping"],
                ["Payment", "Visa •••• 4242"],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  color: "#57534e",
                }}
              >
                <div style={{ display: "flex" }}>{label}</div>
                <div style={{ display: "flex", color: "#0c0a09" }}>{value}</div>
              </div>
            ))}

            {/* Dashed divider */}
            <div
              style={{
                display: "flex",
                height: 0,
                borderTop: "1px dashed rgba(120,113,108,0.5)",
                margin: "1px 0",
              }}
            />

            {/* Line items */}
            {(
              [
                ["Hand-thrown Vase", "$68.00"],
                ["Linen Table Runner", "$34.00"],
                ["Oak Candle Set", "$22.00"],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  color: "#57534e",
                }}
              >
                <div style={{ display: "flex" }}>{label}</div>
                <div style={{ display: "flex" }}>{value}</div>
              </div>
            ))}

            {/* Subtotal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 9,
                letterSpacing: "0.16em",
                color: "#57534e",
              }}
            >
              <div style={{ display: "flex" }}>Subtotal</div>
              <div style={{ display: "flex" }}>$124.00</div>
            </div>

            {/* Shipping */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 9,
                letterSpacing: "0.16em",
                color: "#57534e",
              }}
            >
              <div style={{ display: "flex" }}>Shipping</div>
              <div style={{ display: "flex" }}>$12.00</div>
            </div>

            {/* Dashed divider */}
            <div
              style={{
                display: "flex",
                height: 0,
                borderTop: "1px dashed rgba(120,113,108,0.5)",
                margin: "1px 0",
              }}
            />

            {/* Tax */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 9,
                letterSpacing: "0.16em",
                color: "#57534e",
              }}
            >
              <div style={{ display: "flex" }}>Sales Tax (8%)</div>
              <div style={{ display: "flex" }}>$9.92</div>
            </div>

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#0c0a09",
                textTransform: "uppercase",
              }}
            >
              <div style={{ display: "flex" }}>Total</div>
              <div style={{ display: "flex" }}>$145.92</div>
            </div>

            {/* Footer rows */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
                fontSize: 9,
                letterSpacing: "0.16em",
                color: "#57534e",
                textTransform: "uppercase",
              }}
            >
              <div style={{ display: "flex" }}>Delivery</div>
              <div style={{ display: "flex", color: "#0c0a09" }}>
                Arrives Tue, Mar 24
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 6,
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: "0.08em",
                color: "#0c0a09",
                textTransform: "uppercase",
              }}
            >
              @m3000/market
            </div>
          </div>

          {/* Covers the seam between card body and torn edge */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 20,
              backgroundColor: "#fffaf2",
              display: "flex",
            }}
          />

          {/* Torn bottom edge */}
          <svg
            viewBox="0 0 200 20"
            style={{
              position: "absolute",
              bottom: -20,
              left: 0,
              right: 0,
              width: "100%",
              height: 20,
              display: "flex",
            }}
          >
            <path
              fill="#fffaf2"
              d="M0 0H200V4L193.33 20L186.67 4L180 20L173.33 4L166.67 20L160 4L153.33 20L146.67 4L140 20L133.33 4L126.67 20L120 4L113.33 20L106.67 4L100 20L93.33 4L86.67 20L80 4L73.33 20L66.67 4L60 20L53.33 4L46.67 20L40 4L33.33 20L26.67 4L20 20L13.33 4L6.67 20L0 4Z"
            />
          </svg>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        {
          name: "JetBrainsMono",
          data: monoRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "JetBrainsMono",
          data: monoBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
