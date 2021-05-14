import React, { useCallback } from 'react';

import {
  Alert,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../../Auth/Hooks/Auth';

import {
  Container,
  ProfileButton,
  UserAVatar,
  Title,
  OptionsButtons,
  OptionsButtonsText,
  SingOutButton,
  SingOutButtonText,
} from './styles';

interface ProfileProps {
  type?: 'viewProfile' | 'UpdateProfile';
}


const Profile: React.FC = () => {
  const {signOut, user, updateProfileData} = useAuth();

  const navigation = useNavigation();

  const handleUpdateAvatar = useCallback(() => {

    /*launchImageLibrary({
      mediaType: 'photo',
    }, response => {

    if (response.didCancel) {
      return;
    }

    if (response.errorCode) {
      Alert.alert('Erro ao atualizar foto de perfil.');
      return;
    }

    const source = { uri: response.uri };
    if (source.uri != undefined) {
      updateProfileData(source.uri);
      console.log(user.photoURL, 'userPhotoFB');
    }
    });*/

    launchCamera({
      mediaType: 'photo',
    }, response => {

    if (response.didCancel) {
      return;
    }

    if (response.errorCode) {
      Alert.alert('Erro ao atualizar foto de perfil.');
      return;
    }
    const source = { uri: response.uri };
    if (source.uri != undefined) {
      updateProfileData({picture: source.uri});
      console.log(user.photoURL, 'userPhotoFB');
    }
    });

  }, [updateProfileData, user.photoURL]);

  return (
    <Container>

      <ProfileButton onPress={handleUpdateAvatar}>
        <UserAVatar source={{uri: user.photoURL?.toString()}} />
      </ProfileButton>

      <View>
        <Title>{user.displayName}</Title>
      </View>

      <OptionsButtons onPress={()=>{
           navigation.navigate('UpdateProfile');
        }}>
          <OptionsButtonsText>Autalizar Dados</OptionsButtonsText>
      </OptionsButtons>

      <OptionsButtons onPress={()=>{
            navigation.navigate('Projects');
        }}>
          <OptionsButtonsText>Meus Projetos</OptionsButtonsText>
      </OptionsButtons>

      <SingOutButton onPress={()=>{
            signOut();
        }}>
          <Icon name="power" size={20} color="#FF6C01" />
          <SingOutButtonText>Sair</SingOutButtonText>
      </SingOutButton>
    </Container>
  )
}

export default Profile;
