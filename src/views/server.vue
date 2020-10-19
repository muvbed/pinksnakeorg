<template>
    <div class="server wrapper">
        <h1 class="server__title title">Выбранный сервер - <i>{{ getServerById(serverIndex) }}</i></h1>
        <span class="server__link link" @click="goBack">Выбор сервера</span>
        <h2 class="server__subtitle subtitle">Список валют:</h2>
        <ul class="server__list">
            <li class="server__entity" v-for="currency in currencies" :key="currency.id">{{ currency }}</li>
        </ul>
        <h2 class="server__subtitle subtitle">Балансы по адресу:</h2>
        <ul class="server__list">
            <li class="server__entity" v-for="(value, name) in balances" :key="name">{{ name }}: {{value}}</li>
        </ul>
        <a class="server__address-link link" href="http://02w0y.mocklab.io/info/0xf9c55b6661d0Dfc964aBbB1951aE6F7024FFC8e2">Информация по адресу</a>
        <button class="server__transaction-create" @click="transactionModalToggle">Новая транзакция</button>
        <div class="server__transaction-msg" v-if="showTransactionMsg">Транзакция успешно создана!</div>
        <h2 class="server__trigger subtitle" :class="{server__trigger_active: showTransactions}" @click="showTransactions = !showTransactions">
            <b>Список транзакций</b>
            <span class="material-icons">arrow_drop_down_circle</span>
        </h2>
        <ul class="server__transactions-list" v-show="showTransactions">
            <li class="server__transactions-entity" v-for="transaction in transactions" :key="transaction.id">
                <ul class="server__transactions-sublist">
                    <li class="server__transactions-subentity" v-for="(value, name) in transaction" :key="name"><b>{{ name }}</b>: {{value}}</li>
                </ul>
                <a class="server__transactions-link link" href="http://02w0y.mocklab.io/infotx/0x0b40063ded5ed0df224b0f1c76a7be0963a7f66711902a4936feb11a9b1c0d1d">Информация по транзакции</a>
            </li>
        </ul>

        <transition name="fade">
			<ModalTransaction v-if="showTransactionModal" :address="address" :balances="balances" @close="transactionModalToggle"/>
		</transition>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

import ModalTransaction from '@/components/ModalTransaction'

export default {
    name: 'server',
    components: {
        ModalTransaction
    },
    data() {
        return {
            serverIndex: window.location.hash.split('server')[1],
			address: JSON.parse(localStorage.getItem('keys')).address,
			showTransactionModal: false,
            showTransactionMsg: false,
            showTransactions: false
        }
    },
    computed: {
        ...mapState({
            servers: state => state.purses.servers, 
            currencies: state => state.purses.currencies, 
            balances: state => state.purses.balances, 
            transactions: state => state.purses.transactions
        }),
        ...mapGetters(['getServerById'])
    },
    methods: {
        transactionModalToggle(msg) {
            this.showTransactionModal = !this.showTransactionModal
            msg == true ? this.showTransactionMsg = true : this.showTransactionMsg = false
        },
        goBack() {
            localStorage.removeItem('server')

            this.$router.go('/general')
        }
    },
    created() {
        localStorage.setItem('server', this.serverIndex)

        if (this.servers.length == 0) {
			this.$store.dispatch('fetchServers')
        }
        
        if (this.currencies.length == 0) {
            this.$store.dispatch('fetchCurrencies')
        }

        if (Object.keys(this.balances).length == 0) {
            this.$store.dispatch('fetchBalances')
        }

        if (this.transactions.length == 0) {
            this.$store.dispatch('fetchTransactions')
        }
    }
}
</script>

<style lang="scss" scoped>
.server {
    &__title {
        margin-bottom: 30px;

        i {
            word-wrap: break-word;
        }
    }

    &__subtitle {
        margin-top: 40px;
    }

    &__list {
        margin: 0px;
		padding: 0px;
		list-style-type: none;
		counter-reset: item;
    }

    &__entity {
        margin-bottom: 15px;
		font-family: 'Inter-LightBETA';
		letter-spacing: 1px;
		counter-increment: item;

		&:before {
			content: counter(item) ".";
			display: inline-block;
			padding-right: 8px;
			font-weight: bold;
			font-family: 'Inter-Medium';
		}
	}
	
	&__transaction {
        &-create {
            @include button;
            display: block;
            margin-top: 20px;
            padding: 15px 25px;
            background: $green;

            &:hover {
                transform: scale(0.98);
            }
        }

        &-msg {
            margin-top: 10px;
            color: $green;
		}
	}

	&__trigger {
		display: flex;
		align-items: center;
		margin-top: 40px;
		border-color: #181C43;
		cursor: pointer;
		transition: .3s;

		b {
			padding-bottom: 1px;
			border-bottom-width: 1px;
			border-bottom-style: dashed;
		}

		.material-icons {
			margin-left: 5px;
		}

		&:hover, &_active {
			color: $red;
			border-color: $red;
		}

		&_active {
			.material-icons {
				transform: rotate(180deg);
			}
		}
	}

    &__transactions {
        &-list {
            margin: 0px;
            padding: 0px;
            list-style-type: none;
        }

        &-entity {
            margin-bottom: 20px;
            padding: 20px 12px;
            background-color: #eee;
        }

        &-sublist {
            margin: 0px;
            padding: 0px;
            list-style-type: none;
        }

        &-subentity {
            margin-bottom: 10px;
            font-family: 'Inter-LightBETA';
            word-wrap: break-word;
        }
	}
}
</style>
