import React, {useMemo, useRef, useState, useCallback} from 'react';
import {Dimensions, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import {PlayIcon} from '../../assets';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');

const VideoComponent = ({data, isVisible}) => {
  const [play, setPlay] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [totalVideoDuration, setTotalVideoDuration] = useState(0);
  const videoRef = useRef(null);

  const videoStyle = useMemo(() => styles.video, []);

  const onProgress = useCallback(({currentTime, seekableDuration}) => {
    setSliderValue(Math.floor(currentTime || 0));
  }, []);

  const onSlidingComplete = useCallback(values => {
    const seekTime = values[0];
    videoRef.current?.seek(seekTime);
    setSliderValue(seekTime);
  }, []);

  const onLoad = useCallback(({duration}) => {
    setTotalVideoDuration(Math.floor(duration));
  }, []);

  const onEnd = useCallback(() => {
    videoRef.current?.seek(0);
    setPlay(false);
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => setPlay(prev => !prev)}>
      <Video
        ref={videoRef}
        source={{uri: data.video}}
        resizeMode="contain"
        muted={!isVisible}
        playInBackground={false}
        paused={!isVisible || play}
        ignoreSilentSwitch="ignore"
        style={videoStyle}
        onProgress={onProgress}
        onLoad={onLoad}
        onEnd={onEnd}
      />

      {play && (
        <TouchableOpacity
          onPress={() => setPlay(!play)}
          style={styles.iconContainer}>
          <PlayIcon width={70} height={70} />
        </TouchableOpacity>
      )}

      <LinearGradient
        colors={styles.gradientColors}
        style={styles.controlsContainer}
      />

      <MultiSlider
        step={1}
        values={[sliderValue]}
        min={0}
        max={totalVideoDuration}
        onValuesChangeFinish={onSlidingComplete}
        sliderLength={WINDOW_WIDTH - 20}
        selectedStyle={styles.sliderSelected}
        unselectedStyle={styles.sliderUnselected}
        trackStyle={styles.sliderTrack}
        markerStyle={styles.sliderMarker}
        containerStyle={styles.sliderContainer}
      />
    </TouchableOpacity>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    backgroundColor: 'black',
    width: '100%',
    height: Platform.OS === 'ios' ? WINDOW_HEIGHT : WINDOW_HEIGHT - 50,
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: '#00000080',
    borderRadius: 50,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientColors: [
    '#000000F0',
    '#000000D0',
    '#000000A0',
    '#00000070',
    '#00000040',
  ],
  sliderContainer: {
    position: 'absolute',
    bottom: 80,
    width: WINDOW_WIDTH - 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  sliderSelected: {
    backgroundColor: '#FFFFFF',
  },
  sliderUnselected: {
    backgroundColor: '#989898',
  },
  sliderTrack: {
    height: 2,
    borderRadius: 5,
  },
  sliderMarker: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
});
