export const logout = async () => {
  try {
    // Call the backend logout endpoint
    await api.post('/api/auth/logout');

    // Remove auth tokens from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Clear any cookies (important for CSRF tokens or session cookies)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove tokens and redirect even if the server call fails
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};