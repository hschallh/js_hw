(function() {
  window.onclick = close_all;
  window.onkeydown = key_pressed;
})();

/**
 * Opens a menu and closes all other open menus or closes a menu. Called when a
 * menu is clicked
 */
function menu_click(clicked_menu) {
  // Close any open menus when opening a menu
  if (!clicked_menu.classList.contains('open')) {
    close_all();
  }

  toggle(clicked_menu);

  // Keep the window.onclick event from calling close_all()
  event.stopPropagation();
}

/**
 * Toggles a menu open or closed
 */
function toggle(menu) {
  menu.classList.toggle('open');

  // Links within closed menus should not be reachable via the tab button
  let links = menu.querySelectorAll('a');
  links.forEach(
    link => (link.tabIndex = menu.classList.contains('open') ? 0 : -1)
  );
}

/**
 * Closes any and all open menus. Called when anywhere but a menu is clicked.
 */
function close_all() {
  document.querySelectorAll('.open').forEach(open_menu => toggle(open_menu));
}

/**
 * Called when any keyboard key is pressed.
 *  - Esc closes all open menus
 *  - Right/left arrows cycle through open menus
 */
function key_pressed(event) {
  switch (event.keyCode) {
    case 27:
      close_all();
      break;
    case 37:
      open_prev_menu();
      break;
    case 39:
      open_next_menu();
      break;
    default:
      break;
  }
}

/**
 * Opens the menu to the right of the open menu or the first menu if none are
 * yet open
 */
function open_next_menu() {
  let open_menu = document.querySelector('.open'),
    next_menu =
      (open_menu && open_menu.nextElementSibling) ||
      document.querySelector('.menu_container');

  menu_click(next_menu);
}

/**
 * Opens the menu to the left of the open menu or the last menu if none are yet
 * open
 */
function open_prev_menu() {
  let open_menu = document.querySelector('.open'),
    next_menu =
      (open_menu && open_menu.previousElementSibling) ||
      document.querySelector('.menu_container:last-of-type');

  menu_click(next_menu);
}
