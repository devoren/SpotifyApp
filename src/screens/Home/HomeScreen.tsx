import React from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";
import { Album } from "src/components/Album";
import { AlbumCategory } from "src/components/AlbumCategory";
import { COLOR } from "src/styles";
import * as albumDetails from "src/components/AlbumDetails/albumDetails";
import { albumCategory } from "src/components/AlbumDetails/albumCategories";
import BottomTab from "src/components/PlayerWidget/BottomTab";
import BottomTabSecond from "src/components/PlayerWidget/BottomTabSecond";

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={albumCategory}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<AlbumCategory title={item.title} albums={item.albums} />
				)}
			/>
			<BottomTab />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLOR.BLACK,
	},
});

export default HomeScreen;
