# Chapter 2: Interactive Menu with User Input and Event-Driven Programming

## What We Built
We made the menu **interactive**. You can now type `1`, `2`, or `3` in the terminal and the program responds in real time.

## Code (src/todo.ts - Chapter 2)

```typescript
// Chapter 2: Interactive Menu with User Input

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
    console.log("Enter your choice (1-3): ");
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

function handleChoice(choice: string): void {
    switch (choice) {
        case "1":
            viewTasks();
            break;
        case "2":
            addTask();
            break;
        case "3":
            console.log("\nGoodbye!");
            isRunning = false;
            break;
        default:
            console.log("Invalid choice. Please enter 1, 2, or 3.");
    }
}

// Main program
console.log(message);
console.log(`Version: ${version}\n`);

showMenu();

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
    const choice = data.trim();

    handleChoice(choice);

    if (isRunning) {
        showMenu();
    } else {
        process.stdin.destroy();
    }
});
```

## How to Run
```bash
npm run start
```

Then type `1`, `2`, or `3` and press **Enter**.

## Key Concepts Introduced in Chapter 2

- Global `process` object (provided by Node.js)
- Event-driven programming using `process.stdin`
- `switch` statement for handling multiple choices
- Reading asynchronous user input from the terminal
- `data.trim()` to clean input (removes newline)
- Controlling program lifetime with a boolean flag (`isRunning`)

## Detailed Explanation: `process` and Event-Driven Programming

- `process` is a **global object** in Node.js that represents the currently running program.
- You do **not** need to import it when `"types": ["node"]` is set in `tsconfig.json`.
- Access it using dot notation: `process.stdin`, `process.stdout`, etc.

### `process.stdin`
- This is an **input stream** — it receives what you type in the terminal.
- `process.stdin.setEncoding("utf8")` tells Node.js to treat input as text (strings).
- `process.stdin.on("data", callback)` registers a listener that runs every time the user presses Enter.

### Idiomatic Ways to Set Up Callbacks (Event Listeners)

1. **Inline Arrow Function** (most common in modern code)
   ```typescript
   process.stdin.on("data", (data: string) => {
       const choice = data.trim();
       handleChoice(choice);
   });
   ```

2. **Named Function Reference** (cleaner when logic grows)
   ```typescript
   function onUserInput(data: string): void {
       const choice = data.trim();
       handleChoice(choice);
   }

   process.stdin.on("data", onUserInput);
   ```

**Best Practice**:  
Use a **named function** when the callback contains more than a few lines of logic. Inline arrows are fine for very short operations.

## Status after Chapter 2
The todo app is now **interactive**.  
You can type choices in the terminal and the program responds immediately.

This chapter introduced the foundation of event-driven programming in Node.js/TypeScript, which is used heavily in real applications.