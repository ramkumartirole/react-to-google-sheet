import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const GoogleSignIn = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:8000/auth/google',  { token: credentialResponse.credential },
  {
    withCredentials: true // Crucial for cookies
  });


      localStorage.setItem('token', res.data.token);
     localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard'; // Redirect after login
// console.log('Login success!', res.data);
    } catch (error) {
      console.error('Login failed:', error.response?.data);
    }
  };

  return (
    <GoogleOAuthProvider clientId="168014109778-urhjtcgnje3imrritees87l2o0vlh383.apps.googleusercontent.com"
    redirectUri={window.location.origin}>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed')}
        render={({ onClick }) => (
          <button
            onClick={onClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 15px',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            <FcGoogle size={20} />
            <span>Sign in with Google</span>
          </button>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;