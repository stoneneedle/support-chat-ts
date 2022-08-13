import { buildCreateApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Message {
  message: string
}

interface ChatRoom {
  messages: Message[]
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery ({
    baseUrl: 'https://localhost:5051/api/v1/messages',
    prepareHeaders(headers) {
      //headers.set('x-api-key', DOGS_API_KEY);

      return headers;
    }
  }),
  endpoints(builder) {
    return {
      fetchMessages: builder.query<[Message], string|void>({
        query() {
          // return `/breeds?limit=${limit}`;
          return ``;
        },
      }),
    };
  }
})

export const { useFetchMessagesQuery } = apiSlice;