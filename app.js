/* ===== SELEÇÃO DE ELEMENTOS ===== */
const form = document.querySelector('#todo-form');
const list = document.querySelector('#todo-list');
const loading = document.querySelector('#loading');
const errorMsg = document.querySelector('#error');
const copyBtn = document.querySelector('#copy');

/* ===== ESTADO (Web Storage) ===== */
let todos = JSON.parse(localStorage.getItem('todos')) || [];

/* ===== MODELO DE OBJETO ===== */
const createTodo = text => ({
  id: Date.now(),
  text,
  done: false
});

/* ===== SALVAR NO STORAGE ===== */
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

/* ===== RENDERIZAÇÃO DO DOM ===== */
const renderTodos = (data = todos) => {
  list.innerHTML = '';

  if (data.length === 0) {
    list.innerHTML = '<li style="text-align: center; border-left: none; color: #aaa;">Nenhuma tarefa por aqui 🎉</li>';
    return;
  }

  data.forEach(todo => {
    const li = document.createElement('li');

    li.innerHTML = `
      <span class="task ${todo.done ? 'done' : ''}">
        ${todo.done ? '✅' : '⭕'} ${todo.text}
      </span>
      <div class="buttons">
        <button data-action="toggle" data-id="${todo.id}" title="${todo.done ? 'Desmarcar' : 'Concluir'}">✓</button>
        <button data-action="remove" data-id="${todo.id}" class="rmv" title="Deletar">🗑️</button>
      </div>
    `;

    list.appendChild(li);
  });
};

/* ===== ADICIONAR TAREFA ===== */
form.addEventListener('submit', e => {
  e.preventDefault();

  const { task } = form;

  todos.push(createTodo(task.value));
  saveTodos();
  renderTodos();
  form.reset();
});

/* ===== CONCLUIR / REMOVER ===== */
list.addEventListener('click', e => {
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;

  if (!id || !action) return;

  if (action === 'toggle') {
    todos = todos.map(todo =>
      todo.id == id ? { ...todo, done: !todo.done } : todo
    );
  }

  if (action === 'remove') {
    todos = todos.filter(todo => todo.id != id);
  }

  saveTodos();
  renderTodos();
});

/* ===== FILTROS ===== */
document.querySelectorAll('[data-filter]').forEach(btn =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => b.style.opacity = '0.6');
    btn.style.opacity = '1';

    const type = btn.dataset.filter;

    const filtered =
      type === 'done'
        ? todos.filter(t => t.done)
        : type === 'pending'
        ? todos.filter(t => !t.done)
        : todos;

    renderTodos(filtered);
  })
);

// Destacar o filtro "Todas" ao carregar
document.querySelector('[data-filter="all"]').style.opacity = '1';

/* ===== FETCH COM PROMISE (.then/.catch) ===== */
const loadInitialTodos = () => {
  loading.hidden = false;

  fetch('data.json')
    .then(res => {
      if (!res.ok) throw new Error('Erro ao carregar dados');
      return res.json();
    })
    .then(data => {
      if (!todos.length && Array.isArray(data)) {
        todos = data;
        saveTodos();
        renderTodos();
      }
    })
    .catch(err => {
      console.error(err);
      errorMsg.textContent = 'Erro ao carregar tarefas iniciais';
    })
    .finally(() => {
      loading.hidden = true;
    });
};

/* ===== ASYNC/AWAIT + CLIPBOARD API ===== */
const copySummary = async () => {
  try {
    const total = todos.length;
    const done = todos.filter(t => t.done).length;
    const pending = total - done;

    const summary = `📊 RESUMO DE TAREFAS\n━━━━━━━━━━━━━━━━━\nTotal: ${total}\n✅ Concluídas: ${done}\n⏳ Pendentes: ${pending}\n🎯 Progresso: ${total > 0 ? Math.round((done / total) * 100) : 0}%`;

    await navigator.clipboard.writeText(summary);

    // Efeito visual de sucesso
    const copyBtnElement = document.querySelector('#copy');
    const originalText = copyBtnElement.textContent;
    copyBtnElement.textContent = '✅ Copiado!';
    copyBtnElement.style.background = 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)';
    
    setTimeout(() => {
      copyBtnElement.textContent = originalText;
      copyBtnElement.style.background = '';
    }, 2000);
  } catch (err) {
    console.error(err);
    alert('❌ Erro ao copiar resumo');
  }
};

copyBtn.addEventListener('click', copySummary);

/* ===== INICIALIZAÇÃO ===== */
loadInitialTodos();
renderTodos();
