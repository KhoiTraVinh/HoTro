import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LoginInput from '../components/LoginInput';
import LoginButton from '../components/LoginButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';

export default function Login({navigation}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login, googleLogin, fbLogin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.appText}>Schedule App</Text>

      <LoginInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <LoginInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Mật khẩu"
        iconType="lock"
        secureTextEntry={true}
      />

      <LoginButton buttonTitle="Đăng nhập" onPress={() => login(email, password)} />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => alert('Click')}>
        <Text style={styles.navButtonText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <View>
        <SocialButton
          buttonTitle="Đăng nhập với Facebook"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => fbLogin()}
        />

        <SocialButton
          buttonTitle="Đăng nhập với Google"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => googleLogin()}
        />
      </View>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>Tạo tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  appText: {
    fontSize: 35,
    color: '#FF9966',
    alignSelf: 'center',
    marginBottom: 50,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ddd',
    paddingTop: 10,
  },
});
