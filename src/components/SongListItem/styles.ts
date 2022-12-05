import { StyleSheet } from "react-native";
import { COLOR, SCALE } from "src/styles";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		margin: 15,
	},
	rightContainer: {
		justifyContent: "center",
		marginLeft: 15,
	},
	image: {
		width: 75,
		height: 75,
	},
	title: {
		color: COLOR.WHITE,
		fontSize: SCALE.LG,
	},
	artist: {
		color: COLOR.GRAY[3],
		fontSize: SCALE.MD,
	},
});
