# Chapter 6: Objects, Interfaces, and Types

## Summary of Our Discussion

We discussed three main ways to define structured data in TypeScript:

### 1. Object Literals
- Quick and simple.
- TypeScript infers the shape automatically.
- Limitation: The shape is anonymous — hard to reuse consistently.

### 2. Type Aliases (`type`)
- Gives a name to a shape for reuse.
- Flexible — good for unions, intersections, and complex types.
- Less ideal for object shapes that may be extended.

### 3. Interfaces (`interface`)
- Designed specifically for defining object shapes.
- Supports `extends`, optional properties (`?`), and readonly.
- Most commonly used in real codebases for entities like `Task`, `User`, `Config`.

**Our Decision for the Todo App**:  
We chose `interface` because `Task` is a clear entity that may grow (we might add `dueDate`, `priority`, etc. later), and `interface` is the most idiomatic choice for this use case.

## Accessing Object Members – Idiomatic Patterns

- **Dot notation**: `task.title`
- **Destructuring** (very common):
  ```typescript
  const { title, completed } = task;
  ```
- **Destructuring in function parameters** (highly idiomatic):
  ```typescript
  function printTask({ title, completed }: Task) { ... }
  ```
- **Rest syntax** (`...rest`):
  ```typescript
  const { id, ...rest } = task;   // rest contains all other properties
  ```
  `rest` is just a variable name you choose.
- **Renaming during destructuring**:
  ```typescript
  const { title: taskTitle } = task;
  ```
- **Optional chaining**:
  ```typescript
  console.log(task.dueDate?.toISOString());
  ```

## The Spread Operator (`...`) – Important Idiomatic Pattern

The spread operator is frequently used with objects defined by interfaces.

```typescript
const task: Task = {
    id: 101,
    title: "Learn TypeScript",
    completed: false,
    createdAt: new Date()
};

// Create a new object with some properties overridden
const updatedTask = { 
    ...task,                    // shallow copy of task
    completed: true             // override completed
};
```

**Key Points about Spread on Objects:**

- `{ ...task, completed: true }` creates a **shallow copy** of the object.
- A shallow copy means top-level properties are copied, but nested objects/arrays still point to the same reference.
- Properties listed after the spread **override** the ones from the original object.
- This pattern is immutable (does not modify the original `task`).
- It is extremely common in modern TypeScript, especially when updating state.

**Example in a function:**
```typescript
function toggleTaskCompletion(tasks: Task[], index: number): Task[] {
    return tasks.map((task, i) =>
        i === index 
            ? { ...task, completed: !task.completed }   // immutable update
            : task
    );
}
```

## Type Assertion (`as`)

Used when TypeScript cannot infer the correct type:

```typescript
const rawData = { id: 1, title: "Test" };
const task = rawData as Task;   // Force TypeScript to treat it as Task
```

Use sparingly — it bypasses type checking.

## Refactoring Exercise

Now that we have discussed objects, interfaces, types, destructuring, and related patterns, here is your exercise:

**Task**: Refactor the current `src/todo.ts` to use `interface Task`.

Requirements:
- Define an `interface Task` with appropriate properties (`id`, `title`, `completed`, `createdAt`).
- Change `tasks: string[]` to `tasks: Task[]`.
- Update all functions (`addTask`, `toggleTaskCompletion`, `getTasksDisplay`) to work with `Task[]` instead of `string[]`.
- Use destructuring where it makes the code cleaner (especially in `getTasksDisplay` and `handleChoice` if possible).
- Update unit tests in `tests/unit/todo.unit.test.ts` to create and assert on `Task` objects instead of strings.
- Keep the interactive CLI part (`startCli`, `showMenu`, `handleChoice`) working as before.

**Important**: Do not change the acceptance test (`tests/acceptance/toggle-complete.acceptance.test.ts`). It should still pass without any modifications. This will demonstrate that our acceptance tests are decoupled from the internal data structure.