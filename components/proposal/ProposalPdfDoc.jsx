"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  smallLogo: {
    width: 60,
    position: "absolute",
    top: 20,
    right: 20,
    marginBottom: 10,
  },
  bigLogoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  bigLogo: {
    width: 450,
    height: 450,
    marginBottom: 10,
    marginTop: 10,
  },
  projectName: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 5,
  },
  box: {
    flex: 1,
    display: "flex",
    padding: 10,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 4,
    alignItems: "center",
  },
  clientLogo: {
    width: 120,
    height: 80,
    objectFit: "contain",
    alignSelf: "center",
    marginBottom: 5,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  projectName: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 6,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    paddingVertical: 4,
  },
  columnHeader: {
    flex: 1,
    fontWeight: "bold",
  },
  column: {
    flex: 1,
  },
});

export default function ProposalPdfDoc({ proposal, products }) {
  const logobase64 =
    "data:image/png;base64,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";

  console.log("this is proposal", proposal);
  return (
    // <Document>
    //   <Page size="A4" style={styles.page}>
    //     <View style={styles.section}>
    //       <Text>Name: {proposal?.project_name}</Text>
    //     </View>
    //     <View style={styles.section}>
    //       <Text>Client: {proposal?.client_name}</Text>
    //     </View>
    //   </Page>
    // </Document>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Small logo */}
        <Image style={styles.smallLogo} src={logobase64} />

        {/* Big project logo */}
        <View style={styles.bigLogoContainer}>
          <Image style={styles.bigLogo} src={proposal?.project_logo} />
        </View>

        {/* Project Name */}
        <Text style={styles.projectName}>{proposal?.project_name}</Text>

        {/* Row with 3 items */}
        <View style={styles.rowContainer}>
          {/* Client Logo */}
          <View style={styles.box}>
            <Image src={proposal?.client_logo} style={styles.clientLogo} />
          </View>

          {/* User Info */}
          <View style={styles.box}>
            <Text style={styles.label}>User Info</Text>
            <Text style={styles.text}>Name: Sherif</Text>
            <Text style={styles.text}>Email: Sherif@hotmail.com</Text>
            <Text style={styles.text}>Phone: 123456789</Text>
          </View>

          {/* Client Info */}
          <View style={styles.box}>
            <Text style={styles.label}>Client Info</Text>
            <Text style={styles.text}>Company: client name</Text>
            <Text style={styles.text}>Contact: client contact</Text>
            <Text style={styles.text}>Phone: client phone</Text>
          </View>
        </View>

        {/* Product Table */}
        <View>
          {/* Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>{proposal?.client_name}</Text>
            <Text style={styles.columnHeader}>Price</Text>
            <Text style={styles.columnHeader}>SKU</Text>
          </View>

          {/* Rows */}
          {products.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.column}>{product.localized_name}</Text>
              <Text style={styles.column}>{product.price}</Text>
              <Text style={styles.column}>{product.sku}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
