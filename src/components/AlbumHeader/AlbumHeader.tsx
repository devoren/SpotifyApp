import React from "react";

import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { COLOR } from "src/styles";
import { Album } from "../Album";
import Header from "../Header";
import { styles } from "./styles";

export type AlbumHeaderProps = {
	album: {
		id: number;
		name: string;
		by: string;
		numberOfLikes: number;
		imageUri: string;
		artistsHeadline: string;
	};
};

const AlbumHeader: React.FC<AlbumHeaderProps> = (props) => {
	return (
		<>
			<Header />
			<View style={styles.container}>
				<Image source={{ uri: props.album.imageUri }} style={styles.image} />
				<Text style={styles.name}>{props.album.name}</Text>
				<View style={styles.creatorContainer}>
					<Text style={styles.creator}>By {props.album.by}</Text>
					<Text style={styles.likes}>{props.album.numberOfLikes} Likes</Text>
				</View>
				<TouchableOpacity>
					<View style={styles.button}>
						<Text style={styles.buttonText}>PLAY</Text>
					</View>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default AlbumHeader;
