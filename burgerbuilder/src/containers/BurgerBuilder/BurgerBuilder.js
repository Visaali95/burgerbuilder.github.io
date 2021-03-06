import React, {Component} from 'react';
import Auxiliary from '../../HOC/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICES = {
	 salad: 0.5,
	 bacon: 0.7,
	 cheese: 0.4,
	 meat: 1.3
}

class BurgerBuilder extends Component {
	constructor(){
		super();
		this.state = {
			ingredients :{
				salad:0,
				bacon:0,
				cheese:0,
				meat:0
			},
			totalPrice:4,
			purchaseable:false,
			purchasing:false
		}
	}

	updatePurchaseState = (ingredients) => {
			const sum = Object.keys(ingredients)
			.map(igkey => {
				return ingredients[igkey];
			})
			.reduce((sum,el) => {
				return sum + el;
			},0);
			this.setState({purchaseable: sum > 0});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0)
		{
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}
	purchasehandler = () => {
		this.setState({purchasing: true});
	}
	purchaseCancelHandler = () => {
			this.setState({purchasing: false});
	}
	purchaseContinueHandler = () => {
		alert('you continue')
	}
	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo)
		{
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		return(
				<Auxiliary>
					<Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
						 <OrderSummary
							 purchaseContinued = {this.purchaseContinueHandler}
							  purchaseCancelled = {this.purchaseCancelHandler}
							 ingredients={this.state.ingredients}
							 price={this.state.totalPrice}/>
					</Modal>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls ingredientAdded={this.addIngredientHandler}
					 ingredientRemoved={this.removeIngredientHandler}
					 purchaseable={this.state.purchaseable}
				   disabled = {disabledInfo}
					 ordered = {this.purchasehandler}
				 		price = {this.state.totalPrice}/>
				</Auxiliary>
			);
	}
}

export default BurgerBuilder;
