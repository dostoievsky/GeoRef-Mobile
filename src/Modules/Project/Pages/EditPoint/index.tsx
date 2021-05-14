import React, {useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import {markerProps} from '../../Hooks/Mark';

import {
  Container,
  Title,
  BackToProfileButton,
  BackToProfileButtonText
} from './styles';

const EditPoint: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSavePoint = useCallback((description: string) => {
    console.log(description);
    Alert.alert('O ponto foi salvo com sucesso!');
    navigation.goBack();
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
              <Title>Adicionando Ponto</Title>
            </View>
            <Form
              ref={formRef}
              onSubmit={handleSavePoint}
            >
              <Input
                autoCapitalize = "words"
                name="description"
                icon="map-pin"
                placeholder="Descrição"
                returnKeyType = "send"
                onSubmitEditing={()=>{
                  formRef.current?.submitForm();
                }}
              />

              <Button
                testID={'ConfirmSaveProjectButton'}
                onPress={()=>{
                  formRef.current?.submitForm();
                }}
              >
                Salvar
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
          <BackToProfileButtonText>Voltar</BackToProfileButtonText>
        </BackToProfileButton>
      </KeyboardAvoidingView>
    </>
  );
}

export default EditPoint;
