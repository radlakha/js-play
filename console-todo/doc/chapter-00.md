# Chapter 0: Project Setup

## Goal of this Chapter
Set up a proper TypeScript + Node.js project structure so we can comfortably run, build, and test our Console Todo app.

## What We Installed

Run these commands in your project folder:

```bash
npm init -y
npm install --save-dev typescript ts-node @types/node
npm install --save-dev jest ts-jest @types/jest
npx tsc --init
npx ts-jest config:init
```

### Explanation of Packages

- `typescript` → TypeScript compiler
- `ts-node` → Run `.ts` files directly without manual compilation
- `@types/node` → Type definitions for Node.js built-ins (`process`, `console`, etc.)
- `jest` + `ts-jest` + `@types/jest` → Testing framework (we will use it later)

## Project Structure

Create this folder structure:

```
console-todo-ts/
├── src/
│   └── todo.ts                 ← Main source code
├── tests/
│   └── todo.test.ts            ← Test files (side-by-side with src)
├── tsconfig.json
├── jest.config.js
├── package.json
├── package-lock.json
├── README.md
└── LEARNING-TYPESCRIPT.md      ← Main learning journal
```

## Important Files Configuration

### 1. package.json scripts

Make sure the `"scripts"` section in `package.json` looks like this:

```json
"scripts": {
  "build": "tsc",
  "start": "ts-node src/todo.ts",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

### 2. tsconfig.json (Important settings)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. Useful Commands

- `npm run start` → Run the todo app
- `npm run build` → Compile TypeScript to JavaScript
- `npm test` → Run tests (when we add them)
- `ts-node src/todo.ts` → Run a single file directly

## Key Learnings from Chapter 0

- `package.json` is the central configuration file for any Node.js/TypeScript project.
- `package-lock.json` ensures exact versions of packages are installed every time.
- `tsconfig.json` controls how TypeScript behaves (strictness, output location, Node.js types, etc.).
- Using npm scripts makes running the project consistent and easy.
- Separating `src/` (source) and `tests/` (tests) is a standard professional practice.
- `@types/node` is required so TypeScript understands Node.js globals like `process`.

## Status after Chapter 0
Project is properly set up and ready for coding.
