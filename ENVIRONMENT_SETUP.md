# Environment Configuration

This project uses environment-specific configuration files to manage different deployment environments.

## Environment Files

### Development (.env.local)
For local development, create a `.env.local` file in the root directory:

```bash
# Development Environment Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5100
```

### Production (.env.production)
For production deployment, create a `.env.production` file:

```bash
# Production Environment Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-production-api.com
```

## Setup Instructions

1. **For Development:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your local API server URL
   ```

2. **For Production:**
   ```bash
   cp .env.production.example .env.production
   # Edit .env.production with your production API server URL
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the API server | Yes |

## Notes

- Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- The configuration automatically detects the environment and loads appropriate settings
- In production, the API_BASE_URL must be explicitly set or the application will throw an error
- For development, it defaults to `http://localhost:3001` if not specified

## File Priority

Next.js loads environment files in this order:
1. `.env.local` (always loaded, except in test environment)
2. `.env.production` or `.env.development` (depending on NODE_ENV)
3. `.env` (fallback for all environments)
