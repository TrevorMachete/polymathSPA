import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, SafeAreaView, Pressable } from 'react-native';

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={styles.headerOne}>About Polymath</Text>
      <Text style={{ fontSize: 12,}}>Version: 1.0.0</Text>
      <Text style={{ fontSize: 12,}}>Release date: 24 June 2024</Text>
      <Text style={{ fontSize: 12,}}>Developer: Macs Machete</Text>
      <Text style={{ fontSize: 12,}}>Copyright &#169;: Machete Capital (Pty) Ltd</Text>
      <Text style={{ fontSize: 12,}}>External Credits: The Trivia Api</Text>
      <View style={styles.horizontalLine} />

      <Text>{'\n'}
        The inspiration for this project came from a love for trivia and a desire to create a platform where knowledge can be tested in a fun and engaging way. 
      </Text>

      <Text>{'\n'}
        You can find more about the developer on their respective social media platforms:
        {' '}
        <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://www.linkedin.com/in/trevor-machete-62636b127/')}>LinkedIn </Text>
        and
        <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://twitter.com/trevormachete')}> Twitter.{'\n'}{'\n'}</Text>
      </Text>
      
      <Text style={styles.headerTwo}>Real life benefits.</Text>
      <Text>
      Quizzes can help you stay confident, competitive and sharper than your peers.{'\n'}{'\n'}
      </Text>

      <Text style={styles.headerTwo}>Ideal and Classic.</Text>
      <Text>
      Quizzes have been widely used for fun, knowledge testing and gathering since ancient times.{'\n'}{'\n'}
      </Text>

      <Text style={styles.headerTwo}>The Power of Teams.</Text>
      <Text>
      Team quizzes can be a fantastic way to build teamwork and communication skills. Discussing answers, strategizing, and celebrating together.{'\n'}{'\n'}
      </Text>

      <Text style={styles.headerTwo}>Beyond the General.</Text>
      <Text>
      While general knowledge quizzes are popular, there's a whole world of niche quizzes out there, so get hooked.{'\n'}{'\n'}
      </Text>

      <View style={styles.horizontalLine} />

      <Text style={styles.headerTwo}>{'\n'}{'\n'}Legal Documentation</Text>
      <Text>In the below links you will find the various legal documentation pertaining to the usage of this app {'\('}Polymath{'\)'}{'\n'}{'\n'}</Text>

      <Pressable onPress={() => navigation.navigate("Terms")}>
      <Text style={{ color: 'blue' }}>
        Terms of Service{'\n\n'}
      </Text>
      </Pressable>

      <Text style={{ color: 'blue' }} onPress={() => navigation.navigate("Privacy")}>
        Privacy Policy{'\n'}{'\n'}
      </Text>

      <Text style={{ color: 'blue' }} onPress={() => navigation.navigate("Cookies")}>
        Cookies Policy{'\n'}{'\n'}
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
  headerOne: {
    fontSize: 24,
    fontWeight: 'bold', 
  },
  headerTwo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default AboutScreen;
