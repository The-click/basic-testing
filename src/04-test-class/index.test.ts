// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  const bankAccount = getBankAccount(initialBalance);
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(initialBalance + 10);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newBankAccount = getBankAccount(10);
    expect(() => {
      bankAccount.transfer(initialBalance + 10, newBankAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(initialBalance, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(initialBalance).getBalance()).toBe(
      2 * initialBalance,
    );
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(initialBalance).getBalance()).toBe(
      initialBalance,
    );
  });

  test('should transfer money', () => {
    const newBankAccount = getBankAccount(initialBalance);
    expect(
      bankAccount.transfer(initialBalance / 2, newBankAccount).getBalance(),
    ).toBe(initialBalance / 2);

    expect(newBankAccount.getBalance()).toBe(initialBalance * 1.5);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const value = await bankAccount.fetchBalance();
    if (value !== null) {
      expect(value).toEqual(expect.any(Number));
    }
  });
  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const newInitialValue = 10000000;
      const newBankAccount = getBankAccount(newInitialValue);

      await newBankAccount.synchronizeBalance();
      expect(newBankAccount.getBalance()).not.toBe(newInitialValue);
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
