// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
import {getImageFromApi} from '../API/TMDBApi';
import { TouchableOpacity } from 'react-native-gesture-handler';
class FilmItem extends React.Component {
    render() {
        // const film = this.props.film
        const { film, displayDetailFilm,navigationObject} = this.props;  
        return (
          <TouchableOpacity style={styles.main_container} onPress={() => displayDetailFilm(film.id)} >
            <Image
              style={styles.image}
              source={{uri: getImageFromApi(film.poster_path)}}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.title_text}>{film.title}</Text>
                <Text style={styles.vote_text}>{film.vote_average}</Text>
              </View>
              <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
              </View>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
                <Button style={styles.date_button} 
                  title="Voir les infos" 
                  onPress={() => 
                  { navigationObject.navigate('FilmDetail',{
                    filmId: film.id,
                    titleFilm: film.title
                    })
                  } }
                />
              </View>
            </View>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 3
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  date_button: {
    fontSize: 14,
    height:30
  }
})

export default FilmItem