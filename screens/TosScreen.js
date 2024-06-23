import React from 'react';
import { View, Text, Linking, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const Terms = () => {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.heading}>Terms of Service ("Terms")</Text>

      <Text>Last updated: (24 May 2024)</Text>

      <Text>
        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Polymath Quiz web application (the "Service") operated by Machete Capital (Pty) Ltd ("us", "we", or "our").
      </Text>

      <Text style={styles.subheading}>1. Your Access to and Use of the Service</Text>
      <Text>
        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
      </Text>

      <Text style={styles.subheading}>2. Content</Text>
      <Text>
        Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the legality of the Content you post to the Service.
      </Text>

      <Text style={styles.subheading}>3. Intellectual Property</Text>
      <Text>
        All intellectual property rights in and to the Service, its content, and all technical infrastructure relating to it are owned by us and/or our licensors.
      </Text>

      <Text style={styles.subheading}>4. Changes</Text>
      <Text>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
      </Text>

      <Text style={styles.subheading}>5. Termination</Text>
      <Text>
        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
      </Text>

      <Text style={styles.subheading}>6. Limitation of Liability</Text>
      <Text>
        In no event shall we, nor our directors, employees, agents, partners, suppliers, or content providers, be liable under contract, tort, strict liability, negligence, or any other legal or equitable theory with respect to the service.
      </Text>

      <Text style={styles.subheading}>7. Governing Law</Text>
      <Text>
        These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.
      </Text>

      <Text style={styles.subheading}>8. Contact Us</Text>
      <Text>
        If you have any questions about these Terms, please{' '}
        <Text style={styles.emailLink} onPress={() => Linking.openURL('mailto:machetecapital@gmail.com')}>
          contact us
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

export default Terms;
