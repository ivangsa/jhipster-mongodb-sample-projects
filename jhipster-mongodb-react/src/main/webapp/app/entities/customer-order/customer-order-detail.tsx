import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer-order.reducer';
import { ICustomerOrder } from 'app/shared/model/customer-order.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerOrderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CustomerOrderDetail extends React.Component<ICustomerOrderDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customerOrderEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterMongodbReactApp.customerOrder.detail.title">CustomerOrder</Translate> [
            <b>{customerOrderEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">
                <Translate contentKey="jhipsterMongodbReactApp.customerOrder.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={customerOrderEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="jhipsterMongodbReactApp.customerOrder.status">Status</Translate>
              </span>
            </dt>
            <dd>{customerOrderEntity.status}</dd>
            <dt>
              <Translate contentKey="jhipsterMongodbReactApp.customerOrder.paymentDetails">Payment Details</Translate>
            </dt>
            <dd>{customerOrderEntity.paymentDetailsCreditCardNumber ? customerOrderEntity.paymentDetailsCreditCardNumber : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterMongodbReactApp.customerOrder.customer">Customer</Translate>
            </dt>
            <dd>{customerOrderEntity.customerUsername ? customerOrderEntity.customerUsername : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterMongodbReactApp.customerOrder.shippingDetails">Shipping Details</Translate>
            </dt>
            <dd>{customerOrderEntity.shippingDetailsAddress ? customerOrderEntity.shippingDetailsAddress : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterMongodbReactApp.customerOrder.orderedItems">Ordered Items</Translate>
            </dt>
            <dd>
              {customerOrderEntity.orderedItems
                ? customerOrderEntity.orderedItems.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === customerOrderEntity.orderedItems.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/customer-order" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/customer-order/${customerOrderEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ customerOrder }: IRootState) => ({
  customerOrderEntity: customerOrder.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerOrderDetail);
