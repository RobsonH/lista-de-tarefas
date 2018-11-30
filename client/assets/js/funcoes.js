
//Caso o botão pesquisar seja clicado
document.querySelector('#btn-buscar').addEventListener('click', function (envent) {
    //Previne que o formulario seja submetido
    event.preventDefault();
    //Montar formulario
    montarPainel();
});
//defin indo uma tarefa global para auxiliar na alteracao da tarefa
let tarefa = {};
    

//Funçao para montar os cartões
function montarPainel() {
    //Mapeando o painel de tarefas do DOM
    let painelTarefas = document.querySelector('#painelTarefas');
    painelTarefas.innerHTML = '';
    //Mapeando a caixa de busca, capturando o texto da busca

    let filtro = document.querySelector('#texto-busca').value;

    //Espera o resultado da função listarTarefas()
    let promise = listarTarefas(filtro);
    promise
        //Caso o resultado seja processado
        .then(function (response) {
            //Caso não seja encontrado as tarefas
            if (response == null) {
                monstrarMensagem('Nenhuma tarefa encontrada para esta busca!', 'd');
            } else {
                //Caso seja encontradas as tarefas  via API

                response.forEach(function (item) {
                    //Criando o cartão
                    let cartao = document.createElement('div');
                    cartao.className = 'card';
                    cartao.innerHTML = `
                                    <div class="card">
                                    <div class="card-body">
                                      <div>
                                        <span class="card-subtitle mb-2 text-muted">${dataToString(item.data)}</span>
                                      </div>
                                      <p class="card-text">${item.descricao}</p>
                                    </div>
                                </div>
                              `;
                    //Adicionando o cartão no painel de tarefas
                    painelTarefas.appendChild(cartao);

                    cartao.addEventListener('click', function(event){
                        montarFormularioAlterar(item.id);
                        tarefa.id = item.id;
                    });

                });
            }
        })
        //Caso o resultado não seja processado
        .catch(function (erro) {
            console.log(erro);
        });
}
//Quando o botão adicionar tarefa for clicado
document.querySelector('#btn-adicionar').addEventListener('click', function (event) {
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

});

//Quando o botão inserir for clicado

document.querySelector('#btn-inserir').addEventListener('click', function (event) {
    event.preventDefault();
    inserir();

});

//Funcao para inserir dados via API
function inserir() {
    // Capturar os dados do formulario

    let descricao = document.querySelector('#descricao-tarefa').value;
    let data = document.querySelector('#data-tarefa').value;

    //Criar um objeto tarefa
    let tarefa = {};
    tarefa.descricao = descricao;
    tarefa.data = data;
    tarefa.realizado = false;

    //Inserir uma nova tarefa

    let promise = inserirTarefa(tarefa);
    promise
        .then(function (response) {
            monstrarMensagem('Tarefa inserida com sucesso', 's');
            montarPainel();
        })
        .catch(function (erro) {
            monstrarMensagem(erro, 'd');
        });

    //Mostrar o modal
    $('#modal').modal('toggle');
}

// Funcao que monta o formulario para alterar
function montarFormularioAlterar(id) {
    let promise = listarTarefasPorId(id);
    promise
        .then(function (tarefa) {
            //console.log(tarefa);
            //CAmpos do formulario
            document.querySelector('#idTarefa').value = tarefa.id;
            document.querySelector('#descricao-tarefa').value = tarefa.descricao;
            document.querySelector('#data-tarefa').value = dataToInput(tarefa.data);

            //Mostrar o modal
            $('#modal').modal('show');

            //Mostrar o layout do modal
            document.querySelector('#btn-inserir').classList.add('nao-mostrar');
            document.querySelector('#btn-alterar').classList.remove('nao-mostrar');
            document.querySelector('#btn-deletar').classList.remove('nao-mostrar');
            document.querySelector('.modal-title').innerHTML = 'Alterar tarefa';

            //Setando o foco no campo descricao-tarefa
            document.querySelector('#descricao-tarefa').focus();


        })
        .catch(function (erro) {
            monstrarMensagem(erro, 'd');
        });

}

//Quando o botão alterar for clicado
document.querySelector('#btn-alterar').addEventListener('click', function(event){
    event.preventDefault();
//Dados do formulario
    tarefa.descricao = document.querySelector('#descricao-tarefa').value; 
    tarefa.data = document.querySelector('#data-tarefa').value;

    let promise = alterarTarefa(tarefa);
    promise
        .then(function(resolve){
            montarPainel();
            monstrarMensagem('Tarefa alterada com sucesso!', "s");
        })
        .catch(function (erro){
            monstrarMensagem(erro, 'd');
        });
        //Fechando o formulario
        $('#modal').modal('toggle');
});
//Quando clicar no botao deletar
document.querySelector('#btn-deletar').addEventListener('click', function(event){
    event.preventDefault();

    let promise = deletarTarefa(tarefa.id);
    promise
        .then(function(resolve){
            monstrarMensagem('Tarefa deletada com sucesso!', 's');
            montarPainel();
        })
        .catch(function(erro){
            monstrarMensagem(erro, 'd');
        });
        //Fechando o formulario
        $('#modal').modal('toggle');
})