document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('task-list');
    const btnAdd = document.getElementById('add-new-task');
    const btnExport = document.getElementById('export-tasks');
    const output = document.getElementById('export-output');
  
    function attachHandlers(item) {
      item.querySelector('[data-action="edit"]').onclick = () => {
        const span = item.querySelector('span');
        const updated = prompt("Змініть текст:", span.innerText);
        if (updated?.trim()) span.innerText = updated.trim();
      };
  
      item.querySelector('[data-action="insert"]').onclick = () => {
        const text = prompt("Нова задача:", "Нова задача");
        if (!text?.trim()) return;
        const clone = createTaskItem(text.trim());
        list.insertBefore(clone, item);
      };
  
      item.querySelector('[data-action="delete"]').onclick = () => {
        list.removeChild(item);
      };
  
      item.querySelector('[data-action="move-up"]').onclick = () => {
        const prev = item.previousElementSibling;
        if (prev) list.insertBefore(item, prev);
      };
  
      item.querySelector('[data-action="move-down"]').onclick = () => {
        const next = item.nextElementSibling;
        if (next) list.insertBefore(next, item);
      };
    }
  
    function createTaskItem(text) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
  
      const span = document.createElement('span');
      span.innerText = text;
  
      const btns = document.createElement('div');
      btns.className = 'btn-group';
  
      const actions = [
        { type: 'edit', icon: 'bi-pencil', cls: 'btn-outline-secondary' },
        { type: 'insert', icon: 'bi-node-plus', cls: 'btn-outline-primary' },
        { type: 'move-down', icon: 'bi-caret-down-fill', cls: 'btn-outline-warning' },
        { type: 'move-up', icon: 'bi-caret-up-fill', cls: 'btn-outline-info' },
        { type: 'delete', icon: 'bi-x-circle', cls: 'btn-outline-danger' }
      ];
  
      for (const { type, icon, cls } of actions) {
        const btn = document.createElement('button');
        btn.className = `btn ${cls} btn-sm`;
        btn.innerHTML = `<i class="bi ${icon}"></i>`;
        btn.setAttribute('data-action', type);
        btns.appendChild(btn);
      }
  
      li.appendChild(span);
      li.appendChild(btns);
      attachHandlers(li);
      return li;
    }
  
    btnAdd.onclick = () => {
      const text = prompt("Нова задача:", "Нова задача");
      if (!text?.trim()) return;
      list.appendChild(createTaskItem(text.trim()));
    };
  
    btnExport.onclick = () => {
      const items = list.querySelectorAll('li span');
      const result = Array.from(items).map(el => el.innerText).join('\n');
  
      output.innerHTML = `
        <div class="border p-3 bg-light text-dark rounded">
          <pre class="m-0">${result}</pre>
        </div>
      `;
      console.log(result);
    };
  
    const first = list.querySelector('li');
    if (first) attachHandlers(first);
  });
  