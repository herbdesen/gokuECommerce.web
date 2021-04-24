# gokuECommerce.web

###Definição Funcional
Módulo Web Frontend para o projeto Goku e-commerce

Este simples módulo foi desenvolvido em html, javascript/jQuery e css. 

Seu objetivo é disponilizar as funcionalidades requisitadas pelo Goku e-commerce, se comunicando via REST Api com um micro-serviço backend.
As funcionalidades desenvolvidas foram:

  - Login de acesso
  - Formulário de usuário para acesso ao sistema:
      - Cadastro
      - Edição
      - Exclusão
  - Formulário de endereços:
      - Cadastro
      - Edição
      - Exclusão
      - Busca de endereço cadastrado por CEP

Para o formulário de usuário, foi incluido a opção de indicar um determinado usuário como administrador.
Para o formulário de endereços, foi usado um serviço público chamado VIA CEP para consultar e popular automaticamente os campos do endereço.

Ao acessar o sistema, apenas usuários com perfil de administrador podem cadastrar e excluir outros usuários.
O usuário logado, seja administrador ou não, só pode alterar os seus próprios dados.


###Execução
Para executar o frontend é utilizado o node.js para subir um servidor local com os arquivos do projeto. 
Considerando que o ambiente já tenha o node.js, basta instalar o "http-server" com o comando abaixo: 
- npm install --global http-server
    
O próximo passo é, via terminal, entrar na pasta raiz do projeto (gokuECommerce.web) e iniciar o servidor com 
o comando abaixo:
- http-server -c-1 -o -p 8081
    
O browser será aberto automaticamente (http://127.0.0.1:8081/#login).
*Vale destacar que o módulo do Backend (gokuECommerce) já deve estar sendo executado.

O sistema já possui dois usuários cadastrados:
  - Perfil de Administrador:
      - username = admin
      - password = admin

- Perfil não Administrador:
      - username = teste
      - password = teste
