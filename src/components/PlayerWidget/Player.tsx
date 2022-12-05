import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Animated as Animate,
	Easing,
} from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { RectButton } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import { COLOR, SCALE, WINDOW } from "src/styles";
import { musiclibrary } from "./Data";
import { albumDetails } from "../AlbumDetails/albumDetails";
import Animated, {
	EasingNode,
	interpolateNode,
	useAnimatedStyle,
} from "react-native-reanimated";
import TrackPlayer, {
	usePlaybackState,
	State as TrackState,
	useProgress,
	RepeatMode,
	useTrackPlayerEvents,
	Event,
	Capability,
} from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/reducers";
import { setSelectedSong } from "src/reducers/song";

const { width } = Dimensions.get("window");

interface PlayerProps {
	onPress: () => void;
}

const Player: React.FC<PlayerProps> = ({ onPress }) => {
	const dispatch = useDispatch();
	const scrollX = useRef(new Animate.Value(0)).current;
	const flatListRef = useRef<any>();
	const progress = useProgress();
	const [selected, setSelected] = useState<boolean>(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [repeatMode, setRepeatMode] = useState("off");
	const [isFav, setIsFav] = useState(false);
	const [trackArtwork, setTrackArtwork] = useState<
		string | number | undefined
	>();
	const [trackArtist, setTrackArtist] = useState<string | undefined>();
	const [trackTitle, setTrackTitle] = useState<string>();
	// @ts-ignore: Unreachable code error
	const onViewChangeRef = useRef(({ viewableItems, changed }) => {
		// @ts-ignore: Unreachable code error
		setCurrentIndex(viewableItems[0]?.index);
	});

	useEffect(() => {
		setupPlayer();
		console.log("CurrentIndex: ", currentIndex);
	}, []);

	const setupPlayer = async () => {
		await TrackPlayer.setupPlayer();
		await TrackPlayer.updateOptions({
			stopWithApp: true,
			capabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				Capability.Stop,
			],
		});

		await TrackPlayer.add(musiclibrary);
	};

	const togglePlayback = async (playbackState: TrackState) => {
		const currentTrack = await TrackPlayer.getCurrentTrack();
		if (currentTrack != null) {
			if (playbackState == TrackState.Paused) {
				await TrackPlayer.play();
			} else {
				await TrackPlayer.pause();
			}
		}
	};

	const playbackState = usePlaybackState();

	function format(time: number) {
		// Hours, minutes and seconds
		var hrs = ~~(time / 3600);
		var mins = ~~((time % 3600) / 60);
		var secs = ~~time % 60;

		// Output like "1:01" or "4:03:59" or "123:03:59"
		var ret = "";
		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}
		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	}

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
		if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
			const track = await TrackPlayer.getTrack(event.nextTrack);
			const { title, artwork, artist, id } = track;
			setTrackArtist(artist);
			setTrackArtwork(artwork);
			setTrackTitle(title);
		}
	});

	const repeatIcon = () => {
		if (repeatMode == "off") {
			return "repeat";
		} else if (repeatMode == "repeat") {
			return "repeat-on";
		} else if (repeatMode == "repeatone") return "repeat-one-on";
	};

	const changeRepeatMode = () => {
		if (repeatMode == "off") {
			TrackPlayer.setRepeatMode(RepeatMode.Queue);
			setRepeatMode("repeat");
		} else if (repeatMode == "repeat") {
			TrackPlayer.setRepeatMode(RepeatMode.Track);
			setRepeatMode("repeatone");
		} else if (repeatMode == "repeatone") {
			TrackPlayer.setRepeatMode(RepeatMode.Off);
			setRepeatMode("off");
		}
	};

	return (
		<SafeAreaView style={styles.root}>
			<ImageBackground
				source={{
					uri: trackArtwork as string,
				}}
				resizeMode={"cover"}
				blurRadius={200}
				style={{
					...StyleSheet.absoluteFillObject,
				}}
			>
				<View style={styles.container}>
					<View style={styles.header}>
						<TouchableOpacity style={styles.button} {...{ onPress }}>
							<Feather name="chevron-down" color="white" size={24} />
						</TouchableOpacity>
						<Text style={styles.title}>{trackTitle}</Text>
						<TouchableOpacity style={styles.button} {...{ onPress }}>
							<Feather name="more-horizontal" color="white" size={24} />
						</TouchableOpacity>
					</View>
					<Animate.FlatList
						ref={flatListRef}
						data={musiclibrary}
						keyExtractor={(item) => `key-${item.id}`}
						horizontal
						pagingEnabled
						onEndReachedThreshold={1}
						showsHorizontalScrollIndicator={false}
						scrollEventThrottle={16}
						onViewableItemsChanged={onViewChangeRef.current}
						viewabilityConfig={{ viewAreaCoveragePercentThreshold: 65 }}
						renderItem={({ item, index }) => (
							<Animate.View
								style={{
									width: width - 32,
									height: width - 32,
									paddingTop: 15,
								}}
							>
								<View
									style={{
										width: width - 80,
										height: width - 80,
										borderRadius: 12,
										marginHorizontal: 25,
										backgroundColor: "transparent",
										shadowColor: "#000",
										shadowOffset: {
											width: 0,
											height: 12,
										},
										shadowOpacity: 0.58,
										shadowRadius: 16.0,
										elevation: 20,
									}}
								>
									<Image
										source={{ uri: trackArtwork as string }}
										style={styles.cover}
									/>
								</View>
							</Animate.View>
						)}
						onScroll={Animate.event(
							[
								{
									nativeEvent: {
										contentOffset: { x: scrollX },
									},
								},
							],
							{ useNativeDriver: false }
						)}
					/>
					<View style={styles.metadata}>
						<View>
							<Text style={styles.song}>{trackTitle}</Text>
							<Text style={styles.artist}>{trackArtist}</Text>
						</View>
						<TouchableOpacity onPress={() => setIsFav(isFav ? false : true)}>
							<FontAwesome
								name={isFav ? "heart-o" : "heart"}
								size={24}
								color={COLOR.WHITE}
							/>
						</TouchableOpacity>
					</View>
					<Slider
						style={styles.slider}
						value={progress.position}
						minimumValue={0}
						maximumValue={progress.duration}
						step={1}
						minimumTrackTintColor={COLOR.WHITE}
						maximumTrackTintColor={COLOR.GRAY[3]}
						thumbTintColor={COLOR.WHITE}
						onSlidingComplete={async (value) => {
							await TrackPlayer.seekTo(value);
						}}
					/>
					<View style={styles.progressLabel}>
						<Text style={styles.progressLabelTime}>
							{format(progress.position)}
						</Text>
						<Text style={styles.progressLabelTime}>
							{format(progress.duration - progress.position)}
						</Text>
					</View>
					<View style={styles.controlButtons}>
						<View style={[styles.controls, { bottom: 15 }]}>
							<Feather
								name="shuffle"
								color="rgba(255, 255, 255, 0.5)"
								size={24}
							/>
							<TouchableOpacity
								onPress={() => {
									flatListRef.current.scrollToIndex({
										index:
											currentIndex - 1 < 0 ? currentIndex : currentIndex - 1,
										animation: true,
									});
									currentIndex - 1 > -1 && TrackPlayer.skipToPrevious();
									dispatch(
										setSelectedSong(
											musiclibrary[
												currentIndex - 1 < 0 ? currentIndex : currentIndex - 1
											]
										)
									);
								}}
							>
								<AntDesign name="banckward" color="white" size={42} />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									togglePlayback(playbackState);
									dispatch(setSelectedSong(musiclibrary[currentIndex]));
								}}
							>
								<AntDesign
									name={
										playbackState === TrackState.Playing
											? "pause"
											: "caretright"
									}
									color="white"
									size={64}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									flatListRef.current.scrollToIndex({
										index:
											currentIndex + 1 > musiclibrary.length - 1
												? currentIndex
												: currentIndex + 1,
										animation: true,
									});
									currentIndex + 1 < musiclibrary.length &&
										TrackPlayer.skipToNext();
									dispatch(
										setSelectedSong(
											musiclibrary[
												currentIndex + 1 > musiclibrary.length - 1
													? currentIndex
													: currentIndex + 1
											]
										)
									);
								}}
							>
								<AntDesign name="forward" color="white" size={42} />
							</TouchableOpacity>
							<TouchableOpacity onPress={changeRepeatMode}>
								<MaterialIcons
									name={`${repeatIcon()}`}
									color={
										repeatMode != "off"
											? COLOR.WHITE
											: "rgba(255, 255, 255, 0.5)"
									}
									size={24}
								/>
							</TouchableOpacity>
						</View>
						{/* <Slider
								style={{
									width: width - 100,
									height: 50,
									bottom: 25,
									left: 30,
								}}
								value={4}
								tapToSeek
								minimumValue={0}
								maximumValue={10}
								minimumTrackTintColor={COLOR.WHITE}
								maximumTrackTintColor={COLOR.GRAY[3]}
								thumbTintColor={COLOR.WHITE}
								onSlidingComplete={() => {}}
								onValueChange={(value) => setValue(value)}
							/> */}
						<View style={[styles.controls]}>
							<MaterialCommunityIcons
								name="comment-quote-outline"
								color="rgba(255, 255, 255, 0.5)"
								size={24}
							/>
							<Feather
								name="airplay"
								color="rgba(255, 255, 255, 0.5)"
								size={24}
							/>

							<Foundation
								name="list-bullet"
								color="rgba(255, 255, 255, 0.5)"
								size={24}
							/>
						</View>
					</View>

					{/* <Image source={require("src/assets/thebay.jpg")} style={styles.cover} /> */}
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: COLOR.WHITE,
		zIndex: 10,
	},
	container: {
		margin: 16,
		// backgroundColor: "red",
		...StyleSheet.absoluteFillObject,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		padding: 16,
	},
	title: {
		color: "white",
		padding: 12,
		fontSize: 20,
	},
	cover: {
		// marginTop: 16,
		width: width - 80,
		height: width - 80,
		borderRadius: 12,
		// marginHorizontal: 25,
	},
	metadata: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		bottom: 10,
		paddingHorizontal: 10,
	},
	song: {
		fontSize: 26,
		fontWeight: "bold",
		color: "white",
	},
	artist: {
		color: "white",
		fontSize: 16,
	},
	controlButtons: {
		// paddingTop: 20,
	},
	slider: {
		// backgroundColor: "rgba(255, 255, 255, 0.5)",
		width: width - 32,
		height: 50,
		marginBottom: 16,
	},
	progressLabel: {
		paddingTop: 5,
		width: width - 35,
		flexDirection: "row",
		justifyContent: "space-between",
		bottom: 25,
		paddingHorizontal: 10,
	},
	progressLabelTime: {
		color: COLOR.WHITE,
		fontSize: SCALE.MD,
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		// paddingVertical: 20,
		paddingBottom: 20,
	},
});
export default Player;
