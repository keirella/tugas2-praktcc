const API_URL = '/notes'; 

const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const idInput = document.getElementById('noteId');
const searchInput = document.getElementById('searchInput');
const saveBtn = document.getElementById('saveBtn');
const notesList = document.getElementById('notesList');

async function loadNotes() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        renderNotes(data);
    } catch (err) {
        console.error(err);
    }
}

function renderNotes(data) {
    notesList.innerHTML = data.map(n => {
        const rawDate = n.created_at || n.createdAt || n.tanggal;
        const dateObj = rawDate ? new Date(rawDate) : new Date();
        const date = dateObj.toLocaleDateString('id-ID', {
            day: '2-digit', month: 'short', year: 'numeric'
        });

        return `
            <div class="note-item">
                <div class="note-header">
                    <span class="note-id">#${n.id}</span>
                    <span class="note-date">${date}</span>
                </div>
                <h3>${n.judul}</h3>
                <p>${n.isi}</p>
                <div class="note-actions">
                    <button onclick="editNote(${n.id}, '${n.judul}', '${n.isi}')" style="background: #27ae60; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">Edit</button>
                    <button onclick="deleteNote(${n.id})" style="background: #e74c3c; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">Hapus</button>
                </div>
            </div>
        `;
    }).join('');
}

async function searchNote() {
    const query = searchInput.value.trim();
    if (!query) {
        loadNotes();
        return;
    }

    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const filtered = data.filter(n => n.id.toString() === query);
        renderNotes(filtered);
    } catch (err) {
        console.error(err);
    }
}

saveBtn.addEventListener('click', async () => {
    const payload = { judul: titleInput.value, isi: contentInput.value };
    const id = idInput.value;

    if (!payload.judul || !payload.isi) {
        alert("Judul dan isi tidak boleh kosong!");
        return;
    }

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        clearForm();
        loadNotes();
    } catch (err) {
        console.error(err);
    }
});

async function deleteNote(id) {
    if (confirm("Hapus catatan ini?")) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            loadNotes();
        } catch (err) {
            console.error(err);
        }
    }
}

function editNote(id, judul, isi) {
    idInput.value = id;
    titleInput.value = judul;
    contentInput.value = isi;
    saveBtn.innerText = "Update Catatan";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearForm() {
    idInput.value = "";
    titleInput.value = "";
    contentInput.value = "";
    searchInput.value = "";
    saveBtn.innerText = "Simpan Catatan";
    loadNotes();
}

loadNotes();