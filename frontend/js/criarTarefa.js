//======================= PEGANDO TODOS ELEMENTOS PARA MANIPULAÇÃO DO DOM ==========================================//
const formCriarTarefa = document.getElementById('formCriarTarefa')
const div_CriarTarefaPreviaContentContainerInputs = document.querySelector('.criar-tarefa-content-previa-inputs')
const btn_cancelar_tarefa = document.getElementById('btn-cancelar')
const btn_exluir_tarefa = document.getElementById('btn-excluir')
const btnCloseIcon = document.getElementById('close-icon')
const div_tarefas_content_center = document.querySelector('.filtro-trafeas-center')
const div_all_opcoes_filtro_tarefa = document.querySelectorAll('.all-opcoes-filtro-tarefa li a')

// Obtendo o token do localstorage e armazenand em um variavel
const token = localStorage.getItem('token')
if (!token) window.location = './login.html'

let todasTarefas = []
let tarefaParaExluir = null
let tarefaEditando = null

let formatarData = (dataISO) => 
    dataISO.replace(/(\d{4})-(\d{2})-(\d{2}).*/,'$3/$2/$1')

const fecthEditarTarefa = async (dadosTarefa, id) => {
   try {

      const response = await fetch(`http://127.0.0.1:3000/api/tarefas/atualizar/${id}`, {
         method: 'PUT',
         headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify(dadosTarefa)
      })

      if(!response.ok){
         alert('Erro ao editar tarefa')
         return
      }

      const dados = await response.json()
      return dados
   } catch(error){
      console.error(error)
   }
}


const fecthExcluirTarefa = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/tarefas/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
       })
       if(!response.ok) return alert('Erro ao tentar deletar tarefa')
        const dados = await response.json()
        return dados
    } catch (error) {
        console.error(error)
    }
}

//====================== Chamada da API para puxar do backend todas as tarefas cadastradas pelo usuario no sistema =============//
const fetchCarregartarefas = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/tarefas/list', {
            method: 'GET',
            headers: { 
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (response.status === 401) {
            alert('Sessão expirada. Faça login novamente.')
            window.location = './login.html'
            return []
        }

        if (!response.ok) 
            return []

        const dados = await response.json()
        return Array.isArray(dados) ? dados : []
    } catch (error) {
        console.error('Error ao tentar carregar tarefas' + error)
        return []
    }
}

//=============================== Chamada da API para realizar o cadastro do usurio no Bakend ========================//
const fetchCriarTarefa = async (obj) => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/tarefas/criar', {
            method: 'POST',
            mode: 'cors',
            headers: { 
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        })
        if(!response.ok) {
            alert('Não foi possivel criar a tarefa')
            return
        }
        if(response.ok){
            const dadosCriacaoTarefa = await response.json()
            document.querySelector('.msg-tarefa-criada-container').classList.add('active')
            document.getElementById('msg-tarefa-criada').textContent = dadosCriacaoTarefa.mensagem
            setTimeout(() => {
               window.location = './dashboard.html'
            }, 1000)
        }
    } catch (error) {
        console.error('Error ao tentar criar tarefa' + error)
    }finally{
        return false
    }
}

const setClickButonsOpcoesTarefa = (tarefa) =>{
    let buttonsOpcoesTarefa = tarefa.querySelector('td > .buttons-acao-tarefa')
    let allButtons = buttonsOpcoesTarefa.querySelectorAll('button')
    allButtons[0].addEventListener('click', () => {
       console.log(tarefa)
    })
}

const setMinhasTarefasContentCenter = async () => {
    todasTarefas = await fetchCarregartarefas()
    renderizarTarefas(todasTarefas)
}

const adicionarClickParaFiltrarTarefas = (tarefas) => {
    div_all_opcoes_filtro_tarefa.forEach((btn) => {
        btn.addEventListener('click', () => {
            const filtroBtn = btn.textContent.trim()
            for(let i = 0; i < tarefas.length; i++) {
                const status = tarefas[i].children[3].textContent      
                if(status === filtroBtn) {
                  tarefas[i].style.display = 'table-row'
                  setClickButonsOpcoesTarefa(tarefas[i])
                }else{
                   tarefas[i].style.display = 'none'
                }
                if(filtroBtn === 'Todas') {
                    tarefas[i].style.display = 'table-row'
                }
            }
        })
    })
}

