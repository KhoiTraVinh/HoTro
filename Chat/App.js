import React, {Component, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';




const bot={
  _id : 2,
  _name : 'Khoi',
  _avatar : 'https://placeimg.com/140/140/any',
}


class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      messages : [{_id: 1, text: 'Hi', createdAt: new Date(), user: bot}],
      id : 1,
      name: '',
    };
  }

  async componentDidMount() {
    try {
      await fetch('http://192.168.1.4:8163/api/bot', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_input: 'Hi'
        })
      });
    } catch(error) { console.log(error) }
  }

  sendBotResponse(text){
    let msg = {
      _id: this.state.messages.length + 1, text, createdAt: new Date(), user: bot,
    }
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, [msg]),
    }))
  }

  onSend(messages = []){
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, messages)
    }))
    let message = messages[0].text;
    fetch('http://localhost:3000/api/bot', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'user_input': `${message}`
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({text: JSON.stringify(responseJson)})
      })
  }

  onQuickReply(quickReply){
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, quickReply),
    }))
    let message = quickReply[0].value;
  }


  render() {
    return (
      <View style = {{flex: 1, backgroundColor  : '#fff'}}>
        <GiftedChat 
        messages = {this.state.messages}
        onSend = {(message) => this.onSend(message)}
        onQuickReply = {(quickReply) => this.onQuickReply(quickReply)}
        user={{_id : 1}}/>
      </View>
    );
  }
}
export default App;