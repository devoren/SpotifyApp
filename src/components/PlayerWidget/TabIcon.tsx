import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	label: {
		color: "white",
		fontSize: 12,
		marginTop: 4,
		textAlign: "center",
	},
});

interface TabIconProps {
	onPress?: () => void;
	name: string;
	label: string;
}

const TabIcon = ({ name, onPress, label }: TabIconProps) => {
	return (
		<RectButton {...{ onPress }} style={styles.container}>
			<Feather {...{ name }} size={24} color="white" />
			<Text style={styles.label}>{label}</Text>
		</RectButton>
	);
};

export default TabIcon;
