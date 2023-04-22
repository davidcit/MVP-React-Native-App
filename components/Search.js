import React from "react";
import { StyleSheet,Button, TextInput, View } from "react-native";
class Search extends React.Component{
    render(){
        return(
            <View style={styles.viewStyle}>
                <TextInput style={styles.inputText} value="Search bar"/>
                <Button color="#772F1A" title="Rechercher" onPress={ () => {}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputText: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        borderWidth: 2, 
        borderColor: '#772F1A'
        // borderRadius: '5px',
    },
    buttonStyle: {
        color: '#772F1A'
    },
    viewStyle: {
        marginTop: 40,
    }
})
//   });
  
export default Search;