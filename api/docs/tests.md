# Cenários de Teste de Unidade do Domínio

## Card  
### Criar Carta:  

- Verificar se é possível criar uma carta usando o construtor e uma função estática `create`.  
- Testar se todas as propriedades da carta são corretamente definidas ao serem criadas.  

### Alterar Propriedades da Carta:  

- Testar a funcionalidade de configuração para a imagem, nome e visibilidade da carta, verificando se as alterações são aplicadas corretamente.  

### Validar Campos Obrigatórios:  

- Verificar disparos de erros ao usar imagens ou nomes vazios ao criar ou alterar cartas.  

## Member  
### Criar Membro:  

- Verificar se é possível criar um membro especificando um usuário e um papel.  

### Alterar Papel:  

- Testar a alteração do papel de um membro, assegurando que a modificação seja aplicada corretamente.  

### Validar Papel Vazio:  

- Verificar se um erro é disparado ao fornecer um papel vazio na criação de um membro.  

## Organization.test.ts  
### Criar Organização:  

- Testar a criação de uma organização com nome, membros, descrição, projetos e cartas.  

### Gerenciar Organização:  

- Incluir testes para adicionar membros, projetos e cartas a uma organização, bem como alterar o nome e a descrição da organização.  

### Validar Campos Obrigatórios:  

- Verificar disparos de erros ao omitir ou fornecer valores inválidos para campos obrigatórios, como nome e membros da organização.  

### Validar Papéis Inválidos:  

- Assegurar que um erro seja disparado ao atribuir um papel inválido ou inexistente na criação da organização.  

## Project.test.ts  
### Criar Projeto:  

- Testar a criação de um projeto usando métodos de criação padrão e uma função estática `create`, com e sem descrição.  

### Alterar Propriedades do Projeto:  

- Verificar se é possível alterar o nome e a descrição de um projeto e adicionar membros.  

### Validar Campos Obrigatórios:  

- Verificar disparos de erros em campos obrigatórios vazios, como nome do projeto, e testar membros com papéis inválidos.  

## User.test.ts  
### Criar Usuário:  

- Testar a criação de um usuário validando se as propriedades (nome, e-mail, senha) são atribuídas corretamente.  

### Alterar Propriedades do Usuário:  

- Testar a capacidade de alterar o nome e a senha do usuário.  

### Validar Campos Obrigatórios:  

- Verificar disparos de erros ao omitir ou fornecer valores inválidos para campos obrigatórios, como nome e senha.  
