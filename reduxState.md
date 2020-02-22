redux의 state가 변경되면 자동으로 component의 props로 전달 된다. 
이를 위해 구독(subscribe)라는 과정이 일어나며 react-redux의 <Provider />가 state에 store를 가지고 있으면서 connect() 고차함수가 Provider의 store를 표현컴포넌트의 props로 전달해주는 역할을 한다. 이 때 내부적으로 context API를 이용한다. <br />

state 가 store를 갖고 있고 자동으로 모든 component에 props를 전달 한다.
물론 이때 connect()가 HOC로 연결 되어 있다. <br />

connect() 고차함수를 사용하지 않고 직접 구현 하려면 

```
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import bankStore from './bankStore';
import constants from './constants';
import BankApp from './BankApp'

class BankAppContainer extends Component {
    constructor(...args) {
        super(...args);
        bankStore.dispatch({type:constants.CREATE_ACCOUNT})
        this.state = {
            balance: bankStore.getState().balance
        }
    }
    componentDidMount() {
        this.unsubscribe = bankStore.subscribe(() =>
            this.setState(
                { balance: bankStore.getState().balance }
            )
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render(){
        return(
            <BankApp balance={ bankStore.getState().balance }
                onDeposit={(amount)=>bankStore.dispatch(
                    {type:constants.DEPOSIT_INTO_ACCOUNT, amount:amount}
                )}
                onWithdraw={(amount)=>bankStore.dispatch(
                    {type:constants.WITHDRAW_FROM_ACCOUNT, amount:amount}
                )}/>
        )
    }
}

export default BankAppContainer;
```


