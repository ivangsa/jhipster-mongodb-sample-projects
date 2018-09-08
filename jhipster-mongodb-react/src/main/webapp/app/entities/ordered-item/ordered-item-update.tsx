import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './ordered-item.reducer';
import { IOrderedItem } from 'app/shared/model/ordered-item.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrderedItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IOrderedItemUpdateState {
  isNew: boolean;
}

export class OrderedItemUpdate extends React.Component<IOrderedItemUpdateProps, IOrderedItemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { orderedItemEntity } = this.props;
      const entity = {
        ...orderedItemEntity,
        ...values
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
    this.props.history.push('/entity/ordered-item');
  };

  render() {
    const { orderedItemEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterMongodbReactApp.orderedItem.home.createOrEditLabel">
              <Translate contentKey="jhipsterMongodbReactApp.orderedItem.home.createOrEditLabel">Create or edit a OrderedItem</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : orderedItemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="ordered-item-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="catalogItemIdLabel" for="catalogItemId">
                    <Translate contentKey="jhipsterMongodbReactApp.orderedItem.catalogItemId">Catalog Item Id</Translate>
                  </Label>
                  <AvField id="ordered-item-catalogItemId" type="number" className="form-control" name="catalogItemId" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="jhipsterMongodbReactApp.orderedItem.name">Name</Translate>
                  </Label>
                  <AvField
                    id="ordered-item-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) },
                      maxLength: { value: 250, errorMessage: translate('entity.validation.maxlength', { max: 250 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="price">
                    <Translate contentKey="jhipsterMongodbReactApp.orderedItem.price">Price</Translate>
                  </Label>
                  <AvField
                    id="ordered-item-price"
                    type="text"
                    name="price"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="quantityLabel" for="quantity">
                    <Translate contentKey="jhipsterMongodbReactApp.orderedItem.quantity">Quantity</Translate>
                  </Label>
                  <AvField id="ordered-item-quantity" type="number" className="form-control" name="quantity" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/ordered-item" replace color="info">
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
  orderedItemEntity: storeState.orderedItem.entity,
  loading: storeState.orderedItem.loading,
  updating: storeState.orderedItem.updating
});

const mapDispatchToProps = {
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
)(OrderedItemUpdate);
