const toggle_dark_mode = () => { 
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}

document.addEventListener('keypress', function(event) {
  if (event.key === ' ') {
    toggle_dark_mode();
  }
});
