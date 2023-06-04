import { StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native'
import COLORS from '../constants/Colors'
import FONTS from "../constants/Fonts"

const {height, width} = Dimensions.get('screen')

const setWidth = (w) => (width / 100) * w;

const GenreCard = ({genreName, active, onPress}) => {
    return(
        <TouchableOpacity 
          style={{
            ...styles.genreContainer,
            backgroundColor: active ? COLORS.ACTIVE : COLORS.WHITE,
          }}
          activeOpacity={0.5}
          onPress={() => onPress(genreName)}
        >
            <Text style={{...styles.genreText, color: active ? COLORS.WHITE : COLORS.BLACK,}}>{genreName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    genreContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: COLORS.WHITE,
        paddingVertical: 8,
        elevation: 3,
        marginVertical: 2,
        //marginHorizontal: 2, //works
        width: setWidth(25),
    },
    genreText: {
      fontSize: 13,
      color: COLORS.ACTIVE,
      fontFamily: FONTS.BOLD,
    }
})

export default GenreCard