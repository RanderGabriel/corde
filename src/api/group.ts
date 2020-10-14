import { testCollector } from "../common/testCollector";

/**
 * Represents a group of tests.
 *
 * @example
 *
 * group('main commands', () => {
 *   test('Hello command must return... hello!!', () => {
 *      expect('hello').toReturn('hello!!');
 *   });
 * });
 *
 * @param name Name of the group
 * @param action Tests related to this group
 */
export function group(name: string, action: () => void) {
  testCollector.hasGroup = true;

  if (action) {
    action();

    testCollector.groups.push({
      name,
      tests: testCollector.tests.map((test) => test),
    });
  }

  testCollector.tests = [];
  testCollector.hasGroup = false;
}