import { apiSlice } from '../api/apiSlice';
import {
    userLoggedIn,
    userLoggedOut,
    userRegistration,
    userForgotPassword
} from './authSlice';

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type ResetResponse = {
    message: string;
    resetToken: string;
};

type ResetData = {};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints here
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: 'registration',
                method: 'POST',
                body: data,
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),
        //activation
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: 'activate-user',
                method: 'POST',
                body: {
                    activation_code,
                    activation_token
                }
            })
        }),
        //login
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: 'login',
                method: 'POST',
                body: {
                    email,
                    password
                },
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),
        //socialAuth
        socialAuth: builder.mutation({
            query: ({ email, name, avatar }) => ({
                url: 'social-auth',
                method: 'POST',
                body: {
                    email,
                    name,
                    avatar
                },
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (error: any) {
                    console.log(error.message);
                }
            }
        }),
        //logout
        logout: builder.query({
            query: () => ({
                url: 'logout',
                method: 'GET',
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLoggedOut());
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),

        //forgot password
        forgotPassword: builder.mutation<ResetResponse, ResetData>({
            query: (data) => ({
                url: 'forgot-password',
                method: 'POST',
                body: data,
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        userForgotPassword({
                            token: result.data.resetToken
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),

        resetPassword: builder.mutation({
            query: ({ newPassword, resetToken, resetCode }) => ({
                url: 'reset-password',
                method: 'PUT',
                body: {
                    newPassword,
                    resetToken,
                    resetCode
                },
                credentials: 'include' as const
            })
        })
    })
});

export const {
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useSocialAuthMutation,
    useLogoutQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApi;
