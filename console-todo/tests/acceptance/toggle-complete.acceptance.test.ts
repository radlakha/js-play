// tests/acceptance/toggle-complete.acceptance.test.ts

import { createTask, toggleTask, isTaskComplete, resetApp } from '../../src/todo';

describe('Toggle Task Completion - Acceptance Tests', () => {

    beforeEach(() => resetApp());

    test('User can toggle a specific task between complete and incomplete', () => {
        // Arrange
        createTask("Buy milk");
        const id = createTask("Walk the dog");
        createTask("Write report");

        // Act 1: Toggle "Walk the dog"
        toggleTask(id);

        // Assert 1: Task should be complete
        expect(isTaskComplete(id)).toBe(true);

        // Act 2: Toggle back
        toggleTask(id);

        // Assert 2: Task should be incomplete again
        expect(isTaskComplete(id)).toBe(false);
    });
});
