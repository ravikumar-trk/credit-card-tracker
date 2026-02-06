import AsyncStorage from "@react-native-async-storage/async-storage";

const TRANSACTIONS_KEY = "CREDIT_CARD_TRANSACTIONS_V1";

export const loadTransactions = async () => {
  try {
    const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Load transactions error", e);
    return [];
  }
};

export const saveTransactions = async (transactions) => {
  try {
    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    return true;
  } catch (e) {
    console.log("Save transactions error", e);
    return false;
  }
};

export const addTransaction = async (transaction) => {
  try {
    const transactions = await loadTransactions();
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    transactions.push(newTransaction);
    await saveTransactions(transactions);
    return newTransaction;
  } catch (e) {
    console.log("Add transaction error", e);
    return null;
  }
};

export const updateTransaction = async (id, updatedData) => {
  try {
    const transactions = await loadTransactions();
    const index = transactions.findIndex((t) => t.id === id);
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updatedData };
      await saveTransactions(transactions);
      return transactions[index];
    }
    return null;
  } catch (e) {
    console.log("Update transaction error", e);
    return null;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const transactions = await loadTransactions();
    const filtered = transactions.filter((t) => t.id !== id);
    await saveTransactions(filtered);
    return true;
  } catch (e) {
    console.log("Delete transaction error", e);
    return false;
  }
};
