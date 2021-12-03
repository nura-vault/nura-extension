import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type PasswordListState = Password[]

export interface Password {
    identifier: string
    website: string
    username: string
    password: string
}

export const initialPasswordListState: PasswordListState = []

const addPassword = (state: PasswordListState, action: PayloadAction<Password>): PasswordListState => {
    return [...state, action.payload]
}

const clearPasswords = (state: PasswordListState): PasswordListState => {
    return []
}

export const vaultSlice = createSlice({
    name: 'vault',
    reducers: {
        addPassword,
        clearPasswords
    },
    initialState: initialPasswordListState
})

export const vault = vaultSlice.actions