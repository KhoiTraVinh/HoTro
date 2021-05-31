import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LoginInput from '../components/LoginInput';
import LoginButton from '../components/LoginButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';

export default function Signup({navigation}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <LoginInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user-follow"
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

      <LoginInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setConfirmPassword(userPassword)}
        placeholderText="Xác nhận mật khẩu"
        iconType="lock"
        secureTextEntry={true}
      />

      <LoginButton buttonTitle="Đăng ký" onPress={() => register(email, password)} />

      <View style={styles.textPrivate}>
        <Text style={styles.colorTextPrivate}>
          Bằng cách đăng ký bạn đồng ý với{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Clicked')}>
          <Text style={[styles.colorTextPrivate, {color: '#e88832'}]}>
            Điều khoản dịch vụ
          </Text>
        </TouchableOpacity>
        <Text style={styles.colorTextPrivate}> và </Text>
        <TouchableOpacity onPress={() => alert('Clicked')}>
          <Text style={[styles.colorTextPrivate, {color: '#e88832'}]}>
            Điều khoản bảo mật
          </Text>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Đăng ký với Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => alert('Click')}
          />

          <SocialButton
            buttonTitle="Đăng ký với Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => alert('Click')}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appText: {
    fontSize: 35,
    color: '#FF9966',
    alignSelf: 'center',
    padding: 10,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ddd',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
    justifyContent: 'center',
  },
  forgotButton: {
    marginVertical: 25,
    marginBottom: -40,
  },
  colorTextPrivate: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
});
