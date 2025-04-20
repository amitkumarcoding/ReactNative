/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, Button, FlatList, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';

const UseStateHooks = () => {
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduledDateTime, setScheduledDateTime] = useState(null);

  const [uploadingCover, setUploadingCover] = useState(false);
  const [reUploadingCover, setReUploadingCover] = useState(false);
  const [uploadingEditorImage, setUploadingEditorImage] = useState(false);
  const [removingCover, setRemovingCover] = useState(false);
  const [publishingPost, setPublishingPost] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const [postCover, setPostCover] = useState(undefined);
  const [postImages, setPostImages] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postBodyJson, setPostBodyJson] = useState('');

  const handlePostSubmission = () => {
    setPublishingPost(true);
    setTimeout(() => {
      setPublishingPost(false);
      Alert.alert('Post Published');
    }, 2000);
  };

  const handleDateChange = (date, time) => {
    setScheduledDate(date);
    setScheduledTime(time);
    setScheduledDateTime(new Date(`${date}T${time}`));
  };

  return (
    <View style={{padding: 20}}>
      <Text>Post Submission</Text>
      <Button
        title={publishingPost ? 'Publishing...' : 'Publish Post'}
        onPress={handlePostSubmission}
        disabled={publishingPost}
      />

      <Text>Schedule Post</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Select Date"
        value={scheduledDate}
        onChangeText={text => setScheduledDate(text)}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Select Time"
        value={scheduledTime}
        onChangeText={text => setScheduledTime(text)}
      />
      <Button
        title="Set Schedule"
        onPress={() => handleDateChange(scheduledDate, scheduledTime)}
      />

      <Text>Errors:</Text>
      <FlatList
        data={errors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default UseStateHooks;

const styles = StyleSheet.create({});
