<template>
    <div class="general wrapper">
        <h1 class="general__title title">Список доступных серверов</h1>
        <span class="general__link link" @click="goBack">Вход / создание кошелька</span>
        <ul class="general__list">
            <li class="general__server" v-for="(item, index) in servers" :key="index" @click="goTo(index)">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: 'general',
    computed: mapState({servers: state => state.purses.servers}),
    methods: {
        goBack() {
            localStorage.removeItem('keys')
            this.$router.push('/')
        },
        goTo(index) {
            this.$router.push(`/server${index}`)
        }
    },
    created() {
		if (this.servers.length == 0) {
			this.$store.dispatch('fetchServers')
		}
    }
}
</script>

<style lang="scss" scoped>
.general {
	&__title {
		margin-bottom: 30px;
	}

	&__list {
		margin: 50px 0 0;
		padding: 0px;
		list-style-type: none;
		counter-reset: item;
	}

	&__server {
		margin-bottom: 20px;
		font-family: 'Inter-LightBETA';
		letter-spacing: 1px;
		counter-increment: item;
		cursor: pointer;
		transition: .3s;

		&:hover {
			color: blue;
		}

		&:before {
			content: counter(item) ".";
			display: inline-block;
			padding-right: 8px;
			font-weight: bold;
			font-family: 'Inter-Medium';
		}
	}
}
</style>
