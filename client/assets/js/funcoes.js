
//Caso o botão pesquisar seja clicado
document.querySelector('#btn-buscar').addEventListener('click', function(envent){
    //Previne que o formulario seja submetido
    event.preventDefault();
    //Montar formulario
    montarPainel();
});

//Funçao para montar os cartões
function montarPainel(){
    //Mapeando o painel de tarefas do DOM
    let painelTarefas = document.querySelector('#painelTarefas');
    painelTarefas.innerHTML = '';
//Mapeando a caixa de busca, capturando o texto da busca

let filtro = document.querySelector('#texto-busca').value;

//Espera o resultado da função listarTarefas()
    let promise = listarTarefas(filtro);
    promise
    //Caso o resultado seja processado
        .then(function(response){
//Caso não seja encontrado as tarefas
            if (response == null){
                monstrarMensagem('Nenhuma tarefa encontrada para esta busca!','d');
            }else{
//Caso seja encontradas as tarefas  via API
                
                            response.forEach(function(item){
                                //Criando o cartão
                                let cartao = document.createElement('div');
                                cartao.className = 'card';
                                cartao.innerHTML = `
                                    <div class="card">
                                    <div class="card-body">
                                      <div>
                                        <span class="card-subtitle mb-2 text-muted">${item.data}</span>
                                      </div>
                                      <p class="card-text">${item.descricao}</p>
                                    </div>
                                </div>
                              `;
                              //Adicionando o cartão no painel de tarefas
                              painelTarefas.appendChild(cartao);
                
                            });
            }
        })
        //Caso o resultado não seja processado
        .catch(function(erro){
            console.log(erro);
        });    
}
//Quando o botão adicionar tarefa for clicado
document.querySelector('#btn-adicionar').addEventListener('click', function(event){
    event.preventDefault();
    //Mostrar o modal
    $('#modal').modal('show');

    //Mostrar o layout do modal
    document.querySelector('#btn-inserir').classList.remove('nao-mostrar');
    document.querySelector('#btn-alterar').classList.add('nao-mostrar');
    document.querySelector('#btn-deletar').classList.add('nao-mostrar');
    document.querySelector('.modal-title').innerHTML = 'Inserir nova tarefa';

    //Setando o foco no campo descricao-tarefa
    document.querySelector('#descricao-tarefa').focus();

    //Limpando os campos do formulario
    document.querySelector('#descricao-tarefa').value = '';
    document.querySelector('#data-tarefa').value = '';

})