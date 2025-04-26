import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import {debounce} from 'lodash';

const DebouncingComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch data from the Reddit API
  const fetchRedditData = async query => {
    try {
      setLoading(true);
      console.log('Fetching data for query:', query); // Log the query being fetched
      const url = query
        ? `https://api.reddit.com/r/pics/search.json?q=${query}&restrict_sr=1`
        : `https://api.reddit.com/r/pics/hot.json`;

      const response = await fetch(url);
      const json = await response.json();
      const fetchedPosts = json.data.children.map(item => item.data);
      console.log('API response--->>>>>>>:'); // Log the fetched posts
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching Reddit data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedFetch = useCallback(debounce(fetchRedditData, 1000), []);

  // Handle input change
  const handleSearchChange = text => {
    setSearchTerm(text);
    debouncedFetch(text); 
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts..."
        value={searchTerm}
        onChangeText={handleSearchChange}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={renderPost}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default DebouncingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 80
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
