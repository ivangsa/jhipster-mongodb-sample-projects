import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ShippingDetails from './shipping-details';
import ShippingDetailsDetail from './shipping-details-detail';
import ShippingDetailsUpdate from './shipping-details-update';
import ShippingDetailsDeleteDialog from './shipping-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ShippingDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ShippingDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ShippingDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={ShippingDetails} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ShippingDetailsDeleteDialog} />
  </>
);

export default Routes;
