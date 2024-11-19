document.getElementById('loginBtn').addEventListener('click', () => {
    alert('Login button clicked!');
  });

  document.getElementById('signupBtn').addEventListener('click', () => {
    alert('SignUp button clicked!');
  });
  
// JavaScript for Modal Behavior
document.getElementById('loginBtn').addEventListener('click', () => {
    document.getElementById('loginModal').classList.add('show');
  });
  
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('loginModal').classList.remove('show');
  });
  
  // Optional: Add functionality for login buttons
  document.getElementById('googleLogin').addEventListener('click', () => {
    alert('Redirecting to Google login...');
    // Add your Google login functionality here
  });
  
  document.getElementById('o365Login').addEventListener('click', () => {
    alert('Redirecting to Microsoft O365 login...');
    // Add your O365 login functionality here
  });
