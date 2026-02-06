import { View, Text } from "react-native";
import commonStyles from "../styles/commonStyles";

const StatusBadge = ({ paid }) => (
  <View
    style={[
      commonStyles.statusBadge,
      paid ? commonStyles.statusPaid : commonStyles.statusNotPaid,
    ]}
  >
    <Text style={commonStyles.statusText}>{paid ? "Paid" : "Not Paid"}</Text>
  </View>
);

export default StatusBadge;
