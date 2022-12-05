import React, { useEffect } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { State } from "src/reducers";
import { COLOR, SCALE } from "src/styles";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		bottom: 50,
		backgroundColor: COLOR.PRIMARY,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: SCALE.MD,
		borderBottomWidth: 1,
		borderBottomColor: COLOR.GRAY[3],
		zIndex: 5,
	},
	text: {
		color: "white",
		fontSize: 20,
	},
});

interface MiniPlayerProps {
	onPress: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ onPress }) => {
	const song = useSelector((state: State) => state.song.song);

	return (
		<TouchableWithoutFeedback {...{ onPress }}>
			<View style={styles.container}>
				<Feather name="heart" color="white" size={24} />
				<Text style={styles.text}>
					{song.artist}
					{" - "}
					{song.title}
				</Text>
				<Feather name="play-circle" color="white" size={24} />
			</View>
		</TouchableWithoutFeedback>
	);
};
export default MiniPlayer;
