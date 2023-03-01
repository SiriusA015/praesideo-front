import axios, { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { useHistory } from "react-router-dom";

import { LOGIN_ROUTE } from "../constants";
import LoginService from "../services/LoginService";
import ProductService from "../services/ProductService";
import {
  IMPACT_PERFORMANCE_VARIANT_NAME, TRACE_PRODUCT_NAME,
} from "../pages/set-up-subscription/constants";

const authContext = createContext({});

export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext<any>(authContext);
};

export interface User {
  username: string;
  companyId: number;
  roles: string[];
}

function useProvideAuth() {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [subscription, setSubscription] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isTraceAvailable, setTraceState] = useState(false);
  const [isImpactPerformanceAvailable, setImpactPerformanceState] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string) => {
    const { error, ...data } = await LoginService.login({ username, password });
    if (!error) {
      setUserAndToken(data);
      return data;
    } else {
      return { error };
    }
  };

  const interceptRes = (): any => {
    // Axios Interceptor redirects to signIn if jwt expired
    axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            logout();
          }
        }
        return Promise.reject(error);
      },
    );
  };

  const logout = () => {
    localStorage.clear();
    setToken("");
    history.push(LOGIN_ROUTE);
    setUser(null);
    setTraceState(false);
    setImpactPerformanceState(false);
    setIsAuthenticated(false);
    setHasSubscription(false);
  };

  const getSubscription = async () => {
    if (user) {
      const subscription =
        await ProductService.getProductSubscriptionByCompanyId(user.companyId);

      if (subscription.productVariantName?.includes(TRACE_PRODUCT_NAME)) {
        setTraceState(true);
        setImpactPerformanceState(true);
      } else if (subscription.productVariantName?.includes(IMPACT_PERFORMANCE_VARIANT_NAME)) {
        setImpactPerformanceState(true);
      }

      setSubscription(subscription.productVariantName);
      setHasSubscription(!!subscription);
    }
  };

  const isProduction = window.location.href.includes("apps.praesideo.earth");
  const isStage = window.location.href.includes("apps-uat.praesideo.earth");

  const setUserAndToken = (response: any) => {
    let user = {
      username: response.username,
      roles: response.roles,
      companyId: response.companyId,
      sector: response.industrySector,
      subSector: response.industrySubsector,
    };
    localStorage.setItem("token", response.authToken);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setToken(response.authToken);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    interceptRes();
    let localUser = localStorage.getItem("user");
    let localToken = localStorage.getItem("token");
    if (localUser && localToken) {
      setUser(JSON.parse(localUser) || undefined);
      setToken(localToken || "");
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getSubscription();
  }, [user]);

  // Return the user object and auth methods
  return {
    user,
    hasSubscription,
    isAuthenticated,
    isTraceAvailable,
    isImpactPerformanceAvailable,
    token,
    isProduction,
    isStage,
    login,
    logout,
    subscription,
    getSubscription,
    loading,
  };
}
