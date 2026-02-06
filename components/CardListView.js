import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import StatusBadge from "./StatusBadge";
import commonStyles from "../styles/commonStyles";

const CardListView = ({
  staticCards,
  payments,
  getCurrentMonthKey,
  getCurrentMonthName,
  onCardPress,
  onViewPress,
  onAddCardPress,
}) => {
  console.log(staticCards);
  return (
    <SafeAreaView style={commonStyles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          marginTop: 16,
        }}
      >
        <Text style={commonStyles.header}>My Credit Cards</Text>
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
      <FlatList
        data={staticCards}
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
                  }}
                >
                  <Text style={commonStyles.cardTitle}>{item.name}</Text>
                  <Text
                    style={commonStyles.viewIcon}
                    onPress={() => onViewPress(item)}
                  >
                    👁️
                  </Text>
                </View>
                <Text>{item.number}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Status ({getCurrentMonthName()}):</Text>
                  <StatusBadge paid={isPaid} />
                </View>
                {record?.amount && <Text>Amount: ₹{record.amount}</Text>}
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={commonStyles.viewButton}
                onPress={() => onViewPress(item)}
              >
                
              </TouchableOpacity> */}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CardListView;
