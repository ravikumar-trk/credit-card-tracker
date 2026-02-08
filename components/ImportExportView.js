import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import commonStyles from "../styles/commonStyles";
import { exportAllData, importAllData } from "../utils/storageUtils";
import { getFormattedTimestamp } from "../utils/dateUtils";

const ImportExportView = ({ onBackPress, onDataImported }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportedFileName, setExportedFileName] = useState("");

  const handleExportFile = async () => {
    setIsExporting(true);
    try {
      const data = await exportAllData();
      if (!data) {
        Alert.alert("Error", "Failed to export data");
        setIsExporting(false);
        return;
      }

      // Create filename with timestamp
      const timestamp = getFormattedTimestamp();
      const fileName = `credit-card-backup-${timestamp}.json`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;

      // Write file to device storage
      await FileSystem.writeAsStringAsync(filePath, data, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      setExportedFileName(fileName);

      // Share the file
      await Sharing.shareAsync(filePath, {
        mimeType: "application/json",
        dialogTitle: "Export Credit Card Backup",
        UTI: "public.json",
      });

      Alert.alert("Success", `Data exported to ${fileName}`);
    } catch (error) {
      Alert.alert("Error", "Failed to export file: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportFile = async () => {
    setIsImporting(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setIsImporting(false);
        return;
      }

      const fileUri = result.assets[0].uri;

      // Read file content
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Parse and validate JSON
      const parsedData = JSON.parse(fileContent);
      if (!parsedData.data) {
        Alert.alert("Error", "Invalid backup file format");
        setIsImporting(false);
        return;
      }

      // Show confirmation dialog
      Alert.alert(
        "Confirm Import",
        "This will overwrite all your current data. Continue?",
        [
          {
            text: "Cancel",
            onPress: () => setIsImporting(false),
          },
          {
            text: "Import",
            onPress: async () => {
              const success = await importAllData(fileContent);
              if (success) {
                Alert.alert(
                  "Success",
                  "Data imported successfully! Refreshing...",
                );
                setTimeout(() => {
                  onDataImported();
                  setIsImporting(false);
                }, 500);
              } else {
                Alert.alert("Error", "Failed to import data");
                setIsImporting(false);
              }
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to import file: " + error.message);
      setIsImporting(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.containerNoPadding}>
      <View style={commonStyles.pageHeader}>
        <View style={{ width: 24 }} />
        <Text style={commonStyles.pageHeaderTitle} numberOfLines={1}>
          Import/Export Data
        </Text>
        <TouchableOpacity style={commonStyles.homeButton} onPress={onBackPress}>
          <Text style={commonStyles.homeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={commonStyles.detailsContainer}>
        {/* Export Section */}
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
            elevation: 2,
          }}
        >
          <Text style={commonStyles.sectionTitle}>📤 Export Backup</Text>
          <Text
            style={{
              color: "#666",
              marginBottom: 16,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Export all your credit cards, payments, and transactions data as a
            JSON backup file to your device. You can save it to cloud storage,
            email it, or store it in a safe location.
          </Text>

          <TouchableOpacity
            style={commonStyles.saveBtn}
            onPress={handleExportFile}
            disabled={isExporting}
          >
            {isExporting ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ActivityIndicator size="small" color="#fff" />
                <Text style={commonStyles.saveBtnText}>Exporting...</Text>
              </View>
            ) : (
              <Text style={commonStyles.saveBtnText}>
                📥 Export Data to File
              </Text>
            )}
          </TouchableOpacity>

          {exportedFileName && (
            <View
              style={{
                marginTop: 12,
                padding: 12,
                backgroundColor: "#e8f5e9",
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: "#4CAF50",
              }}
            >
              <Text
                style={{ color: "#2e7d32", fontWeight: "500", fontSize: 13 }}
              >
                ✓ Last export: {exportedFileName}
              </Text>
            </View>
          )}
        </View>

        {/* Import Section */}
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
            elevation: 2,
          }}
        >
          <Text style={commonStyles.sectionTitle}>📥 Import Backup</Text>
          <Text
            style={{
              color: "#666",
              marginBottom: 16,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Select a previously exported JSON backup file to restore all your
            credit cards, payments, and transactions. This will replace all your
            current data.
          </Text>

          <TouchableOpacity
            style={commonStyles.saveBtn}
            onPress={handleImportFile}
            disabled={isImporting}
          >
            {isImporting ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ActivityIndicator size="small" color="#fff" />
                <Text style={commonStyles.saveBtnText}>Importing...</Text>
              </View>
            ) : (
              <Text style={commonStyles.saveBtnText}>
                📤 Select File to Import
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Data Contents Info */}
        <View
          style={{
            backgroundColor: "#e3f2fd",
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: "#2196f3",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: "#1565c0",
              marginBottom: 8,
            }}
          >
            ℹ️ Backup File Contents
          </Text>
          <Text style={{ color: "#555", fontSize: 13, lineHeight: 20 }}>
            Each backup includes:{"\n"}•{" "}
            <Text style={{ fontWeight: "500" }}>All credit cards</Text> -
            numbers, CVV, limits, expiry dates{"\n"}•{" "}
            <Text style={{ fontWeight: "500" }}>Payment records</Text> - monthly
            status and amounts{"\n"}•{" "}
            <Text style={{ fontWeight: "500" }}>All transactions</Text> -
            descriptions, amounts, dates{"\n"}•{" "}
            <Text style={{ fontWeight: "500" }}>Backup metadata</Text> - date
            and version
          </Text>
        </View>

        {/* Important Safety Notes */}
        <View
          style={{
            backgroundColor: "#fff3e0",
            padding: 16,
            borderRadius: 12,
            borderLeftWidth: 4,
            borderLeftColor: "#ff9800",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: "#ff9800",
              marginBottom: 8,
            }}
          >
            ⚠️ Important Safety Notes
          </Text>
          <Text style={{ color: "#555", fontSize: 13, lineHeight: 20 }}>
            • Backup files contain{" "}
            <Text style={{ fontWeight: "600", color: "#c41c3b" }}>
              sensitive information
            </Text>
            {"\n"}• Store backups in a{" "}
            <Text style={{ fontWeight: "500" }}>secure location</Text>
            {"\n"}• Keep multiple backups for safety{"\n"}• Importing will{" "}
            <Text style={{ fontWeight: "600" }}>
              overwrite all current data
            </Text>
            {"\n"}• Always backup before importing new data
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImportExportView;
