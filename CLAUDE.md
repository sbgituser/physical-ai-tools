# template-static-tool

BB-system量産パイプライン用のNext.js静的サイトテンプレート。

## テンプレートの目的

量産サイトの共通基盤。全ての新規ツールサイトはこのテンプレートをベースに構築する。

## 新サイト作成手順

1. このリポジトリをクローン
   ```bash
   git clone https://github.com/sbgituser/template-static-tool.git my-new-site
   cd my-new-site
   rm -rf .git && git init
   ```

2. `src/data/site-config.ts` を編集（サイト名、URL、テーマカラー等）

3. `src/data/tools.json` を編集（ツール定義）

4. `src/data/articles.json` を編集（記事データ）

5. `src/lib/calculators/` に計算ロジックを追加

6. ビルド確認
   ```bash
   npm run build
   ```

7. デプロイ
   ```bash
   npx wrangler pages deploy out
   ```

## ビルドコマンド

```bash
npm run dev    # 開発サーバー起動
npm run build  # 静的ビルド（out/ディレクトリに出力）
npm run lint   # Lintチェック
```

## ディレクトリ構成

```
src/
├── app/               # Next.js App Router ページ
├── components/        # 共通コンポーネント
├── data/              # サイト設定・コンテンツデータ
└── lib/               # ユーティリティ・計算ロジック
```

## コンポーネント一覧

| コンポーネント | 役割 |
|---|---|
| Header.tsx | サイトヘッダー（ナビゲーション、ハンバーガーメニュー） |
| Footer.tsx | フッター（サイト情報、リンク、アフィリエイト免責） |
| ToolCard.tsx | ツールカード（一覧表示用） |
| BlogCard.tsx | ブログカードリ（一覧表示用） |
| Calculator.tsx | 汎用計算ツールフレームワーク |
| AmazonLink.tsx | Amazonアフィリエイトリンク（nofollow/sponsored付き） |
| JsonLd.tsx | JSON-LD構造化データ出力 |
| Breadcrumb.tsx | パンくずリスト（BreadcrumbList JSON-LD付き） |
| FAQ.tsx | FAQ アコーディオン（FAQPage JSON-LD付き） |

## データ構造

### site-config.ts
サイト固有の設定（名前・URL・テーマ・GA4 ID等）を一元管理。

### tools.json
ツールの定義データ。`slug`, `title`, `description`, `inputs`, `outputs`, `faq`, `relatedProducts` を含む。

### articles.json
ブログ記事データ。`slug`, `title`, `content`, `relatedTools` 等を含む。

## カラーテーマ

site-config.ts の `theme` を変更（`blue` / `green` / `purple` / `orange`）するだけでサイトカラーが変わる。

## Amazon アフィリエイト

- tag: `kurasplus-22`
- PA-API不使用（テキストリンクのみ）
- クリック時にGA4イベント `affiliate_click` を送信

## GA4 イベント

| イベント名 | 発火タイミング |
|---|---|
| `tool_use` | 計算ツールの入力値変更時 |
| `affiliate_click` | Amazonリンククリック時 |
