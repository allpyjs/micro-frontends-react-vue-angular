import('./bootstrap')
  .then(({ bootstrap }) => bootstrap('#app'))
  .catch((err) => console.error(err));
