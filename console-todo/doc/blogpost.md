# Learning TypeScript & JavaScript Basics Through a Console Todo App

Author: Your Name  
Date Started: April 2026  
Goal: Understand JavaScript and TypeScript well enough to comfortably read and follow code flow when AI or others write TypeScript code.

This is a living document. It will be updated after every chapter with clear explanations, code examples, and key learnings. You can read this file anytime to refresh your knowledge.

## Project Overview

We are building a Console Todo / Task Manager using pure TypeScript and Node.js.  
No external frameworks or web UI — everything runs in the terminal using console.log and user input.

### Why this project?
- Starts extremely simple and grows naturally chapter by chapter.
- Covers nearly every core concept of JavaScript and TypeScript in a practical way.
- Demonstrates real-world project structure (src/tests separation, configuration files, testing, README).
- Easy to run and review.

### Features we will implement chapter by chapter
- View tasks
- Add new tasks
- Mark tasks as complete
- Delete tasks
- Task priorities and due dates
- Data persistence (save/load from JSON file)
- Clean menu system
- Basic error handling
- Unit tests with Jest
- Proper TypeScript usage: types, interfaces, enums, classes, etc.

## Project Structure

console-todo-ts/
├── src/
│   └── todo.ts                 ← Main application code (built iteratively)
├── tests/
│   └── todo.test.ts            ← Test files (side-by-side with src)
├── tsconfig.json
├── jest.config.js
├── package.json
├── package-lock.json
├── README.md
└── LEARNING-TYPESCRIPT.md      ← This living learning journal

## Chapter 0: Project Setup

Key concepts covered: package.json, package-lock.json, tsconfig.json, npm scripts, src/tests separation.

## Chapter 1: Basic Types, Arrays, Functions, and Simple Menu

### Code (src/todo.ts - Current version)

```typescript
// Chapter 1: Basic Types, Arrays, and Menu

let message: string = "Welcome to Console Todo Manager!";
const version: number = 1.0;
let isRunning: boolean = true;

let tasks: string[] = [];

function showMenu(): void {
    console.log("\n=== Todo Manager ===");
    console.log("1. View all tasks");
    console.log("2. Add a new task");
    console.log("3. Exit");
    console.log("====================\n");
}

function viewTasks(): void {
    console.log("\nYour tasks:");
    if (tasks.length === 0) {
        console.log("No tasks yet. Add some!");
        return;
    }
    
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}

function addTask(): void {
    const newTask: string = "Learn TypeScript basics";
    tasks.push(newTask);
    console.log(`Task added: "${newTask}"`);
}

function main(): void {
    console.log(message);
    console.log(`Version: ${version}\n`);

    showMenu();
    viewTasks();
    addTask();
    viewTasks();

    console.log("\nEnd of Chapter 1 demo.");
}

main();
```

### Key Concepts Introduced in Chapter 1

- Type Annotations (`: string`, `: number`, `: boolean`, `: void`)
- `let` vs `const`
- Arrays (`string[]`, `.push()`, `.length`, `.forEach()`)
- Functions with return types
- Basic `if` statements

### Concept: Assignment vs Comparison Operators

- `=` → Assignment (gives a value to a variable)
- `==` → Loose equality (converts types automatically — avoid when possible)
- `===` → Strict equality (compares value and type — recommended in TypeScript)

Example from code: `tasks.length === 0`

### Concept: forEach() Method

- `forEach` automatically loops through every element in an array.
- Parameters inside `forEach` usually do **not** need explicit types because TypeScript infers them from the array type (`string[]` in our case).
- You can access: current element, index, and optionally the full array.
- JavaScript/TypeScript is **case-sensitive**: must be written as `.forEach` (lowercase `f`).

Common patterns:
- `tasks.forEach(task => ...)` → only element
- `tasks.forEach((task, index) => ...)` → element + index (used in our code)
- `tasks.forEach((task, index, array) => ...)` → all three

### Concept: Template Literals and ${}

- Backticks `` ` `` create template literals (special strings).
- `${expression}` evaluates the expression inside and inserts the result as text.
- This is much cleaner than using `+` for string concatenation.

Examples:
- `` `Task added: "${newTask}"` ``
- `` `Version: ${version}` ``
- `` `${index + 1}. ${task}` ``

### Concept: Ways to Declare Identifiers

- `let` → value can change later
- `const` → value cannot be reassigned
- `function name()` → traditional function declaration
- Arrow functions (`=>`) → modern shorthand (covered below)

### Concept: Arrow Functions (Shorthand for Functions)

Arrow functions are a shorter way to write functions, widely used in modern TypeScript.

Traditional:
```typescript
function addTask(): void { ... }
```

Arrow version:
```typescript
const addTask = (): void => { ... };
```

One-line shorthand:
```typescript
const addTask = () => console.log("Task added");
```

### Status
Chapter 1 is complete. Basic types, arrays, functions, and looping are working.

---

**Next planned chapter**: Chapter 2 – Interactive menu with real user input, handling choices (switch or if-else), more task operations, and union types.

---