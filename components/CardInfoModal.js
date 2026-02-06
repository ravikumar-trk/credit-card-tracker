import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import commonStyles from "../styles/commonStyles";

const CardInfoModal = ({ cardDetails, onBackPress }) => {
  return (
    <SafeAreaView style={commonStyles.containerNoPadding}>
      <View style={commonStyles.detailsHeader}>
        <Text style={commonStyles.title} numberOfLines={1}>
          Card Details
        </Text>
        <TouchableOpacity style={commonStyles.homeButton} onPress={onBackPress}>
          <Text style={commonStyles.homeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={commonStyles.detailsContainer}>
        <View style={commonStyles.cardDetailsBox}>
          <Text style={commonStyles.cardDetailsTitle}>{cardDetails.name}</Text>

          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Card Number:</Text>
            <Text style={commonStyles.detailValue}>
              {cardDetails.fullNumber}
            </Text>
          </View>

          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Card Type:</Text>
            <Text style={commonStyles.detailValue}>{cardDetails.type}</Text>
          </View>

          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>CVV:</Text>
            <Text style={commonStyles.detailValue}>{cardDetails.cvv}</Text>
          </View>

          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Bill Cycle:</Text>
            <Text style={commonStyles.detailValue}>
              {cardDetails.billCycle}
            </Text>
          </View>

          <View style={commonStyles.detailRow}>
            <Text style={commonStyles.detailLabel}>Last Payment Date:</Text>
            <Text style={commonStyles.detailValue}>
              {cardDetails.lastPaymentDate}
            </Text>
          </View>

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
