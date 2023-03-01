import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ImpactData from "./pages/impact-data/ImpactData";
import Login from "./pages/login/login";
import PageWrapper from "./pages/page-wrapper/PageWrapper";
import ImpactPerformance from "./pages/impact-performance/ImpactPerformance";
import ChangePassword from "./pages/change-password";
import Settings from "./pages/settings/Settings";
import {
  ACTIVATE_ACCOUNT_SESSION_ROUTE,
  BILLING_PAYMENT_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  EMAIL_SENT_ROUTE,
  FORGET_PASSWORD_ROUTE,
  GHC_INVENTORY_METHOD_ROUTE,
  GHC_TARGET_SETTING_ROUTE,
  IMPACT_DATA_ROUTE,
  IMPACT_PERFORMANCE_ROUTE,
  INVENTORY_EMISSIONS_ROUTE,
  LOGIN_ROUTE,
  MANAGE_SUPPLIERS_ROUTE,
  ROOT_ROUTE,
  SIGNUP_ROUTE,
  SUPPORTING_DOCUMENTS_ROUTE,
  USER_ROLES_ROUTE,
  SET_UP_SUBSCRIPTION_ROUTE,
  FINANCIAL_INFORMATION_ROUTE,
  CLIMATE_METRICS_ROUTE,
  TRACE_PERFORMANCE_ROUTE,
} from "./constants";
import ManageSuppliers from "./pages/manage-suppliers";
import { useAuth } from "./helpers/useAuth";
import TracePerformance from "./pages/trace-performance";

const Router = () => {
  const {
    loading,
    isAuthenticated,
    isProduction,
    isTraceAvailable,
    isImpactPerformanceAvailable,
    hasSubscription,
  } = useAuth();

  if (isImpactPerformanceAvailable) {
    routes.push(...IMPACT_PERFORMANCE_ROUTES, {
      authenticated: true,
      component: PageWrapper.bind(null, ImpactPerformance),
      exact: true,
      path: IMPACT_PERFORMANCE_ROUTE,
      permissions: [],
    });
  }

  if (isTraceAvailable) {
    routes.push(...TRACE_ROUTES);
  }

  if (!isProduction) {
    routes.push({
      authenticated: true,
      component: PageWrapper.bind(null, Settings),
      exact: true,
      path: BILLING_PAYMENT_ROUTE,
      permissions: [],
    });
  }

  return loading ? (
    <></>
  ) : (
    <Switch>
      <Route path={ROOT_ROUTE} exact>
        <Redirect
          to={hasSubscription ? IMPACT_DATA_ROUTE : SET_UP_SUBSCRIPTION_ROUTE}
        />
      </Route>
      {routes.map((route) => {
        if (route.authenticated) {
          return (
            <Route
              exact={route.exact}
              component={route.component}
              key={route.path}
              path={route.path}
            >
              {(!isAuthenticated || !hasSubscription) && (
                <Redirect
                  to={
                    !isAuthenticated ? LOGIN_ROUTE : SET_UP_SUBSCRIPTION_ROUTE
                  }
                />
              )}
            </Route>
          );
        } else
          return (
            <Route
              exact={route.exact}
              component={route.component}
              key={route.path}
              path={route.path}
            >
              {isAuthenticated && hasSubscription && (
                <Redirect to={ROOT_ROUTE} />
              )}
            </Route>
          );
      })}
    </Switch>
  );
};

export default Router;

const routes = [
  {
    authenticated: false,
    component: Login,
    exact: true,
    path: LOGIN_ROUTE,
    permissions: [],
  },
  {
    authenticated: false,
    component: Login,
    exact: true,
    path: SIGNUP_ROUTE,
    permissions: [],
  },
  {
    authenticated: false,
    component: Login,
    exact: true,
    path: ACTIVATE_ACCOUNT_SESSION_ROUTE,
    permissions: [],
  },
  {
    authenticated: false,
    component: Login,
    exact: true,
    path: SET_UP_SUBSCRIPTION_ROUTE,
    permissions: [],
  },
  {
    authenticated: true,
    component: PageWrapper.bind(null, ImpactData),
    exact: true,
    path: IMPACT_DATA_ROUTE,
    permissions: [],
  },
  {
    authenticated: true,
    component: PageWrapper.bind(null, ImpactData),
    exact: true,
    path: FINANCIAL_INFORMATION_ROUTE,
    permissions: [],
  },
  {
    authenticated: true,
    component: PageWrapper.bind(null, ImpactData),
    exact: true,
    path: GHC_INVENTORY_METHOD_ROUTE,
    permissions: [],
  },
  {
    authenticated: true,
    component: PageWrapper.bind(null, ImpactData),
    exact: true,
    path: INVENTORY_EMISSIONS_ROUTE,
    permissions: [],
  },
  {
    authenticated: false,
    component: Login,
    exact: true,
    key: "forget-password",
    path: FORGET_PASSWORD_ROUTE,
    permissions: [],
  },
  {
    authenticated: false,
    component: Login,
    exact: true,
    key: "email-sent",
    path: EMAIL_SENT_ROUTE,
    permissions: [],
  },
  {
    authenticated: false,
    component: Login,
    exact: true,
    key: "change-password",
    path: CHANGE_PASSWORD_ROUTE,
    permissions: [],
  },
  {
    authenticated: true,
    component: PageWrapper.bind(null, Settings),
    exact: true,
    path: USER_ROLES_ROUTE,
    permissions: [],
  },
];

const IMPACT_PERFORMANCE_ROUTES = [
  {
    authenticated: true,
    component: PageWrapper.bind(null, ImpactData),
    exact: true,
    path: GHC_TARGET_SETTING_ROUTE,
    permissions: [],
  },
  {
    authenticated: true,
    component: PageWrapper.bind(null, ImpactData),
    exact: true,
    path: CLIMATE_METRICS_ROUTE,
    permissions: [],
  },
  {
    authenticated: true,
    component: PageWrapper.bind(null, ImpactData),
    exact: true,
    path: SUPPORTING_DOCUMENTS_ROUTE,
    permissions: [],
  },
];

const TRACE_ROUTES = [
  {
    authenticated: true,
    component: PageWrapper.bind(null, ManageSuppliers),
    exact: true,
    path: MANAGE_SUPPLIERS_ROUTE,
    permissions: [],
  },
  {
    authenticated: true,
    component: PageWrapper.bind(null, TracePerformance),
    exact: true,
    path: TRACE_PERFORMANCE_ROUTE,
    permissions: [],
  },
];
