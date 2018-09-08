import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOrderedItem, defaultValue } from 'app/shared/model/ordered-item.model';

export const ACTION_TYPES = {
  FETCH_ORDEREDITEM_LIST: 'orderedItem/FETCH_ORDEREDITEM_LIST',
  FETCH_ORDEREDITEM: 'orderedItem/FETCH_ORDEREDITEM',
  CREATE_ORDEREDITEM: 'orderedItem/CREATE_ORDEREDITEM',
  UPDATE_ORDEREDITEM: 'orderedItem/UPDATE_ORDEREDITEM',
  DELETE_ORDEREDITEM: 'orderedItem/DELETE_ORDEREDITEM',
  RESET: 'orderedItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOrderedItem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type OrderedItemState = Readonly<typeof initialState>;

// Reducer

export default (state: OrderedItemState = initialState, action): OrderedItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ORDEREDITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ORDEREDITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ORDEREDITEM):
    case REQUEST(ACTION_TYPES.UPDATE_ORDEREDITEM):
    case REQUEST(ACTION_TYPES.DELETE_ORDEREDITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ORDEREDITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ORDEREDITEM):
    case FAILURE(ACTION_TYPES.CREATE_ORDEREDITEM):
    case FAILURE(ACTION_TYPES.UPDATE_ORDEREDITEM):
    case FAILURE(ACTION_TYPES.DELETE_ORDEREDITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDEREDITEM_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDEREDITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ORDEREDITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_ORDEREDITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ORDEREDITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/ordered-items';

// Actions

export const getEntities: ICrudGetAllAction<IOrderedItem> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ORDEREDITEM_LIST,
    payload: axios.get<IOrderedItem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IOrderedItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ORDEREDITEM,
    payload: axios.get<IOrderedItem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOrderedItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ORDEREDITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOrderedItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ORDEREDITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOrderedItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ORDEREDITEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
