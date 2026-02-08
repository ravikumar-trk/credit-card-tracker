import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import StatusBadge from "./StatusBadge";
import commonStyles from "../styles/commonStyles";
import { getCardBankImage } from "../utils/imageUtils";

const CardListView = ({
  defaultCards,
  payments,
  getCurrentMonthKey,
  getCurrentMonthName,
  onCardPress,
  onViewPress,
  onEditPress,
  onDeletePress,
  onAddCardPress,
  onHomePress,
}) => {
  return (
    <SafeAreaView style={commonStyles.containerNoPadding}>
      <View style={commonStyles.pageHeader}>
        <TouchableOpacity onPress={onHomePress}>
          <Text style={commonStyles.homeIcon}>🏠</Text>
        </TouchableOpacity>
        <Text style={commonStyles.pageHeaderTitle}>My Credit Cards</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#4CAF50",
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
          }}
          onPress={onAddCardPress}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      {defaultCards.length === 0 ? (
        <View style={commonStyles.emptyState}>
          <Text style={commonStyles.emptyStateText}>No cards added yet</Text>
          <TouchableOpacity onPress={onAddCardPress}>
            <Text style={commonStyles.emptyStateBtn}>Add your first card</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={defaultCards}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          renderItem={({ item }) => {
            const monthKey = getCurrentMonthKey();
            const record = payments?.[item.id]?.[monthKey];
            const isPaid = record?.paid ?? false;

            return (
              <View style={commonStyles.cardContainer}>
                <TouchableOpacity
                  style={commonStyles.card}
                  onPress={() => onCardPress(item)}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <View>
                        {item.bank && getCardBankImage(item.bank) ? (
                          <Image
                            source={getCardBankImage(item.bank)}
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 4,
                            }}
                          />
                        ) : null}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={[
                            commonStyles.cardTitle,
                            { fontSize: 18, marginBottom: 4 },
                          ]}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            commonStyles.cardNumber,
                            { fontSize: 14, marginBottom: 6 },
                          ]}
                        >
                          {item.fullNumber}
                        </Text>
                        {/* <Text>Expires: {item.expiryDate}</Text> */}
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text>Status ({getCurrentMonthName()}):</Text>
                          <StatusBadge paid={isPaid} />
                        </View>
                        {/* {record?.amount && (
                          <Text>Amount: ₹{record.amount}</Text>
                        )} */}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        gap: 12,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text
                        style={commonStyles.viewIcon}
                        onPress={() => onViewPress(item)}
                      >
                        👁️
                      </Text>
                      <Text
                        style={commonStyles.viewIcon}
                        onPress={() => onEditPress(item)}
                      >
                        ✏️
                      </Text>
                      <Text
                        style={commonStyles.viewIcon}
                        onPress={() => onDeletePress(item)}
                      >
                        🗑️
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default CardListView;
