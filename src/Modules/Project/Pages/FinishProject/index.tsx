import React, {useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import {
  Container,
  Title,
  BackToProfileButton,
  BackToProfileButtonText
} from './styles';

const FinishProject: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSaveProject = useCallback(() => {
    Alert.alert('O projeto foi salvo com sucesso!');
    navigation.navigate('Start');
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
              <Title>Finalize seu Projeto</Title>
            </View>
            <Form
              ref={formRef}
              onSubmit={handleSaveProject}
            >
              <Input
                autoCapitalize = "words"
                name="projectName"
                icon="map"
                placeholder="Nome do Projeto"
                returnKeyType = "next"
                onSubmitEditing={()=>{
                  formRef.current?.submitForm();
                }}
              />

              <Input
                autoCapitalize = "words"
                name="projectDescription"
                icon="file-text"
                placeholder="Descrição do Projeto"
                returnKeyType = "next"
                onSubmitEditing={()=>{
                  formRef.current?.submitForm();
                }}
              />

              <Button
                testID={'ConfirmSaveProjectButton'}
                onPress={()=>{
                  formRef.current?.submitForm()
                }}
              >
                Salvar Projeto
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

export default FinishProject;
