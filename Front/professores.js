let professores = [];

let currentProfessorId = null;

async function carregarProfessores() {
    try {

        const resposta = await fetch('http://localhost:3000/professores');

        professores = await resposta.json();

        renderProfessores();

    } catch (erro) {

        console.error('Erro ao carregar professores:', erro);

    }
}

function renderProfessores() {

    const tbody = document.querySelector('#professoresTable tbody');

    tbody.innerHTML = '';

    professores.forEach(prof => {

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${prof.nomeProfessor}</td>
            <td>${prof.emailProfessor}</td>
            <td>${prof.sala}</td>
            <td>
                <button onclick="editProfessor(${prof.id})">
                    Editar
                </button>

                <button onclick="deleteProfessor(${prof.id})">
                    Excluir
                </button>
            </td>
        `;

        tbody.appendChild(row);

    });
}

function openModal() {
    document.getElementById('professorModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('professorModal').style.display = 'none';
}

document.getElementById('addProfessor').addEventListener('click', () => {

    currentProfessorId = null;

    document.getElementById('professorForm').reset();

    openModal();

});

document.querySelector('.close').addEventListener('click', () => {

    closeModal();

});

function editProfessor(id) {

    const prof = professores.find(p => p.id === id);

    currentProfessorId = id;

    document.getElementById('nomeProfessor').value = prof.nomeProfessor;
    document.getElementById('emailProfessor').value = prof.emailProfessor;
    document.getElementById('sala').value = prof.sala;

    openModal();
}

async function deleteProfessor(id) {

    try {
        const respostaDelete = await fetch(`http://localhost:3000/professores/${id}`, {
            method: 'DELETE'
        });

        const resultado = await respostaDelete.json();
        console.log('DELETE /professores/:id resposta:', resultado);

        if (respostaDelete.ok) {
            professores = professores.filter(p => p.id !== id);
            renderProfessores();
        }
    } catch (erro) {
        console.error('Erro ao enviar DELETE /professores:', erro);
    }
}

document.getElementById('professorForm').addEventListener('submit', async (e) => {

    e.preventDefault();

    const nome = document.getElementById('nomeProfessor').value;
    const email = document.getElementById('emailProfessor').value;
    const sala = document.getElementById('sala').value;

    if (currentProfessorId === null) {

        const novoProfessor = {
            id: Date.now(),
            nomeProfessor: nome,
            emailProfessor: email,
            sala
        };

        try {
            const respostaPost = await fetch('http://localhost:3000/professores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoProfessor)
            });

            const resultado = await respostaPost.json();
            console.log('POST /professores resposta:', resultado);
            professores.push(novoProfessor);
        } catch (erro) {
            console.error('Erro ao enviar POST /professores:', erro);
        }

    } else {

        const prof = professores.find(p => p.id === currentProfessorId);
        const professorAtualizado = {
            id: currentProfessorId,
            nomeProfessor: nome,
            emailProfessor: email,
            sala
        };

        try {
            const respostaPut = await fetch(`http://localhost:3000/professores/${currentProfessorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(professorAtualizado)
            });

            const resultado = await respostaPut.json();
            console.log('PUT /professores/:id resposta:', resultado);

            if (respostaPut.ok) {
                prof.nomeProfessor = nome;
                prof.emailProfessor = email;
                prof.sala = sala;
            }
        } catch (erro) {
            console.error('Erro ao enviar PUT /professores:', erro);
        }
    }

    renderProfessores();

    closeModal();

});

carregarProfessores();