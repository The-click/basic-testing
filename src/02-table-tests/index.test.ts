// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 6, b: 3, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 6, b: 1, action: Action.Subtract, expected: 5 },

  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },

  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },

  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },

  { a: '2', b: 2, action: Action.Multiply, expected: null },
  { a: 3, b: 2, action: '4', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$a $action $b', ({ a, b, action, expected }) => {
    if (expected === null) {
      expect(simpleCalculator({ a, b, action })).toBeNull();
    }

    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
