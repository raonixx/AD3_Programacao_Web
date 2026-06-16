let cursos = [];
let currentCursoId = null;

async function carregarCursos() {
    try {
        const resposta = await fetch('http://localhost:3000/cursos');
        const cursosCarregados = await resposta.json();
        cursos = cursosCarregados.map(curso => ({
            id: curso.id ?? curso.codigo ?? Date.now(),
            codigo: curso.id ?? curso.codigo ?? Date.now(),
            nomeCurso: curso.nomeCurso ?? curso.nome ?? '',
            semestres: curso.semestres ?? curso.sigla ?? '',
            coordenador: curso.coordenador ?? ''
        }));
        renderCursos();
    } catch (erro) {
        console.error('Erro ao carregar cursos:', erro);
        cursos = [];
        renderCursos();
    }
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

const btAddCurso = document.getElementById('addCurso');
btAddCurso.addEventListener('click', function () {
    currentCursoId = null;
    document.getElementById('cursoForm').reset();
    openModal('cursoModal');
});

document.querySelectorAll('.close').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        closeModal(this.closest('.modal').id);
    });
});

function renderCursos() {
    const tbody = document.querySelector('#cursosTable tbody');
    tbody.innerHTML = '';
    cursos.forEach((curso) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${curso.nomeCurso}</td>
            <td>${curso.semestres}</td>
            <td>${curso.coordenador}</td>
            <td>
                <button onclick="editCurso(${curso.codigo})">Editar</button>
                <button onclick="deleteCurso(${curso.codigo})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editCurso(codigo) {
    const curso = cursos.find(c => c.codigo === codigo);
    currentCursoId = codigo;
    document.getElementById('codigo').value = curso.codigo;
    document.getElementById('nomeCurso').value = curso.nomeCurso;
    document.getElementById('semestres').value = curso.semestres;
    document.getElementById('coordenador').value = curso.coordenador;
    openModal('cursoModal');
}

async function deleteCurso(codigo) {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
        try {
            const respostaDelete = await fetch(`http://localhost:3000/cursos/${codigo}`, {
                method: 'DELETE'
            });
            const resultado = await respostaDelete.json();
            console.log('DELETE /cursos/:codigo resposta:', resultado);

            if (respostaDelete.ok) {
                cursos = cursos.filter(c => c.codigo !== codigo);
                renderCursos();
            }
        } catch (erro) {
            console.error('Erro ao enviar DELETE /cursos:', erro);
        }
    }
}

async function addCurso(codigo, nomeCurso, semestres, coordenador) {
    const novoCurso = {
        codigo,
        nomeCurso,
        semestres: Number(semestres),
        coordenador
    };

    try {
        const respostaPost = await fetch('http://localhost:3000/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoCurso)
        });

        const resultado = await respostaPost.json();
        console.log('POST /cursos resposta:', resultado);
        if (respostaPost.ok) {
            cursos.push(novoCurso);
        }
    } catch (erro) {
        console.error('Erro ao enviar POST /cursos:', erro);
    }
}

const formCurso = document.getElementById('cursoForm');
formCurso.addEventListener('submit', async function (event) {
    event.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const nomeCurso = document.getElementById('nomeCurso').value;
    const semestres = document.getElementById('semestres').value;
    const coordenador = document.getElementById('coordenador').value;

    if (currentCursoId !== null) {
        const cursoAtualizado = {
            codigo: Number(codigo),
            nomeCurso,
            semestres: Number(semestres),
            coordenador
        };

        try {
            const respostaPut = await fetch(`http://localhost:3000/cursos/${currentCursoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cursoAtualizado)
            });

            const resultado = await respostaPut.json();
            console.log('PUT /cursos/:codigo resposta:', resultado);

            if (respostaPut.ok) {
                const curso = cursos.find(c => c.codigo === currentCursoId);
                curso.nomeCurso = nomeCurso;
                curso.semestres = Number(semestres);
                curso.coordenador = coordenador;
            }
        } catch (erro) {
            console.error('Erro ao enviar PUT /cursos:', erro);
        }
    } else {
        await addCurso(Number(codigo), nomeCurso, semestres, coordenador);
    }

    renderCursos();
    closeModal('cursoModal');
    formCurso.reset();
});

carregarCursos();