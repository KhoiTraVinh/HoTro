import React, {Component, useState} from 'react';
import {View, Text, TextInput, Dimensions, StyleSheet} from 'react-native';
import Todo from './todo'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Lichh from "./Calendar";


class App extends Component{
  render() {
    return (
      <View>
        <Todo/>
      </View>
    );
  }
}
export default App;