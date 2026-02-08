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
import ImportExportView from "./components/ImportExportView";
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
  // Centralized view state
  const [currentView, setCurrentView] = useState("home");

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
    if (cardsData.length > 0) setCards(cardsData);

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
    setAddingCard(false);
    setCurrentView("cards");
  };

  const handleSaveEditedCard = async (updatedCard) => {
    const updatedCards = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card,
    );
    await saveCards(updatedCards);
    setCards(updatedCards);
    setEditingCard(null);
    setCurrentView("cards");
  };

  const handleDeleteCard = (cardToDelete) => {
    Alert.alert(
      "Delete Card",
      `Are you sure you want to delete ${cardToDelete.name}?`,
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const updatedCards = cards.filter(
              (card) => card.id !== cardToDelete.id,
            );
            await saveCards(updatedCards);
            setCards(updatedCards);
            Alert.alert("Card deleted successfully");
          },
        },
      ],
    );
  };

  const handleSaveTransaction = async (transactionData) => {
    if (editingTransaction) {
      const updated = await updateTransaction(
        editingTransaction.id,
        transactionData,
      );
      if (updated) {
        const updatedTransactions = transactions.map((t) =>
          t.id === editingTransaction.id ? updated : t,
        );
        setTransactions(updatedTransactions);
        setEditingTransaction(null);
        setAddingTransaction(false);
        setCurrentView("transactions");
        Alert.alert("Transaction updated successfully");
      }
    } else {
      const newTransaction = {
        ...transactionData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      const updatedTransactions = [...transactions, newTransaction];
      await saveTransactions(updatedTransactions);
      setTransactions(updatedTransactions);
      setAddingTransaction(false);
      setCurrentView("transactions");
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
            (t) => t.id !== transactionId,
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
    setCurrentView("cardDetails");
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

    setCurrentView("monthDetails");
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
    setCurrentView("cardDetails");
  };

  // ---------- VIEW RENDERING ----------

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
            setCurrentView("transactions");
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
          onBackPress={() => {
            setEditingCard(null);
            setCurrentView("cards");
          }}
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
          onBackPress={() => {
            setAddingCard(false);
            setCurrentView("cards");
          }}
          onAddCard={handleAddCard}
        />
      </>
    );
  }

  if (currentView === "monthDetails" && selectedMonth) {
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
          onBackPress={() => setCurrentView("cardDetails")}
        />
      </>
    );
  }

  if (currentView === "cardDetails" && selectedCard) {
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
          onBackPress={() => setCurrentView("cards")}
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

  if (currentView === "importExport") {
    return (
      <>
        <StatusBar style="dark" />
        <ImportExportView
          onBackPress={() => setCurrentView("home")}
          onDataImported={initializeData}
        />
      </>
    );
  }

  if (currentView === "home") {
    return (
      <>
        <StatusBar style="dark" />
        <HomeView
          onCreditCardsPress={() => setCurrentView("cards")}
          onTransactionsPress={() => setCurrentView("transactions")}
          onImportExportPress={() => setCurrentView("importExport")}
        />
      </>
    );
  }

  // Default → Card List
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
        onDeletePress={handleDeleteCard}
        onAddCardPress={() => setAddingCard(true)}
        onHomePress={() => setCurrentView("home")}
      />
    </>
  );
}
