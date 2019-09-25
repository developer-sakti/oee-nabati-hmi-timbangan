import React from 'react';

const Reducer = (state, action) => {
    switch(action.type) {
        case 'set_time':
            return { ...state, time: action.value };
        case 'set_connection':
            return { ...state, isConnected: action.value };
        case 'set_machines':
            return { ...state, machines: action.value };
        case 'set_lines':
            return { ...state, lines: action.value };
        case 'set_shifts':
            return { ...state, shifts: action.value };
        case 'set_categories':
            return { ...state, categories: action.value };
        case 'set_selected_machine':
            return { ...state, selectedMachine: action.value };
        case 'set_selected_line':
            return { ...state, selectedLine: action.value };
        case 'set_selected_category':
            return { ...state, selectedCategory: action.value };
        case 'set_selected_date':
            return { ...state, selectedDate: action.value };
        case 'set_selected_shift':
            return { ...state, selectedShift: action.value };
        case 'set_weight':
            return { ...state, weight: action.value };
        case 'set_selected_production_plan':
            return { ...state, selectedProductionPlan: action.value };
        case 'set_selected_pro':
            return { ...state, selectedPro: action.value };
        case 'set_pros':
            return { ...state, pros: action.value };
        case 'set_histories':
            return { ...state, histories: action.value };
        case 'clear_input':
            return { ...state, 
                selectedMachine: '',
                selectedLine: '',
                selectedCategory: '',
                selectedProductionPlan: {},
                selectedShift: '',
                selectedDate: '',
                selectedPro: '',
                pros: [],
                weight: 1
            }
        default:
            return state;
    }
};

const Context = React.createContext();

export { Reducer, Context };
export { default as Store } from './store';