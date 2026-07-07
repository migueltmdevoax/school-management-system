import { apiSlice } from "../../../app/api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (b) => ({
    getMyConversations: b.query({ query: () => "/messages", providesTags: ["Messages"] }),
    getConversation:    b.query({ query: ({ otherUserId, studentId }) => `/messages/conversation?otherUserId=${otherUserId}&studentId=${studentId}`, providesTags: ["Messages"] }),
    sendMessage:        b.mutation({ query: (body) => ({ url: "/messages", method: "POST", body }), invalidatesTags: ["Messages"] }),
  }),
});
export const { useGetMyConversationsQuery, useGetConversationQuery, useSendMessageMutation } = messagesApi;