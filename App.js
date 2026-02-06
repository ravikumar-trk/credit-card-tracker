import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import CardListView from "./components/CardListView";
import CardDetailsView from "./components/CardDetailsView";
import MonthDetailsView from "./components/MonthDetailsView";
import CardInfoModal from "./components/CardInfoModal";
import AddCardView from "./components/AddCardView";
import EditCardView from "./components/EditCardView";
import HomeView from "./components/HomeView";
import TransactionsListView from "./components/TransactionsListView";
import TransactionFormView from "./components/TransactionFormView";
import { defaultCards } from "./utils/constants";
import {
  getCurrentMonthKey,
  getMonthName,
  getCurrentMonthName,
  isCurrentMonthOrPast,
  getAllMonths,
} from "./utils/dateUtils";
import {
  loadPayments,
  savePayments,
  loadCards,
  saveCards,
} from "./utils/storageUtils";
import {
  loadTransactions,
  saveTransactions,
  updateTransaction,
  deleteTransaction,
} from "./utils/transactionUtils";

export default function App() {
  // View state
  const [currentView, setCurrentView] = useState("home"); // 'home', 'cards', 'transactions'

  // Cards state
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [viewCardDetails, setViewCardDetails] = useState(null);
  const [addingCard, setAddingCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState(false);
  const [payments, setPayments] = useState({});
  const [cards, setCards] = useState(defaultCards);

  // Transactions state
  const [transactions, setTransactions] = useState([]);
  const [addingTransaction, setAddingTransaction] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const paymentsData = await loadPayments();
    setPayments(paymentsData);

    const cardsData = await loadCards();
    if (cardsData.length > 0) {
      setCards(cardsData);
    }

    const transactionsData = await loadTransactions();
    setTransactions(transactionsData);
  };

  const handleSavePayments = async (newPayments) => {
    await savePayments(newPayments);
    setPayments(newPayments);
  };

  const handleAddCard = async (newCard) => {
    const updatedCards = [...cards, newCard];
    await saveCards(updatedCards);
    setCards(updatedCards);
  };

  const handleSaveEditedCard = async (updatedCard) => {
    const updatedCards = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );
    await saveCards(updatedCards);
    setCards(updatedCards);
  };

  const handleSaveTransaction = async (transactionData) => {
    if (editingTransaction) {
      // Update existing transaction
      const updated = await updateTransaction(
        editingTransaction.id,
        transactionData
      );
      if (updated) {
        const updatedTransactions = transactions.map((t) =>
          t.id === editingTransaction.id ? updated : t
        );
        setTransactions(updatedTransactions);
        setEditingTransaction(null);
        setAddingTransaction(false);
        Alert.alert("Transaction updated successfully");
      }
    } else {
      // Add new transaction
      const newTransaction = {
        ...transactionData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      const updatedTransactions = [...transactions, newTransaction];
      await saveTransactions(updatedTransactions);
      setTransactions(updatedTransactions);
      setAddingTransaction(false);
      Alert.alert("Transaction added successfully");
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    Alert.alert("Delete Transaction", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteTransaction(transactionId);
          const updatedTransactions = transactions.filter(
            (t) => t.id !== transactionId
          );
          setTransactions(updatedTransactions);
          Alert.alert("Transaction deleted");
        },
      },
    ]);
  };

  const openCard = (card) => {
    setSelectedCard(card);
    setSelectedMonth(null);
  };

  const openMonth = (monthKey) => {
    setSelectedMonth(monthKey);
    const record = payments?.[selectedCard.id]?.[monthKey];
    if (record) {
      setAmount(record.amount);
      setPaid(record.paid);
    } else {
      setAmount("");
      setPaid(false);
    }
  };

  const savePayment = () => {
    if (!amount) {
      Alert.alert("Enter amount");
      return;
    }

    const newPayments = {
      ...payments,
      [selectedCard.id]: {
        ...payments[selectedCard.id],
        [selectedMonth]: { amount, paid },
      },
    };

    handleSavePayments(newPayments);
    Alert.alert("Payment saved successfully");
    setSelectedMonth(null);
  };

  // Render Transaction Form View
  if (addingTransaction) {
    return (
      <>
        <StatusBar style="dark" />
        <TransactionFormView
          defaultCards={cards}
          transaction={editingTransaction}
          onSave={handleSaveTransaction}
          onCancel={() => {
            setAddingTransaction(false);
            setEditingTransaction(null);
          }}
          onHomePress={() => {
            setAddingTransaction(false);
            setEditingTransaction(null);
            setCurrentView("home");
          }}
        />
      </>
    );
  }

  // Render Transactions List View
  if (currentView === "transactions") {
    return (
      <>
        <StatusBar style="dark" />
        <TransactionsListView
          defaultCards={cards}
          transactions={transactions}
          onAddTransaction={() => {
            setEditingTransaction(null);
            setAddingTransaction(true);
          }}
          onEditTransaction={(transaction) => {
            setEditingTransaction(transaction);
            setAddingTransaction(true);
          }}
          onDeleteTransaction={handleDeleteTransaction}
          onHomePress={() => setCurrentView("home")}
        />
      </>
    );
  }

  // Render Edit Card View
  if (editingCard) {
    return (
      <>
        <StatusBar style="dark" />
        <EditCardView
          cardData={editingCard}
          onBackPress={() => setEditingCard(null)}
          onSaveCard={handleSaveEditedCard}
        />
      </>
    );
  }

  // Render Add Card View
  if (addingCard) {
    return (
      <>
        <StatusBar style="dark" />
        <AddCardView
          onBackPress={() => setAddingCard(false)}
          onAddCard={handleAddCard}
        />
      </>
    );
  }

  // Render Month Details View
  if (selectedMonth) {
    return (
      <>
        <StatusBar style="dark" />
        <MonthDetailsView
          selectedCard={selectedCard}
          selectedMonth={selectedMonth}
          amount={amount}
          paid={paid}
          getMonthName={getMonthName}
          onAmountChange={setAmount}
          onPaidToggle={() => setPaid(!paid)}
          onSubmit={savePayment}
          onBackPress={() => setSelectedMonth(null)}
        />
      </>
    );
  }

  // Render Card Details View
  if (selectedCard) {
    return (
      <>
        <StatusBar style="dark" />
        <CardDetailsView
          selectedCard={selectedCard}
          payments={payments}
          getAllMonths={getAllMonths}
          getMonthName={getMonthName}
          getCurrentMonthKey={getCurrentMonthKey}
          isCurrentMonthOrPast={isCurrentMonthOrPast}
          onBackPress={() => setSelectedCard(null)}
          onMonthPress={openMonth}
        />
      </>
    );
  }

  // Render Card Info Modal
  if (viewCardDetails) {
    return (
      <>
        <StatusBar style="dark" />
        <CardInfoModal
          cardDetails={viewCardDetails}
          onBackPress={() => setViewCardDetails(null)}
        />
      </>
    );
  }

  // Render Home View
  if (currentView === "home") {
    return (
      <>
        <StatusBar style="dark" />
        <HomeView
          onCreditCardsPress={() => setCurrentView("cards")}
          onTransactionsPress={() => setCurrentView("transactions")}
        />
      </>
    );
  }

  // Render Card List View
  return (
    <>
      <StatusBar style="dark" />
      <CardListView
        defaultCards={cards}
        payments={payments}
        getCurrentMonthKey={getCurrentMonthKey}
        getCurrentMonthName={getCurrentMonthName}
        onCardPress={openCard}
        onViewPress={setViewCardDetails}
        onEditPress={setEditingCard}
        onAddCardPress={() => setAddingCard(true)}
        onHomePress={() => setCurrentView("home")}
      />
    </>
  );
}
