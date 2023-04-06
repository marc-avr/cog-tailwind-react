import { Auth } from 'aws-amplify';

const getToken = async () => {
  try {
    const session = await Auth.currentSession();
    return session.accessToken.jwtToken;
  } catch (error) {
    console.log('error retrieving token', error);
    return null;
  }
};

export default getToken;