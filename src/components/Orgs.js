import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, FlatList, Text, Platform, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { gitOrgs } from 'api-github-cli';

export default props => {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(props && orgs.length === 0) {
      AsyncStorage.getItem('user_login').then(login => {
        gitOrgs(login).then(data => {
          setOrgs([...data]);
          if(orgs.length === 0) setLoading(false);
        }).catch(() => {
          setLoading(false);
          mensagens('Não foi possível recuperar a lista de repositórios.');
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

  const Orgs = props => 
    <View style={styles.repo} >
      <View style={{alignItems: 'center' }}>
        <Image style={styles.avatar} source={{uri: props.avatar_url ? props.avatar_url : null }} />
        <Text style={styles.infoname}>{props.login}</Text>
      </View>
      <Text style={styles.title}>Description:</Text>
      <Text style={styles.info}>{props.description}</Text>
    </View>

  const renderItem = ({item}) => {
    return <Orgs {...item} />
  }

  const Loading = () => {
    return (
      <View style={{ flex: 1, paddingVertical: 250 }}>
        <ActivityIndicator size="large" color="#4F697D" />
      </View>
    )
  }

  const List = () => {
    return <FlatList 
      data={orgs} 
      renderItem={renderItem} 
      ListFooterComponent={loading && <Loading />}
      keyExtractor={(_, index) => index.toString()} 
    />
  }

  return (
    <ScrollView style={styles.container}>
      <List />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#081C2A'
  },

  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 100,
  },

  repo: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 25,
    borderRadius: 10
  },

  title: {
    fontSize: 10,
    color: '#4F697D',
    paddingTop: 5,
  },

  infoname: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#081C2A',
  },

  info: {
    fontSize: 15,
    fontWeight: '400',
    color: '#081C2A'
  },

  notList: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 30
  }

})
