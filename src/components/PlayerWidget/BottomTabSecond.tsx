import React, { useRef } from "react";
import {
	Dimensions,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { clamp, onGestureEvent, timing, withSpring } from "react-native-redash";
import Player from "./Player";
import MiniPlayer from "./MiniPlayer";
import { COLOR, WINDOW } from "src/styles";
import SlidingUpPanel from "rn-sliding-up-panel";

const { height } = Dimensions.get("window");
const TABBAR_HEIGHT = 50;
const MINIMIZED_PLAYER_HEIGHT = 50;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;
const config = {
	damping: 25,
	mass: 0.1,
	stiffness: 200,
	overshootClamping: false,
	restSpeedThreshold: 0.1,
	restDisplacementThreshold: 0.1,
};
const {
	Clock,
	Value,
	cond,
	useCode,
	set,
	block,
	not,
	clockRunning,
	interpolateNode,
	diffClamp,
	Extrapolate,
} = Animated;

const styles = StyleSheet.create({
	playerSheet: {
		...StyleSheet.absoluteFillObject,
	},
	container: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
	},
});

const BottomTabSecond: React.FC<any> = ({ containerStyle }) => {
	const translationY = new Value(0) as any;
	let _panel = useRef(null) as any;
	const velocityY = new Value(0);
	const state = new Value(State.UNDETERMINED);
	const offset = new Value(SNAP_BOTTOM);
	const translateY = withSpring({
		value: clamp(translationY, SNAP_TOP, SNAP_BOTTOM),
		velocity: velocityY,
		offset,
		state,
		snapPoints: [SNAP_TOP, SNAP_BOTTOM],
		config,
	});

	const opacity = interpolateNode(translateY, {
		inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
		outputRange: [0, 1],
		extrapolate: Extrapolate.CLAMP,
	});
	return (
		<SlidingUpPanel
			ref={(c) => {
				_panel = c;
			}}
			containerStyle={{
				position: "absolute",
			}}
			draggableRange={{ top: WINDOW.HEIGHT + 30, bottom: 100 }}
			showBackdrop={true}
			snappingPoints={[WINDOW.HEIGHT + 100]}
			height={WINDOW.HEIGHT - 100}
			friction={0.999}
			// allowDragging={allowDragging}
			// animatedValue={draggedValue}
			// onBottomReached={() => setAllowDragging(true)}
		>
			<View
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					height: 100,
					top: 100,
				}}
			>
				<Animated.View
					style={{
						flex: 1,
						opacity: opacity,
						height: 100,
					}}
				>
					<MiniPlayer onPress={() => {}} />
				</Animated.View>
				<Player onPress={() => {}} />
			</View>
		</SlidingUpPanel>
	);
};

export default BottomTabSecond;
