const listaUsuarios = buscarDadosDoLocalStorage('usuarios')

const formularioHTML = document.getElementById('formulario-login')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()
    
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    
    const usuarioEncontrado = listaUsuarios.find( (valor) => valor.email === email && valor.senha === senha)

    if(!usuarioEncontrado) {
        alert('E-mail ou senha estão incorretos ou não existem')
        return
    } else {
        guardarNoLocalStorage('usuarioLogado', usuarioEncontrado)
        window.location.href = './lista.html'
    }
})

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
        return []
    }
}
