import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IShippingDetails, defaultValue } from 'app/shared/model/shipping-details.model';

export const ACTION_TYPES = {
  FETCH_SHIPPINGDETAILS_LIST: 'shippingDetails/FETCH_SHIPPINGDETAILS_LIST',
  FETCH_SHIPPINGDETAILS: 'shippingDetails/FETCH_SHIPPINGDETAILS',
  CREATE_SHIPPINGDETAILS: 'shippingDetails/CREATE_SHIPPINGDETAILS',
  UPDATE_SHIPPINGDETAILS: 'shippingDetails/UPDATE_SHIPPINGDETAILS',
  DELETE_SHIPPINGDETAILS: 'shippingDetails/DELETE_SHIPPINGDETAILS',
  RESET: 'shippingDetails/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IShippingDetails>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ShippingDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: ShippingDetailsState = initialState, action): ShippingDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SHIPPINGDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SHIPPINGDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SHIPPINGDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_SHIPPINGDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_SHIPPINGDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SHIPPINGDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SHIPPINGDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_SHIPPINGDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_SHIPPINGDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_SHIPPINGDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHIPPINGDETAILS_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHIPPINGDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SHIPPINGDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_SHIPPINGDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SHIPPINGDETAILS):
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

const apiUrl = 'api/shipping-details';

// Actions

export const getEntities: ICrudGetAllAction<IShippingDetails> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SHIPPINGDETAILS_LIST,
    payload: axios.get<IShippingDetails>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IShippingDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SHIPPINGDETAILS,
    payload: axios.get<IShippingDetails>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IShippingDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SHIPPINGDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IShippingDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SHIPPINGDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IShippingDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SHIPPINGDETAILS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
