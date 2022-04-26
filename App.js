import React, { useState} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity ,Modal,TouchableWithoutFeedback,Keyboard,Button} from 'react-native';
import _ from "lodash"
import ContactList from "./components/Contact/ContactList"
import AddContact from "./components/Contact/AddContact"
import FlatButton from './components/FlatButton';
export default function App() {
  const [ columns, setColumns ] = useState([
    "Name",
    "Country",
    "Favorite Phone Brand",
    "Phone",
  ])
  const [direction, setDirection] = useState(null)
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null)
  const addContactList = (contactDetail) => {
    contactDetail.key = Math.random().toString();
    setPets((currentContact) => {
      return [contactDetail, ...currentContact];
    });
    setFilteredDataSource((currentContact) => {
      return [contactDetail, ...currentContact];
    });
    setModalOpen(false);
  };
  const [ pets, setPets ] = useState([])
  const sortTable = (column) => {
    column ==="Favorite Phone Brand" ? column="fph": column
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(pets, [column],[newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setFilteredDataSource(sortedData)
  }
  const searchFilterFunction = (text) => {
    if (text) {
      const textData = text.toLowerCase();
      const itemsUpdate = pets.filter((item) => {
        var filterName =
          item.Country.toLowerCase().indexOf(textData) > -1;
        var filterFph =
          item.fph.toLowerCase().indexOf(textData) >
          -1;
        return filterName || filterFph 
      });
      setFilteredDataSource(itemsUpdate);
      setSearch(text);
      } else {
        setFilteredDataSource(pets);
        setSearch(text);
      }
  };
  const ContactHeader = () => (
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
  return (
    <View style={styles.container}>
      <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
      <FlatList 
        data={filteredDataSource}
        style={{width:"100%"}}
        keyExtractor={(item, index) => index+""}
        ListHeaderComponent={ContactHeader}
        stickyHeaderIndices={[0]}
        renderItem={({item, index})=> {
          return (
           <ContactList data={item} index={index} />
          )
        }}
      />
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
          <View style={styles.closeBtn}>
            <Button onPress={() => setModalOpen(false)} title='Close'/>
          </View>
            <AddContact addReview={addContactList} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.addContactBtn}>
        <FlatButton onPress={() => setModalOpen(true)}  text='Add a contact' />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    paddingTop:80
  },
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
  textInputStyle: {
    height: 40,
    width:"50%",
    borderWidth: 1,
    paddingLeft: 20,
    margin: 15,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
    alignSelf:"flex-end"
  },
  modalContent: {
    flex: 1,
    paddingTop:30,
  },
  addContactBtn: {
    position: 'absolute',
    bottom: 20,
    width: "60%",
    alignSelf:"center"
    
  },
  closeBtn: {
    marginTop: 10,
    alignSelf:"flex-end"
  },
  modalClose: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 15,
    borderColor: '#009688',
    backgroundColor: '#FFF',
    alignSelf:"flex-end"
  }
});