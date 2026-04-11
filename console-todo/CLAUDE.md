# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Console Todo Manager — a command-line task manager used as an educational TypeScript project. Single-file application (`src/todo.ts`) that teaches JS/TS fundamentals through iterative chapter-based development (docs in `doc/`).

## Commands

- `npm run start` — Run the app directly via ts-node
- `npm run build` — Compile TypeScript to `dist/`
- `npm test` — Run all tests (unit + acceptance)
- `npm run test:watch` — Run tests in watch mode
- `npx jest tests/todo.test.ts` — Run a single test file
- `npx jest --testNamePattern="toggle"` — Run tests matching a name pattern

## Architecture

The app is a single file (`src/todo.ts`) with three layers:

1. **Pure functions** (exported, testable): `addTask`, `markTaskComplete`, `toggleTaskCompletion`, `getTasksDisplay` — all take and return arrays using immutable patterns (spread operator, `.map()`)
2. **CLI handler**: `handleChoice()` routes user input and returns `{ tasks, action }` — no global state, uses union type `"continue" | "exit"` for control flow
3. **Interactive I/O**: `startCli()` manages local task state and listens on `process.stdin` with `.on("data")` events

The module uses `require.main === module` to guard direct execution, allowing functions to be imported in tests without triggering the CLI.

## Testing

- **Unit tests** (`tests/todo.test.ts`): Test pure functions with Arrange-Act-Assert pattern; verify immutability (new array !== original)
- **Acceptance tests** (`tests/acceptance/`): User-perspective scenarios following ATDD workflow
- Framework: Jest + ts-jest, CommonJS module system, strict TypeScript
