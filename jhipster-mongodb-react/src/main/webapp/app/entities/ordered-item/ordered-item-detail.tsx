import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ordered-item.reducer';
import { IOrderedItem } from 'app/shared/model/ordered-item.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderedItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class OrderedItemDetail extends React.Component<IOrderedItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { orderedItemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterMongodbReactApp.orderedItem.detail.title">OrderedItem</Translate> [<b>{orderedItemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="catalogItemId">
                <Translate contentKey="jhipsterMongodbReactApp.orderedItem.catalogItemId">Catalog Item Id</Translate>
              </span>
            </dt>
            <dd>{orderedItemEntity.catalogItemId}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="jhipsterMongodbReactApp.orderedItem.name">Name</Translate>
              </span>
            </dt>
            <dd>{orderedItemEntity.name}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="jhipsterMongodbReactApp.orderedItem.price">Price</Translate>
              </span>
            </dt>
            <dd>{orderedItemEntity.price}</dd>
            <dt>
              <span id="quantity">
                <Translate contentKey="jhipsterMongodbReactApp.orderedItem.quantity">Quantity</Translate>
              </span>
            </dt>
            <dd>{orderedItemEntity.quantity}</dd>
          </dl>
          <Button tag={Link} to="/entity/ordered-item" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/ordered-item/${orderedItemEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ orderedItem }: IRootState) => ({
  orderedItemEntity: orderedItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderedItemDetail);
