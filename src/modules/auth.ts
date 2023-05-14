// auth.ts module
import { router } from '../router';

// Define a method to get the token from local storage
const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Define a method to clear the token from local storage
  const clearToken = () => {
    localStorage.removeItem('token');
  };
  
  // Define a method to log the user out
  const logout = () => {
    clearToken();
    // Redirect the user to the login page or other appropriate page
    router.push('/login');
  };
  
  export { getToken, clearToken, logout };