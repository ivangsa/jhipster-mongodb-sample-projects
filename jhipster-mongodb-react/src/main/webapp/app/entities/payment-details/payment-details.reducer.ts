import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaymentDetails, defaultValue } from 'app/shared/model/payment-details.model';

export const ACTION_TYPES = {
  FETCH_PAYMENTDETAILS_LIST: 'paymentDetails/FETCH_PAYMENTDETAILS_LIST',
  FETCH_PAYMENTDETAILS: 'paymentDetails/FETCH_PAYMENTDETAILS',
  CREATE_PAYMENTDETAILS: 'paymentDetails/CREATE_PAYMENTDETAILS',
  UPDATE_PAYMENTDETAILS: 'paymentDetails/UPDATE_PAYMENTDETAILS',
  DELETE_PAYMENTDETAILS: 'paymentDetails/DELETE_PAYMENTDETAILS',
  RESET: 'paymentDetails/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaymentDetails>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PaymentDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: PaymentDetailsState = initialState, action): PaymentDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYMENTDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYMENTDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYMENTDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_PAYMENTDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_PAYMENTDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYMENTDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYMENTDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_PAYMENTDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_PAYMENTDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_PAYMENTDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENTDETAILS_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENTDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYMENTDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYMENTDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYMENTDETAILS):
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

const apiUrl = 'api/payment-details';

// Actions

export const getEntities: ICrudGetAllAction<IPaymentDetails> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PAYMENTDETAILS_LIST,
    payload: axios.get<IPaymentDetails>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPaymentDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYMENTDETAILS,
    payload: axios.get<IPaymentDetails>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPaymentDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYMENTDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaymentDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYMENTDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaymentDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYMENTDETAILS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
