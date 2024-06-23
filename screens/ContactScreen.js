import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);

  const hideSpinner = () => {
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://www.powr.io/contact-form/i/38405467#page' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoad={() => hideSpinner()} // Hide the spinner when the page is loaded
      />
      {isLoading && (
        <ActivityIndicator
          style={{     justifyContent: 'center',
            alignItems: 'center', marginBottom: '50%'}}
          size="large"
        />
      )}
    </View>
  );
};

export default Contact;
