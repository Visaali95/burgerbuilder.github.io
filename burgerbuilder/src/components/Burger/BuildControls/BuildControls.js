import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {
    label: 'Salad',
    type: 'salad'
  }, {
    label: 'Bacon',
    type: 'bacon'
  }, {
    label: 'Cheese',
    type: 'cheese'
  }, {
    label: 'Meat',
    type: 'meat'
  }
];

const buildcontrols = (props) => (<div className={classes.BuildControls}>
  <p>Current Price :
    <strong>{props.price}
      USD</strong>
  </p>
  {
    controls.map(ctrl => {
      return <BuildControl key={ctrl.label} label={ctrl.label} added={() => props.ingredientAdded(ctrl.type)} removed={() => props.ingredientRemoved(ctrl.type)} disabled={props.disabled[ctrl.type]}/>
    })
  }
  <button type="button"
    className={classes.OrderButton}
    disabled={!props.purchaseable}
    onClick={props.ordered}>ORDER NOW</button>
</div>);

export default buildcontrols;
