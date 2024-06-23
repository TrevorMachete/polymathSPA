import React from 'react';
import { View, Text, Linking, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const Cookies = () => {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.heading}>Cookies Policy</Text>

      <Text>Last updated: (24 May 2024)</Text>

      <Text>
        Machete Capital (Pty) Ltd ("us", "we", or "our") operates the Polymath Quiz web application (the "Service").
      </Text>

      <Text>
        This page informs you of our policies regarding the use of cookies and similar technologies when you use our Service.
      </Text>

      <Text style={styles.subheading}>1. What are Cookies?</Text>
      <Text>
        Cookies are small data files that are placed on your device when you visit a website or use a mobile app. They are widely used to make online services work or work more efficiently, as well as to provide reporting information.
      </Text>

      <Text style={styles.subheading}>2. How We Use Cookies</Text>
      <Text>
        We use cookies to enable certain functions of the Service, to provide analytics, to store your preferences, and to enable advertisements delivery, including behavioral advertising.
      </Text>

      <Text style={styles.subheading}>3. Types of Cookies We Use</Text>
      <Text>
        We use the following types of cookies: Essential cookies, Performance cookies, Functionality cookies, Advertising cookies.
      </Text>

      <Text style={styles.subheading}>4. Your Choices</Text>
      <Text>
        You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Service, but your access to some functionality and areas may be restricted.
      </Text>

      <Text style={styles.subheading}>5. Changes to This Cookies Policy</Text>
      <Text>
        We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page.
      </Text>

      <Text style={styles.subheading}>6. Contact Us</Text>
      <Text>
        If you have any questions about this Cookies Policy,{' '}
        <Text style={styles.emailLink} onPress={() => Linking.openURL('mailto:machetecapital@gmail.com')}>
          please contact us
        </Text>
        .
      </Text>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emailLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Cookies;
