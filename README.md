# Next.js 15 Minimal Blog App

This is a modern blog application built with Next.js 15 and React 19.

## Future Development

Planned features include:

- AI-powered content generation
- Comments system
- Tags and categories
- Search functionality
- Analytics dashboard

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Clerk Authentication
- Prisma ORM
- PostgreSQL
- Zod

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database
- Clerk account for authentication
- Ngrok for local webhook testing

### Installation

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

Fill in the following variables:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: From your Clerk dashboard
- `CLERK_SECRET_KEY`: From your Clerk dashboard
- `SIGNING_SECRET`: Webhook signing secret from Clerk

4. Set up your database:

```bash
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

6. Set up webhooks (for development):

- Install ngrok and create an account
- Start ngrok tunnel pointing to your local server
- Add the webhook endpoint in your Clerk dashboard
- Configure the webhook to listen for user events

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Push your changes to your fork
5. Submit a pull request to the main repository
