import React, {useRef, useCallback} from 'react';
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
  BackToSignInButton,
  BackToSignInButtonText
} from './styles';

const SignUp: React.FC = () => {
  const {signUp} = useAuth();

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);

  const passwordInputRef = useRef<TextInput>(null);

  const passwordConfirmInputRef = useRef<TextInput>(null);

  interface SingUpFormData{
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
  }

  const handleSingUp = useCallback(async (data: SingUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um e=mail válido'),
        password: Yup.string().min(6, 'No minimo 6 digitos'),
        passwordConfirm: Yup.string().required('Confirmação obrigatoria').when('password', {
          is: (val: string | any[]) => (!!(val && val.length > 0)),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            'As senhas devem ser iguais',
          ),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signUp({
        name: data.name,
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
        'Erro no cadastro.',
        'Ocorrreu um erro ao cadastrar, tente novamente.'
      )
    }
  }, [signUp]);

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
              <Title>Faça seu Cadastro!</Title>
            </View>
            <Form
              ref={formRef}
              onSubmit={handleSingUp}
            >
              <Input
                autoCapitalize = "words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType = "next"
                onSubmitEditing={() =>{
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType = "email-address"
                autoCorrect = {false}
                autoCapitalize = "none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType = "next"
                onSubmitEditing={() =>{
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType = "newPassword"
                returnKeyType = "next"
                onSubmitEditing={() =>{
                  passwordConfirmInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordConfirmInputRef}
                secureTextEntry
                name="passwordConfirm"
                icon="lock"
                placeholder="Confirme a senha"
                textContentType = "newPassword"
                returnKeyType = "send"
                onSubmitEditing={()=>{
                  formRef.current?.submitForm()
                }}
              />
              <Button
                id={'ConfirmSingUpButtom'}
                onPress={()=>{
                  formRef.current?.submitForm()
                }}
              >
                Cadastrar
              </Button>
            </Form>
          </Container >
        </ScrollView>
        <BackToSignInButton
          testID={'BackToSignInButtom'}
          onPress={()=>{
              navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="#6F9F77" />
          <BackToSignInButtonText>Voltar</BackToSignInButtonText>
        </BackToSignInButton>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignUp;
