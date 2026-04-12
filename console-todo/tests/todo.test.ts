import { addTask, markTaskComplete, toggleTaskCompletion, getTasksDisplay, Task } from '../src/todo';

describe('Todo App Core Functions', () => {

    test('addTask should return a new array with the added task', () => {
        // Arrange
        const initial: Task[] = [];

        // Act
        const result = addTask(initial, "Walk the dog");

        // Assert
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({ id: 0, title: "Walk the dog", completed: false });
        expect(result).not.toBe(initial);
    });

    test('markTaskComplete should mark a task as complete', () => {
        // Arrange
        const initial = addTask(addTask([] as Task[], "Buy milk"), "Walk the dog");

        // Act
        const result = markTaskComplete(initial, 0);

        // Assert
        expect(result[0].completed).toBe(true);
        expect(result[1].completed).toBe(false);
    });

    test('toggleTaskCompletion should toggle completed status both ways', () => {
        // Arrange
        const initial = addTask([] as Task[], "Buy milk");

        // Act 1: Toggle to complete
        const toggled = toggleTaskCompletion(initial, 0);

        // Assert 1
        expect(toggled[0].completed).toBe(true);

        // Act 2: Toggle back to incomplete
        const toggledBack = toggleTaskCompletion(toggled, 0);

        // Assert 2
        expect(toggledBack[0].completed).toBe(false);
    });

    test('getTasksDisplay should format tasks correctly', () => {
        // Arrange
        const tasks = addTask(addTask([] as Task[], "Buy milk"), "Walk the dog");

        // Act
        const display = getTasksDisplay(tasks);

        // Assert
        expect(display).toEqual([
            "1. Buy milk",
            "2. Walk the dog"
        ]);
    });

    test('getTasksDisplay should show checkmark for completed tasks', () => {
        // Arrange
        const tasks = markTaskComplete(addTask([] as Task[], "Buy milk"), 0);

        // Act
        const display = getTasksDisplay(tasks);

        // Assert
        expect(display).toEqual(["1. [✓] Buy milk"]);
    });
});
