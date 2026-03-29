/**
 * OGP画像生成スクリプト
 * satori + @resvg/resvg-js で 1200×630px の PNG を生成
 * 実行: tsx scripts/generate-ogp-images.tsx
 */

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const toolsData = require("../src/data/tools.json") as {
  slug: string;
  title: string;
  description: string;
}[];
// eslint-disable-next-line @typescript-eslint/no-require-imports
const articlesData = require("../src/data/articles.json") as {
  slug: string;
  title: string;
  description: string;
}[];

const WIDTH = 1200;
const HEIGHT = 630;
const SITE_NAME = "フィジカルAI ツール";
const SITE_DOMAIN = "physical-ai-tools.kuras-plus.com";
const PRIMARY = "#2563EB";
const DARK_BLUE = "#1e3a8a";

// __dirname equivalent for ESM / CJS interop
const scriptDir =
  typeof __dirname !== "undefined"
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

const rootDir = join(scriptDir, "..");

function loadFonts(): { japaneseFont: Buffer; latinFont: Buffer } {
  const fontsourcePath = join(
    rootDir,
    "node_modules",
    "@fontsource",
    "noto-sans-jp",
    "files"
  );
  const japaneseFont = readFileSync(
    join(fontsourcePath, "noto-sans-jp-japanese-700-normal.woff")
  );
  const latinFont = readFileSync(
    join(fontsourcePath, "noto-sans-jp-latin-700-normal.woff")
  );
  return { japaneseFont, latinFont };
}

function buildElement(title: string, subtitle: string) {
  return {
    type: "div",
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        flexDirection: "column" as const,
        background: `linear-gradient(135deg, ${DARK_BLUE} 0%, ${PRIMARY} 65%, #3b82f6 100%)`,
        padding: "64px 80px",
        fontFamily: "Noto Sans JP",
        color: "white",
        boxSizing: "border-box" as const,
      },
      children: [
        // Main content area
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column" as const,
              flex: 1,
              justifyContent: "center",
              gap: "20px",
            },
            children: [
              // Title
              {
                type: "div",
                props: {
                  style: {
                    fontSize: title.length > 24 ? 42 : 52,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    maxWidth: 980,
                    letterSpacing: "-0.01em",
                  },
                  children: title,
                },
              },
              // Subtitle
              subtitle
                ? {
                    type: "div",
                    props: {
                      style: {
                        fontSize: 24,
                        fontWeight: 400,
                        opacity: 0.82,
                        maxWidth: 900,
                        lineHeight: 1.5,
                        marginTop: "4px",
                      },
                      children:
                        subtitle.length > 60
                          ? subtitle.slice(0, 57) + "…"
                          : subtitle,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        // Footer bar
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255,255,255,0.25)",
              paddingTop: "20px",
              marginTop: "16px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 22,
                    fontWeight: 700,
                    opacity: 0.92,
                  },
                  children: SITE_NAME,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 18,
                    opacity: 0.65,
                  },
                  children: SITE_DOMAIN,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function generateImage(
  title: string,
  subtitle: string,
  outputPath: string,
  fonts: { japaneseFont: Buffer; latinFont: Buffer }
): Promise<void> {
  const svg = await satori(buildElement(title, subtitle) as never, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: "Noto Sans JP",
        data: fonts.japaneseFont,
        weight: 700,
        style: "normal",
      },
      {
        name: "Noto Sans JP",
        data: fonts.latinFont,
        weight: 700,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, pngBuffer);
  console.log(
    `  ✓ ${outputPath.replace(rootDir + "\\", "").replace(rootDir + "/", "")}`
  );
}

async function main() {
  console.log("Loading Noto Sans JP fonts from @fontsource/noto-sans-jp...");
  const fonts = loadFonts();
  console.log("Fonts loaded.");

  const ogpDir = join(rootDir, "public", "ogp");
  mkdirSync(join(ogpDir, "tools"), { recursive: true });
  mkdirSync(join(ogpDir, "blog"), { recursive: true });

  // ── Default OGP ────────────────────────────────────────────────────────────
  console.log("\nGenerating default OGP...");
  await generateImage(
    "フィジカルAI・IoTツール",
    "フィジカルAI・IoT・エッジAIの導入コスト計算、電気代シミュレーション、ROI分析ツール集",
    join(ogpDir, "default-ogp.png"),
    fonts
  );

  // ── Tool pages ─────────────────────────────────────────────────────────────
  console.log(`\nGenerating ${toolsData.length} tool OGP images...`);
  for (const tool of toolsData) {
    await generateImage(
      tool.title,
      tool.description,
      join(ogpDir, "tools", `${tool.slug}.png`),
      fonts
    );
  }

  // ── Blog pages ─────────────────────────────────────────────────────────────
  console.log(`\nGenerating ${articlesData.length} blog OGP images...`);
  for (const article of articlesData) {
    await generateImage(
      article.title,
      article.description,
      join(ogpDir, "blog", `${article.slug}.png`),
      fonts
    );
  }

  const total = 1 + toolsData.length + articlesData.length;
  console.log(`\nOGP image generation complete! ${total} images generated.`);
}

main().catch((err) => {
  console.error("\nOGP generation failed:", err);
  process.exit(1);
});
