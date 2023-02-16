document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  } else if (event.target.dataset.type === 'change') {
    const id = event.target.dataset.id;
      const newTitle = prompt("Введите новое значение");
      if (newTitle) {
        change(id, newTitle).then(() => {
          window.location.reload();
        });
      }
    }
});

async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'});
};

async function change(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
};