This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## このプロジェクトについて

千葉工業大学「web3・AI概論」ハンズオン教材「教えて、minta先生」の最小WebUIプロトタイプです。

**構成:**
- Next.js (App Router) + Gemini API による質問・回答WebUI
- Supabase による会話履歴の保存
- Vercel へのデプロイ

## 到達点

- [x] **Step 1** — ローカルで Next.js + Gemini API WebUI が動作（localhost:3000）
- [x] **Step 2** — Vercel にデプロイし、公開URLで動作確認済み
- [x] **Step 3** — Supabase と連携し、`chat_histories` テーブルに `question` / `answer` / `created_at` が保存されることを確認済み

**公開URL:** https://access-wisdom.vercel.app/

**使用モデル:** `gemini-2.5-flash-lite`

**確認日:** 2026-06-03

## 環境変数

`.env.local` を作成し、以下を設定してください。

```
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

- `GEMINI_API_KEY` は [Google AI Studio](https://aistudio.google.com/apikey) で取得
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` は Supabase ダッシュボード → Settings → API で取得
- `.env.local` は `.gitignore` により Git に含まれません。**キーを絶対にコミットしないでください**
- Vercel にデプロイする場合は、同じ変数を Vercel の Environment Variables にも設定してください

## Supabase テーブル定義

```sql
create table chat_histories (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  created_at timestamptz default now()
);
```

## 次の予定

- [ ] 品質工学「思考の足あと」WebUI への改造
