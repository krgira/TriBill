import React from 'react';
import {StyleSheet, View} from 'react-native';
import NationListView from '../components/NationListView';

function SettingScreen() {
  return <NationListView sytle={styles.block} />;
}

const styles = StyleSheet.create({
  block: {},
});

export default SettingScreen;