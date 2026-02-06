import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import commonStyles from "../styles/commonStyles";

const MonthDetailsView = ({
  selectedCard,
  selectedMonth,
  amount,
  paid,
  getMonthName,
  onAmountChange,
  onPaidToggle,
  onSubmit,
  onBackPress,
}) => {
  return (
    <SafeAreaView style={commonStyles.containerNoPadding}>
      <View style={commonStyles.pageHeader}>
        <View style={{ width: 24 }} />
        <Text style={commonStyles.pageHeaderTitle} numberOfLines={1}>
          {selectedCard.name}
        </Text>
        <TouchableOpacity style={commonStyles.homeButton} onPress={onBackPress}>
          <Text style={commonStyles.homeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={commonStyles.detailsContainer}>
        <Text style={commonStyles.label}>
          Card Number: {selectedCard.number}
        </Text>
        <Text style={commonStyles.label}>
          Month: {getMonthName(selectedMonth)}
        </Text>

        <Text style={commonStyles.sectionTitle}>Payment Details</Text>

        <TextInput
          style={commonStyles.input}
          placeholder="Enter bill amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={onAmountChange}
        />

        <TouchableOpacity
          style={[commonStyles.checkbox, paid && commonStyles.checkboxChecked]}
          onPress={onPaidToggle}
        >
          <Text style={commonStyles.checkboxText}>
            {paid ? "✓ Mark as Paid" : "Mark as Paid"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={commonStyles.button} onPress={onSubmit}>
          <Text style={commonStyles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBackPress}>
          <Text style={commonStyles.back}>← Back to Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MonthDetailsView;
