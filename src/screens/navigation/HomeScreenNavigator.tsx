import React from "react";

import RootReducer from "src/reducers";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "src/styles";
import { AlbumScreen, BottomTabNavigator, HomeScreen } from "src/screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

const HomeScreenNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
				gestureEnabled: true,
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AlbumScreen"
				component={AlbumScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
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

export default HomeScreenNavigator;
