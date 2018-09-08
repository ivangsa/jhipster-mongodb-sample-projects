import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaymentDetails from './payment-details';
import PaymentDetailsDetail from './payment-details-detail';
import PaymentDetailsUpdate from './payment-details-update';
import PaymentDetailsDeleteDialog from './payment-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaymentDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaymentDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaymentDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={PaymentDetails} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PaymentDetailsDeleteDialog} />
  </>
);

export default Routes;
