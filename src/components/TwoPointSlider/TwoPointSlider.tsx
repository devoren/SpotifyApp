import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLOR, SCALE, WINDOW } from "src/styles";

const TwoPointSlider: React.FC<any> = ({
	defaultValues,
	min,
	max,
	prefix,
	postfix,
	onValuesChange,
}) => {
	return (
		<MultiSlider
			values={[defaultValues]}
			sliderLength={WINDOW.WIDTH - SCALE.XL * 2 - 30}
			min={min}
			max={max}
			step={1}
			markerOffsetY={20}
			selectedStyle={{
				backgroundColor: COLOR.WHITE,
			}}
			trackStyle={{
				height: 3,
				borderRadius: 5,
				backgroundColor: COLOR.GRAY[3],
			}}
			// minMarkerOverlapDistance={50}
			enabledOne
			customMarker={(e) => {
				return (
					<View
						style={{
							height: 60,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<View
							style={{
								height: 15,
								width: 15,
								bottom: 10,
								borderRadius: 15,
								borderColor: COLOR.GRAY[3],
								backgroundColor: COLOR.WHITE,
								...styles.shadow,
							}}
						/>
						<Text
							style={{
								marginTop: 5,
								color: COLOR.GRAY[1],
								fontSize: SCALE.XS,
							}}
						>
							{prefix}
							{e.currentValue} {postfix}
						</Text>
					</View>
				);
			}}
			onValuesChange={(values) => onValuesChange(values)}
		/>
	);
};
const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 1,
		shadowOpacity: 0.1,
	},
});

export default TwoPointSlider;
