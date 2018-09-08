import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from './customer';
import CustomerOrder from './customer-order';
import OrderedItem from './ordered-item';
import PaymentDetails from './payment-details';
import ShippingDetails from './shipping-details';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}/customer-order`} component={CustomerOrder} />
      <ErrorBoundaryRoute path={`${match.url}/ordered-item`} component={OrderedItem} />
      <ErrorBoundaryRoute path={`${match.url}/payment-details`} component={PaymentDetails} />
      <ErrorBoundaryRoute path={`${match.url}/shipping-details`} component={ShippingDetails} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
