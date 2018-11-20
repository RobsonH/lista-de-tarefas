
//Funçao para montar os cartões
function montarPainel(){
    //Mapeando o painel de tarefas do DOM
    let painelTarefas = document.querySelector('#painelTarefas');
    painelTarefas.innerHTML = '';

//Espera o resultado da função listarTarefas()
    let promise = listarTarefas("");
    promise
    //Caso o resultado seja processado
        .then(function(response){
            //console.log(response);

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

        })
        //Caso o resultado não seja processado
        .catch(function(erro){
            console.log(erro);
        });    
}