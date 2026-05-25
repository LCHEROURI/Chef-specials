# Chef Specials AI

Chef Specials AI is a Vite + React web app for chefs who need fast inspiration for upscale dinner specials.

## What it does

- Generates three polished dinner specials by cuisine
- Supports Greek, French, American, Chinese, and Italian cuisine
- Shows menu captions, core ingredients, prep overview, estimated food cost, suggested menu price, and margin signal
- Lets the chef open a full recipe-style preparation view
- Includes plating guidance, pairing suggestion, print flow, saved specials, and image-generation prompt

## Current version

This first version uses curated sample logic in the frontend so it can run immediately without requiring API keys.

A production version can later connect to:

- OpenAI or another AI provider for live generation
- Web search / restaurant menu inspiration tools
- Image generation API
- Supabase or Firebase for saved specials
- Stripe for subscription billing

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Vercel settings

- Framework: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

## Suggested next features

- Real AI generation endpoint
- Web inspiration search with source summaries
- Ingredient-cost calculator
- Saved recipe database
- Restaurant profile settings
- Cuisine-specific prompt templates
- Generated dish images
- PDF recipe cards
