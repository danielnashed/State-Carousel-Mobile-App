import React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default function App(){
    const [names, setNames] = useState([]); // state variable for items in scroll bar
    const [selectedItem, setSelectedItem] = useState(null); // state variable for which item (state) is selected

    // fetch data from response and put to component 
    useEffect(() => {
        fetch('http://localhost:3000/states')
        .then(response => response.json())
        .then(data => {
            setNames(data); // migrate data from backend response to component 
        })
        .catch(error => {
            console.error(error);
        });

    }, []);

    // create function to handle which button to make it look dark color
    const handlePress = (index) => {
        if (selectedItem === index){
            setSelectedItem(null); // unclick the item
        }
        else{
            setSelectedItem(index);
        }
    };

    // return parent component to render
    return(
        <View style = {styles.container}>
            <Text style={styles.title}> USA States</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                style={styles.scrollView}
            >
                {names.map((name, index)=> (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.scrollItem,
                            selectedItem === index && styles.selectedItem // only if item is clicked, then apply new style
                        ]}
                        onPress={() => handlePress(index)}
                    >
                        <Text style={styles.itemText}>{name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

// styling for components
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    title:{
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'Arial, sans-serif',
    },
    scrollView:{
        marginHorizontal: 20,
    },
    scrollItem:{
        width: 150,
        height:100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    selectedItem:{
        backgroundColor: '#989898',
    },
    itemText:{
        color: '#000',
        fontSize: 16,
        fontFamily: 'Arial, sans-serif',
    },
});

