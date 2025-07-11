import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import type { AxiosRequestConfig, AxiosError } from "axios"
import apiClient from "./apiClient"

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string
    method?: AxiosRequestConfig["method"]
    data?: AxiosRequestConfig["data"]
    params?: AxiosRequestConfig["params"]
  }> =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await apiClient({ url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      }
    }
  }
