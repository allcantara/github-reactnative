import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default (props) => {
  const [user, setUser] = useState({avatar_url: '', name: '', bio: '', location: '', public_repos: false});

  useEffect(() => {
    if(props.user) {
      setUser(props.user);
    }
  }, []);

  return (
    <View style={styles.container}>
      {
        props.user
        ? (
          <>
          <View style={styles.header} >
            <Image style={styles.avatar} source={{uri: user.avatar_url}} />
          </View>
          <View style={styles.datauser}>
            <View style={styles.center}>
              <Text style={styles.title}>Username:</Text>
              <Text style={styles.username}>{user.name}</Text>
    
              <Text style={styles.titlesub}>Bio:</Text>
              <Text style={styles.sub}>{user.bio}</Text>
    
              <Text style={styles.titlesub}>Location:</Text>
              <Text style={styles.sub}>{user.location}</Text>
    
              <Text style={styles.titlesub}>Public Repos:</Text>
              <Text style={styles.sub}>{user.public_repos}</Text>
            </View>
          </View>
          </>
        )
        : (
          <View style={{ flex: 1, paddingVertical: 200 }}>
            <ActivityIndicator size="large" color="#4F697D" />
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: '#081C2A'
  },
  avatar: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  datauser: {
    alignItems: 'center'
  },
  center: {
    width: '90%',
    minHeight: '100%',
    backgroundColor: '#fff',
    marginTop: -40,
    paddingVertical: 10,
    borderColor: '#E8EAEB',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1
  },
  title: {
    fontSize: 10,
    color: '#4F697D',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  titlesub: {
    fontSize: 10,
    color: '#4F697D',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  username: {
    fontSize: 26,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: '#081C2A',
  },
  sub: {
    fontSize: 16,
    paddingHorizontal: 20,
    fontWeight: '400',
    color: '#081C2A'
  }
})
