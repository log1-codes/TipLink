# CoinLink

Send crypto to anyone with a link. No wallet setup needed on the receiver's end.

CoinLink lets you create shareable payment links on Solana. You pick an amount, we generate a link, and whoever opens it can claim the SOL — even if they've never touched crypto before.

**Live:** [coinlink-six.vercel.app](https://coinlink-six.vercel.app)

---

## How it works

1. **Sign in with Google** — We create a Solana wallet for you behind the scenes using AWS KMS encryption. No seed phrases.
2. **Enter an amount** — Choose how much SOL to send. The funds move to a temporary escrow wallet.
3. **Share the link** — We generate a unique claim URL. Send it via text, email, Twitter — anywhere.
4. **Recipient claims** — They open the link, sign in with Google, and the SOL lands in their wallet.

---

## Features

- **Link-based transfers** — Send SOL to anyone via a URL. No recipient address needed.
- **Google OAuth login** — One-click sign-in. A Solana wallet is auto-generated per user.
- **KMS-encrypted wallets** — Private keys are encrypted with AWS KMS and never stored in plaintext.
- **Real-time balances** — Dashboard shows live SOL balance and USD value from CoinGecko.
- **Transaction history** — Powered by Helius API, shows recent sends and receives.
- **Claim page** — Recipients paste the link or open it directly to claim funds.
- **Swap UI** — Token swap interface (UI ready, integration pending).
- **Responsive design** — Works on desktop and mobile.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Auth** | NextAuth.js v4 (Google OAuth) |
| **Database** | PostgreSQL via Prisma ORM v7 |
| **DB Adapter** | `@prisma/adapter-pg` with `pg` driver |
| **Blockchain** | Solana (devnet) via `@solana/web3.js` |
| **Key Management** | AWS KMS for wallet encryption |
| **Transaction History** | Helius RPC API |
| **Price Data** | CoinGecko API |
| **Deployment** | Vercel |

---

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout with metadata
│   ├── providers.tsx         # NextAuth SessionProvider
│   ├── globals.css           # Design tokens and base styles
│   ├── dashboard/page.tsx    # Wallet dashboard (balance, history)
│   ├── send/page.tsx         # Create payment link
│   ├── claim/page.tsx        # Paste a link to claim
│   ├── swap/page.tsx         # Token swap interface
│   ├── i/page.tsx            # Direct claim handler (reads URL hash)
│   ├── components/
│   │   └── Navbar.tsx        # Navigation bar
│   └── api/
│       ├── auth/[...nextauth]/route.ts   # Google OAuth + auto wallet creation
│       └── links/
│           ├── create/route.ts           # POST — create escrow + generate link
│           └── claim/route.ts            # POST — claim funds from link
├── lib/
│   ├── prisma.ts             # Prisma client with pg adapter
│   └── wallet.ts             # KMS encrypt/decrypt + keypair utils
prisma/
│   └── schema.prisma         # User model (email, publicKey, encryptedKey)
prisma.config.ts              # Prisma 7 config (datasource URL)
```

---

## Getting started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted)
- AWS account with KMS key configured
- Google OAuth credentials

### 1. Clone the repo

```bash
git clone https://github.com/log1-codes/TipLink.git
cd TipLink
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# NextAuth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AWS KMS (for wallet encryption)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_KMS_KEY="your-kms-key-id"

# Helius (for transaction history)
NEXT_PUBLIC_HELIUS_API_KEY="your-helius-api-key"
```

### 4. Generate Prisma client and push schema

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## API routes

### `POST /api/links/create`

Creates a payment link. Requires authentication.

**Request body:**
```json
{ "amount": 0.5 }
```

**Response:**
```json
{
  "success": true,
  "signature": "5xK...",
  "publicKey": "7Hy...",
  "privateKey": "4kM...",
  "amount": 0.5,
  "rentExemptFee": 0.00089
}
```

### `POST /api/links/claim`

Claims funds from a payment link. Requires authentication.

**Request body:**
```json
{ "privateKey": "4kM..." }
```

**Response:**
```json
{
  "success": true,
  "signature": "3xP...",
  "amountClaimed": 0.499995
}
```

---

## Deployment

The project is set up for Vercel. The build command runs `prisma generate` automatically:

```bash
npm run build   # runs: prisma generate && next build
```

Make sure all environment variables are configured in your Vercel project settings.

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run the dev server and test locally
5. Commit (`git commit -m "Add your feature"`)
6. Push to your branch (`git push origin feature/your-feature`)
7. Open a Pull Request

### Things to keep in mind

- The app currently runs on **Solana devnet**. Don't use real funds.
- Wallet private keys are encrypted with AWS KMS. Never log or expose them.
- The swap page has the UI built but doesn't have a working backend yet.
- If you're adding new pages, follow the existing design system defined in `globals.css`.

---

## License

MIT
