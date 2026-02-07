import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import StatusBadge from "./StatusBadge";
import commonStyles from "../styles/commonStyles";
import { getCardBankImage } from "../utils/imageUtils";

const CardDetailsView = ({
  selectedCard,
  payments,
  getAllMonths,
  getMonthName,
  getCurrentMonthKey,
  isCurrentMonthOrPast,
  onBackPress,
  onMonthPress,
}) => {
  const renderHistoryCards = () => {
    const months = getAllMonths();
    const currentMonthKey = getCurrentMonthKey();

    return months.map((monthKey) => {
      const record = payments[selectedCard.id]?.[monthKey];
      const isCurrent = monthKey === currentMonthKey;
      const isPast = isCurrentMonthOrPast(monthKey);

      let statusColor = "#fff";
      let borderColor = "#2196F3";

      if (record) {
        if (isCurrent && !record.paid) {
          statusColor = "#ffebee";
          borderColor = "#f44336";
        } else if (record.paid) {
          borderColor = "#4CAF50";
        }
      } else {
        if (isCurrent) {
          statusColor = "#fff3e0";
          borderColor = "#ff9800";
        }
      }

      return (
        <TouchableOpacity
          key={monthKey}
          style={[
            commonStyles.historyCard,
            { backgroundColor: statusColor, borderLeftColor: borderColor },
          ]}
          onPress={() => onMonthPress(monthKey)}
        >
          <View style={commonStyles.historyCardRow}>
            <Text style={commonStyles.historyMonth}>
              {getMonthName(monthKey)}
            </Text>
            {record && isPast && <StatusBadge paid={record.paid} />}
          </View>
          {record && (
            <Text style={commonStyles.historyAmount}>
              Amount: ₹{record.amount}
            </Text>
          )}
          {!record && (
            <Text style={commonStyles.historyAmount}>Tap to add payment</Text>
          )}
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={commonStyles.containerNoPadding}>
      <View style={commonStyles.pageHeader}>
        {/* <View style={{ width: 24 }} /> */}
        <View>
          {selectedCard.bank && getCardBankImage(selectedCard?.bank) ? (
            <Image
              source={getCardBankImage(selectedCard?.bank)}
              style={{
                width: 50,
                height: 50,
                borderRadius: 4,
              }}
            />
          ) : null}
        </View>
        <Text style={commonStyles.pageHeaderTitle} numberOfLines={1}>
          {selectedCard.name}
        </Text>
        <TouchableOpacity style={commonStyles.homeButton} onPress={onBackPress}>
          <Text style={commonStyles.homeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={commonStyles.detailsContainer}>
        <Text style={commonStyles.label}>
          Card Number: {selectedCard.fullNumber}
        </Text>
        {/* <Text style={commonStyles.label}>
          Expiry: {selectedCard.expiryDate}
        </Text> */}
        <Text style={commonStyles.label}>Limit: {selectedCard.limit}</Text>

        <Text style={commonStyles.sectionTitle}>All Months</Text>

        {renderHistoryCards()}

        <TouchableOpacity onPress={onBackPress}>
          <Text style={commonStyles.back}>← Back to Cards</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardDetailsView;
