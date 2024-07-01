<script setup>
import { ref } from "vue"

// Icons
import IconSettings from "@/components/icons/IconSettings.vue"

const emit = defineEmits(["emitGameSettings"])

const gameType = ref("noBlogkingGame");
const timerType = ref("timeCounter")

const handleSubmit = () => {
	emit("emitGameSettings", { gameType: gameType.value, timerType: timerType.value })
}
</script>


<template>
	<div class="params-container">
		<h2>
			<IconSettings /> Paramètres du jeux
		</h2>
		<div class="radios-groupes-container">
			<div>
				<h3>Type de jeux</h3>
				<input type="radio" id="noBlogking" value="noBlogkingGame" v-model="gameType">
				<label for="noBlogking">Non Bloquant</label>
				<br>
				<input type="radio" id="blocking" value="blockingGame" v-model="gameType">
				<label for="blocking">Bloquant <small>(❌ suppr / précision obligatoire)</small></label>
			</div>
			<div>
				<h3>Type de décompte :</h3>
				<input type="radio" id="timeCounter" value="timeCounter" v-model="timerType">
				<label for="timeCounter">Libre</label>
				<br>
				<input type="radio" id="countDown" value="countDown" v-model="timerType">
				<label for="countDown">Chrono <small>(⏰ 01 minute)</small></label>
			</div>
		</div>
		<p class="btn-container">
			<button @click="handleSubmit">Valider</button>
		</p>
	</div>
</template>


<style scoped>
.params-container {
	padding: 15px;
	font-family: "Playwrite";
	font-size: 15px;
	margin: 50px auto;
	border-radius: 10%;
	box-shadow: 5px 5px 12px gray;
	background-color: #fff;
	animation: bounce 3s ease-in-out forwards;
	animation-iteration-count: 1;
}

.params-container button:hover {
	opacity: 0.9;
}

.radios-groupes-container label {
	margin-bottom: 15px;
	cursor: pointer;
}

.radios-groupes-container input {
	margin-bottom: 10px;
	width: 100px;
	cursor: pointer;
}

.btn-container {
	text-align: center;
}

.btn-container button {
	font-size: 20px;
	padding: 8px 16px;
	font-weight: bold;
	color: #fff;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background-color: #0275d8;
}
</style>