import React, {useRef, useCallback} from 'react';
import {
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

import {useAuth} from '../../../Auth/Hooks/Auth';

import * as Yup from 'yup';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import {
  Container,
  Title,
  BackToProfileButton,
  BackToProfileButtonText
} from './styles';

const UpdateProfile: React.FC = () => {
  const {updateProfileData, revalidateUserCredentials} = useAuth();

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const newEmailInputRef = useRef<TextInput>(null);

  const newPasswordInputRef = useRef<TextInput>(null);

  const newPasswordConfirmInputRef = useRef<TextInput>(null);

  const passwordConfirmInputRef = useRef<TextInput>(null);

  interface UpdateFormData{
    newUsername: string,
    newEmail: string,
    newPassword: string,
    newPasswordConfirm: string,
    passwordConfirm: string,
  }

  const handleUpdate = useCallback(async (data: UpdateFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        newUsername: Yup.string().required('Nome obrigatório'),
        newEmail: Yup.string().required('Email obrigatório').email('Digite um e=mail válido'),
        newPassword: Yup.string().min(6, 'No minimo 6 digitos'),
        newPasswordConfirm: Yup.string().required('Confirmação obrigatoria').when('newPassword', {
          is: (val: string | any[]) => (!!(val && val.length > 0)),
          then: Yup.string().oneOf(
            [Yup.ref('newPassword')],
            'As senhas devem ser iguais',
          ),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      revalidateUserCredentials(data.passwordConfirm).then((auth) => {
        if (auth){
          updateProfileData({
            newName: data.newUsername,
            newEmail: data.newEmail,
            newPassword: data.newPassword,
          });
        }
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro na Atualização.',
        'Ocorrreu um erro ao atualizar seus dados, tente novamente.'
      )
    }
  }, []);

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
            <View>
              <Title>Atualize seus Dados!</Title>
            </View>
            <Form
              ref={formRef}
              onSubmit={handleUpdate}
            >
              <Input
                autoCapitalize = "words"
                name="newUsername"
                icon="user"
                placeholder="Novo nome"
                returnKeyType = "next"
                onSubmitEditing={() =>{
                  newEmailInputRef.current?.focus();
                }}
              />

              <Input
                ref={newEmailInputRef}
                keyboardType = "email-address"
                autoCorrect = {false}
                autoCapitalize = "none"
                name="newEmail"
                icon="mail"
                placeholder="Novo e-mail"
                returnKeyType = "next"
                onSubmitEditing={() =>{
                  newPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={newPasswordInputRef}
                secureTextEntry
                name="newPassword"
                icon="lock"
                placeholder="Nova senha"
                textContentType = "newPassword"
                returnKeyType = "next"
                onSubmitEditing={() =>{
                  newPasswordConfirmInputRef.current?.focus();
                }}
              />

              <Input
                ref={newPasswordConfirmInputRef}
                secureTextEntry
                name="newPasswordConfirm"
                icon="lock"
                placeholder="Confirme a nova senha"
                textContentType = "newPassword"
                returnKeyType = "next"
                onSubmitEditing={()=>{
                  passwordConfirmInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordConfirmInputRef}
                secureTextEntry
                name="passwordConfirm"
                icon="lock"
                placeholder="Confirme a senha atual"
                textContentType = "newPassword"
                returnKeyType = "send"
                onSubmitEditing={()=>{
                  formRef.current?.submitForm();
                }}
              />


              <Button
                id={'ConfirmUpdateDataButton'}
                testID={'ConfirmUpdateButton'}
                onPress={()=>{
                  formRef.current?.submitForm()
                }}
              >
                Atualizar
              </Button>
            </Form>
          </Container >
        </ScrollView>
        <BackToProfileButton
          testID={'BackToProfileButton'}
          onPress={()=>{
              navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="#6F9F77" />
          <BackToProfileButtonText>Cancelar</BackToProfileButtonText>
        </BackToProfileButton>
      </KeyboardAvoidingView>
    </>
  );
}

export default UpdateProfile;
