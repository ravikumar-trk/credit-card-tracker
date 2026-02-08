import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "CREDIT_CARD_PAYMENTS_V2";
const CARDS_KEY = "CREDIT_CARDS_V1";
const TRANSACTIONS_KEY = "CREDIT_CARD_TRANSACTIONS_V1";

export const loadPayments = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.log("Load error", e);
    return {};
  }
};

export const savePayments = async (payments) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
    return true;
  } catch (e) {
    console.log("Save error", e);
    return false;
  }
};

export const loadCards = async () => {
  try {
    const data = await AsyncStorage.getItem(CARDS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Load cards error", e);
    return [];
  }
};

export const saveCards = async (cards) => {
  try {
    await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(cards));
    return true;
  } catch (e) {
    console.log("Save cards error", e);
    return false;
  }
};

// Export all data from AsyncStorage to JSON
export const exportAllData = async () => {
  try {
    const payments = await loadPayments();
    const cards = await loadCards();
    const transactionsData = await AsyncStorage.getItem(TRANSACTIONS_KEY);
    const transactions = transactionsData ? JSON.parse(transactionsData) : [];

    const exportData = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      data: {
        cards,
        payments,
        transactions,
      },
    };

    return JSON.stringify(exportData, null, 2);
  } catch (e) {
    console.log("Export error", e);
    return null;
  }
};

// Import JSON data and update AsyncStorage
export const importAllData = async (jsonString) => {
  try {
    const importData = JSON.parse(jsonString);

    if (!importData.data) {
      throw new Error("Invalid import file format");
    }

    const { cards, payments, transactions } = importData.data;

    // Import cards
    if (cards && Array.isArray(cards)) {
      await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(cards));
    }

    // Import payments
    if (payments && typeof payments === "object") {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
    }

    // Import transactions
    if (transactions && Array.isArray(transactions)) {
      await AsyncStorage.setItem(
        TRANSACTIONS_KEY,
        JSON.stringify(transactions),
      );
    }

    return true;
  } catch (e) {
    console.log("Import error", e);
    return false;
  }
};
