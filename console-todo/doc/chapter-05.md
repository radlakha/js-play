# Chapter 5: Acceptance Test Driven Development (ATDD)

## What is ATDD?

Acceptance Test Driven Development (ATDD) is a development practice where you start by defining **high-level acceptance tests** that describe the desired behavior from the user's perspective.

Instead of writing code first, you write tests that express what the user should be able to do. These tests then guide the implementation.

This approach is especially effective when working with AI because:
- You clearly define the expected outcome
- The AI can focus on making the tests pass
- The resulting code tends to be better structured and more testable

## ATDD Workflow

1. Write **Acceptance Criteria** in plain English
2. Convert them into **high-level acceptance tests**
3. Implement the minimal code needed to make the tests pass
4. Add or improve unit tests as supporting tests
5. Refactor while keeping all tests passing

## Example: Adding "Toggle Task Completion" Feature

### Acceptance Criteria

- User can select option 3 to toggle a task's completion status
- User is prompted to enter the task number (1-based)
- Completed tasks are displayed with a `[✓]` prefix
- Toggling works both ways (complete ↔ incomplete)
- The updated task list is shown immediately

### High-Level Acceptance Test

```typescript
// tests/acceptance/toggle-complete.acceptance.test.ts

import { addTask, toggleTaskCompletion } from '../../src/todo';

describe('Toggle Task Completion - Acceptance Tests', () => {

    test('User can toggle a specific task between complete and incomplete', () => {
        // Arrange
        let tasks: string[] = [];
        tasks = addTask(tasks, "Buy milk");
        tasks = addTask(tasks, "Walk the dog");
        tasks = addTask(tasks, "Write report");

        // Act 1: Toggle second task (1-based index 2 → 0-based index 1)
        tasks = toggleTaskCompletion(tasks, 1);

        // Assert 1
        expect(tasks).toEqual([
            "Buy milk",
            "[✓] Walk the dog",
            "Write report"
        ]);

        // Act 2: Toggle it back
        tasks = toggleTaskCompletion(tasks, 1);

        // Assert 2
        expect(tasks).toEqual([
            "Buy milk",
            "Walk the dog",
            "Write report"
        ]);
    });
});
```

## Key Learnings from ATDD

- Acceptance tests focus on **user behavior**, not implementation details
- They act as living documentation
- They help drive better function design (e.g., pure functions like `toggleTaskCompletion`)
- When working with AI, writing the acceptance test first gives much better results than asking the AI to "add a feature"

## Status after Chapter 5

You now understand:
- The purpose and workflow of Acceptance Test Driven Development
- How to write high-level acceptance tests
- How acceptance tests guide the creation of clean, testable functions
- The difference between acceptance tests and unit tests

This approach is one of the most effective ways to develop software collaboratively with AI.


## State of ts code after Chapter 5 with completed toggleTaskCompletion function

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

// New pure function: toggles completion status of a task
export function toggleTaskCompletion(currentTasks: string[], index: number): string[] {
    return currentTasks.map((task, i) => {
        if (i === index) {
            if (task.startsWith("[✓] ")) {
                return task.slice(4);           // remove "[✓] "
            } else {
                return "[✓] " + task;
            }
        }
        return task;
    });
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
    console.log("3. Toggle task complete/incomplete");
    console.log("4. Exit");
    console.log("====================\n");
    console.log("Enter your choice (1-4): ");
}

function handleChoice(currentTasks: string[], choice: string):
    { tasks: string[], action: "continue" | "exit" | "awaiting_toggle" | "awaiting_add" }
{
    switch (choice) {
        case "1":
            console.log(getTasksDisplay(currentTasks).join("\n"));
            return { tasks: currentTasks, action: "continue" };

        case "2":
            console.log("Enter task description: ");
            return { tasks: currentTasks, action: "awaiting_add" };

        case "3":
            if (currentTasks.length === 0) {
                console.log("No tasks to toggle!");
                return { tasks: currentTasks, action: "continue" };
            }
            console.log(getTasksDisplay(currentTasks).join("\n"));
            console.log("\nEnter task number to toggle: ");
            return { tasks: currentTasks, action: "awaiting_toggle" };

        case "4":
            console.log("\nGoodbye!");
            return { tasks: currentTasks, action: "exit" };

        default:
            console.log("Invalid choice. Please enter 1, 2, 3 or 4.");
            return { tasks: currentTasks, action: "continue" };
    }
}

export function startCli(): void {
    console.log("Welcome to Console Todo Manager!");
    let tasks: string[] = [];
    let mode: "menu" | "toggle" | "add" = "menu";

    showMenu();

    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (data: string) => {
        const input = data.trim();

        if (mode === "add") {
            if (input.length > 0) {
                tasks = addTask(tasks, input);
                console.log(`Task added: "${input}"`);
            } else {
                console.log("Task cannot be empty.");
            }
            mode = "menu";
            showMenu();
            return;
        }

        if (mode === "toggle") {
            const index = parseInt(input) - 1;
            if (index >= 0 && index < tasks.length) {
                tasks = toggleTaskCompletion(tasks, index);
                console.log(`Toggled task ${input} completion status.`);
            } else {
                console.log("Invalid task number.");
            }
            mode = "menu";
            showMenu();
            return;
        }

        const result = handleChoice(tasks, input);
        tasks = result.tasks;

        if (result.action === "awaiting_add") {
            mode = "add";
        } else if (result.action === "awaiting_toggle") {
            mode = "toggle";
        } else if (result.action === "exit") {
            process.stdin.destroy();
        } else {
            showMenu();
        }
    });
}

// Start the CLI when this file is run directly
if (require.main === module) {
    startCli();
}
```

```typescript
// tests/acceptance/toggle-complete.acceptance.test.ts

import { addTask, toggleTaskCompletion } from '../../src/todo';

describe('Toggle Task Completion - Acceptance Tests', () => {

    test('User can toggle a specific task between complete and incomplete', () => {
        // Arrange - Start with three tasks
        let tasks: string[] = [];
        tasks = addTask(tasks, "Buy milk");
        tasks = addTask(tasks, "Walk the dog");
        tasks = addTask(tasks, "Write report");

        // Act 1: Toggle second task (1-based index 2 → 0-based index 1)
        tasks = toggleTaskCompletion(tasks, 1);

        // Assert 1: Second task should be marked complete
        expect(tasks).toEqual([
            "Buy milk",
            "[✓] Walk the dog",
            "Write report"
        ]);

        // Act 2: Toggle the same task back to incomplete
        tasks = toggleTaskCompletion(tasks, 1);

        // Assert 2: Task should return to normal
        expect(tasks).toEqual([
            "Buy milk",
            "Walk the dog",
            "Write report"
        ]);
    });
});
```

```typescript
// tests/todo.test.ts
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
