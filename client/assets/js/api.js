function listarTarefas(filtro){
    return new Promise(function(resolve, reject){

        let url = 'http://localhost:3010/api/v1/tarefas/f/'+filtro;

        let requisicao = new XMLHttpRequest();

        requisicao.onreadystatechange = function(){
            if (this.readyState ==4) {
                if (this.status == 200) {
                    resolve(JSON.parse(this.response));
                }else{
                    reject("Erro ao conectar ao servidor");
                }
            }
        }

        requisicao.open("GET", url, true);
        requisicao.send();
    });

}