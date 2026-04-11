# Chapter 5a: The Fragile Test Problem — and the Application Layer

## A Question Worth Pausing For

In Chapter 5 we wrote our first acceptance test. It worked. But before moving on to the next feature, a question came up:

> *If we refactor the internal shape of a task — say, from a plain `string` to a structured object — do our acceptance tests need to change too?*

The answer was yes. And that is a problem.

Acceptance tests are supposed to give us **confidence to refactor**. If they break every time we touch the internals, they become a burden instead of a safety net. This chapter captures the thinking that led us to a better design.

---

## The Fragile Test Problem

Look at our current acceptance test:

```typescript
// tests/acceptance/toggle-complete.acceptance.test.ts

let tasks: string[] = [];
tasks = addTask(tasks, "Buy milk");
tasks = addTask(tasks, "Walk the dog");
tasks = toggleTaskCompletion(tasks, 1);

expect(tasks).toEqual([
    "Buy milk",
    "[✓] Walk the dog",
]);
```

It breaks in two ways if we change the internal task shape:

1. **Arrange** — `addTask` returns `string[]` today. If it returns `Task[]` tomorrow, the type annotation `string[]` breaks.
2. **Assert** — `expect(tasks).toEqual([...])` asserts on the raw array contents. The `"[✓] Walk the dog"` string is an implementation detail, not a user requirement.

Robert Martin (Uncle Bob) calls this the **Fragile Test Problem** in *Clean Code*: tests that break for reasons unrelated to behavior change. They erode trust in the test suite and make refactoring painful.

---

## What Tests Should Couple To

The rule of thumb from Clean Code and TDD By Example:

| Test type | Couples to | Should break when... |
|---|---|---|
| **Unit test** | A specific pure function | The function's contract changes |
| **Acceptance test** | Observable user behavior | A requirement changes |
| **E2E / adapter test** | The interface (CLI, REST) | The interface contract changes |

Our acceptance test was asserting on **internal data shape** — it was behaving like a unit test wearing acceptance test clothing.

The fix is not just to change what we assert on. It is to introduce a proper **boundary** that the test talks to, so the internals are never visible in the first place.

---

## The Missing Abstraction: An Application Layer

Currently our module has two layers:

```
[ startCli ]  ←— reads stdin, writes stdout
      |
[ addTask, toggleTaskCompletion, getTasksDisplay ]  ←— pure functions
```

There is nothing in between. `startCli` calls the pure functions directly, and so do the acceptance tests — meaning both are coupled to the same internals.

What is missing is an **application layer**: a stable set of operations that describe *what the system does* without exposing *how it stores things*.

```
[ startCli ]        [ acceptance tests ]        [ future REST API ]
       \                     |                         /
        +--------[ Application API ]------------------+
                             |
               [ pure functions + internal state ]
```

The acceptance tests talk only to the Application API. The Application API owns the state and delegates to the pure functions. Internal changes stay invisible to callers.

---

## Why Functional, Not Object-Oriented

The natural OOP solution is a class:

```typescript
class TodoService {
    private tasks = [];
    addTask(title: string) { ... }
    toggleTask(id: number) { ... }
}
```

But this project is about learning functional programming — pure functions, immutability, and avoiding hidden state inside objects. A class with `this` and private fields is the wrong tool here.

The functional equivalent is a **module with module-level state**:

```typescript
// ==================== APPLICATION API ====================

let appTasks: string[] = [];   // hidden — callers never see or touch this

export function createTask(title: string): number { ... }
export function toggleTask(id: number): void { ... }
export function isTaskComplete(id: number): boolean { ... }
export function resetApp(): void { ... }   // for test setup
```

No class. No `this`. The module itself is the boundary. `appTasks` is private by discipline — callers have no reason to reach past the API functions.

The pure functions (`addTask`, `toggleTaskCompletion`, etc.) are unchanged. The Application API is a thin layer on top that holds state and delegates to them.

---

## IDs Instead of Indices

The current pure functions take an **index** (position in the array):

```typescript
toggleTaskCompletion(tasks, 1);   // toggle the task at position 1
```

Indices are fragile. If tasks are ever reordered or deleted, position 1 might not be the same task anymore.

The Application API instead returns an **id** when a task is created:

```typescript
const id = createTask("Walk the dog");   // id is a stable handle
toggleTask(id);                          // always refers to the right task
```

**Why not use UUIDs right away?** YAGNI — You Aren't Gonna Need It. For now, the id is just the index under the hood. That satisfies the current requirements. If a future requirement explicitly asks for UUIDs (or stable IDs across deletions), *that* is the moment to change — and the acceptance tests would rightfully change with it, because the requirement changed.

The key discipline: tests must **always use the returned id**, never assume it equals a specific index value:

```typescript
// GOOD — treats id as opaque
const id = createTask("Buy milk");
toggleTask(id);
expect(isTaskComplete(id)).toBe(true);

// BAD — assumes id === index, couples test to implementation
createTask("Buy milk");
toggleTask(0);
```

---

## What the Acceptance Test Will Look Like

After we introduce the Application API, the acceptance test becomes:

```typescript
// tests/acceptance/toggle-complete.acceptance.test.ts

import { createTask, toggleTask, isTaskComplete, resetApp } from '../../src/todo';

describe('Toggle Task Completion - Acceptance Tests', () => {

    beforeEach(() => resetApp());

    test('User can toggle a specific task between complete and incomplete', () => {
        // Arrange
        createTask("Buy milk");
        const id = createTask("Walk the dog");
        createTask("Write report");

        // Act 1: Toggle "Walk the dog"
        toggleTask(id);

        // Assert 1: Task should be complete
        expect(isTaskComplete(id)).toBe(true);

        // Act 2: Toggle back
        toggleTask(id);

        // Assert 2: Task should be incomplete again
        expect(isTaskComplete(id)).toBe(false);
    });
});
```

Notice what is gone:
- No `string[]` type annotation
- No `"[✓] Walk the dog"` string — the checkmark is an implementation detail
- No raw array comparison
- No knowledge of how tasks are stored

This test will survive the `string[]` → `Task[]` refactor without a single change.

---

## What Changes, What Stays the Same

| | Before | After |
|---|---|---|
| Pure functions | `addTask(tasks, title): string[]` | Unchanged |
| Unit tests | Assert on `string[]` shape | Unchanged |
| Application API | Did not exist | New: `createTask`, `toggleTask`, `isTaskComplete`, `resetApp` |
| Acceptance tests | Assert on raw array shape | Assert through Application API |
| `startCli` | Calls pure functions directly | Will delegate to Application API |

The pure functions and their unit tests are untouched. Adding a layer above them does not require changing what is below.

---

## Key Learnings

- **Acceptance tests should couple to behavior, not data shape.** If your acceptance test contains `string[]` or `"[✓]"`, it is testing implementation details.
- **The Fragile Test Problem** is when tests break during refactoring for reasons unrelated to behavior change. It signals that tests are coupled to the wrong layer.
- **An application layer** is the boundary between callers (tests, CLI, REST) and internals (pure functions, data shape). It is the right place for acceptance tests to attach.
- **In functional style**, this boundary is a module with module-level state — not a class.
- **YAGNI applies to test design too.** Don't add UUID support until a requirement asks for it. Use the simplest id that works.
- **Opaque ids**: callers should always use the value returned by `createTask`, never assume it equals any particular number.
