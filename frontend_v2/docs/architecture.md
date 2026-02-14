# Architecture Patterns

## Feature-Based Structure

Each feature is self-contained:

```
features/[feature-name]/
├── components/     # Feature-specific components
├── pages/          # Route-level pages
├── hooks/          # Custom hooks
├── services/       # API calls
├── types/          # TypeScript types
└── graphql/        # GraphQL queries (optional)
```

## Shared Components

Cross-feature components go in `src/components/`. Export from index.ts.

## GraphQL

- Queries: `features/[feature]/graphql/*.graphqls` or `features/shared/graphql/`
- Generated types: `graphql/generated/graphql.tsx`
- Use generated hooks: `useFindTaskQuery`, `useUpdateTaskNameMutation`, etc.

Run `bun run codegen` after modifying GraphQL files.

## Import Patterns

Use path aliases (configured in tsconfig.json):

```tsx
import {Button} from "@/components/common";
import {useAuth} from "@/features/auth/hooks/useAuth";
```

Avoid relative paths like `../../components/common`.