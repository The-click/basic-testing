// Uncomment the code below and write your tests
import path, { join } from 'node:path';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { readFile } from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(timeout).toHaveBeenCalled();
    expect(timeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    expect(interval).toHaveBeenCalled();
    expect(interval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    jest.advanceTimersToNextTimer(3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = jest.spyOn(path, 'join');

    await readFileAsynchronously('./index.ts');
    expect(pathToFile).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const answer = await readFileAsynchronously('./bla.js');
    expect(answer).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fullPath = join(__dirname, './index.ts');
    const file = await readFile(fullPath);
    const fileContent = file.toString();

    const answer = await readFileAsynchronously('./index.ts');
    expect(fileContent).toBe(answer);
  });
});
