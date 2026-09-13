import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Pranav Labs";

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#ffffff",
          color: "#111111",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: "28px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "64px",
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: "20px" }}>
            <div
              style={{
                alignItems: "center",
                background: "#2563EB",
                borderRadius: "18px",
                color: "#ffffff",
                display: "flex",
                fontSize: "38px",
                fontWeight: 800,
                height: "64px",
                justifyContent: "center",
                width: "64px",
              }}
            >
              P
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "28px", fontWeight: 700 }}>
                Pranav Labs
              </div>
              <div style={{ color: "#64748B", fontSize: "18px" }}>
                Software built to last
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              maxWidth: "860px",
            }}
          >
            <div
              style={{
                color: "#2563EB",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Engineering Ideas Into Impact
            </div>
            <div
              style={{
                fontSize: title.length > 44 ? "58px" : "72px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      height: 630,
      width: 1200,
    },
  );
}