const setDadosPreviaMinhasTarefas = (dados) =>{
    const get_titulo = dados[0].titulo
    const get_descricao = dados[0].descricao
    const get_prioridade = dados[0].prioridade
    const get_status = dados[0].status
    const get_data = dados[0].data

    document.getElementById('data-previa-input-titulo').value = get_titulo
    document.getElementById('data-previa-input-descricao').value = limitarTextoPreview(get_descricao, 60)
    document.getElementById('data-previa-input-prioridade').value = get_prioridade
    document.getElementById('data-previa-input-status').value = get_status
    document.getElementById('data-previa-input-data').value = formatarData(get_data)
    document.querySelector('.data-full-tarefa').classList.add('active')
}

const verMinhasTarefas = async (id) =>{
    let taresCarregadas = await fetchCarregartarefas()
    let filterIdTarefa = taresCarregadas.filter(tarefa => tarefa.id === id)
    document.querySelector('.data-full-tarefa').classList.add('active')
    return setDadosPreviaMinhasTarefas(filterIdTarefa)
}

const renderizarTarefas = (tarefas) => {
    const tbody = div_tarefas_content_center.querySelector('.minhas-tarefas-content tbody')
    tbody.innerHTML = ''
    
    tarefas.forEach(({ id, titulo, prioridade, status, data }) => {
        tbody.innerHTML += `
            <tr>
              <td>${id}</td>
              <td>${titulo}</td>
              <td class="prioridade-alta">${prioridade}</td>
              <td>${status}</td>
              <td>${formatarData(data)}</td>
            </tr>
        `
    })

    let tbody_todas_tarefas = tbody.querySelectorAll('tr')
    adicionarClickParaFiltrarTarefas(tbody_todas_tarefas)
}
const limitarTextoPreview = (texto, limite=80) =>{
    if(!texto) 
        return ''
    if(texto.length > limite) 
        return texto.slice(0, limite) + '...'
    return texto
}


//======================== Função responsavel por exibir os dados da previa da tarefa ============// 
const setDadosPreviaTarefa = (dados) => {
    const get_titulo = dados[0].titulo
    const get_descricao = dados[0].descricao
    const get_prioridade = dados[0].prioridade
    const get_status = dados[0].status
    const get_data = dados[0].data

    document.getElementById('data-previa-input-titulo').value = get_titulo
    document.getElementById('data-previa-input-descricao').value = limitarTextoPreview(get_descricao, 60)
    document.getElementById('data-previa-input-prioridade').value = get_prioridade
    document.getElementById('data-previa-input-status').value = get_status
    document.getElementById('data-previa-input-data').value = formatarData(get_data)
}

//========================== Função responsavel para atualizar o valor apos a exclusão da tarefa ===============//
const atualizarDashboard = async () => {
    const tarefas = await fetchCarregartarefas()
    const concluidas = tarefas.filter(t => t.status === 'Concluida').length
    const pendente = tarefas.filter(t => t.status === 'Pendente').length
    const aFazer = tarefas.filter(t => t.status === 'A Fazer').length

    document.getElementById('total-concluida-tarefa').textContent = concluidas
    document.getElementById('total-pendente-tarefa').textContent = pendente
    document.getElementById('total-a-fazer-tarefa').textContent = aFazer
}

const editarTarefa = async (id) => {
   tarefaEditando = id
   let mudarBotaoParaEditar = document.querySelectorAll('.aside-nav-menu')[0].querySelector('ul').children[1].children[0].textContent = 'Editar Tarefa'
   let tarefasCarregadasAPI = await fetchCarregartarefas()
   let tarefas = tarefasCarregadasAPI.find(tarefa => tarefa.id === id)
   let input_tarefa = document.getElementById('tituloDaTarefa').value = tarefas.titulo
   let input_descricao = document.getElementById('descricao').value = tarefas.descricao
   let select_prioridade = document.getElementById('prioridade').value = tarefas.prioridade
   let select_status = document.getElementById('status').value = tarefas.status
   let select_data = document.getElementById('data').value = tarefas.data.split('T')[0]
   document.getElementById('button-salvar').children[0].textContent = 'Salvar Edição'                                                                                                                                                                                    
}

//========================== Função responsavel para excluir os dados da tarefa ===============//
const excluirTarefa = async (id) => {
    tarefaParaExluir = id
    let tarefasCarregadas = await fetchCarregartarefas()
    let TarefaTitulo = tarefasCarregadas.filter(t => t.id === id)[0].titulo
    document.querySelector('.modal-excluir-container').classList.add('active')
    document.getElementById('titulo-tarefa').textContent = TarefaTitulo 
    
}

