document.addEventListener('click', async (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;

    await remove(id).then(() => {
      event.target.closest('li').remove();
    });
  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const newTitle = prompt('Enter new title:');
    if (newTitle !== null && newTitle.trim() !== '') {
      await edit(id, newTitle.trim());
      event.target.closest('li').edit();

      // querySelector('.title').textContent =
      // newTitle.trim();
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newTitle }),
  });
}
