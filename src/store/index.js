import Vue from 'vue'
import Vuex from 'vuex'

import purses from './modules/purses'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		purses
	}
})
