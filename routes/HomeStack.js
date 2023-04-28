import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ContactUs from '../screens/ContactUs';
import IntroPage from '../screens/IntroPage';
import Login from '../screens/LoginPage'
import SignUp from '../screens/SignUpPage'

const screens = {
    IntroPage: {
        screen: IntroPage,
        navigationOptions: {
            title: "Welcome to our app!",
            headerStyle: {
                backgroundColor: '#512819',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: "",
            headerLeft: ()=> null,
            headerStyle: {
                backgroundColor: '#472013',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }
        
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up",
            headerStyle: {
                backgroundColor: '#472013',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }
    },
    ContactUs: {
        screen: ContactUs,
        navigationOptions: {
            title: "Contact Us",
            headerStyle: {
                backgroundColor: '#472013',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);