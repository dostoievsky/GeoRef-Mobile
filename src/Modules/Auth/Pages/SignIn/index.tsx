import React, {useCallback, useRef} from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {useAuth} from '../../Hooks/Auth';

import * as Yup from 'yup';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';


import logoImg from '../../../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';

interface SingInFormData{
  email: string,
  password: string;
}

const SignIn: React.FC = () => {
  const {signIn} = useAuth();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSingIn = useCallback(async (data: SingInFormData) => {
    try {

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha Obrigatoria'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      console.log(err);

      Alert.alert(
        'Erro na autenticação.',
        'Ocorrreu um erro ao fazer login, cheque as credenciais.'
      )
    }
  }, [signIn]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu LogIn!</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSingIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() =>{
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={()=>{
                  formRef.current?.submitForm();
                }}
              />
              <Button
                testID={'ConfirmSignInButtom'}
                onPress={()=>{
                  formRef.current?.submitForm();
                }}
              >Entrar</Button>
            </Form>
            <ForgotPassword onPress={()=>{
              console.log('Apertou');
            }}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container >
        </ScrollView>

        <CreateAccountButton
          testID={'GoToSignUpButtom'}
          onPress={()=>{
              navigation.navigate("SignUp");
          }}
        >
          <Icon name="log-in" size={20} color="#6F9F77" />
          <CreateAccountButtonText>Criar uma Conta</CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignIn;
