import React from 'react';
import PropTypes from 'prop-types';

import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

const WebViewPage = ({ navigation }) => {
  const repository = navigation.getParam('repository');

  const onLoading = () => {
    return <ActivityIndicator />;
  };

  return (
    <WebView
      startInLoadingState={onLoading}
      source={{ uri: repository.html_url }}
      style={{ flex: 1 }}
    />
  );
};

WebViewPage.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

WebViewPage.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});

export default WebViewPage;
