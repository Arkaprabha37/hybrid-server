'use strict';

const prependLocaleToPath = process.env.PREPEND_LOCALE_TO_PATH === 'true';
const prependSiteIdToPath = process.env.PREPEND_SITEID_TO_PATH === 'true';

const routes = [
  { path: '/registration' },
  { path: '/reset-password' },
  { path: '/my-account' },
  { path: '/ordersandreplenishment' },
  { path: '/account/orders/:orderNo' },
  { path: '/wishlist' },
  { path: '/search' },
  { path: '/s/shiseido_gc/home' }
];

const PWA_ROUTES = [
  {
    path: '/',
    exact: true
  },
  {
    path: '/home',
    exact: true
  },
  {
    path: '/login',
    exact: true
  },
  {
    path: '/callback'
  }
];

// add :locale and :siteId path to routes (RefArch/en-US)
const prependPath = [];
if (prependSiteIdToPath) {
  prependPath.push(':siteId');
}
if (prependLocaleToPath) {
  PWA_ROUTES.push({
    path: '/:locale',
    exact: false
  });
  prependPath.push(':locale');
}
if (prependPath.length) {
  PWA_ROUTES.push({
    path: `/${prependPath.join('/')}`,
    exact: false
  });
}

for (let i = 0; i < routes.length; i++) {
  let route = routes[i];
  PWA_ROUTES.push(route);

  // add :locale and :siteId path to routes
  if (prependPath.length) {
    PWA_ROUTES.push({ path: `/${prependPath.join('/')}${route.path}` });
  }
}

module.exports = PWA_ROUTES;
