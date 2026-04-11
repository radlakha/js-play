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