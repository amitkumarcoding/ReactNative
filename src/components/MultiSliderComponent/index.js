import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

const SUGGESTION_DATA = [
  {
    icon: 'https://cdn-icons-png.freepik.com/256/3689/3689556.png?ga=GA1.1.1533290178.1735307873&semt=ais_hybrid',
    id: 0,
    isActive: false,
    label: 'Shopping',
  },
  {
    icon: 'https://cdn-icons-png.freepik.com/256/826/826070.png?ga=GA1.1.1533290178.1735307873&semt=ais_hybrid',
    id: 1,
    isActive: true,
    label: 'Travel',
  },
  {
    icon: 'https://cdn-icons-png.freepik.com/256/2964/2964514.png?ga=GA1.1.1533290178.1735307873&semt=ais_hybrid',
    id: 2,
    isActive: false,
    label: 'Fitness',
  },
  {
    icon: 'https://cdn-icons-png.freepik.com/256/18560/18560313.png?ga=GA1.1.1533290178.1735307873&semt=ais_hybrid',
    id: 3,
    isActive: true,
    label: 'Wellness',
  },
  {
    icon: 'https://cdn-icons-png.freepik.com/256/975/975392.png?ga=GA1.1.1533290178.1735307873&semt=ais_hybrid',
    id: 4,
    isActive: true,
    label: 'Events',
  },
];

const MultiSliderComponent = () => {
  const [switches, setSwitches] = useState(SUGGESTION_DATA);
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setSwitches(SUGGESTION_DATA);
    }
  }, [isFocused]);

  const toggleSwitch = id => {
    setSwitches(prevState =>
      prevState.map(item =>
        item.id === id ? {...item, isActive: !item.isActive} : item,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Customize Your Interests</Text>

        {switches.map((item, index) => {
          const {icon, label, id, isActive} = item;

          return (
            <View key={index} style={styles.containerAlt}>
              <Image source={{uri: icon}} style={styles.iconStyle} />
              <Text style={styles.titleStyle}>{label}</Text>

              <Switch
                trackColor={{false: '#EFEFEF', true: '#34C759'}}
                thumbColor={'#FFFFFF'}
                onValueChange={() => toggleSwitch(id)}
                value={isActive}
              />
            </View>
          );
        })}

        {displayText.length && (
          <Text
            style={{
              color: '#fff',
              padding: 30,
            }}>{`You have selected: ${displayText}`}</Text>
        )}

        {loading ? (
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <ActivityIndicator size="small" animating={true} color={'#fff'} />
            </View>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                const activeLabels = SUGGESTION_DATA.filter(
                  item => item.isActive,
                ).map(item => item.label);
                setDisplayText(activeLabels);

                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }}
              style={styles.button}
              disabled={false}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={{color: '#fff'}}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MultiSliderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  containerAlt: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  wrapper: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 50,
    marginTop: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  titleStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  iconStyle: {
    width: 40,
    height: 40,
    marginRight: 30,
  },
});
