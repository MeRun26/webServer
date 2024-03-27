document.addEventListener('click', async (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    await remove(id);
    event.target.closest('li').remove();
  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const newTitle = prompt('Enter new title:').trim();
    if (newTitle !== null && newTitle !== '') {
      await edit(id, newTitle);
      event.target.closest('li').edit(newTitle);
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function edit(id, newTitle) {
  const response = await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newTitle }),
  });

  if (!response.ok) {
    throw new Error('Failed to edit note');
  }
}
