import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ContactHeader = (sortTable) => {
  const [ columns, setColumns ] = useState([
    "Name",
    "Country",
    "Favorite Phone Brand",
    "Phone",
  ])
  
  return (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity 
                key={index}
                style={styles.columnHeader} 
                onPress={()=> sortTable(column)}>
                <Text style={styles.columnHeaderTxt}>{column + " "} 
                  { selectedColumn === column && <Text>{direction === "desc" ? "Down ":" Up"} 
                    </Text>
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
    width: "25%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"25%",
    textAlign:"center",
  },
});
export default ContactHeader