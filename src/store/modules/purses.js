import createIdentity from 'eth-crypto/dist/lib/create-identity'
import publicKeyByPrivateKey from 'eth-crypto/dist/lib/public-key-by-private-key'
import { toAddress } from 'eth-crypto/dist/lib/public-key'
import { keccak256 } from 'eth-crypto/dist/lib/hash'
import sign from 'eth-crypto/dist/lib/sign'

export default {
	state: {
		keys: {},
		keysError: '',

		servers: [],
		currencies: [],
		balances: {},
		transactions: []
	},
	actions: {
		createKeys({ commit }) {
			const keys = createIdentity()
			localStorage.setItem('keys', JSON.stringify(keys))
			commit('updateKeys', keys)
		},
		restoreKeys({ commit }, privateKey) {
			const keys = {
				privateKey
			}

			try {
				keys.publicKey = publicKeyByPrivateKey(keys.privateKey)
				keys.address = toAddress(keys.publicKey)

				localStorage.setItem('keys', JSON.stringify(keys))
				commit('updateKeys', keys)
			} catch(e) {
				commit('failedKeys', e.toString())
			}
		},

		createTransaction(transaction) {
			sign(JSON.parse(localStorage.getItem('keys')).privateKey, keccak256(transaction))
		},

		fetchServers({ commit }) {
			fetch('http://02w0y.mocklab.io/list').then(resolve => resolve.json().then(result => commit('updateServers', result[Object.keys(result)[0]])))
		},
		fetchCurrencies({ commit }) {
			fetch('http://02w0y.mocklab.io/currencies').then(resolve => resolve.json().then(result => commit('updateCurrencies', result[Object.keys(result)[0]])))
		},
		fetchBalances({ commit }) {
			fetch('http://02w0y.mocklab.io/balances/0xf9c55b6661d0Dfc964aBbB1951aE6F7024FFC8e2').then(resolve => resolve.json().then(result => commit('updateBalances', result[Object.keys(result)[0]])))
		},
		fetchTransactions({ commit }) {
			fetch('http://02w0y.mocklab.io/txs/0xf9c55b6661d0Dfc964aBbB1951aE6F7024FFC8e2').then(resolve => resolve.json().then(result => commit('updateTransactions', result[Object.keys(result)[0]])))
		}
	},
	mutations: {
		updateKeys(state, keys) {
			state.keys = keys
			state.keysError = ''
		},
		failedKeys(state, error) {
			state.keysError = error
		},
		
		updateServers(state, servers) {
			state.servers = servers
		},
		updateCurrencies(state, currencies) {
			state.currencies = currencies
		},
		updateBalances(state, balances) {
			state.balances = balances
		},
		updateTransactions(state, transactions) {
			state.transactions = transactions
		}
	},
	getters: {
		getServerById: state => id => {
			return state.servers[id];
		}
	}
}
