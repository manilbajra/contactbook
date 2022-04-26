import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ContactList = (props) => {
  return (
    <View style={{...styles.tableRow, backgroundColor: props.index % 2 == 1 ? "#F0FBFC" : "white"}}>
      <Text style={{...styles.columnRowTxt, fontWeight:"bold"}}>{props.data.Name}</Text>
      <Text style={styles.columnRowTxt}>{props.data.Country}</Text>
      <Text style={styles.columnRowTxt}>{props.data.fph}</Text>
      <Text style={styles.columnRowTxt}>{props.data.Phone}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnRowTxt: {
    width:"25%",
    textAlign:"center",
  },
});
export default ContactList