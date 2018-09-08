import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaymentDetails } from 'app/shared/model/payment-details.model';
import { getEntities as getPaymentDetails } from 'app/entities/payment-details/payment-details.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { IShippingDetails } from 'app/shared/model/shipping-details.model';
import { getEntities as getShippingDetails } from 'app/entities/shipping-details/shipping-details.reducer';
import { IOrderedItem } from 'app/shared/model/ordered-item.model';
import { getEntities as getOrderedItems } from 'app/entities/ordered-item/ordered-item.reducer';
import { getEntity, updateEntity, createEntity, reset } from './customer-order.reducer';
import { ICustomerOrder } from 'app/shared/model/customer-order.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICustomerOrderUpdateState {
  isNew: boolean;
  idsorderedItems: any[];
  paymentDetailsId: number;
  customerId: number;
  shippingDetailsId: number;
}

export class CustomerOrderUpdate extends React.Component<ICustomerOrderUpdateProps, ICustomerOrderUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsorderedItems: [],
      paymentDetailsId: 0,
      customerId: 0,
      shippingDetailsId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPaymentDetails();
    this.props.getCustomers();
    this.props.getShippingDetails();
    this.props.getOrderedItems();
  }

  saveEntity = (event, errors, values) => {
    values.date = new Date(values.date);

    if (errors.length === 0) {
      const { customerOrderEntity } = this.props;
      const entity = {
        ...customerOrderEntity,
        ...values,
        orderedItems: mapIdList(values.orderedItems)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/customer-order');
  };

  render() {
    const { customerOrderEntity, paymentDetails, customers, shippingDetails, orderedItems, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterMongodbReactApp.customerOrder.home.createOrEditLabel">
              <Translate contentKey="jhipsterMongodbReactApp.customerOrder.home.createOrEditLabel">
                Create or edit a CustomerOrder
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customerOrderEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="customer-order-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="jhipsterMongodbReactApp.customerOrder.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="customer-order-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    value={isNew ? null : convertDateTimeFromServer(this.props.customerOrderEntity.date)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="jhipsterMongodbReactApp.customerOrder.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="customer-order-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && customerOrderEntity.status) || 'CONFIRMED'}
                  >
                    <option value="CONFIRMED">
                      <Translate contentKey="jhipsterMongodbReactApp.OrderStatus.CONFIRMED" />
                    </option>
                    <option value="SHIPPED">
                      <Translate contentKey="jhipsterMongodbReactApp.OrderStatus.SHIPPED" />
                    </option>
                    <option value="DELIVERED">
                      <Translate contentKey="jhipsterMongodbReactApp.OrderStatus.DELIVERED" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="paymentDetails.creditCardNumber">
                    <Translate contentKey="jhipsterMongodbReactApp.customerOrder.paymentDetails">Payment Details</Translate>
                  </Label>
                  <AvInput id="customer-order-paymentDetails" type="select" className="form-control" name="paymentDetailsId">
                    <option value="" key="0" />
                    {paymentDetails
                      ? paymentDetails.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.creditCardNumber}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.username">
                    <Translate contentKey="jhipsterMongodbReactApp.customerOrder.customer">Customer</Translate>
                  </Label>
                  <AvInput id="customer-order-customer" type="select" className="form-control" name="customerId">
                    <option value="" key="0" />
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.username}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="shippingDetails.address">
                    <Translate contentKey="jhipsterMongodbReactApp.customerOrder.shippingDetails">Shipping Details</Translate>
                  </Label>
                  <AvInput id="customer-order-shippingDetails" type="select" className="form-control" name="shippingDetailsId">
                    <option value="" key="0" />
                    {shippingDetails
                      ? shippingDetails.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.address}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="orderedItems">
                    <Translate contentKey="jhipsterMongodbReactApp.customerOrder.orderedItems">Ordered Items</Translate>
                  </Label>
                  <AvInput
                    id="customer-order-orderedItems"
                    type="select"
                    multiple
                    className="form-control"
                    name="orderedItems"
                    value={customerOrderEntity.orderedItems && customerOrderEntity.orderedItems.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {orderedItems
                      ? orderedItems.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/customer-order" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  paymentDetails: storeState.paymentDetails.entities,
  customers: storeState.customer.entities,
  shippingDetails: storeState.shippingDetails.entities,
  orderedItems: storeState.orderedItem.entities,
  customerOrderEntity: storeState.customerOrder.entity,
  loading: storeState.customerOrder.loading,
  updating: storeState.customerOrder.updating
});

const mapDispatchToProps = {
  getPaymentDetails,
  getCustomers,
  getShippingDetails,
  getOrderedItems,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerOrderUpdate);
