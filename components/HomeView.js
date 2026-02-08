import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import commonStyles from "../styles/commonStyles";

const HomeView = ({
  onCreditCardsPress,
  onTransactionsPress,
  onImportExportPress,
}) => {
  return (
    <SafeAreaView style={commonStyles.containerNoPadding}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={commonStyles.pageHeader}>
        {/* <View style={{ width: 24 }} /> */}
        <Text style={commonStyles.pageHeaderTitle}>Credit Card Tracker</Text>
        {/* <View style={{ width: 24 }} /> */}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <TouchableOpacity
          style={[
            commonStyles.homeCard,
            { marginBottom: 20, backgroundColor: "#4CAF50" },
          ]}
          onPress={onCreditCardsPress}
        >
          <Text style={commonStyles.homeCardIcon}>💳</Text>
          <Text style={commonStyles.homeCardTitle}>My Credit Cards</Text>
          <Text style={commonStyles.homeCardSubtitle}>
            Track your credit cards and payments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[commonStyles.homeCard, { backgroundColor: "#2196F3" }]}
          onPress={onTransactionsPress}
        >
          <Text style={commonStyles.homeCardIcon}>📊</Text>
          <Text style={commonStyles.homeCardTitle}>Transactions</Text>
          <Text style={commonStyles.homeCardSubtitle}>
            View and manage all transactions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            commonStyles.homeCard,
            { backgroundColor: "#FF9800", marginTop: 20 },
          ]}
          onPress={onImportExportPress}
        >
          <Text style={commonStyles.homeCardIcon}>💾</Text>
          <Text style={commonStyles.homeCardTitle}>Import/Export</Text>
          <Text style={commonStyles.homeCardSubtitle}>
            Backup and restore all your data
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeView;
