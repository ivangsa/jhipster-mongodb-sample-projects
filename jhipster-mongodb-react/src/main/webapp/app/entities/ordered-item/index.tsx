import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OrderedItem from './ordered-item';
import OrderedItemDetail from './ordered-item-detail';
import OrderedItemUpdate from './ordered-item-update';
import OrderedItemDeleteDialog from './ordered-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OrderedItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OrderedItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OrderedItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={OrderedItem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={OrderedItemDeleteDialog} />
  </>
);

export default Routes;
