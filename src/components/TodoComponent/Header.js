import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CrossIconAlt,
  DeleteAllIcon,
  SelectAllIcon,
  SettingAltNewIcon,
  TrashIcon,
} from '../../assets';

const HeaderComponent = ({
  onDeleteContentPress = () => {},
  showSingleDeleteIcon = false,
  onSelectAllPress = () => {},
  hideIcons = false,
  data = [],
  selectedItems = [],
  onHeaderCrossPress = () => {},
}) => {
  const selectedCount = selectedItems.length;
  let WIDTH = 24;
  let HEIGHT = 24;

  return (
    <View style={styles.rowContainer}>
      {!hideIcons && (
        <TouchableOpacity onPress={onHeaderCrossPress}>
          <CrossIconAlt />
        </TouchableOpacity>
      )}

      <Text style={[styles.heading, !hideIcons && styles.alignLeftHeading]}>
        {hideIcons ? 'Simple Todo' : `${selectedCount} Selected`}
      </Text>

      {hideIcons && (
        <TouchableOpacity style={styles.iconMargin}>
          <SettingAltNewIcon width={WIDTH} height={HEIGHT} />
        </TouchableOpacity>
      )}

      {!hideIcons && (
        <TouchableOpacity onPress={onSelectAllPress} style={styles.iconMargin}>
          <SelectAllIcon width={WIDTH} height={HEIGHT} />
        </TouchableOpacity>
      )}

      {data.length > 0 && (
        <TouchableOpacity onPress={onDeleteContentPress}>
          {showSingleDeleteIcon ? (
            <TrashIcon width={WIDTH} height={HEIGHT} />
          ) : (
            <DeleteAllIcon width={WIDTH} height={HEIGHT} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  heading: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
    marginVertical: 20,
  },
  alignLeftHeading: {
    textAlign: 'left',
    fontSize: 22,
  },
  iconMargin: {
    marginRight: 15,
  },
});
