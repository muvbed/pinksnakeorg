<template>
	<div class="modal">
		<div class="modal__wrapper" @click.self="closeModal">
			<div class="modal__box">
				<h2 class="modal__title">Новая транзакция</h2>
				<span class="modal__subtitle">Заполните поля ниже:</span>
				<form class="modal__inner">
					<div class="modal__field">
						<div class="modal__field-name">Address (from)</div>
						<span class="modal__field-value">{{ address }}</span>
					</div>
					<label class="modal__field">
						<div class="modal__field-name">Address (to)</div>
						<TheMask type="text" class="modal__field-input" placeholder="Введите адрес получателя..." id="to" mask="0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF" :tokens="hexTokens"/>
						<div class="modal__field-error" ref="toErrorField"></div>
					</label>
					<label class="modal__field">
						<div class="modal__field-name">Amount</div>
						<input type="number" class="modal__field-input" placeholder="Введите сумму перевода..." id="amount">
						<div class="modal__field-error" ref="amountErrorField"></div>
					</label>
					<label class="modal__field">
						<div class="modal__field-name">Currency</div>
						<select class="modal__field-select" id="currency">
							<option class="modal__field-option" v-for="(value, name) in balances" :key="name" :value="name">{{ name }}</option>
						</select>
					</label>
				</form>
				<button class="modal__confirm" @click="sendTransaction">Отправить</button>
				<span class="modal__close material-icons" @click="closeModal">close</span>
			</div>
		</div>
	</div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

export default {
	name: 'ModalTransaction',
	components: {
		TheMask
	},
	props: {
		address: String,
		balances: Object
	},
	data() {
		return {
			hexTokens: {
				F: {
					pattern: /[0-9a-fA-F]/
				}
			}
		}
	},
	methods: {
		sendTransaction() {
			this.$refs.toErrorField.innerText = this.$refs.amountErrorField.innerText = ''

			let errCount = 0

			if (document.querySelector('#to').value == this.address || document.querySelector('#to').value.length < 42) {
				errCount++
				this.$refs.toErrorField.innerText = 'Error: Invalid value'
			}

			if (document.querySelector('#amount').value == 0 || document.querySelector('#amount').value > this.balances[document.querySelector('#currency').value]) {
				errCount++
				this.$refs.amountErrorField.innerText = 'Error: Invalid value'
			}

			if (errCount == 0) {
				this.$store.dispatch('createTransaction', {
					from: this.address,
					to: document.querySelector('#to').value,
					amount: document.querySelector('#amount').value,
					currency: document.querySelector('#currency').value
				})

				this.closeModal(true)
			}
		},
		closeModal(msg = false) {
			setTimeout(() => {
				document.body.removeAttribute('style')
			}, 300)
			
			this.$emit('close', msg)
		}
	},
	mounted() {
		document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + "px"
		document.body.style.overflow = 'hidden'
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/modal.scss';
</style>
