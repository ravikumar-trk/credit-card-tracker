import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import commonStyles from "../styles/commonStyles";
import { months, statusOptions } from "../utils/constants";

const TransactionFormView = ({
  defaultCards,
  transaction = null,
  onSave,
  onCancel,
  onHomePress,
}) => {
  const [cardId, setCardId] = useState(
    transaction?.cardId || defaultCards[0]?.id || ""
  );
  const [date, setDate] = useState(transaction?.date || "1");
  const [month, setMonth] = useState(transaction?.month || "1");
  const [amount, setAmount] = useState(transaction?.amount.toString() || "");
  const [usedBy, setUsedBy] = useState(transaction?.usedBy || "");
  const [description, setDescription] = useState(
    transaction?.description || ""
  );
  const [status, setStatus] = useState(transaction?.status || "notPaid");

  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [errors, setErrors] = useState({});

  // Clear form when adding new transaction
  useEffect(() => {
    if (!transaction) {
      setCardId(defaultCards[0]?.id || "");
      setDate("1");
      setMonth("1");
      setAmount("");
      setUsedBy("");
      setDescription("");
      setStatus("notPaid");
      setErrors({});
    }
  }, [transaction]);

  const dates = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  const validateForm = () => {
    const newErrors = {};
    if (!cardId) newErrors.cardId = "Card is required";
    if (!date) newErrors.date = "Date is required";
    if (!month) newErrors.month = "Month is required";
    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(parseFloat(amount))) {
      newErrors.amount = "Amount must be a number";
    }
    if (!usedBy.trim()) newErrors.usedBy = "Used by is required";
    if (!status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        cardId,
        date,
        month,
        amount: parseFloat(amount),
        usedBy,
        description,
        status,
      });
    }
  };

  const getCardName = (id) => {
    return defaultCards.find((c) => c.id === id)?.name || "Select Card";
  };

  const getMonthName = (value) => {
    const m = months.find((m) => m.value === value);
    return m ? m.label : "Select Month";
  };

  const getStatusLabel = (value) => {
    const s = statusOptions.find((s) => s.value === value);
    return s ? s.label : "Select Status";
  };

  const DropdownButton = ({ label, value, onPress, error }) => (
    <View style={commonStyles.fieldContainer}>
      <Text style={commonStyles.label}>{label}</Text>
      <TouchableOpacity
        style={[commonStyles.dropdown, error && commonStyles.errorInput]}
        onPress={onPress}
      >
        <Text style={commonStyles.dropdownText}>{value}</Text>
        <Text style={commonStyles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {error && <Text style={commonStyles.errorText}>{error}</Text>}
    </View>
  );

  const DropdownModal = ({ visible, options, onSelect, onClose }) => (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={commonStyles.dropdownOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={commonStyles.dropdownMenu}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={commonStyles.dropdownItem}
                onPress={() => {
                  onSelect(item.value);
                  onClose();
                }}
              >
                <Text style={commonStyles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <ScrollView
      style={commonStyles.containerNoPadding}
      showsVerticalScrollIndicator={false}
    >
      <View style={commonStyles.pageHeader}>
        <View style={{ width: 24 }} />
        <Text style={commonStyles.pageHeaderTitle}>
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </Text>
        <TouchableOpacity style={commonStyles.homeButton} onPress={onCancel}>
          <Text style={commonStyles.homeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={commonStyles.formContainer}>
        <DropdownButton
          label="Card"
          value={getCardName(cardId)}
          onPress={() => setCardDropdownOpen(true)}
          error={errors.cardId}
        />
        <DropdownModal
          visible={cardDropdownOpen}
          options={defaultCards.map((c) => ({ value: c.id, label: c.name }))}
          onSelect={setCardId}
          onClose={() => setCardDropdownOpen(false)}
        />

        <DropdownButton
          label="Date"
          value={date}
          onPress={() => setDateDropdownOpen(true)}
          error={errors.date}
        />
        <DropdownModal
          visible={dateDropdownOpen}
          options={dates}
          onSelect={setDate}
          onClose={() => setDateDropdownOpen(false)}
        />

        <DropdownButton
          label="Month"
          value={getMonthName(month)}
          onPress={() => setMonthDropdownOpen(true)}
          error={errors.month}
        />
        <DropdownModal
          visible={monthDropdownOpen}
          options={months}
          onSelect={setMonth}
          onClose={() => setMonthDropdownOpen(false)}
        />

        <View style={commonStyles.fieldContainer}>
          <Text style={commonStyles.label}>Amount (₹)</Text>
          <TextInput
            style={[
              commonStyles.input,
              errors.amount && commonStyles.errorInput,
            ]}
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />
          {errors.amount && (
            <Text style={commonStyles.errorText}>{errors.amount}</Text>
          )}
        </View>

        <View style={commonStyles.fieldContainer}>
          <Text style={commonStyles.label}>Used By</Text>
          <TextInput
            style={[
              commonStyles.input,
              errors.usedBy && commonStyles.errorInput,
            ]}
            placeholder="e.g., John, Sarah, Shared"
            value={usedBy}
            onChangeText={setUsedBy}
            placeholderTextColor="#999"
          />
          {errors.usedBy && (
            <Text style={commonStyles.errorText}>{errors.usedBy}</Text>
          )}
        </View>

        <View style={commonStyles.fieldContainer}>
          <Text style={commonStyles.label}>Description (Optional)</Text>
          <TextInput
            style={[commonStyles.input, commonStyles.textArea]}
            placeholder="e.g., Groceries, Gas, Entertainment"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#999"
          />
        </View>

        <DropdownButton
          label="Status"
          value={getStatusLabel(status)}
          onPress={() => setStatusDropdownOpen(true)}
          error={errors.status}
        />
        <DropdownModal
          visible={statusDropdownOpen}
          options={statusOptions}
          onSelect={setStatus}
          onClose={() => setStatusDropdownOpen(false)}
        />

        <View style={commonStyles.buttonContainer}>
          <TouchableOpacity style={commonStyles.cancelBtn} onPress={onCancel}>
            <Text style={commonStyles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.saveBtn} onPress={handleSave}>
            <Text style={commonStyles.saveBtnText}>
              {transaction ? "Update" : "Add"} Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default TransactionFormView;
