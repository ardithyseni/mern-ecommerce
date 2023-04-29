import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell,
} from "@david.kucsai/react-pdf-table";
import { formatDateTime } from "../../utils/dateFormatter";

const Invoice = ({ order }) => {
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    {formatDateTime(order.createdAt)}
                </Text>
                <Text style={styles.title}>Order Invoice</Text>
                <Text style={styles.author}>E-Shop</Text>
                <Text style={styles.subtitle}>Order Summary</Text>

                <Table>
                    <TableHeader>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Color</TableCell>
                    </TableHeader>
                </Table>

                <Table data={order.products}>
                    <TableBody>
                        <DataTableCell getContent={(p) => p.product.title} />
                        <DataTableCell getContent={(p) => `$${p.product.price}`} />
                        <DataTableCell getContent={(p) => p.count} />
                        <DataTableCell getContent={(p) => p.product.brand} />
                        <DataTableCell getContent={(p) => p.product.color} />
                    </TableBody>
                </Table>

                <Text style={styles.text}>
                    <Text>
                        Order ID: {"         "}
                        {order.paymentIntent.id}
                    </Text>
                    {"\n"}
                    <Text>
                        Total Paid: {"       "}
                        {(order.paymentIntent.amount).toLocaleString("en-DE", { style: "currency", currency: "EUR" })}
                    </Text>
                </Text>

                <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
            </Page>
        </Document>

    );
};

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    cell: {
        padding: 1
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    footer: {
        padding: "100px",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});


export default Invoice;
