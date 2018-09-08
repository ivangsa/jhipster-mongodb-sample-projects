import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomerOrder, defaultValue } from 'app/shared/model/customer-order.model';

export const ACTION_TYPES = {
  FETCH_CUSTOMERORDER_LIST: 'customerOrder/FETCH_CUSTOMERORDER_LIST',
  FETCH_CUSTOMERORDER: 'customerOrder/FETCH_CUSTOMERORDER',
  CREATE_CUSTOMERORDER: 'customerOrder/CREATE_CUSTOMERORDER',
  UPDATE_CUSTOMERORDER: 'customerOrder/UPDATE_CUSTOMERORDER',
  DELETE_CUSTOMERORDER: 'customerOrder/DELETE_CUSTOMERORDER',
  RESET: 'customerOrder/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomerOrder>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CustomerOrderState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomerOrderState = initialState, action): CustomerOrderState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERORDER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERORDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMERORDER):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMERORDER):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMERORDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERORDER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERORDER):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMERORDER):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMERORDER):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMERORDER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERORDER_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERORDER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMERORDER):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMERORDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMERORDER):
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

const apiUrl = 'api/customer-orders';

// Actions

export const getEntities: ICrudGetAllAction<ICustomerOrder> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERORDER_LIST,
    payload: axios.get<ICustomerOrder>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICustomerOrder> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERORDER,
    payload: axios.get<ICustomerOrder>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICustomerOrder> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMERORDER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomerOrder> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMERORDER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomerOrder> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMERORDER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
