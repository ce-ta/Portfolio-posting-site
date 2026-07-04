# CLAUDE.md
このファイルは、このリポジトリ内のコードを扱う際に、Claude Code (claude.ai/code) にガイダンスを提供するものです。
- 質問に対する返答・書き込み（特に自然言語）は常に日本語で行うこと

## コマンド

- `npm run dev`: 開発サーバーを起動 (http://localhost:3000)
- `npm run build`: 本番ビルド
- `npm run start`: ビルド済みアプリを起動
- `npm run lint`: ESLintを実行

## アーキテクチャ

Next.js (App Router) + TypeScript + Tailwind CSSによる個人ポートフォリオサイト。DBは使わず、ローカルのJSON/Markdownファイルをビルド時に読み込む静的サイトとして構成している。

- `src/data/profile.json`: 名前・肩書き・自己紹介・SNSリンクなどのプロフィール情報。
- `src/data/projects/*.md`: 作品ごとのMarkdownファイル。frontmatter (title, summary, tags, link) と本文を持つ。
- `src/lib/projects.ts`: 作品データの読み込みロジック。`getAllProjects()` は一覧用にfrontmatterのみ返し、`getProjectBySlug()` は該当作品のMarkdown本文を `gray-matter` でパースし `remark`/`remark-html` でHTML化して返す。
- `src/app/page.tsx`: トップページ。プロフィールと作品一覧カードを表示。
- `src/app/projects/[slug]/page.tsx`: 作品詳細ページ。`generateStaticParams` で全作品を静的生成し、存在しないslugは `notFound()` で404を返す。
- `src/app/layout.tsx`: 共通レイアウト（ヘッダー・フッター）。

新しい作品を追加する場合は `src/data/projects/` にMarkdownファイルを1つ追加するだけでよく、一覧・詳細ページの両方に自動的に反映される。
