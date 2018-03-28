# Named React Router

> Use named routes with react-router v4

[![npm version](https://img.shields.io/npm/v/named-react-router-dom.svg)](https://www.npmjs.org/package/named-react-router-dom)
[![Build Status](https://travis-ci.org/pedsmoreira/named-react-router.svg?branch=master)](https://travis-ci.org/pedsmoreira/named-react-router)
[![Maintainability](https://api.codeclimate.com/v1/badges/271c834b1aa022e56bd8/maintainability)](https://codeclimate.com/github/pedsmoreira/named-react-router/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/271c834b1aa022e56bd8/test_coverage)](https://codeclimate.com/github/pedsmoreira/named-react-router/test_coverage)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Install

```sh
npm install --save react-router-dom named-react-router-dom
```

_React Native: not available. PRs are welcome_

## API

### NamedRoute

```js
import { NamedRoute } from 'named-react-router-dom';

// Becomes /home
<NamedRoute name="home" component={Component} />

// Becomes /dashboard/home
<NamedRoute name="dashboard.home" component={Component} />

// Becomes /dashboard/overview
<NamedRoute name="dashboard.home" path="overview" component={Component} />

// Becomes /overview
<NamedRoute name="dashboard.home" path="overview" component={Component} noNamespacePath />
```

You can also add any other `<Route />` [properties from react-router-dom](https://reacttraining.com/react-router/web/api/Route)

### NamedLink

```js
import { NamedLink } from 'named-react-router-dom';

// Will redirect to dashboard.home, even if you use path="" on the <NamedRoute ... />
<NamedLink name="dashboard.home" />;

// Instead of <Link />, it will output a <NavLink />
<NamedLink name="dashboard.home" navLink />;
```

Aside from `name` and `navLink`, any other properties will be spread, so you can use them if you need.

`<Link />` [react-router-dom API](https://reacttraining.com/react-router/web/api/Link)

`<NavLink />` [react-router-dom API](https://reacttraining.com/react-router/web/api/NavLink)

### NamedRedirect

```js
import { NamedRedirect } from 'named-react-router-dom';

<NamedRedirect name="dashboard.home" from="/" />;
<NamedRedirect name="notFound" />;
```

Aside from `name`, any properties are spread to `<Redirect />`.

[<Redirect /> react-router-dom API](https://reacttraining.com/react-router/web/api/Redirect)

### NamedSwitch

The `Switch` that comes in react-router won't work out of the box, as it expects it's children to be either `Route` or `Redirect`.

To fix that, use `<NamedSwitch />`, which renders all children before passing them to `<Switch />`. This is achieved through the static method `render` on `NamedRoute` and `NamedRedirect`.

If you want to create your own `NamedComponent`, please take a look at the [`NamedRoute` implementation](https://github.com/pedsmoreira/named-react-router/blob/master/packages/named-react-router-dom/src/NamedRoute.js).

```js
import { NamedRedirect, NamedRoute, NamedSwitch } from 'named-react-router-dom';

<NamedSwitch>
  <NamedRoute name="home" />
  <NamedRoute name="settings" />
  <NamedRedirect name="home" from="/" />;
  <NamedRedirect name="notFound" />;
</NamedSwitch>;
```

## Flow support

All packages are built with flow and provide flow support from the get go. Flow will automatically include typings when you import `named-react-router-dom`.

To use the flow typings shipped:

* In `.flowconfig`, you cannot ignore `node_modules`.
* In `.flowconfig`, you cannot import it explicitly in the `[libs]` section.
* You **do not** need to install library definition using flow-typed.

## Resources

* [Contributing Guide](./CONTRIBUTING.md)
* [Code of Conduct](./CODE_OF_CONDUCT.md)
