import { StyleSheet } from "react-native";
import { COLOR, FONT, SCALE } from "src/styles";

export const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	image: {
		width: "100%",
		height: 200,
	},
	title: {
		color: COLOR.WHITE,
		fontSize: SCALE.XX,
		...FONT.BOLD,
		margin: 10,
	},
});
