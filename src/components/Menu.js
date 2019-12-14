import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, AsyncStorage, Platform, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserAlt, faBuilding, faFolder, faUserPlus, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { gitUser } from 'api-github-cli';

import User from './User';
import Repos from './Repos';
import Orgs from './Orgs';
import Follow from './Follow';

export default function Menu(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if(!user)
    AsyncStorage.getItem('user_login').then(login => {
      gitUser(login).then(data => {
        setUser({...data});
      });
    }).catch(_ => {
      if(Platform.OS === 'ios') {
        Alert.alert('Atenção: ', 'Não foi possível recuperar o usuário. Por favor, faça login novamente.');
      } else {
        alert('Não foi possível recuperar o usuário. Por favor, faça login novamente.');
      }
      handleExit();
    })
  }, [])

  const handleExit = () => {
    AsyncStorage.clear();
    props.callback.navigation.navigate('Login');
  }

  const Componente = createAppContainer(
    createStackNavigator({
      Home: {
        screen: (
          createBottomTabNavigator({
            User: {
              screen: () => <User user={user} />,
              navigationOptions: {
                tabBarIcon: <FontAwesomeIcon icon={faUserAlt} color="#4F697D" size={20} />,
              },
            },
            Repos: {
              screen: () => <Repos user={user} />,
              navigationOptions: {
                tabBarIcon: <FontAwesomeIcon icon={faFolder} color="#4F697D" size={21} />,
              },
            },
            Orgs: {
              screen: () => <Orgs user={user} />,
              navigationOptions: {
                tabBarIcon: <FontAwesomeIcon icon={faBuilding} color="#4F697D" size={20} />,
              },
            },
            Follow: {
              screen: () => <Follow user={user} call={props} />,
              navigationOptions: {
                tabBarIcon: <FontAwesomeIcon icon={faUserPlus} color="#4F697D" size={22} />,
              },
            },
          },{ initialRouteName: 'User'})
        ),
        navigationOptions: {
          title: 'Github API',
          headerRight: () => (
            <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={handleExit} >
              <FontAwesomeIcon icon={faPowerOff} size={20} />
            </TouchableOpacity>
          )
        }
      }
    }, { initialRouteName: 'Home'})
  )

  return <Componente />
}
