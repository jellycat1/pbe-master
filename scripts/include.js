async function includeHTML() {
  const includeElements = document.querySelectorAll('[data-include]');
  
  for (const el of includeElements) {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error('File not found: ' + file);
      const html = await response.text();
      el.innerHTML = html;
    } catch (err) {
      el.innerHTML = `<div style="color:red;">${err}</div>`;
    }
  }
}

includeHTML();