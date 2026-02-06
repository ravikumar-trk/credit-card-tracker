import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StatusBar,
  Image,
} from "react-native";
import commonStyles from "../styles/commonStyles";
import { months } from "../utils/constants";
import hsbc from "./../assets/cardImages/hsbc.png";

const TransactionsListView = ({
  defaultCards,
  transactions,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
  onHomePress,
}) => {
  const [filterCardId, setFilterCardId] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const cardMatch = !filterCardId || t.cardId === filterCardId;
        const monthMatch = !filterMonth || t.month === filterMonth;
        return cardMatch && monthMatch;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [transactions, filterCardId, filterMonth]);

  const getCardName = (cardId) => {
    const card = defaultCards.find((c) => c.id === cardId);
    return card ? card.name : "Unknown";
  };

  const getCardColor = (cardId) => {
    const card = defaultCards.find((c) => c.id === cardId);
    switch (card?.name) {
      case "HDFC Credit Card":
        return hsbc;
      case "SBI Credit Card":
        return hsbc;
      case "ICICI Credit Card":
        return hsbc;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "#4CAF50";
      case "notPaid":
        return "#F44336";
      case "splitwise":
        return "#2196F3";
      case "notSplitwise":
        return "#F44336";
      case "mine":
        return "#4CAF50";
      default:
        return "#999";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "notPaid":
        return "Not Paid";
      case "splitwise":
        return "Splitwise";
      case "mine":
        return "Mine";
      default:
        return status;
    }
  };

  const renderTransactionItem = ({ item }) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = months[parseInt(item.month) - 1] || item.month;

    return (
      <View style={commonStyles.transactionCard}>
        <View style={commonStyles.transactionHeader}>
          <View style={commonStyles.cardInfo}>
            {getCardColor(item.cardId) ? (
              <Image
                source={getCardColor(item.cardId)}
                style={{
                  width: 40,
                  height: 25,
                  borderRadius: 4,
                  marginRight: 10,
                }}
              />
            ) : (
              <View
                style={[commonStyles.cardColorDot, { backgroundColor: "#999" }]}
              />
            )}
            <View>
              <Text style={commonStyles.cardName}>
                {getCardName(item.cardId)}
              </Text>
              <Text style={commonStyles.transactionDate}>
                {item.date} {monthName}
              </Text>
            </View>
          </View>
          <View style={commonStyles.amountAndStatus}>
            <Text style={commonStyles.amount}>₹{item.amount}</Text>
            <View
              style={[
                commonStyles.statusBadge,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            >
              <Text style={commonStyles.statusText}>
                {getStatusLabel(item.status)}
              </Text>
            </View>
          </View>
        </View>

        <View style={commonStyles.transactionDetails}>
          <Text style={commonStyles.detailLabel}>By: {item.usedBy}</Text>
          {item.description && (
            <Text style={commonStyles.detailLabel}>
              Desc: {item.description}
            </Text>
          )}
        </View>

        <View style={commonStyles.transactionActions}>
          <TouchableOpacity
            style={commonStyles.editBtn}
            onPress={() => onEditTransaction(item)}
          >
            <Text style={commonStyles.editBtnText}>✏️ Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={commonStyles.deleteBtn}
            onPress={() => onDeleteTransaction(item.id)}
          >
            <Text style={commonStyles.deleteBtnText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={commonStyles.containerNoPadding}>
        <View style={commonStyles.pageHeader}>
          <TouchableOpacity onPress={onHomePress}>
            <Text style={commonStyles.homeIcon}>🏠</Text>
          </TouchableOpacity>
          <Text style={commonStyles.pageHeaderTitle}>Transactions</Text>
          <TouchableOpacity
            style={commonStyles.addBtn}
            onPress={onAddTransaction}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <View style={commonStyles.filterSection}>
          <View style={commonStyles.filterRow}>
            <View style={commonStyles.filterColumn}>
              <Text style={commonStyles.filterLabel}>Card</Text>
              <TouchableOpacity
                style={commonStyles.filterDropdown}
                onPress={() => setCardDropdownOpen(true)}
              >
                <Text style={commonStyles.filterDropdownText}>
                  {filterCardId
                    ? defaultCards.find((c) => c.id === filterCardId)?.name
                    : "All Cards"}
                </Text>
                <Text style={commonStyles.filterDropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>

            <View style={commonStyles.filterColumn}>
              <Text style={commonStyles.filterLabel}>Month</Text>
              <TouchableOpacity
                style={commonStyles.filterDropdown}
                onPress={() => setMonthDropdownOpen(true)}
              >
                <Text style={commonStyles.filterDropdownText}>
                  {filterMonth
                    ? months.find((m) => m.value === filterMonth)?.label
                    : "All Months"}
                </Text>
                <Text style={commonStyles.filterDropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          {(filterCardId || filterMonth) && (
            <TouchableOpacity
              onPress={() => {
                setFilterCardId("");
                setFilterMonth("");
              }}
            >
              <Text style={commonStyles.clearBtn}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>

        <Modal visible={cardDropdownOpen} transparent animationType="fade">
          <TouchableOpacity
            style={commonStyles.dropdownOverlay}
            onPress={() => setCardDropdownOpen(false)}
            activeOpacity={1}
          >
            <View style={commonStyles.dropdownMenu}>
              <TouchableOpacity
                style={commonStyles.dropdownItem}
                onPress={() => {
                  setFilterCardId("");
                  setCardDropdownOpen(false);
                }}
              >
                <Text style={commonStyles.dropdownItemText}>All Cards</Text>
              </TouchableOpacity>
              <FlatList
                data={defaultCards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={commonStyles.dropdownItem}
                    onPress={() => {
                      setFilterCardId(item.id);
                      setCardDropdownOpen(false);
                    }}
                  >
                    <Text style={commonStyles.dropdownItemText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal visible={monthDropdownOpen} transparent animationType="fade">
          <TouchableOpacity
            style={commonStyles.dropdownOverlay}
            onPress={() => setMonthDropdownOpen(false)}
            activeOpacity={1}
          >
            <View style={commonStyles.dropdownMenu}>
              <TouchableOpacity
                style={commonStyles.dropdownItem}
                onPress={() => {
                  setFilterMonth("");
                  setMonthDropdownOpen(false);
                }}
              >
                <Text style={commonStyles.dropdownItemText}>All Months</Text>
              </TouchableOpacity>
              <FlatList
                data={months}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={commonStyles.dropdownItem}
                    onPress={() => {
                      setFilterMonth(item.value);
                      setMonthDropdownOpen(false);
                    }}
                  >
                    <Text style={commonStyles.dropdownItemText}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {filteredTransactions.length === 0 ? (
          <View style={commonStyles.emptyState}>
            <Text style={commonStyles.emptyStateText}>No transactions yet</Text>
            <TouchableOpacity onPress={onAddTransaction}>
              <Text style={commonStyles.emptyStateBtn}>
                Add your first transaction
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredTransactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={commonStyles.listContent}
          />
        )}
      </View>
    </>
  );
};

export default TransactionsListView;
