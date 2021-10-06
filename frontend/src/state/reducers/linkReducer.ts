import linkService from '../../services/links';
import { Link, LinkAction, UpdateLink } from '../../types';
//import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

const reducer = (state: Array<Link> = [], action: LinkAction) => {
    switch(action.type) {
        case 'SET_LINKS_LIST':
            return action.data;
        case 'ADD_LINK': 
            return [...state, action.data];
        case 'UPDATE_LINK': 
            return state.map(l => l.id === action.data.id ? action.data : l);
        default: 
            return state;
    }
}
type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    LinkAction
>

export const createLink = (content: Link): AppThunk => {
    return async dispatch => {
        const dat = await linkService.addLink(content);
        if(dat) {
            dispatch({
                type: 'ADD_LINK',
                data: dat
            });
        }
    }
}

export const initializeLinks = (): AppThunk => {
    return async dispatch => {
        const data = await linkService.getAll();
        dispatch({
            type: 'SET_LINKS_LIST',
            data
        });
    }
}

export const updateLink = (id: Link['id'], updateLink: UpdateLink): AppThunk => {
    return async dispatch => {
        const data = await linkService.updateLink(id, updateLink);
        if(data) {
            dispatch({
                type: 'UPDATE_LINK',
                data
            });
        }
    }
}

export default reducer;