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

**作成したもの:**
- Next.js (App Router) + Gemini API による質問・回答WebUI
- テキスト入力欄に質問を入れると、AIが回答を返すシンプルな1画面アプリ

## 動作確認済み

- 確認日: 2026-06-03
- 確認環境: localhost:3000
- 使用モデル: `gemini-2.5-flash-lite`
- 動作: 質問を入力すると Gemini API から回答が返ることを確認済み

## 環境変数

`.env.local` を作成し、以下を設定してください。

```
GEMINI_API_KEY=your_api_key_here
```

- APIキーは [Google AI Studio](https://aistudio.google.com/apikey) で取得できます
- `.env.local` は `.gitignore` により Git に含まれません。**キーをコミットしないよう注意してください**
- サンプルファイルとして `.env.local.example` を用意しています

## 次のステップ候補

- [ ] Vercel へのデプロイ
- [ ] Supabase 接続（会話履歴の保存）
- [ ] 品質工学ワークベンチ化（パラメータ設計・実験管理）
