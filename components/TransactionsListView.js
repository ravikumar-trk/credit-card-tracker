import { useState, useMemo } from "react";
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
import { getCardBankImage } from "../utils/imageUtils";

const getCurrentMonth = () => (new Date().getMonth() + 1).toString();

const TransactionsListView = ({
  defaultCards,
  transactions,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
  onHomePress,
}) => {
  const [filterCardId, setFilterCardId] = useState("");
  const [filterMonth, setFilterMonth] = useState(getCurrentMonth());
  const [filterUsedBy, setFilterUsedBy] = useState("");
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [usedByDropdownOpen, setUsedByDropdownOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const cardMatch = !filterCardId || t.cardId === filterCardId;
        const monthMatch = !filterMonth || t.month === filterMonth;
        const usedByMatch =
          !filterUsedBy ||
          t.usedBy.toLowerCase() === filterUsedBy.toLowerCase();
        return cardMatch && monthMatch && usedByMatch;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [transactions, filterCardId, filterMonth, filterUsedBy]);

  const getCardName = (cardId) => {
    const card = defaultCards.find((c) => c.id === cardId);
    return card ? card.name : "Unknown";
  };

  const getCardBank = (cardId) => {
    const card = defaultCards.find((c) => c.id === cardId);
    return card ? card.bank : "Unknown";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "#4CAF50";
      case "notPaid":
        return "#F44336";
      case "addedSplitwise":
        return "#2196F3";
      case "notAddSplitwise":
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
      case "addedSplitwise":
        return "Added in Splitwise";
      case "notAddSplitwise":
        return "Not Added in Splitwise";
      case "mine":
        return "Mine";
      default:
        return status;
    }
  };

  const getUniqueUsedBy = () => {
    const usedBySet = new Set(
      transactions.map((t) => t.usedBy?.toLowerCase()).filter(Boolean),
    );
    return Array.from(usedBySet).map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    }));
    // const usedBySet = new Set(
    //   transactions.map((t) => t.usedBy).filter(Boolean),
    // );
    // return Array.from(usedBySet).map((value) => ({
    //   value,
    //   label: value,
    // }));
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
            {item.cardId ? (
              <Image
                source={getCardBankImage(getCardBank(item.cardId))}
                style={{
                  width: 40,
                  height: 40,
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

        {/* <View style={commonStyles.transactionDetails}>
          <Text style={commonStyles.detailLabel}>Used By: {item.usedBy}</Text>
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
        </View> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          {/* LEFT SIDE → Used By & Description */}
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.detailLabel}>Used By: {item.usedBy}</Text>

            {item.description ? (
              <Text style={commonStyles.detailLabel}>
                Desc: {item.description}
              </Text>
            ) : null}
          </View>

          {/* RIGHT SIDE → Edit & Delete Icons */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity onPress={() => onEditTransaction(item)}>
              <Text style={{ fontSize: 18 }}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDeleteTransaction(item.id)}>
              <Text style={{ fontSize: 18 }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={commonStyles.containerWithScroll}>
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

            <View style={commonStyles.filterColumn}>
              <Text style={commonStyles.filterLabel}>Used By</Text>
              <TouchableOpacity
                style={commonStyles.filterDropdown}
                onPress={() => setUsedByDropdownOpen(true)}
              >
                <Text style={commonStyles.filterDropdownText}>
                  {filterUsedBy || "All"}
                </Text>
                <Text style={commonStyles.filterDropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          {(filterCardId || filterMonth || filterUsedBy) && (
            <TouchableOpacity
              onPress={() => {
                setFilterCardId("");
                setFilterMonth("");
                setFilterUsedBy("");
              }}
            >
              <Text style={commonStyles.clearBtn}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={commonStyles.scrollableContent}>
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
                      style={{
                        padding: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: "#eee",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setFilterCardId(item.id);
                        setCardDropdownOpen(false);
                      }}
                    >
                      {item.bank && getCardBankImage(item.bank) ? (
                        <Image
                          source={getCardBankImage(item.bank)}
                          style={{
                            width: 40,
                            height: 25,
                            borderRadius: 4,
                            marginRight: 12,
                          }}
                        />
                      ) : null}
                      <Text style={{ fontSize: 16, color: "#333" }}>
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

          <Modal visible={usedByDropdownOpen} transparent animationType="fade">
            <TouchableOpacity
              style={commonStyles.dropdownOverlay}
              onPress={() => setUsedByDropdownOpen(false)}
              activeOpacity={1}
            >
              <View style={commonStyles.dropdownMenu}>
                <TouchableOpacity
                  style={commonStyles.dropdownItem}
                  onPress={() => {
                    setFilterUsedBy("");
                    setUsedByDropdownOpen(false);
                  }}
                >
                  <Text style={commonStyles.dropdownItemText}>All</Text>
                </TouchableOpacity>
                <FlatList
                  data={getUniqueUsedBy()}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={commonStyles.dropdownItem}
                      onPress={() => {
                        setFilterUsedBy(item.value);
                        setUsedByDropdownOpen(false);
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
              <Text style={commonStyles.emptyStateText}>
                No transactions yet
              </Text>
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
              scrollEnabled={true}
              contentContainerStyle={commonStyles.listContent}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default TransactionsListView;
