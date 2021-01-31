import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
import Login from '../pages/login';
import RedefinirSucesso from '../pages/redefinirSucesso';


function menu() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Login} />
      <Tab.Screen name="Settings" component={RedefinirSucesso} />
    </Tab.Navigator>
  );
}

export default menu;