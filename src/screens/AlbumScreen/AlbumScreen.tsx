import React, { useEffect } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";
import { Album } from "src/components/Album";
import { AlbumCategory } from "src/components/AlbumCategory";
import { COLOR } from "src/styles";
import { albumDetails } from "src/components/AlbumDetails/albumDetails";
import { albumCategory } from "src/components/AlbumDetails/albumCategories";
import { SongListItem } from "src/components/SongListItem";
import { AlbumHeader } from "src/components/AlbumHeader";
import Header from "src/components/Header";
import BottomTab from "src/components/PlayerWidget/BottomTab";

const AlbumScreen: React.FC<any> = ({ route }) => {
	useEffect(() => {
		console.log(route);
	}, []);
	return (
		<View style={styles.container}>
			<FlatList
				data={albumDetails.songs}
				keyExtractor={(item) => `key-${item.id}`}
				renderItem={({ item }) => <SongListItem song={item} />}
				ListHeaderComponent={() => (
					<>
						<AlbumHeader album={albumDetails} />
					</>
				)}
				ListFooterComponent={() => <View />}
				ListFooterComponentStyle={{
					flex: 1,
					height: 60,
					// backgroundColor: "red",
				}}
			/>
			<BottomTab />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLOR.BLACK,
	},
});

export default AlbumScreen;
