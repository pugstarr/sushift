import { createSlice } from '@reduxjs/toolkit';

export const orgSlice = createSlice({
    name:'org',
    initialState:{
        orgId: null,
        joinCode: null, //for da future!
    },
    reducers: {
        setOrg: (state, action) => {
            const { orgId, joinCode } = action.payload;
            state.orgId = orgId;
            state.joinCode = joinCode;
        }
    }
});

export const{setOrg} = orgSlice.actions;

export default orgSlice.reducer;