let request = (obj) => {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.open(obj.method || "GET", obj.url);
      req.onload = () => {
        if (req.status >= 200 && req.status < 300) {
          resolve(req.response);
        } else {
          reject(req.statusText);
        }
      };
      req.onerror = () => reject(req.statusText);
      req.send(obj.body);
    });
  };
  
  let object = {
    url: "https://jsonplaceholder.typicode.com/todos",
    method: "GET",
    body: null
  };
  
  async function fetchTodos() {
    try {
      const response = await request(object);
      const todos = JSON.parse(response);
  
      const table = document.createElement("table");
      const headerRow = table.insertRow();
      ["No.", "Title", "Status"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
      });
  
      todos.forEach((todo, index) => {
        const row = table.insertRow();
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = todo.title;
        row.insertCell().textContent = todo.completed ? "✅ Completed" : "❌ Not Completed";
      });
  
      document.body.appendChild(table);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }
  
  fetchTodos();
  