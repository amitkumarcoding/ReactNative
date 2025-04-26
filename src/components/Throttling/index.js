import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {throttle} from 'lodash';

const Throttling = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data from Reddit API
  const fetchRedditData = async (pageNumber, query = '') => {
    try {
      setLoading(true);
      console.log('Fetching page:', pageNumber, 'Search:', query);
      let url = `https://api.reddit.com/r/pics/hot.json?page=${pageNumber}`;
      if (query) {
        url = `https://api.reddit.com/r/pics/search.json?q=${query}&restrict_sr=1&page=${pageNumber}`;
      }

      const response = await fetch(url);
      const json = await response.json();
      const fetchedPosts = json.data.children.map(item => item.data);
      console.log('API CALL>>>>');
      setPosts(prevPosts => (pageNumber === 1 ? fetchedPosts : [...prevPosts, ...fetchedPosts]));
    } catch (error) {
      console.error('Error fetching Reddit data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Throttled function to fetch more posts on scroll
  const throttledFetch = useCallback(
    throttle(() => fetchRedditData(page, searchQuery), 1000),
    [page, searchQuery],
  );

  // Throttled search function when typing
  const throttledSearch = useCallback(
    throttle((query) => {
      console.log('Searching for:', query);
      setPage(1); // Reset to first page when new search happens
      fetchRedditData(1, query);
    }, 1000),
    [],
  );

  const handleSearch = text => {
    setSearchQuery(text);
    throttledSearch(text);
  };

  // Handle scrolling to load more data
  const handleScroll = event => {
    const contentHeight = event?.nativeEvent?.contentSize?.height;
    const contentOffsetY = event?.nativeEvent?.contentOffset?.y;
    const layoutHeight = event?.nativeEvent?.layoutMeasurement?.height;

    if (contentOffsetY + layoutHeight >= contentHeight - 100) {
      setPage(prevPage => prevPage + 1);
      throttledFetch(); // Trigger throttled fetch when near bottom
    }
  };

  useEffect(() => {
    fetchRedditData(page, searchQuery);
  }, [page]);

  const renderPost = ({item}) => (
    <View style={styles.postContainer}>
      <Text style={styles.title}>{item.title}</Text>
      {item.thumbnail && item.thumbnail.startsWith('http') ? (
        <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      ) : null}
      <Text style={styles.author}>By: {item.author}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search Reddit posts..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPost}
        onEndReached={handleScroll}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default Throttling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
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
