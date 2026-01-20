# 📋 TODO List - Gerenciador de Tarefas

Um aplicativo web moderno para gerenciar tarefas com design elegante, animações suaves e persistência de dados.

---

## 🚀 Como Usar

1. **Abrir** - Clique em `index.html` para abrir no navegador
2. **Adicionar** - Digite uma tarefa e clique "Adicionar"
3. **Concluir** - Clique em ✓ para marcar como feita
4. **Deletar** - Clique em 🗑️ para remover
5. **Filtrar** - Use os botões para ver Todas, Pendentes ou Concluídas
6. **Copiar** - Clique em "Copiar resumo" para copiar estatísticas

---

## 📁 Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Estrutura HTML |
| `styles.css` | Design e animações (roxo moderno, responsivo) |
| `app.js` | Lógica da aplicação |
| `data.json` | Tarefas iniciais de exemplo |

---

## 🔧 Como Funciona

### **HTML** (`index.html`)
- Formulário para adicionar tarefas
- Botões de filtro com `data-filter`
- Lista (`<ul>`) onde as tarefas são renderizadas
- Container para erros e loading

### **CSS** (`styles.css`)
- **Gradiente roxo** no background
- **Animações**: slideIn (página), fadeIn (tarefas), pulse (loading)
- **Responsivo**: Formulário em linha no desktop, empilhado no mobile
- **Hover effects**: Botões levitam, tarefas mudam de cor

### **JavaScript** (`app.js`)
```javascript
// Estado
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Criar tarefa
const createTodo = text => ({ id: Date.now(), text, done: false });

// Salvar ao localStorage
const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos));

// Renderizar na página
const renderTodos = (data = todos) => { /* cria elementos <li> */ };

// Eventos
form.addEventListener('submit', e => { /* adiciona tarefa */ });
list.addEventListener('click', e => { /* toggle/remove */ });
document.querySelectorAll('[data-filter]').forEach(btn => 
  btn.addEventListener('click', () => { /* filtra tarefas */ })
);
copyBtn.addEventListener('click', copySummary); // Copia resumo
```

### **JSON** (`data.json`)
- Carregado automaticamente na primeira visita
- Estrutura: `{ id, text, done }`
- Não sobrescreve tarefas salvas no localStorage

---

## 💾 Armazenamento

- **localStorage** - Salva e persiste suas tarefas
- **data.json** - Dados iniciais de demonstração
- Dados são salvos automaticamente em cada ação

---

## 🔑 Funcionalidades Principais

✅ Adicionar/Editar/Deletar tarefas  
✅ Marcar como concluído  
✅ Filtrar por status  
✅ Copiar resumo (total, concluídas, progresso)  
✅ Dados salvos automaticamente  
✅ Sem dependências externas  

---

## 🛠 Tecnologias

- HTML5
- CSS3 (Flexbox, Gradientes, Animações)
- JavaScript ES6+ (Arrow functions, Spread operator, Async/Await)
- localStorage API
- Fetch API
- Clipboard API

---

## 🤖 Uso de IA

A IA foi utilizada para auxiliar no entendimento de:

- **Fetch API** - Requisições HTTP
- **Promises** - Tratamento de operações assíncronas
- **Async/Await** - Sintaxe moderna para código assíncrono
