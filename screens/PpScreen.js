import React from 'react';
import { View, Text, Linking, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const Privacy = () => {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.heading}>Privacy Policy</Text>

      <Text>Last updated: (24 May 2024)</Text>

      <Text>
        Machete Capital (Pty) Ltd ("us", "we", or "our") operates the Polymath Quiz web application (the "Service").
      </Text>

      <Text>
        This page informs you of our policies regarding the collection, use, and disclosure of Personal Information when you use our Service.
      </Text>

      <Text style={styles.subheading}>1. Information Collection And Use</Text>
      <Text>
        We collect several different types of information for various purposes to provide and improve our Service to you.
      </Text>

      <Text style={styles.subheading}>2. Types of Data Collected</Text>
      <Text>
        <Text style={styles.subsubheading}>Personal Data</Text>
        {' '}
        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data").
      </Text>

      <Text>
        <Text style={styles.subsubheading}>Usage Data</Text>
        {' '}
        We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
      </Text>

      <Text style={styles.subheading}>3. Use of Data</Text>
      <Text>
        We use the collected data for various purposes, such as providing and maintaining the Service, notifying you about changes to our Service, providing customer support, gathering analysis or valuable information to improve the Service, monitoring usage, and detecting, preventing, and addressing technical issues.
      </Text>

      <Text style={styles.subheading}>4. Transfer of Data</Text>
      <Text>
        Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ from those of your jurisdiction.
      </Text>

      <Text style={styles.subheading}>5. Disclosure of Data</Text>
      <Text>
        We may disclose your Personal Data in good faith belief that such action is necessary to comply with a legal obligation, protect and defend the rights or property of the company, prevent or investigate possible wrongdoing in connection with the Service, protect the personal safety of users of the Service or the public, or protect against legal liability.
      </Text>

      <Text style={styles.subheading}>6. Security Of Data</Text>
      <Text>
        The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
      </Text>

      <Text style={styles.subheading}>7. Changes To This Privacy Policy</Text>
      <Text>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Text>

      <Text style={styles.subheading}>8. Contact Us</Text>
      <Text>
        If you have any questions about this Privacy Policy,{' '}
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
  subsubheading: {
    fontWeight: 'bold',
  },
  emailLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Privacy;
