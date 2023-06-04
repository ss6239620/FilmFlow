import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import COLORS from '../constants/Colors'
import FONTS from '../constants/Fonts'
import GenreCard from '../components/GenreCard'
import MovieCard from '../components/MovieCard'
import ItemSeperator from '../components/ItemSeperator';
import { useState, useEffect } from 'react';
import { getNowPlayingMovies, getUpcomingMovies, getAllGenres } from "../services/MovieService"

const HomeScreen = ({navigation}) => {
  const [activeGenre, setActiveGenre] = useState("All")
  const [nowPlayingMovies, setNowPlayingMovies] = useState({})
  const [upcomingMovies, setUpcomingMovies] = useState({})
  const [genres, setGenres] = useState([{ id: 11111111111111111, name: "All" }])

  useEffect(() => {
    getNowPlayingMovies().then(movieResponse => setNowPlayingMovies(movieResponse.data))
    getUpcomingMovies().then((movieResponse) => setUpcomingMovies(movieResponse.data))
    getAllGenres().then((genreResponse) => setGenres([...genres, ...genreResponse.data.genres]))
  }, [])

  return (
    <ScrollView styles={styles.container}>
      <StatusBar style="auto" translucent={false} backgroundColor={COLORS.BASIC_BACKGROUND}/>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Showing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
         data={genres} 
         horizontal
         keyExtractor={(item) => item.id.toString()}
         showsHorizontalScrollIndicator={false}
         ItemSeparatorComponent={() => <ItemSeperator width={15}/>}
         ListHeaderComponent={() => <ItemSeperator width={15}/>}
         ListFooterComponent={() => <ItemSeperator width={15}/>}
         renderItem={({item}) => (
            <GenreCard 
               genreName={item.name}
               active={item.name === activeGenre ? true : false}
               onPress={(genreName) => setActiveGenre(genreName)}
            />
         )}
        />
      </View>
      <View>
        <FlatList
         data={nowPlayingMovies.results} 
         horizontal
         keyExtractor={(item) => item.id.toString()}
         showsHorizontalScrollIndicator={false}
         ItemSeparatorComponent={() => <ItemSeperator width={20}/>}
         ListHeaderComponent={() => <ItemSeperator width={20}/>}
         ListFooterComponent={() => <ItemSeperator width={20}/>}
         renderItem={({item}) => (
            <MovieCard 
              title={item.title} 
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              onPress={() => navigation.navigate("movie", {movieId: item.id})}
            />
         )}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View>
        <FlatList
         data={upcomingMovies.results} 
         horizontal
         keyExtractor={(item) => item.id.toString()}
         showsHorizontalScrollIndicator={false}
         ItemSeparatorComponent={() => <ItemSeperator width={20}/>}
         ListHeaderComponent={() => <ItemSeperator width={20}/>}
         ListFooterComponent={() => <ItemSeperator width={20}/>}
         renderItem={({item}) => (
            <MovieCard 
              title={item.title} 
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              onPress={() => navigation.navigate("movie", {movieId: item.id})}
            />
         )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FONTS.REGULAR,
  },
  headerSubTitle: {
    fontSize: 13,
    color: COLORS.ACTIVE,
    fontFamily: FONTS.BOLD,
  },
  genreListContainer: {
    paddingVertical: 10,
  }
});

export default HomeScreen;
