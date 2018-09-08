import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomerOrder from './customer-order';
import CustomerOrderDetail from './customer-order-detail';
import CustomerOrderUpdate from './customer-order-update';
import CustomerOrderDeleteDialog from './customer-order-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerOrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomerOrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerOrderDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomerOrder} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CustomerOrderDeleteDialog} />
  </>
);

export default Routes;
