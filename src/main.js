// Granular dev TODOs (data-todo-dev) are for dev/preview only — stripped from
// production builds so real visitors never see in-progress markers.
if (import.meta.env.PROD) {
  document.querySelectorAll('[data-todo-dev]').forEach((el) => el.remove());
}