//=========== Função responsavel para ver os dados da trefa cadastrada =============================//
const verTarefa = async (id) => {
    let taresCarregadas = await fetchCarregartarefas()
    let filterIdTarefa = taresCarregadas.filter(tarefa => tarefa.id === id)
    document.querySelector('.data-full-tarefa').classList.add('active')
    return setDadosPreviaTarefa(filterIdTarefa)
}

// ========== Função responsavel para inserior os dados da API nos elementos do DOM e renderizar no HTML ============//
const setExibirDadosDatarefaCriada = async () => {
    const div_tarefasTabelaContainer = document.querySelector('.tarefas-tabela-container')
    console.log(div_tarefasTabelaContainer)
    let tarefasCriada = await fetchCarregartarefas()
    tarefasCriada.forEach(({ id, titulo, prioridade, status, data }) => {
            div_tarefasTabelaContainer.querySelector('table > tbody').innerHTML += `
              <tr class="tr-content-tarefa" data-id="${id}">
                  <td>${id}</td>
                  <td class="titulo-tarefa">${limitarTextoPreview(titulo, 80)}</td>
                  <td class="prioridade-alta">${prioridade}</td>
                  <td class="status">${status}</td>
                  <td>${formatarData(data)}</td>
                  <td>
                    <div class="buttons-acao-tarefa">
                      <button onclick="verTarefa(${id})"><img src="/frontend/img/Eye.png" alt="Ver Tarefa" title="Ver Tarefa"></button>
                      <button onclick="editarTarefa(${id})"><img src="/frontend/img/Pencil.png" alt="Editar Tarefa" title="Editar Tarefa"></button>
                      <button onclick="excluirTarefa(${id})"><img src="/frontend/img/Remove.png" alt="Excluir Tarefa" title="Excluir Tarefa"></button>
                      <button><img src="/frontend/img/Group 30.png" alt="Feito" title="Feito"></button>
                    </div>
                  </td>
               </tr>
            `
    })

    div_tarefasTabelaContainer.querySelectorAll('.tr-content-tarefa > table')

    div_tarefasTabelaContainer.querySelector('table > tbody').querySelectorAll('.tr-content-tarefa').forEach(tr => {
        if(tr.querySelectorAll('.status')[0].textContent.includes('Concluida')) {
            tr.querySelector('.buttons-acao-tarefa').children[3].remove()
            return
        }
        return false
    })

    div_tarefasTabelaContainer.querySelector('table > tbody').querySelectorAll('.tr-content-tarefa').forEach(tr => {
        switch(tr.querySelectorAll('.prioridade-alta')[0].textContent) {
            case 'Alta':
              tr.querySelectorAll('.prioridade-alta')[0].style.color = '#44AAAA'
              break
            case 'Media':
                tr.querySelectorAll('.prioridade-alta')[0].style.color = '#C49D1C'
               break
            case 'Baixa':
                tr.querySelectorAll('.prioridade-alta')[0].style.color = '#B22F2F'
               break
            default:
                tr.querySelectorAll('.prioridade-alta')[0].style.color = '#FFFF'
        }
    })

    div_tarefasTabelaContainer.querySelector('table > tbody').querySelectorAll('.tr-content-tarefa').forEach(tr => {
       switch(tr.querySelectorAll('.status')[0].textContent) {
          case 'Concluida':
            tr.querySelectorAll('.status')[0].style.color = '#4AAC26'
            break
          case 'Pendente':
            tr.querySelectorAll('.status')[0].style.color = '#C49D1C'
            break
          case 'A Fazer':
            tr.querySelectorAll('.status')[0].style.color = '#8D8DA6'
            break
          default:
           tr.querySelectorAll('.status')[0].style.color = '#FFFF'
       }
    })
}

