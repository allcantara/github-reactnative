import { createAppContainer, createSwitchNavigator } from 'react-navigation';
console.disableYellowBox = true;
import Login from './components/Login';
import Main from './components/Main';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
);