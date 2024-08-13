const hardcodedUsername = 'admin';
const hardcodedPassword = 'password';

export const authenticateUser = (username: string, password: string) => {
  if (username === hardcodedUsername && password === hardcodedPassword) {
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('username', username);
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
};

export const logoutUser = () => {
  localStorage.removeItem('authenticated');
  localStorage.removeItem('username');
};
