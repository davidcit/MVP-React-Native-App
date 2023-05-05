import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import films from "../helpers/filmData";
import getFilmsFromApiWithSearchedText from "../API/TMDBApi";
import FilmItem from "./FilmItem";
class Search extends React.Component {
  /* Privat function ("_") */
  constructor(props) {
    super(props);
    this._films = [];
    this.page = 0;
    this.totalPage = 0;

    this.state = {
      films: [],
      searchedText: "",
      isLoad: false,
    };
  }
  _displayLoading() {
    if (this.state.isLoad == true) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
  _loadFilms() {
    //console.log(this.state.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
    this.setState({ isLoad: true });
    if (this.state.searchedText.length > 0) {
      // Seulement si le texte recherché n'est pas vide

      getFilmsFromApiWithSearchedText(
        this.state.searchedText,
        this.page + 1
      ).then((data) => {
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({
          // films: this.state.films.concat(data.results) SAME THING
          films: [...this.state.films, ...data.results], // ES6 SYNTAX
          isLoad: false,
        });
      });
    } else {
      alert("Merci d'inscrire un nom de film");
    }
  }
  _searchTextInputChanged(text) {
    this.setState({ searchedText: text });
  }
  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        console.log(
          "Page : " +
            this.page +
            " / TotalPages : " +
            this.totalPages +
            " / Nombre de films : " +
            this.state.films.length
        );
        this._loadFilms();
      }
    );
  }
  _detailFilmClick = (idFilm) => {
    // console.log("Display film with id " + idFilm)
  }
  render() {

    return (
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.inputText}
          placeholder="Votre recherche"
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={(text) => this._searchTextInputChanged(text)}
        />
        <Button
          color="#772F1A"
          title="Rechercher"
          onPress={() => this._loadFilms()}
        />
        <FlatList
          
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={1}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms();
            }
          }}
          renderItem={({ item }) => <FilmItem film={item} displayDetailFilm={this._detailFilmClick} navigationObject={this.props.navigation}/>}
        />
        {this._displayLoading()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputText: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#772F1A",
    // borderRadius: '5px',
  },
  buttonStyle: {
    color: "#772F1A",
  },
  viewStyle: {
    // marginTop: 40,
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
//   });

export default Search;
