# Chapter 4: Clean Functions and Unit Testing with Jest

## Goals of Chapter 4
- Learn how to write clean, well-typed functions (imperative vs functional styles)
- Understand the basic structure of tests (Arrange → Act → Assert)
- Learn Unit Testing with Jest (the most common testing tool in TypeScript)

## 1. Writing Clean, Well-Typed Functions

### Imperative Style (Simple and Common)

```typescript
function addTask(tasks: string[], newTask: string): string[] {
    const updated = [...tasks, newTask];
    console.log(`Task added: "${newTask}"`);
    return updated;
}
```

### Functional / Pure Style (Better for Testing)

```typescript
// Pure function - no side effects
export function addTask(currentTasks: string[], newTask: string): string[] {
    return [...currentTasks, newTask];
}
```

**Best Practices for Functions:**
- Use clear, descriptive names (verb + noun)
- Always specify parameter and return types
- Prefer small, single-responsibility functions
- Make functions **pure** when possible (no side effects)
- Return new data instead of mutating inputs

## 2. Unit Testing with Jest

Jest is the most popular testing framework for TypeScript.

### Basic Test Structure: Arrange → Act → Assert

```typescript
import { addTask } from '../src/todo';

describe('Todo App Functions', () => {

    test('addTask should return a new array with the added task', () => {
        // Arrange
        const initialTasks = ["Buy milk"];
        const newTask = "Walk the dog";

        // Act
        const result = addTask(initialTasks, newTask);

        // Assert
        expect(result).toEqual(["Buy milk", "Walk the dog"]);
        expect(result).not.toBe(initialTasks);   // Ensure it's a new array
    });
});
```

## 3. Updated Todo App Code (Single File with Clean Design)

### src/todo.ts (Final Version for Chapter 4)

```typescript
// src/todo.ts

// ==================== PURE FUNCTIONS ====================

export function addTask(currentTasks: string[], newTask: string): string[] {
    return [...currentTasks, newTask];
}

export function markTaskComplete(currentTasks: string[], index: number): string[] {
    return currentTasks.map((task, i) =>
        i === index ? "[✓] " + task : task
    );
}

export function getTasksDisplay(tasks: string[]): string[] {
    if (tasks.length === 0) {
        return ["No tasks yet. Add some!"];
    }
    return tasks.map((task, index) => `${index + 1}. ${task}`);
}

// ==================== INTERACTIVE CLI PART ====================

function showMenu(): void {
    console.log("\n=== Todo Manager ===");
    console.log("1. View all tasks");
    console.log("2. Add a new task");
    console.log("3. Exit");
    console.log("====================\n");
    console.log("Enter your choice (1-3): ");
}

// Returns union type - clean control flow without global flags
function handleChoice(currentTasks: string[], choice: string): 
    { tasks: string[], action: "continue" | "exit" } 
{
    switch (choice) {
        case "1":
            console.log(getTasksDisplay(currentTasks).join("\n"));
            return { tasks: currentTasks, action: "continue" };

        case "2":
            const updatedTasks = addTask(currentTasks, "Learn TypeScript basics");
            console.log('Task added: "Learn TypeScript basics"');
            return { tasks: updatedTasks, action: "continue" };

        case "3":
            console.log("\nGoodbye!");
            return { tasks: currentTasks, action: "exit" };

        default:
            console.log("Invalid choice. Please enter 1, 2, or 3.");
            return { tasks: currentTasks, action: "continue" };
    }
}

export function startCli(): void {
    console.log("Welcome to Console Todo Manager!");
    let tasks: string[] = [];        // tasks is local, not global

    showMenu();

    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (data: string) => {
        const choice = data.trim();
        const result = handleChoice(tasks, choice);

        tasks = result.tasks;                    // Update local tasks

        if (result.action === "continue") {
            showMenu();
        } else {
            process.stdin.destroy();
        }
    });
}

// Start the CLI when this file is run directly
if (require.main === module) {
    startCli();
}
```

## 4. Test File (`tests/todo.test.ts`)

```typescript
import { addTask, markTaskComplete, getTasksDisplay } from '../src/todo';

describe('Todo App Core Functions', () => {

    test('addTask should return a new array with the added task', () => {
        const initial = ["Buy milk"];
        const result = addTask(initial, "Walk the dog");

        expect(result).toEqual(["Buy milk", "Walk the dog"]);
        expect(result).not.toBe(initial);
    });

    test('markTaskComplete should add checkmark to a task', () => {
        const initial = ["Buy milk", "Walk the dog"];
        const result = markTaskComplete(initial, 0);

        expect(result).toEqual(["[✓] Buy milk", "Walk the dog"]);
    });

    test('getTasksDisplay should format tasks correctly', () => {
        const tasks = ["Buy milk", "Walk the dog"];
        const display = getTasksDisplay(tasks);

        expect(display).toEqual([
            "1. Buy milk",
            "2. Walk the dog"
        ]);
    });
});
```

## How to Run
- Run the app: `npm run start`
- Run tests: `npm test`

## Status after Chapter 4
You now understand:
- How to write clean, well-typed functions in both imperative and functional styles
- The Arrange → Act → Assert pattern
- Basic Jest unit testing
- How to separate pure logic from interactive code using union return types

This structure keeps everything in one file while making the code much cleaner and more testable.
