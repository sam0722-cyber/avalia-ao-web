const meuModalEditar = new bootstrap.Modal('#modal-editar')

const usuarioLogado = buscarDadosDoLocalStorage('usuarioLogado');

document.addEventListener('DOMContentLoaded', () => {
    if(!usuarioLogado.email) {
        window.location.href = './index.html'
    } else {
        montarRegistrosNoHTML()
    }
})

const formularioHTML = document.getElementById('formulario-recados')

const tbody = document.getElementById('registros')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const tarefa = document.getElementById('tarefa').value 
    const detalhamento = document.getElementById('detalhamento').value

    const recado = {
        tarefa: tarefa,
        detalhamento: detalhamento,
    }

    usuarioLogado.recados.push(recado)
    guardarNoLocalStorage('usuarioLogado', usuarioLogado)

    formularioHTML.reset()

    montarRegistrosNoHTML()
})

function montarRegistrosNoHTML() {
    tbody.innerHTML = '';

    usuarioLogado.recados.forEach((valor, index) => {
        tbody.innerHTML += `
            <tr id="${index}">
                <td>${index +1} </td>
                <td>${valor.tarefa}</td>
                <td>${valor.detalhamento}</td>
                <td>
                    <button id="apagar" onclick="apagarRecado(${index})">
                        <i class="bi bi-trash3"></i>
                        Apagar
                    </button>
                    <button id="editar" type="button" onclick="prepararEdicao(${index})" data-bs-toggle="modal" data-bs-target="#modal-editar" >
                        <i class="bi bi-pen"></i>
                        Editar
                    </button> 
                </td>
            </tr>
        `
    })
}

function guardarNoLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)
}

function buscarDadosDoLocalStorage(chave) {
    const dadoJSON = localStorage.getItem(chave)

    if(dadoJSON) {
        const listaDados = JSON.parse(dadoJSON)
        return listaDados
    } else {
        return {}
    }
}

function apagarRecado(indice) {
    let confirma = window.confirm('Deseja realmente apagar esta tarefa?');

    if(confirma){
        usuarioLogado.recados.splice(indice, 1)

        guardarNoLocalStorage('usuarioLogado', usuarioLogado)

        const tr = document.getElementById(indice)
        tr.remove()
        montarRegistrosNoHTML()
    }
 
}

function prepararEdicao(indice) {
    

    const inputEditarTarefa = document.getElementById("editar-tarefa");
    const inputEditarDetalhamento = document.getElementById("editar-detalhamento");

    inputEditarTarefa.value = usuarioLogado.recados[indice].tarefa
    inputEditarDetalhamento.value = usuarioLogado.recados[indice].detalhamento

    
    const formularioEditar = document.getElementById('formulario-editar-recados')
    formularioEditar.addEventListener('submit', (evento) => {
        evento.preventDefault()

       
        usuarioLogado.recados[indice].tarefa = inputEditarTarefa.value
        usuarioLogado.recados[indice].detalhamento = inputEditarDetalhamento.value
        console.log(usuarioLogado.recados[indice])

       
        guardarNoLocalStorage('usuarioLogado', usuarioLogado)

      
        montarRegistrosNoHTML()

        meuModalEditar.hide()
        
    })
   
}

function sairDaAplicacao() {
    salvarRecados()
    localStorage.removeItem("usuarioLogado")
    window.location.href = './login.html'
}

function salvarRecados() {
    const listaUsuarios = buscarDadosDoLocalStorage('usuarios')

    const acharUsuario = listaUsuarios.findIndex( (valor) => valor.email === usuarioLogado.email)

    listaUsuarios[acharUsuario].recados = usuarioLogado.recados

    guardarNoLocalStorage('usuarios', listaUsuarios)
}