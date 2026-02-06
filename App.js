import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import CardListView from "./components/CardListView";
import CardDetailsView from "./components/CardDetailsView";
import MonthDetailsView from "./components/MonthDetailsView";
import CardInfoModal from "./components/CardInfoModal";
import AddCardView from "./components/AddCardView";
import EditCardView from "./components/EditCardView";
import defaultCards from "./components/staticCards";
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

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [viewCardDetails, setViewCardDetails] = useState(null);
  const [addingCard, setAddingCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState(false);
  const [payments, setPayments] = useState({});
  const [cards, setCards] = useState(defaultCards);

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

  // Render Edit Card View
  if (editingCard) {
    return (
      <EditCardView
        cardData={editingCard}
        onBackPress={() => setEditingCard(null)}
        onSaveCard={handleSaveEditedCard}
      />
    );
  }

  // Render Add Card View
  if (addingCard) {
    return (
      <AddCardView
        onBackPress={() => setAddingCard(false)}
        onAddCard={handleAddCard}
      />
    );
  }

  // Render Month Details View
  if (selectedMonth) {
    return (
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
    );
  }

  // Render Card Details View
  if (selectedCard) {
    return (
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
    );
  }

  // Render Card Info Modal
  if (viewCardDetails) {
    return (
      <CardInfoModal
        cardDetails={viewCardDetails}
        onBackPress={() => setViewCardDetails(null)}
      />
    );
  }

  // Render Card List View
  return (
    <CardListView
      staticCards={cards}
      payments={payments}
      getCurrentMonthKey={getCurrentMonthKey}
      getCurrentMonthName={getCurrentMonthName}
      onCardPress={openCard}
      onViewPress={setViewCardDetails}
      onEditPress={setEditingCard}
      onAddCardPress={() => setAddingCard(true)}
    />
  );
}
