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

  // Headers - Unified Styling
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  pageHeaderTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  // Legacy aliases for backward compatibility
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },

  // Buttons and Navigation
  homeButton: {
    // padding: 8,
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
    marginTop: 12,
    gap: 10,
    paddingHorizontal: 16,
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

  // Home Card
  homeCard: {
    backgroundColor: "#4CAF50",
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: "100%",
  },
  homeCardIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  homeCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },
  homeCardSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 20,
  },

  // Header Title for list views
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
    textAlign: "center",
  },

  // Transaction Form Styles
  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 30,
    margin: 12,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  textArea: {
    textAlignVertical: "top",
    paddingTop: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#999",
    marginLeft: 10,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: "60%",
    width: "80%",
    overflow: "hidden",
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
  errorInput: {
    borderColor: "#F44336",
  },
  errorText: {
    color: "#F44336",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  // TransactionsListView Styles
  addBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  filterSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  filterColumn: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    marginBottom: 6,
  },
  filterDropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  filterDropdownText: {
    fontSize: 13,
    color: "#333",
    flex: 1,
  },
  filterDropdownArrow: {
    fontSize: 10,
    color: "#999",
    marginLeft: 6,
  },
  clearBtn: {
    color: "#2196F3",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  transactionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  amountAndStatus: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  transactionDetails: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  transactionActions: {
    flexDirection: "row",
    gap: 8,
  },
  editBtn: {
    flex: 1,
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  editBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#F44336",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 15,
  },
  emptyStateBtn: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default commonStyles;
