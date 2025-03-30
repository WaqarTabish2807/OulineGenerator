import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

type RequestOptions = {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
};

export async function apiRequest(
  method: string,
  url: string,
  body?: any,
  options?: RequestOptions
): Promise<Response> {
  const defaultOptions: RequestOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  };

  if (body) {
    defaultOptions.body = JSON.stringify(body);
  }

  const mergedOptions = { ...defaultOptions, ...options };
  
  return fetch(url, mergedOptions as RequestInit);
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
