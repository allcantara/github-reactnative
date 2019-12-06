import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text, Platform, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { gitRepos } from 'api-github-cli';

export const Repos = props => 
  <View style={styles.repo} >
    <Text style={styles.title}>Name:</Text>
    <Text style={styles.infoname}>{props.name}</Text>
    <Text style={styles.title}>Full Name:</Text>
    <Text style={styles.info}>{props.full_name}</Text>
    <Text style={styles.title}>Private:</Text>
    <Text style={styles.info}>{props.private ? 'True' : 'False'}</Text>
    <Text style={styles.title}>Url:</Text>
    <Text style={styles.info}>{props.url}</Text>
    <Text style={styles.title}>Language:</Text>
    <Text style={styles.info}>{props.language}</Text>
  </View>

export default props => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    console.debug(props)
    if(props && repos.length === 0) {
      AsyncStorage.getItem('user_login').then(login => {
        gitRepos(login).then(data => {
          setRepos(data);
        }).catch(_ => {
          if(Platform.OS === 'ios') {
            mensagens('Não foi possível recuperar a lista de repositórios.');
          } else {
            mensagens('Não foi possível recuperar a lista de repositórios.');
          }
        })
      })
    } else {
      mensagens('Não foi possível recuperar a lista de repositórios.')
    }
  }, [])

  const mensagens = msg => {
    if(Platform.OS === 'ios') {
      Alert.alert('Atenção: ', msg);
    } else {
      alert(msg);
    }
  }

  const renderItem = ({item}) => {
    return <Repos {...item} />
  }

  return (
    <ScrollView style={styles.container}>
      {
        repos.length === 0
        ? (
          <View style={{ flex: 1, paddingVertical: 250 }}>
            <ActivityIndicator size="large" color="#4F697D" />
          </View>
        )
        : (<FlatList data={repos} renderItem={renderItem} keyExtractor={(_, index) => index.toString()} /> )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#081C2A'
  },

  repo: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 15,
    borderRadius: 10
  },

  title: {
    fontSize: 10,
    color: '#4F697D',
    paddingTop: 5,
  },

  infoname: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#081C2A',
  },

  info: {
    fontSize: 15,
    fontWeight: '400',
    color: '#081C2A'
  }

})
