import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";



export default class AddEventList extends Component {

    backgroundColor = ["#FFBF00", "#9966CC", "#7FFFD4", "#007FFF", "#3D2B1F", "#964B00", "#C41E3A"];
    

    state = { 
        name: "", 
        color: this.backgroundColor[0],
        date: new Date('2019-12-12T14:42:42'),
        mode:'date',
        show:false
    }

    setDate =(event, date)=>{
        date=date||this.state
        this.setState({
            show: Platform.OS==='ios'?true:false,
            date,
        });
    }
    show= mode=>{
        this.setState({
            show:true,
            mode,
        })
    }
    datepicker=()=>{
        this.show('date');
    }
    timepicker=()=>{
        this.show('time');
    } 

    createEvent = () => {
        const { name, color } = this.state;

        const list = {name, color};

        this.props.addList(list);

        this.setState({name: ""});
        this.props.closeModal();
    }
    
    renderColors() { 
        return this.backgroundColor.map(color => { 
            return ( 
                <TouchableOpacity 
                    key={color} 
                    style={[styles.colorSelect, { backgroundColor: color}]} 
                    onPress={() =>  this.setState({color})} 
                    /> 
            ) 
        }) 
    }
    render() {
        const {show, date, mode}=this.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="height"> 
                <TouchableOpacity style={{ position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}> 
                    <AntDesign name="close" size={24} color="#000"/> 
                </TouchableOpacity> 
                <View style={{ alignSelf: "stretch", marginHorizontal: 32}}> 
                    <Text style={styles.title}>Create Event</Text> 
                    <View style={styles.EventContainer}>
                        <TextInput style={styles.input} placeholder="Event Name" onChangText={text => this.setState({ name: text })}/> 
                        <TouchableOpacity onPress={this.datepicker}> 
                            <AntDesign name="calendar" size={50} color="#000"/> 
                        </TouchableOpacity>
                        {
                            show && <DateTimePickerModal
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display='default'
                                onChange={this.setState}
                            />
                        }
                    </View>
                    <View style = {{flexDirection: "row", justifyContent: "space-between", marginTop: 12}}>
                            {this.renderColors()}
                    </View>
                    <TouchableOpacity style={[styles.create, {backgroundColor: this.state.color}]} onPress={this.createEvent}> 
                        <Text style={{color: "#000", fontWeight: "600"}}>Create</Text> 
                    </TouchableOpacity> 
                </View> 
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#000",
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#A7CBD9",
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    },
    EventContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    }
});
