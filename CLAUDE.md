# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build application for production
- `npm run preview` - Preview production build locally
- `npm run generate` - Generate static site
- `npm install` - Install dependencies

## Architecture Overview

This is a **Nuxt 4 application** with Appwrite authentication and OpenAI chat integration. The project uses the new Nuxt 4 directory structure with `srcDir: "app"`.

### Key Components

**Authentication System (Appwrite)**
- Uses session-based auth with cookies (`my-appwrite-session`)
- Two client types: admin client (server-side) and session client (user-specific)
- Server utilities in `server/lib/appwrite.ts`
- Multiple auth stores: `auth.ts` (legacy), `auth2.ts` (current)
- Global middleware `appwrite-auth-always` applies to all routes

**Directory Structure**
- `app/` - Main application code (Nuxt 4 srcDir)
- `server/` - Server-side code and API routes
- `types/` - TypeScript type definitions
- Duplicate files exist in both root and `app/` for some middleware/stores/plugins

**State Management**
- Pinia stores with persistence enabled
- `useAuth2Store()` - primary auth store
- `useAuthStore()` - legacy auth store (still in use)
- Stores auto-imported from `app/stores/` directory

**API Routes**
- `/api/appwrite/*` - Authentication endpoints (login, signup, user, logout)
- `/api/chat.post.ts` - OpenAI integration with specialized prompt for David Schubert's portfolio chatbot
- `/api/tutorial/*` - Tutorial/example endpoints

**Middleware**
- `appwrite-auth-protected.ts` - Protects routes requiring authentication
- `appwrite-auth-already.ts` - Redirects authenticated users
- Multiple backup files indicate ongoing auth system refactoring

### Environment Variables Required

**Server-side (private)**
- `APPWRITE_API_KEY_SECRET` - Appwrite admin API key
- `OPENAI_API_KEY_SECRET` - OpenAI API key
- `OPENAI_MODEL` - OpenAI model (defaults to gpt-4o-mini)

**Client-side (public)**
- `APPWRITE_ENDPOINT` - Appwrite server endpoint
- `APPWRITE_PROJECT_ID` - Appwrite project ID
- `APPWRITE_DATABASE_ID` - Appwrite database ID
- `APPWRITE_COLLECTION_ORDERS` - Orders collection ID

### Tech Stack
- Nuxt 4 with TypeScript (strict mode)
- Pinia for state management with persistence
- Nuxt UI component library
- TailwindCSS for styling
- Appwrite for backend services
- OpenAI API integration
- Zod for validation

### Development Notes
- The project has both legacy and current auth implementations running in parallel
- Several `.backup` files indicate ongoing refactoring
- Chat feature includes German-language specialized prompt for a web design business
- Uses session cookies instead of JWT tokens for authentication