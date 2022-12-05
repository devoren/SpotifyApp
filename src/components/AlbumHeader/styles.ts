import { StyleSheet } from "react-native";
import { COLOR, FONT, SCALE } from "src/styles";

export const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: 20,
	},
	image: {
		width: 200,
		height: 200,
		margin: 15,
	},
	name: {
		color: COLOR.WHITE,
		fontSize: SCALE.XX,
		...FONT.BOLD,
	},
	creatorContainer: {
		flexDirection: "row",
		margin: 5,
	},
	creator: {
		color: COLOR.GRAY[3],
		margin: 5,
		fontSize: SCALE.MD,
	},
	likes: {
		color: COLOR.GRAY[3],
		margin: 5,
		fontSize: SCALE.MD,
	},
	button: {
		backgroundColor: "#1CD05D",
		justifyContent: "center",
		alignItems: "center",
		height: 50,
		width: 125,
		borderRadius: 50,
	},
	buttonText: {
		color: COLOR.WHITE,
		fontSize: SCALE.MD,
		...FONT.BOLD,
	},
});