//============= Evento de click para remover o data-full-tarefa ao ser clicado =============//
btn_exluir_tarefa.addEventListener('click', async () => {
    if(tarefaParaExluir == null){
        alert('Nenhuma tarefa selecionada')
        return
    }
    document.querySelector('.modal-excluir-container').classList.remove('active')
    const resultdado = await fecthExcluirTarefa(tarefaParaExluir)
    if(resultdado){
         const trDashboard = document.querySelector(`.tr-content-tarefa[data-id="${tarefaParaExluir}"]`)
          trDashboard.remove()
          document.querySelector('.msg-deletar-tarefa').classList.add('active')
          document.querySelector('.msg-deletar-tarefa').textContent = `${resultdado.mensagem}`
          setTimeout(() => {
            document.querySelector('.msg-deletar-tarefa').classList.remove('active')
          }, 1500)
    }else{
        return false
    }

     todasTarefas = todasTarefas.filter(tarefa => tarefa.id !== tarefaParaExluir)
     renderizarTarefas(todasTarefas)
     await atualizarDashboard()
     tarefaParaExluir = null
})

btn_cancelar_tarefa.addEventListener('click', () => document.querySelector('.modal-excluir-container').classList.remove('active'))
btnCloseIcon.addEventListener('click', () => document.querySelector('.data-full-tarefa').classList.remove('active'))

//========= Evento usado para exibir o conteudo HTML se foi completamente carregado ==============//
window.addEventListener('DOMContentLoaded', async () => {
    const tarefas = await fetchCarregartarefas()
    const concluidas = tarefas.filter(t => t.status === 'Concluida').length
    const pendente = tarefas.filter(t => t.status === 'Pendente').length
    const aFazer = tarefas.filter(t => t.status === 'A Fazer').length
    document.getElementById('total-concluida-tarefa').textContent = concluidas
    document.getElementById('total-pendente-tarefa').textContent = pendente
    document.getElementById('total-a-fazer-tarefa').textContent = aFazer
    await setExibirDadosDatarefaCriada()
    setMinhasTarefasContentCenter()
    await renderizarTarefas(todasTarefas)
})


//============ Obtendo elemento input do formulario e adcionando um evento input para checar com os inputs do formulario a direita que e da previa
formCriarTarefa.querySelectorAll('.input').forEach(input => {
    input.addEventListener('input', (e) => {
        let tituloDaTarefa_input_name = e.target.name
        let tituloDaTarefa_input_value = e.target.value.trim()
        div_CriarTarefaPreviaContentContainerInputs.querySelectorAll('.input input').forEach(inputPrevia =>{
            inputPrevia.getAttribute('name') === tituloDaTarefa_input_name ? 
            inputPrevia.value = tituloDaTarefa_input_value : false
        })
    })
})

//=========== Evento subimit usando para submter o envio do formulário ao clicar no button cadatsrar ====//
formCriarTarefa.addEventListener("submit", async (e) => {
    e.preventDefault()

    const inputTituloDaTarefa =  e.target[0].value
    const inputDescicao = e.target[1].value
    const select_prioridade = e.target[2].value
    const select_status = e.target[3].value
    const inputData = e.target[4].value

    if(inputTituloDaTarefa === '' || inputDescicao === '' || select_prioridade === '' || select_status === '' || inputData === '') {
        alert('Por preencha os campos obrigatórios!')
        return
    }

    let dadosTarefa  =  
    {
        titulo: inputTituloDaTarefa,
        descricao: inputDescicao,
        prioridade: select_prioridade,
        status: select_status,
        data: inputData
    }
    
    let confirmCriacaoDatarefa = confirm('Deseja visuavlizar na pagina do dashboard?')
    
    if(!confirmCriacaoDatarefa) {
        return false
    }

   if(tarefaEditando != null) {
      const respostaEditar = await fecthEditarTarefa(dadosTarefa, tarefaEditando)
      if(respostaEditar){
        todasTarefas = todasTarefas.map(tarefa => {
            if(tarefa.id === tarefaEditando){
                return {
                    ...tarefa,
                    ...dadosTarefa
                }
            }
            return tarefa
        })
        renderizarTarefas(todasTarefas)
        let tarefaAtualizada = todasTarefas.filter(tarefa => tarefa.id === tarefaEditando)
        setDadosPreviaTarefa(tarefaAtualizada)
        await atualizarDashboard()
        formCriarTarefa.reset()
        tarefaEditando = null
        document.getElementById('button-salvar').children[0].textContent = 'Salvar'
        document.querySelector('.msg-tarefa-criada-container').classList.add('active')
        document.getElementById('msg-tarefa-criada').textContent = respostaEditar.mensagem
        setTimeout(() => {
            document.querySelector('.msg-tarefa-criada-container').classList.remove('active')
             window.location = './dashboard.html'
        }, 1500)
      }
   }else{
     await fetchCriarTarefa(dadosTarefa)
   }
})
