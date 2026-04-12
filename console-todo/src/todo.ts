// src/todo.ts

// ==================== TYPES ====================

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export type TaskList = Task[];

// ==================== PURE FUNCTIONS ====================

export function addTask(currentTasks: Task[], newTask: string): Task[] {
    const task: Task = {
        id: currentTasks.length,
        title: newTask,
        completed: false,
        createdAt: new Date()
    };
    return [...currentTasks, task];
}

export function markTaskComplete(currentTasks: Task[], index: number): Task[] {
    return currentTasks.map((task, i) =>
        i === index ? { ...task, completed: true } : task
    );
}

// New pure function: toggles completion status of a task
export function toggleTaskCompletion(currentTasks: Task[], index: number): Task[] {
    return currentTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
    );
}

export function getTasksDisplay(tasks: Task[]): string[] {
    if (tasks.length === 0) {
        return ["No tasks yet. Add some!"];
    }
    return tasks.map(({ title, completed }, index) =>
        `${index + 1}. ${completed ? "[✓] " : ""}${title}`
    );
}

// ==================== APPLICATION API ====================

let appTasks: Task[] = [];

export function createTask(title: string): number {
    appTasks = addTask(appTasks, title);
    return appTasks.length - 1;
}

export function toggleTask(id: number): void {
    appTasks = toggleTaskCompletion(appTasks, id);
}

export function isTaskComplete(id: number): boolean {
    return appTasks[id].completed;
}

export function resetApp(): void {
    appTasks = [];
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

function handleChoice(currentTasks: Task[], choice: string):
    { tasks: Task[], action: "continue" | "exit" | "awaiting_toggle" | "awaiting_add" }
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
    let tasks: Task[] = [];
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