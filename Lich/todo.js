import React, { useState, Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, Modal, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import EventList from './components/EventList';
import AddEventList from './components/AddEventList'
import Fire from './FireBase';

export default class todo extends Component {


  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if(error) {
        return alert("Loi roi");
      }

      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      })
      this.setState({ user });
    });
  }

  componentWillUnmount(){
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = list => {
    return <EventList list={list} updateList={this.updateList}/>
  }

  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: []
    })
  };

  updateList = list => {
    firebase.updateList(list);
  }
  render() {
    if(this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#A7CBD9"/>
        </View>
      )
    }
    return (
      <View style = {styles.container}>
        <Modal animationType="slide" visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
          <AddEventList closeModal={() => this.toggleAddTodoModal()} addList={this.addList}/>
        </Modal>
        <View style={{flexDirection: "row"}}>
          <View style={styles.divider}/>
          <Text style={styles.title}>
            Event <Text style={{ fontWeight: "300", color: "#FFD700"}}>Lists</Text>
          </Text>
          <View style={styles.divider}/>
        </View>

        <View style = {{ marginVertical: 48 }}>
          <TouchableOpacity style = {styles.addList} onPress={() => this.toggleAddTodoModal()}>
              <AntDesign name="plus" size={16} color="#CCFF00"/>
          </TouchableOpacity>

          <Text style={styles.add}>Add list</Text>
        </View>

        <View style= {{height: 275, paddingLeft: 32}}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showhorizontalScrollIndicator={false}
            renderItem = {({item}) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  divider: {
    backgroundColor: "#A7CBD9",
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#000",
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: "#CCFF00",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    color: "#A7CBD9",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8
  }
})
