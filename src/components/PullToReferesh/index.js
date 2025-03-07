import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';

const PullToRefresh = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const fetchRedditData = async query => {
    try {
      setRefreshing(true);
      console.log('Fetching data for query:', query);
      const url = query
        ? `https://api.reddit.com/r/pics/search.json?q=${query}&restrict_sr=1`
        : `https://api.reddit.com/r/pics/hot.json`;

      const response = await fetch(url);
      const json = await response.json();
      const fetchedPosts = json.data.children.map(item => item.data);
      console.log('API CAll>>'); // Log the fetched posts
      setPosts(fetchedPosts);
      setTimeout(() => {
        setRefreshing(false);
      }, 5000);
    } catch (error) {
      console.error('Error fetching Reddit data:', error);
    }
  };

  useEffect(() => {
    fetchRedditData();
  }, []);

  const renderPost = ({item}) => {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {item.thumbnail && item.thumbnail.startsWith('http') ? (
          <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
        ) : null}
        <Text style={styles.author}>By: {item.author}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchRedditData} />
        }
      />
    </View>
  );
};

export default PullToRefresh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
  postContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 12,
    color: '#555',
  },
  thumbnail: {
    height: 100,
    width: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});
