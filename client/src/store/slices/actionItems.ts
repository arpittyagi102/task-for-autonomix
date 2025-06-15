import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionItem } from '@/lib/types';

const initialState = [] as ActionItem[];

const actionItemsSlice = createSlice({
    name: "ActionItems",
    initialState,
    reducers: {
        addActionItem: (state, action: PayloadAction<ActionItem>) => {
            state.push(action.payload);
        },

        addMultipleActionItems: (state, action: PayloadAction<ActionItem[]>) => {
            state.push(...action.payload);
        },

        removeActionItem: (state, action: PayloadAction<string>) => {
            return state.filter(item => item.id !== action.payload);
        },

        toggleActionItemCompletion: (state, action: PayloadAction<string>) => {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.isCompleted = !item.isCompleted;
            }
        },

        updatePriority: (state, action: PayloadAction<{ id: string; priority: 1 | 2 | 3 }>) => {
            const item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.priority = action.payload.priority;
            }
        },


        clearActionItems: () => {
            return [];
        }
    },
});

export const { addActionItem, addMultipleActionItems, removeActionItem, toggleActionItemCompletion, updatePriority, clearActionItems } = actionItemsSlice.actions;
export default actionItemsSlice.reducer;

