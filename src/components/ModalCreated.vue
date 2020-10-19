<template>
	<div class="modal">
		<div class="modal__wrapper" @click.self="closeModal">
			<div class="modal__box">
				<h2 class="modal__title">Ваши ключи</h2>
				<span class="modal__subtitle">Сохраните ключи, приведенные ниже:</span>
				<ul class="modal__inner">
					<li class="modal__field" v-for="(value, name) in keys" :key="name">
						<div class="modal__field-name">{{ name }}</div>
						<span class="modal__field-value">{{ value }}</span>
					</li>
				</ul>
				<button class="modal__confirm" @click="closeModal">Принять</button>
				<span class="modal__close material-icons" @click="closeModal">close</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModalCreated',
	props: {
		keys: Object
	},
	methods: {
		closeModal() {
			setTimeout(() => {
				document.body.removeAttribute('style')
			}, 300)
			
			this.$emit('close')
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
