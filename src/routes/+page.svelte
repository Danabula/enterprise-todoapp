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

