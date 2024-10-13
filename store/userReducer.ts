import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { User } from '../data'

const initialState: User = {
    id: "",
    firstName: "",
    lastName: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
        },
        clearUser: (state, action: PayloadAction<User>) => {
            state.id = ""
            state.firstName = ""
            state.lastName = ""
        },
    },
})

export const { createUser, clearUser } = userSlice.actions
export default userSlice.reducer