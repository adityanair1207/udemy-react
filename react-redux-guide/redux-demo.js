const redux = require("redux"); // default nodejs syntax for importing 3rd party package

const counterReducer = (state = {counter: 0}, action) => { // Reducer Function gets old state and dispatched action from redux library
    // return{
    //     counter: state.counter + 1
    // }; // counter becomes 1 after initialization
    
    if(action.type === "increment"){
        return{
            counter: state.counter + 1
        };
    }

    if(action.type === "decrement"){
        return{
            counter: state.counter - 1
        };
    }

    return state; // counter remains 0 after initialization
};

const store = redux.createStore(counterReducer);

console.log(store.getState());

const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({type: "increment"});
store.dispatch({type: "decrement"});