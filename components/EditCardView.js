import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  FlatList,
  Modal,
} from "react-native";
import commonStyles from "../styles/commonStyles";
import { cardBanks } from "../utils/constants";
import { getCardBankImage } from "../utils/imageUtils";

const EditCardView = ({ cardData, onBackPress, onSaveCard }) => {
  const [name, setName] = useState(cardData.name);
  const [fullNumber, setFullNumber] = useState(cardData.fullNumber);
  const [type, setType] = useState(cardData.type);
  const [cvv, setCvv] = useState(cardData.cvv);
  const [expiryDate, setExpiryDate] = useState(cardData.expiryDate || "");
  const [billCycle, setBillCycle] = useState(cardData.billCycle);
  const [lastPaymentDate, setLastPaymentDate] = useState(
    cardData.lastPaymentDate,
  );
  const [limit, setLimit] = useState(cardData.limit);
  const [bank, setBank] = useState(cardData.bank || "");
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);

  const handleSaveCard = () => {
    if (
      !name ||
      !fullNumber ||
      !cvv ||
      !expiryDate ||
      !billCycle ||
      !lastPaymentDate ||
      !limit ||
      !bank
    ) {
      Alert.alert("Please fill all fields");
      return;
    }

    if (fullNumber.replaceAll(" ", "").length !== 16) {
      Alert.alert("Card number should be 16 digits");
      return;
    }

    if (cvv.length !== 3) {
      Alert.alert("CVV should be 3 digits");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      Alert.alert("Expiry date should be in MM/YY format");
      return;
    }

    const updatedCard = {
      ...cardData,
      name,
      fullNumber,
      type,
      cvv,
      expiryDate,
      billCycle,
      lastPaymentDate,
      limit,
      bank,
      image: getCardBankImage(bank),
    };

    onSaveCard(updatedCard);
    Alert.alert("Card updated successfully");
    onBackPress();
  };

  return (
    <SafeAreaView style={commonStyles.containerWithScroll}>
      <View style={commonStyles.pageHeader}>
        <View style={{ width: 24 }} />
        <View>
          {cardData.bank && getCardBankImage(cardData?.bank) ? (
            <Image
              source={getCardBankImage(cardData?.bank)}
              style={{
                width: 50,
                height: 50,
                borderRadius: 4,
              }}
            />
          ) : null}
        </View>
        <Text style={commonStyles.pageHeaderTitle} numberOfLines={1}>
          Edit Card
        </Text>
        <TouchableOpacity style={commonStyles.homeButton} onPress={onBackPress}>
          <Text style={commonStyles.homeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={commonStyles.detailsContainer}>
        <Text style={commonStyles.label}>Card Name</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="e.g., HDFC Credit Card"
          value={name}
          onChangeText={setName}
        />

        <Text style={commonStyles.label}>Card Number (16 digits)</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
          value={fullNumber}
          onChangeText={(text) => {
            const cleaned = text.replaceAll(" ", "");
            if (cleaned.length <= 16) {
              const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
              setFullNumber(formatted);
            }
          }}
          maxLength={19}
        />

        <Text style={commonStyles.label}>Card Type</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: 0,
            marginBottom: 16,
          }}
        >
          {["Visa", "Mastercard", "AmEx"].map((cardType) => (
            <TouchableOpacity
              key={cardType}
              style={[
                commonStyles.typeButton,
                type === cardType && commonStyles.typeButtonActive,
              ]}
              onPress={() => setType(cardType)}
            >
              <Text
                style={[
                  commonStyles.typeButtonText,
                  type === cardType && commonStyles.typeButtonTextActive,
                ]}
              >
                {cardType}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={commonStyles.label}>Bank</Text>
        <TouchableOpacity
          style={[
            commonStyles.input,
            {
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 12,
            },
          ]}
          onPress={() => setBankDropdownOpen(true)}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            {bank && getCardBankImage(bank) ? (
              <Image
                source={getCardBankImage(bank)}
                style={{
                  width: 40,
                  height: 25,
                  borderRadius: 4,
                  marginRight: 10,
                }}
              />
            ) : null}
            <Text style={{ color: bank ? "#333" : "#999" }}>
              {bank || "Select Bank"}
            </Text>
          </View>
          <Text style={{ fontSize: 18, color: "#333" }}>▼</Text>
        </TouchableOpacity>

        <Modal visible={bankDropdownOpen} transparent animationType="fade">
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setBankDropdownOpen(false)}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                width: "80%",
                maxHeight: "60%",
              }}
              onStartShouldSetResponder={() => true}
            >
              <FlatList
                data={cardBanks}
                keyExtractor={(item) => item.name}
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
                      setBank(item.name);
                      setBankDropdownOpen(false);
                    }}
                  >
                    {getCardBankImage(item.name) ? (
                      <Image
                        source={getCardBankImage(item.name)}
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

        <View style={{ flexDirection: "row", gap: 12, marginBottom: 0 }}>
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.label}>CVV</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="123"
              keyboardType="numeric"
              value={cvv}
              onChangeText={(text) => {
                if (text.length <= 3) setCvv(text);
              }}
              maxLength={3}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={commonStyles.label}>Expiry Date</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="MM/YY (e.g., 03/29)"
              value={expiryDate}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "");
                if (cleaned.length <= 4) {
                  if (cleaned.length <= 2) {
                    setExpiryDate(cleaned);
                  } else {
                    setExpiryDate(cleaned.slice(0, 2) + "/" + cleaned.slice(2));
                  }
                }
              }}
              maxLength={5}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 12, marginBottom: 0 }}>
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.label}>Bill Cycle</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="e.g., 5th - 4th"
              value={billCycle}
              onChangeText={setBillCycle}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={commonStyles.label}>Last Payment Date</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="e.g., 25th"
              value={lastPaymentDate}
              onChangeText={setLastPaymentDate}
            />
          </View>
        </View>

        <Text style={commonStyles.label}>Credit Limit</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="e.g., ₹1,00,000"
          value={limit}
          onChangeText={setLimit}
        />

        <View style={commonStyles.buttonContainer}>
          <TouchableOpacity
            style={commonStyles.cancelBtn}
            onPress={onBackPress}
          >
            <Text style={commonStyles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={commonStyles.saveBtn}
            onPress={handleSaveCard}
          >
            <Text style={commonStyles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditCardView;
