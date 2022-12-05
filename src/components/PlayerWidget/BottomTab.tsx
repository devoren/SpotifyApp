import React from "react";
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

const { height } = Dimensions.get("window");
const TABBAR_HEIGHT = 37;
const MINIMIZED_PLAYER_HEIGHT = 37;
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

const BottomTab: React.FC<any> = ({ containerStyle }) => {
	const translationY = new Value(0) as any;
	const velocityY = new Value(0);
	const state = new Value(State.UNDETERMINED);
	const offset = new Value(SNAP_BOTTOM);
	const goUp: Animated.Value<0 | 1> = new Value(0);
	const goDown: Animated.Value<0 | 1> = new Value(0);
	const gestureHandler = onGestureEvent({
		state,
		translationY,
		velocityY,
	});
	const translateY = withSpring({
		value: clamp(translationY, SNAP_TOP, SNAP_BOTTOM),
		velocity: velocityY,
		offset,
		state,
		snapPoints: [SNAP_TOP, SNAP_BOTTOM],
		config,
	});
	const translateBottomTab = interpolateNode(translateY, {
		inputRange: [SNAP_TOP, SNAP_BOTTOM],
		outputRange: [TABBAR_HEIGHT, 0],
		extrapolate: Extrapolate.CLAMP,
	});
	const opacity = interpolateNode(translateY, {
		inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
		outputRange: [0, 1],
		extrapolate: Extrapolate.CLAMP,
	});
	const opacity2 = interpolateNode(translateY, {
		inputRange: [
			SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
			SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT,
		],
		outputRange: [0, 1],
		extrapolate: Extrapolate.CLAMP,
	});

	const clock = new Clock();
	useCode(
		() =>
			block([
				cond(goUp, [
					set(
						offset,
						timing({
							clock,
							from: offset,
							to: SNAP_TOP,
						})
					),
					cond(not(clockRunning(clock)), [set(goUp, 0)]),
				]),
				cond(goDown, [
					set(
						offset,
						timing({
							clock,
							from: offset,
							to: SNAP_BOTTOM,
						})
					),
					cond(not(clockRunning(clock)), [set(goDown, 0)]),
				]),
			]),
		[]
	);

	return (
		<PanGestureHandler {...gestureHandler}>
			<Animated.View
				style={[styles.playerSheet, { transform: [{ translateY }] }]}
			>
				<Player onPress={() => goDown.setValue(1)} />
				<Animated.View
					pointerEvents="none"
					style={{
						opacity: opacity2,
						backgroundColor: COLOR.PRIMARY,
						...StyleSheet.absoluteFillObject,
					}}
				/>
				<Animated.View
					style={{
						flex: 1,
						opacity,
						position: "absolute",
						left: 0,
						right: 0,
						height: 50,
						zIndex: 1,
					}}
				>
					<MiniPlayer onPress={() => goUp.setValue(1)} />
				</Animated.View>
			</Animated.View>
		</PanGestureHandler>
	);
};

export default BottomTab;
