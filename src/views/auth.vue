<template>
    <div class="auth wrapper">
		<h1 class="auth__title title">Авторизация</h1>
		<button class="auth__button auth__button_enter" @click="showEnter = !showEnter">Войти в существующий кошелек</button>
		<form class="auth__form" v-show="showEnter">
			<div class="auth__form-inner">
				<TheMask type="text" class="auth__input" id="privateKey" placeholder="Введите privateKey..." mask="0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF" :tokens="hexTokens"/>
				<button class="auth__button auth__button_confirm" @click.prevent="enterInPurse">Вход</button>
			</div>
			<div class="auth__error" ref="errorField"></div>
		</form>
		<button class="auth__button auth__button_create" @click="createPurse">Создать новый кошелек</button>

		<transition name="fade">
			<ModalCreated v-if="showCreatedModal" :keys="keys" @close="goTo(), showCreatedModal = !showCreatedModal"/>
		</transition>
	</div>
</template>

<script>
import { mapState } from "vuex"
import { TheMask } from 'vue-the-mask'

import ModalCreated from '@/components/ModalCreated'

export default {
	name: 'auth',
	components: {
		TheMask,
		ModalCreated
	},
	data() {
		return {
			showEnter: false,
			showCreatedModal: false,
			hexTokens: {
				F: {
					pattern: /[0-9a-fA-F]/,
					transform: v => v.toLocaleLowerCase()
				}
			}
		}
	},
	computed: mapState({keys: state => state.purses.keys, error: state => state.purses.keysError}),
	methods: {
		enterInPurse() {
			this.$refs.errorField.innerText = ''
			this.$store.dispatch('restoreKeys', document.querySelector('#privateKey').value.toLowerCase())
			!this.error ? this.goTo() : this.$refs.errorField.innerText = this.error
		},
		createPurse() {
			this.showCreatedModal = true
			this.$store.dispatch('createKeys')
		},
		goTo() {
			this.$router.push('/general')
		}
	}
}
</script>

<style lang="scss" scoped>
.auth {
	padding-top: 50px;

	&__title {
		margin-bottom: 30px;
	}

	&__button {
		@include button;
		display: block;
		width: 100%;
		padding: 15px 25px;

		&:hover {
			transform: scale(0.99);
		}

		&_enter {
			margin-bottom: 15px;
			background: $light-blue;
		}

		&_confirm {
			width: 20%;
			background: $gray;
			border-radius: 0 5px 5px 0;

			&:hover {
				background: $green;
				transform: none;
			}
		}

		&_create {
			background: $gray;
		}
	}

	&__form {
		margin-bottom: 30px;

		&-inner {
			display: flex;
		}
	}

	&__input {
		width: 80%;
		padding: 15px;
		background: rgba(0,0,0,0.05);
		border: 1px solid $gray;
		border-right: 0;
		border-radius: 5px 0 0 5px;
		outline: 0;
		box-sizing: border-box;
		transition: .3s;

		&:focus {
			box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.5);
		}

		&::placeholder {
			color: #ccc;
		}
	}

	&__error {
		margin-top: 10px;
		color: $red;
		word-wrap: break-word;
	}
}


@media (max-width: 479px) {
	.auth {
		&__button {
			&_confirm {
				width: 100%;
				border-radius: 0 0 5px 5px;
			}
		}

		&__form {
			&-inner {
				flex-direction: column;
			}
		}

		&__input {
			width: 100%;
			border-right: 1px solid $gray;
			border-radius: 5px 5px 0 0;
		}
	}
}

</style>
