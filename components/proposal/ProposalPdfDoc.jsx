"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
    color: "black",
  },
});

export default function ProposalPdfDoc({ proposalName, clientName }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Name: {proposalName}</Text>
        </View>
        <View style={styles.section}>
          <Text>Client: {clientName}</Text>
        </View>
      </Page>
    </Document>
  );
}
