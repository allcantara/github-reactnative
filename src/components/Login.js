import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Platform,
} from 'react-native';

import { gitUser } from 'api-github-cli';

// @ts-ignore
import logo from '../assets/logo.gif';

export default props => {
  const [login, setLogin] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user_login').then(data => {
      if(data) {
        props.navigation.navigate('Main', { data });
      }
  })
  }, [])

  const handleLogin = async () => {
    gitUser(login).then(user => {
      AsyncStorage.setItem('user_login', user.login);
      props.navigation.navigate('Main', { props });
    }).catch(() => {
      if(Platform.OS === 'ios') {
        Alert.alert('Atenção: ', 'Este usuário não existe!');
      } else {
        alert('Este usuário não existe!');
      }
    })
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={true}
      style={styles.container}
    >
      <Image source={logo} style={{ maxWidth: 100, maxHeight: 100 }} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder="Digite seu usuário do GitHub:" 
        placeholderTextColor="#999"
        value={login}
        onChangeText={setLogin}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop:  20,
    paddingHorizontal: 15,
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#4F697D',
    borderRadius:4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
})
