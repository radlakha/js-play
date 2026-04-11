# Chapter 1: Basic Types, Arrays, Functions, and Simple Menu

## What We Built
A basic in-memory todo list with a simple menu.  
Tasks are stored only in memory (they disappear when the program stops).

## Code (src/todo.ts)

```typescript
// Chapter 1: Basic Types, Arrays, and Simple Menu

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

## How to Run
```bash
npm run start
```

## Key Concepts Introduced

- **Type Annotations**: `: string`, `: number`, `: boolean`, `: void`
- **`let` vs `const`**
  - `let` → value can change
  - `const` → value cannot be reassigned
- **Arrays**: `string[]`, `.push()`, `.length`, `.forEach()`
- **Functions** with explicit return types
- **Template Literals**: `` `text ${expression}` ``
- **Basic `if` statements**

## Important Details

### forEach() Method
```typescript
tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
});
```
- Loops through every item automatically.
- First parameter = current element
- Second parameter = index (starts at 0)
- TypeScript usually infers the types, so you rarely need to write them explicitly.
- JavaScript/TypeScript is **case-sensitive** — must be `.forEach` (lowercase `f`).

### Assignment vs Comparison
- `=` → Assignment (putting a value into a variable)
- `===` → Strict equality (recommended)
- `==` → Loose equality (avoid unless you have a specific reason)

### Arrow Functions (Shorthand)
```typescript
const addTask = () => console.log("Task added");
```

## Status after Chapter 1
We now have basic type safety, arrays, functions, and a simple menu structure.

This chapter gives you the foundation to read most basic TypeScript code.