import { useNavigation } from "@react-navigation/native";
import React from "react";

import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { COLOR, SCALE } from "src/styles";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

const Header = () => {
	const navigation = useNavigation() as any;

	return (
		<View
			style={{
				flex: 1,
				flexDirection: "row",
				justifyContent: "space-between",
				height: 60,
				alignItems: "center",
				paddingHorizontal: SCALE.MD,
				paddingTop: SCALE.MD,
			}}
		>
			<TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
				<AntDesign name={"arrowleft"} size={24} color={COLOR.WHITE} />
			</TouchableOpacity>
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<TouchableOpacity style={{ marginRight: 20 }}>
					<AntDesign name={"hearto"} size={24} color={COLOR.WHITE} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Entypo name={"dots-three-vertical"} size={24} color={COLOR.WHITE} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
