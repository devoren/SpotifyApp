import { AppRegistry, LogBox } from "react-native";

import App from "./src/App";
import { name as appName } from "app.json";
import TrackPlayer from "react-native-track-player";

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs([
	"Easing was renamed to EasingNode in Reanimated 2. Please use EasingNode instead",
]);
LogBox.ignoreLogs([
	"VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc.",
]);
LogBox.ignoreLogs([
	"[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() =>
	require("src/utils/TrackPlayerSerivce")
);
