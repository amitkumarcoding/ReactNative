import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  taskContainer: {
    backgroundColor: '#3E1671',
    marginHorizontal: 25,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  taskText: {
    color: '#fff',
    fontSize: 13,
  },
  listContent: {
    paddingBottom: 70,
  },
  heading: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
