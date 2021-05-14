import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../../services/API';

import Icon from 'react-native-vector-icons/Feather';
import { Alert } from 'react-native';

import {useNavigation} from '@react-navigation/native';

interface AuthState{
  token: string;
  user: FirebaseAuthTypes.User;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface SingUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface UpdateProfileData {
  newName?: string;
  newEmail?: string;
  newPassword?: string;
  picture?: string;
}

interface ContextProps {
    user: FirebaseAuthTypes.User;
    token: string;
    loading: boolean;
    signIn(credentials: SingInCredentials): Promise<void>;
    signUp(credentials: SingUpCredentials): Promise<void>;
    signOut(): void;
    updateToken(): void;
    updateProfileData(newProfileData: UpdateProfileData): void;
    revalidateUserCredentials(password: string): Promise<boolean>;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void>{
      const [token, user] = await AsyncStorage.multiGet([
        '@GeoRef:Token',
        '@GeoRef:User',
      ]);
      if (token[1] && user[1]) {
        setData( {token: token[1], user: JSON.parse(user[1])} );
      }

      setLoading(false);
    }
    loadStoragedData();
  }, []);


  const signIn = useCallback(async (
    { email, password },
  ) => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      userCredential.user?.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
        const { user } = userCredential;
        await AsyncStorage.multiSet([
          ['@GeoRef:Token', idToken],
          ['@GeoRef:User', JSON.stringify(user)],
        ]);
        setData({ token: idToken, user });
      });
    }).catch((err) => {
      console.log(err, 'ERRO FIREBASE');
    });
  }, []);

  const signUp = useCallback(async (
    { name, email, password }: SingUpCredentials,
  ) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        userCredential.user?.updateProfile({
          displayName: name,
          photoURL: Icon.getImageSource('user').toString(),
        });
          userCredential.user?.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
            await api.post(
              'User',
              {
                name: name,
                squadID: 'squad4',
              },
              { headers: { authorization: `bearer ${idToken}` } },
            ).then((Response) => {
              console.log(Response, 'respostaApiInAuth');
              Alert.alert('Usuario cadastrado com sucesso!');
              useNavigation().goBack();
            }).catch(() => {
              Alert.alert('Credenciais invalidas!');
            });
          });
      }).catch(() => {
        Alert.alert('Credenciais invalidas!');
      });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GeoRef:Token',
      '@GeoRef:User',
    ]);
    setData({} as AuthState);
    firebase.auth().signOut();
  }, []);

  const revalidateUserCredentials = useCallback(async(password: string) => {

    const credential = await firebase.auth.EmailAuthProvider.credential(
      String(firebase.auth().currentUser?.email),
      password
    );
    if (
        await firebase.auth().currentUser?.reauthenticateWithCredential(credential).then(() => {
            return true;
        }).catch(() => {
            return false;
        })
    ) {
      return true;
    }else{
      return false;
    }
  }, []);

  const updateProfileData = useCallback(async  (
    { newName = '', newEmail = '', newPassword = '', picture = ''}: UpdateProfileData,
  ) => {
    const user = firebase.auth().currentUser;
    if (newName != '') {
      await user?.updateProfile({
        displayName: newName,
      });
    }

    if (newEmail != '') {
      await user?.updateEmail(newEmail);
    }

    if (newPassword != '') {
      await user?.updatePassword(newPassword);
    }

    if (picture != '') {
      await user?.updateProfile({
        photoURL: picture,
      });
    }
  }, []);

  const updateToken = useCallback(() => {
    firebase.auth().currentUser?.getIdToken(true).then(async (idToken) => {
      await AsyncStorage.setItem('@GeoRef:Token', idToken);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        loading,
        signIn,
        signUp,
        signOut,
        updateToken,
        updateProfileData,
        revalidateUserCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): ContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
