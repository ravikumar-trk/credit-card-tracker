import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "CREDIT_CARD_PAYMENTS_V2";
const CARDS_KEY = "CREDIT_CARDS_V1";

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
