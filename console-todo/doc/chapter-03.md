# Chapter 3: Mutable vs Immutable Patterns and Functional Style in TypeScript

## What We Cover in This Chapter
We explore different ways to update data (especially arrays and state), compare imperative and functional approaches, and learn what is considered idiomatic when reading real TypeScript code.

## 1. Imperative Style (Most Common for Beginners)

This is the traditional way — we directly modify data.

```typescript
let tasks: string[] = [];

function addTask(): void {
    const newTask = "Learn TypeScript basics";
    tasks.push(newTask);           // Mutates the original array
    console.log(`Task added: "${newTask}"`);
}

function completeTask(index: number): void {
    if (index >= 0 && index < tasks.length) {
        tasks[index] = "[✓] " + tasks[index];   // Mutates the array
    }
}
```

**Characteristics:**
- Uses `push()`, direct assignment, etc.
- Simple and easy to understand
- Mutates (changes) the existing data

## 2. Semi-Immutable Style (Very Common in Modern TypeScript)

This is the practical compromise you see most often:

```typescript
let tasks: string[] = [];

function addTask(): void {
    const newTask = "Learn TypeScript basics";
    tasks = [...tasks, newTask];        // Creates new array, then reassigns
    console.log(`Task added: "${newTask}"`);
}

function completeTask(index: number): void {
    if (index >= 0 && index < tasks.length) {
        tasks = tasks.map((task, i) => 
            i === index ? "[✓] " + task : task
        );
    }
}
```

**Why this is popular:**
- Uses spread (`...`) and `.map()` to create new arrays
- Still simple
- Reduces many bugs caused by accidental mutation

## 3. Pure Functional Style (Cleanest Functional Approach)

Here we avoid mutation completely by returning new values:

```typescript
function addNewTask(currentTasks: string[], newTask: string): string[] {
    return [...currentTasks, newTask];   // Pure: always returns new array
}

function markTaskComplete(currentTasks: string[], index: number): string[] {
    return currentTasks.map((task, i) =>
        i === index ? "[✓] " + task : task
    );
}

// Usage:
tasks = addNewTask(tasks, "Learn TypeScript basics");
tasks = markTaskComplete(tasks, 0);
```

**Key Points of Pure Functions:**
- They do not modify anything outside themselves
- Same input → always same output
- Much easier to test and reason about
- No side effects

## When to Use Which Style?

| Style                    | When to Use                              | Pros                              | Cons                              |
|--------------------------|------------------------------------------|-----------------------------------|-----------------------------------|
| Imperative (`push`)      | Small scripts, learning                  | Simple, fast to write             | Can cause bugs in larger code     |
| Semi-immutable (`...`)   | Most modern TypeScript apps              | Good balance                      | Still reassigns variable          |
| Pure Functional          | Large apps, state management, testing    | Safest, easiest to test           | Slightly more verbose             |

**Reality check**:  
Most real-world TypeScript code uses a **mix** — mostly the semi-immutable style (`tasks = [...tasks, newTask]`). Pure functional style becomes more common when using libraries like Redux, Zustand, or when writing library code.

## Important Functional Concepts

- **Spread operator (`...`)**: Creates shallow copies
- **`.map()`**: Creates a new array by transforming each element
- **Pure functions**: Preferred when possible
- **Immutability**: Helps prevent unexpected bugs

## Summary for Reading Code

When you read other people's TypeScript code, you will frequently see:
1. `array.push()` — imperative
2. `array = [...array, item]` — semi-functional (very common)
3. Functions that return new arrays instead of mutating — pure functional

Understanding all three will help you read almost any modern TypeScript codebase comfortably.

## Status after Chapter 3
You now understand the main styles used for updating data in TypeScript and can recognize when code is written imperatively vs functionally.
