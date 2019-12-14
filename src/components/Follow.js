import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, FlatList, Text, Platform, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { gitFollowers } from 'api-github-cli';


export default props => {
  const [follow, setFollow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(props && follow.length === 0) {
      AsyncStorage.getItem('user_login').then(login => {
        gitFollowers(login).then(data => {
          setFollow([...data]);
          if(follow.length === 0) setLoading(false);
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

  const Follow = props => 
  <View style={styles.repo}>
    <View style={styles.body}>
      <Image style={styles.avatar} source={{uri: props.avatar_url ? props.avatar_url : null}} />
      <Text style={styles.infoname}>@{props.login}</Text>
    </View>
    <Text style={styles.title}>Url:</Text>
    <Text style={styles.info}>{props.html_url}</Text>
  </View>

  const renderItem = ({item}) => {
    return <Follow {...item} />
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
    data={follow} 
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

  body: {
    alignItems: 'center', 
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: 20
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
  }

})
