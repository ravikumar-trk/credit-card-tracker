import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import commonStyles from "../styles/commonStyles";
import { getCardBankImage } from "../utils/imageUtils";

const CardInfoModal = ({ cardDetails, onBackPress }) => {
  const copyToClipboard = async (value, label) => {
    await Clipboard.setStringAsync(`${label}: ${value}`);
    Alert.alert("Copied", `${label} copied to clipboard`);
  };

  const CopyIcon = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 8 }}>
      <Text style={{ fontSize: 18 }}>📋</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.containerNoPadding}>
      <View style={commonStyles.pageHeader}>
        <View>
          {cardDetails.bank && getCardBankImage(cardDetails?.bank) ? (
            <Image
              source={getCardBankImage(cardDetails?.bank)}
              style={{ width: 50, height: 50, borderRadius: 4 }}
            />
          ) : null}
        </View>

        <Text style={commonStyles.pageHeaderTitle} numberOfLines={1}>
          Card Details
        </Text>

        <TouchableOpacity style={commonStyles.homeButton} onPress={onBackPress}>
          <Text style={commonStyles.homeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={commonStyles.detailsContainer}>
        <View style={commonStyles.cardDetailsBox}>
          <Text style={commonStyles.cardDetailsTitle}>{cardDetails.name}</Text>

          {/* Card Number */}
          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Card Number:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={commonStyles.detailValue}>
                {cardDetails.fullNumber}
              </Text>
              <CopyIcon
                onPress={() =>
                  copyToClipboard(cardDetails.fullNumber, "Card number")
                }
              />
            </View>
          </View>

          {/* CVV */}
          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>CVV:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={commonStyles.detailValue}>{cardDetails.cvv}</Text>
              <CopyIcon
                onPress={() => copyToClipboard(cardDetails.cvv, "CVV")}
              />
            </View>
          </View>

          {/* Expiry Date */}
          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Expiry Date:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={commonStyles.detailValue}>
                {cardDetails.expiryDate}
              </Text>
              <CopyIcon
                onPress={() =>
                  copyToClipboard(cardDetails.expiryDate, "Expiry date")
                }
              />
            </View>
          </View>

          {/* Card Type */}
          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Card Type:</Text>
            <Text style={commonStyles.detailValue}>{cardDetails.type}</Text>
          </View>

          {/* Bill Cycle */}
          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Bill Cycle:</Text>
            <Text style={commonStyles.detailValue}>
              {cardDetails.billCycle}
            </Text>
          </View>

          {/* Last Payment Date */}
          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Last Payment Date:</Text>
            <Text style={commonStyles.detailValue}>
              {cardDetails.lastPaymentDate}
            </Text>
          </View>

          {/* Credit Limit */}
          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Credit Limit:</Text>
            <Text style={commonStyles.detailValue}>{cardDetails.limit}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={onBackPress}>
          <Text style={commonStyles.back}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardInfoModal;
