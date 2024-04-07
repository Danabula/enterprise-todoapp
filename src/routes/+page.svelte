<svelte:options immutable={true} />

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: todos = data.todos;
	// make sure cant check or delete when already doing either
	let disabled: number[] = [];
	let disableCreate = false;
	const form = {
		title: null,
		description: null
	};

	async function handleCreate() {
		disableCreate = true;
		const res = await fetch('/api/create', {
			method: 'POST',
			body: JSON.stringify(form)
		});
		setTimeout(async () => {
			if (res.ok) {
				const todo = await res.json();
				todos = [...todos, todo];
			}
			disableCreate = false;
		}, 1000);
	}

	async function handleDelete(id: number) {
		disabled = [...disabled, id];
		const res = await fetch(`/api/delete/${id}`, {
			method: 'POST'
		});
		if (res.ok) {
			todos = todos.filter((todo) => todo.id !== id);
		}
		disabled = disabled.filter((_id) => _id !== id);
	}
</script>

<div class="todo-app">
	<h1>{todos.length} todos left</h1>
	<div class="todo-list">
		{#each todos as todo}
			<div class="todo-item">
				<div class="divider">
					<!-- <input class="fake-checkbox" type="checkbox" /> -->
					<!-- <span class="checkbox"></span> -->
					<div class="divy">
						<input id="checkmark" class="checkmark" type="checkbox" />
					</div>

					<div>
						<p class="todo-title">{todo.title}</p>
						{#if todo.description}
							<p class="todo-description">{todo.description}</p>
						{/if}
						<!-- <pre>
            {JSON.stringify(todo)}
        </pre> -->
						<button
							class="delete-btn"
							on:click|preventDefault={() => handleDelete(todo.id)}
							disabled={disabled.includes(todo.id)}>remove</button
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<form class="create-todo" on:submit|preventDefault={handleCreate}>
		<h1>Create Todo</h1>
		<label for="title">Title</label>
		<input name="title" type="text" bind:value={form.title} />
		<label for="description">Description</label>
		<input name="description" type="text" bind:value={form.description} />
		<button type="submit" disabled={disableCreate}>Create</button>
	</form>
</div>

<style>
	:root {
		background-color: rgb(186, 186, 186);
	}
	:global(body) {
		padding: 0;
		margin: 0;
		/* background-color: gainsboro; */
		/* background-image: url('/paper.jpg'); */
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0.6) 0 100%), url('/paper.jpg');
		/* background-image: url('/favicon.png'); */
		background-repeat: repeat;
	}
	.todo-app {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.todo-list {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.todo-item {
		display: block;
		border: black 1px solid;
		box-shadow: gray 4px 4px 4px;
		padding: 5px 7px;
		width: 700px;
		height: 90px;
		margin: 22px;
		position: relative;
		background-color: rgba(255, 255, 255, 0.2);
	}
	.divider {
		display: flex;
	}
	.divy {
		display: flex;
		align-items: center;
	}
	/* Hide browser checkbox */
	.checkmark {
		appearance: none;
		background-color: transparent;
		margin: 0;
		width: 2em;
		height: 2em;
		border: 1px black solid;
		margin: 20px;
	}
	.checkmark:after {
		content: '';
		position: absolute;
		display: block;
		font-size: 4em;
		transform: scale(0);
		opacity: 0;
		transform-origin: 0 0;
		transition:
			200ms transform ease,
			1s opacity ease;
	}
	.checkmark:checked:after {
		content: '\2714';
		color: green;
		opacity: 1;
		transform: scale(1) translateX(-0.1em) translateY(-0.5em);
	}
	.todo-title {
		font-size: 2em;
		text-decoration: underline;
		margin: 10px;
	}
	.todo-description {
		font-size: 1.3em;
		margin: 10px;
	}
	button.delete-btn {
		position: absolute;
		top: 6px;
		right: 6px;
		background-color: transparent;
		color: brown;
		border: none;
	}
	form.create-todo {
		margin-top: 33px;
		margin-bottom: 10em;
		border: black 1px solid;
		box-shadow: gray 4px 4px 4px;
		background-color: rgba(255, 255, 255, 0.2);
		padding: 1em 2em;
	}
</style>
