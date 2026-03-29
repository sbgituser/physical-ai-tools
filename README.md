# template-static-tool

BB-system量産サイト用テンプレート。Next.js 15 + TypeScript + Tailwind CSS v4 + 静的エクスポート。

## クイックスタート

```bash
git clone https://github.com/sbgituser/template-static-tool.git my-site
cd my-site
npm install
# src/data/site-config.ts を編集
npm run dev
```

## ビルド

```bash
npm run build  # out/ に静的ファイルを生成
```

## デプロイ (Cloudflare Pages)

```bash
npx wrangler pages deploy out
```

## ライセンス

Private
