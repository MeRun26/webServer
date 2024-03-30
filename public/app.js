document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  }

  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;
    const newTitle = prompt('Введите новое название', title);
    if (newTitle !== null) {
      update({ id, title: newTitle }).then(() => {
        event.target.closest('li').querySelector('span').innerText = newTitle;
      });
    }
  }
});

async function update(newNote) {
  await fetch(`/${newNote.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}
