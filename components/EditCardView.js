import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import commonStyles from "../styles/commonStyles";

const EditCardView = ({ cardData, onBackPress, onSaveCard }) => {
  const [name, setName] = useState(cardData.name);
  const [fullNumber, setFullNumber] = useState(cardData.fullNumber);
  const [type, setType] = useState(cardData.type);
  const [cvv, setCvv] = useState(cardData.cvv);
  const [billCycle, setBillCycle] = useState(cardData.billCycle);
  const [lastPaymentDate, setLastPaymentDate] = useState(
    cardData.lastPaymentDate
  );
  const [limit, setLimit] = useState(cardData.limit);

  const handleSaveCard = () => {
    if (
      !name ||
      !fullNumber ||
      !cvv ||
      !billCycle ||
      !lastPaymentDate ||
      !limit
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

    const maskedNumber = "**** " + fullNumber.slice(-4);
    const updatedCard = {
      ...cardData,
      name,
      number: maskedNumber,
      fullNumber,
      type,
      cvv,
      billCycle,
      lastPaymentDate,
      limit,
    };

    onSaveCard(updatedCard);
    Alert.alert("Card updated successfully");
    onBackPress();
  };

  return (
    <SafeAreaView style={commonStyles.containerNoPadding}>
      <View style={commonStyles.detailsHeader}>
        <Text style={commonStyles.title} numberOfLines={1}>
          Edit Card
        </Text>
        <TouchableOpacity style={commonStyles.homeButton} onPress={onBackPress}>
          <Text style={commonStyles.homeIcon}>🏠</Text>
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

        <Text style={commonStyles.label}>CVV (3 digits)</Text>
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

        <Text style={commonStyles.label}>Bill Cycle</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="e.g., 5th - 4th"
          value={billCycle}
          onChangeText={setBillCycle}
        />

        <Text style={commonStyles.label}>Last Payment Date</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="e.g., 25th"
          value={lastPaymentDate}
          onChangeText={setLastPaymentDate}
        />

        <Text style={commonStyles.label}>Credit Limit</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="e.g., ₹1,00,000"
          value={limit}
          onChangeText={setLimit}
        />

        <TouchableOpacity style={commonStyles.button} onPress={handleSaveCard}>
          <Text style={commonStyles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBackPress}>
          <Text style={commonStyles.back}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditCardView;
