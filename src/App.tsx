import React from "react";

import RootReducer from "src/reducers";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "src/styles";
import { AlbumScreen, BottomTabNavigator } from "src/screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

const App = () => {
	const Stack = createStackNavigator();

	return (
		<Provider store={RootReducer}>
			<NavigationContainer
				theme={{
					dark: true,
					colors: {
						...DefaultTheme.colors,
						background: COLOR.BLACK,
						card: COLOR.BLACK,
					},
				}}
			>
				<Stack.Navigator
					screenOptions={{
						gestureEnabled: true,
						...TransitionPresets.SlideFromRightIOS,
					}}
				>
					<Stack.Screen
						name="BottomTabNavigator"
						component={BottomTabNavigator}
						options={{
							headerShown: false,
						}}
					/>
					{/* <Stack.Screen
						name="AlbumScreen"
						component={AlbumScreen}
						options={{
							headerShown: false,
						}}
					/> */}
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
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

export default App;
