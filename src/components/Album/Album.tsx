import { useNavigation } from "@react-navigation/native";
import React from "react";

import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { COLOR } from "src/styles";
import { styles } from "./styles";

export type AlbumProps = {
	album: {
		id: string;
		imageUri: string;
		artistsHeadline: string;
	};
};

const Album: React.FC<AlbumProps> = (props) => {
	const navigation = useNavigation() as any;

	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate("AlbumScreen", { id: props.album.id })}
		>
			<View style={styles.container}>
				<Image source={{ uri: props.album.imageUri }} style={styles.image} />
				<Text style={styles.text}>{props.album.artistsHeadline}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Album;
