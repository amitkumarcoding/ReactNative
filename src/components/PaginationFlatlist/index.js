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

const PaginationComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextPage, setNextPage] = useState(null); // Track the next page
  const [hasMore, setHasMore] = useState(true); // Track if there are more posts to fetch

  const fetchRedditData = async query => {
    if (loading || !hasMore) return; // Prevent duplicate requests

    try {
      setLoading(true);
      console.log('Fetching data for query:', query);
      const url = `https://api.reddit.com/r/pics/hot.json?after=${nextPage}`;

      const response = await fetch(url);
      const json = await response.json();
      const fetchedPosts = json.data.children.map(item => item.data);
      console.log('API Call>>', fetchedPosts); // Log the fetched posts

      setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
      setNextPage(json.data.after); // Set the next page to be fetched
      setHasMore(!!json.data.after); // If there's no next page, stop loading more posts
    } catch (error) {
      console.error('Error fetching Reddit data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleSearchChange = text => {
    setSearchTerm(text);
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

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchRedditData();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts..."
        value={searchTerm}
        onChangeText={handleSearchChange}
      />
      {loading && !posts.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={posts}
          //   keyExtractor={item => item.id}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPost}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleLoadMore} // Trigger load more when scrolled to the bottom
          onEndReachedThreshold={0.5} // Start loading more when 50% of the list is visible
        />
      )}
    </View>
  );
};

export default PaginationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
