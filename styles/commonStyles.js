import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  // Container and Layout
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  containerNoPadding: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  detailsContainer: {
    padding: 16,
    paddingBottom: 40,
  },

  // Headers
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 24,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginTop: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 12,
    marginBottom: 0,
  },

  // Buttons and Navigation
  homeButton: {
    padding: 8,
    minWidth: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  homeIcon: {
    fontSize: 28,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  back: {
    marginTop: 20,
    color: "#2196F3",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ccc",
    flex: 1,
    alignItems: "center",
  },
  typeButtonActive: {
    borderColor: "#2196F3",
    backgroundColor: "#2196F3",
  },
  typeButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  typeButtonTextActive: {
    color: "#fff",
  },

  // Cards
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flex: 1,
    elevation: 3,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  viewButton: {
    backgroundColor: "#2196F3",
    width: 50,
    height: "100%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  viewIcon: {
    fontSize: 24,
  },

  // History and Month Cards
  historyCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  historyCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  historyMonth: {
    fontSize: 16,
    fontWeight: "600",
  },
  historyAmount: {
    fontSize: 14,
    color: "#555",
  },

  // Status Badge
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    minWidth: 80,
  },
  statusPaid: {
    backgroundColor: "#4CAF50",
  },
  statusNotPaid: {
    backgroundColor: "#f44336",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  // Labels and Text
  label: {
    fontSize: 16,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },

  // Input and Forms
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    // marginTop: 16,
    marginBottom: 16,
  },
  checkbox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
  },
  checkboxText: {
    color: "#000",
    fontWeight: "600",
  },

  // Card Details Modal
  cardDetailsBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  cardDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#2196F3",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
  },
});

export default commonStyles;
