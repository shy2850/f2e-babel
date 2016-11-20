/**
 * @file Redux 源码注释
 */
export let ActionTypes = {
	INIT: '@@redux/INIT'
}
export function createStore (reducer, initialState) {
	let currentReducer = reducer
	let currentState = initialState
	let currentListeners = []
	let nextListeners = currentListeners
	let isDispatching = false

	/**
	 * 避免 currentListeners 和 nextListeners 持有相同引用
	 * 每次修改 nextListeners 前需要先从 currentListeners clone 一套出来
	 */
	function ensureCanMutateNextListeners() {
		if (nextListeners === currentListeners) {
			nextListeners = currentListeners.slice()
		}
	}

	/**
	 * 注册监听事件
	 * @param  {function} listener
	 * @return 返回删除 listener 事件的方法，方便运行环境持有和删除
	 */
	function subscribe (listener) {
		ensureCanMutateNextListeners()
		nextListeners.push(listener)
		return () => unsubscribe(listener)
	}
	/**
	 * 删除监听事件
	 * @param  {function} listener
	 */
	function unsubscribe (listener) {
		ensureCanMutateNextListeners()
		let index = nextListeners.indexOf(listener)
		~index || nextListeners.splice(index, 1)
	}

	/**
	 * 通过 reducer 执行action 修改当前状态 并广播事件
	 * @param  {object} action
	 */
	function dispatch (action) {
		currentState = currentReducer(currentState, action)
		currentListeners = nextListeners
		currentListeners.forEach(listener => listener())
		return action
	}

	function getState () {
		return currentState
	}

	/**
	 * 动态加载 reducer 
	 * 替换原有的 reducer 并初始化该reducer状态
	 */
	function replaceReducer (nextReducer) {
		currentReducer = nextReducer
		dispatch({ type: ActionTypes.INIT })
	}

	dispatch({ type: ActionTypes.INIT })
	return {
		dispatch,
	    subscribe,
	    getState,
	    replaceReducer
	}
}

/**
 * 展开 reducers 在顶级state中对应指定key的state.
 */
export function combineReducers (reducers) {
	let reducerKeys = Object.keys(reducers)
	return function combination(state = {}, action) {
		let nextState = {}
		return reducerKeys.filter(key => (
			state[key] !== (nextState[key] = reducers[key](state[key], action))
		)).length ? nextState : state
	}
}

/**
 * 批量创建 action 的快捷方式
 */
export function bindActionCreators(actionCreators, dispatch) {
	if (typeof actionCreators === 'function') {
		return bindActionCreator(actionCreators, dispatch)
  	}
	let boundActionCreators = {}
	Object.keys(actionCreators).forEach(key => boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch))
	return boundActionCreators
}
function bindActionCreator (actionCreator, dispatch) {
	return (...args) => dispatch(actionCreator(...args))
}

/**
 * createStore 中间件
 * @param  {...[type]} middlewares [description]
 * @return {[type]}                [description]
 */
export function applyMiddleware (...middlewares) {
	return (createStore) => (reducer, initialState) => {
		let {
			dispatch,
		    subscribe,
		    getState,
		    replaceReducer
		} = createStore(reducer, initialState)
		let chain = []
		let middlewareAPI = {
			getState,
			// dispatch 封装一层，方便使用集成过中间件的dispatch
			dispatch: (action) => dispatch(action)
		}
		chain = middlewares.map(middleware => middleware(middlewareAPI))
		dispatch = compose(...chain)(dispatch)

		return {
			dispatch,
		    subscribe,
		    getState,
		    replaceReducer
		}
	}
}

/**
 * 嵌套执行方法
 * @param  {...function} funcs
 * @return {function} 组合结果方法
 *
 * @code
 * compose(a, b, c) 等价于 (...args) => a(b(c(...args)))
 */
export function compose (...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  } else {
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
  }
}

const Redux = {
	createStore,
	combineReducers,
	bindActionCreators,
	applyMiddleware,
	compose
}

export default Redux