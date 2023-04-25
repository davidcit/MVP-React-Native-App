import React from "react";
import { StyleSheet,Button, TextInput, View, FlatList,Text } from "react-native";
import films from "../helpers/filmData";
import getFilmsFromApiWithSearchedText  from "../API/TMDBApi";
import FilmItem from "./FilmItem";
class Search extends React.Component{
    /* Privat function ("_") */
    constructor(props){
        super(props)
        this._films = [];
        this.state = { 
            films: [],
            searchedText: '',
        }
    }
    _loadFilms() {
        console.log(this.state.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
        if (this.state.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
          getFilmsFromApiWithSearchedText(this.state.searchedText).then(data => {
              this.setState({ films: data.results })
          })
        }else{
            alert('Merci d\'inscrire un nom de film');
        }
    }
    _searchTextInputChanged(text) {
        this.setState({ searchedText: text })
    }
    render(){
        return(
            <View style={styles.viewStyle}>
                <TextInput style={styles.inputText} placeholder="Votre recherche" onChangeText={(text) => this._searchTextInputChanged(text)}/>
                <Button color="#772F1A" title="Rechercher" onPress={ () => this._loadFilms() }/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
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