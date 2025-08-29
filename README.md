# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

```
pnpm dlx shadcn@2.9.2 add input
```

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```
#### To install a dependency in a perticular app/packages

```
pnpm -F eslint-config add --save-dev @eslint/js
```

### Install all components - from apps/web
```
pnpm dlx shadcn@2.9.2 add --all

~~~~

https://docs.sentry.io/platforms/javascript/guides/nextjs/troubleshooting/#pnpm-resolving-import-in-the-middle-external-package-errors

Add below lines in .npprc
```
public-hoist-pattern[]=*import-in-the-middle*
public-hoist-pattern[]=*require-in-the-middle*

pnpm install
```