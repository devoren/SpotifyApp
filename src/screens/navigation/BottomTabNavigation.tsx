import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Foundation from "react-native-vector-icons/Foundation";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "src/styles";
import { AlbumScreen, HomeScreen } from "../index";
import BottomTab from "src/components/PlayerWidget/BottomTab";
import HomeScreenNavigator from "./HomeScreenNavigator";
import Player from "src/components/PlayerWidget/Player";

const BottomTabNav = createBottomTabNavigator();

const BottomTabNavigator = () => {
	return (
		<BottomTabNav.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarStyle: {
					backgroundColor: COLOR.PRIMARY,
					borderTopWidth: 0,
					height: 50,
					zIndex: 0,
					// display: "none",
				},
				unmountOnBlur: true,
				// tabBarShowLabel: false,
				tabBarLabelStyle: {
					bottom: 3,
				},
				tabBarActiveTintColor: COLOR.WHITE,
				tabBarInactiveTintColor: COLOR.GRAY[3],
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					size = 30;
					color = focused ? COLOR.WHITE : COLOR.GRAY[3];
					if (route.name === "Home") {
						iconName = "home";
						return <Foundation name={iconName} size={size} color={color} />;
					} else if (route.name === "Search") {
						iconName = "search";
						return <EvilIcons name={iconName} size={size} color={color} />;
					} else if (route.name === "Your Library") {
						iconName = "my-library-music";
						return <MaterialIcons name={iconName} size={size} color={color} />;
					} else {
						iconName = "spotify";
						return <Fontisto name={iconName} size={size} color={color} />;
					}
				},
			})}
		>
			<BottomTabNav.Screen name="Home" component={HomeScreenNavigator} />
			<BottomTabNav.Screen name="Search" component={Player} />
			<BottomTabNav.Screen name="Your Library" component={AlbumScreen} />
			<BottomTabNav.Screen name="Premium" component={HomeScreenNavigator} />
		</BottomTabNav.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLOR.WHITE,
	},
});

export default BottomTabNavigator;
