import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { COLOR } from "src/styles";
import { styles } from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { State } from "src/reducers";

export type SongListItemProps = {
	song: {
		id: number;
		imageUri: string;
		title: string;
		artist: string;
		album?: string;
		genre?: string;
		date?: string; // RFC 3339
		songUri?: string;
		duration: number; // Duration in seconds
	};
};

const SongListItem: React.FC<SongListItemProps> = (props) => {
	const [selected, setSelected] = useState<number>();
	const song = useSelector((state: State) => state.song.song);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					setSelected(song.id);
					console.log(selected);
				}}
				style={{
					flexDirection: "row",
					backgroundColor:
						song.id === props.song.id ? COLOR.GRAY[2] : undefined,
					paddingVertical: 10,
					paddingLeft: 10,
				}}
			>
				<Image source={{ uri: props.song.imageUri }} style={styles.image} />
				<View style={{ flexDirection: "row", width: 300 }}>
					<View style={styles.rightContainer}>
						<Text style={styles.title}>{props.song.title}</Text>
						<Text style={styles.artist}>{props.song.artist}</Text>
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					position: "absolute",
					right: 5,
					top: 25,
				}}
			>
				<MaterialCommunityIcons
					name={"dots-horizontal"}
					size={24}
					color={COLOR.GRAY[3]}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SongListItem;
