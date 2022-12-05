import React from "react";

import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { COLOR } from "src/styles";
import { Album } from "../Album";
import { styles } from "./styles";

export type AlbumCategoryProps = {
	title: string;
	albums: [
		{
			id: string;
			imageUri: string;
			artistsHeadline: string;
		}
	];
};

const AlbumCategory: React.FC<AlbumCategoryProps> = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{props.title}</Text>
			<FlatList
				data={props.albums}
				horizontal
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => <Album album={item} />}
			/>
		</View>
	);
};

export default AlbumCategory;
