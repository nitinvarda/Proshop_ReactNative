import React from 'react'
import Main from './screens/MainScreen'
import { Provider } from 'react-redux'

// import store from './store'
import { configureStore } from './store'



const store = configureStore()
const App = () => {


  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )



}

export default App
