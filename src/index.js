import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {use} from 'i18next';

const App = () => {
  const fetchApiData = async () => {
    return await fetch('https://example.com').then(res => res.json());
  };

  // React 18 and earlier

  const oldApproach = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetchApiData().then(setData);
    }, []);

    return (
      <View>
        <Text>{data?.title}</Text>
      </View>
    );
  };

  // React 19

  const newApproach = () => {
    const data = use(fetchApiData());

    return (
      <View>
        <Text>{data.title}</Text>
      </View>
    );
  };
};

export default App;

const styles = StyleSheet.create({});
