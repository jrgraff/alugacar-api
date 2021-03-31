**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regras de negócio

# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro;
Deve ser possível listar todas categorias de um carro;

**RN**
Não deve ser possível cadastrar um carro com uma placa já cadastrada;
Não deve ser possível alterar uma placa de um carro já cadastrado;
O Carro deve ser cadastrado, por padrão, com disponibilidade;

# Listage de carros

**RF**
Deve ser possível listar todos os carros disponíveis;
Deve ser possível listar todos os carros disponíveis pelo nome da categoria;
Deve ser possível listar todos os carros disponíveis pelo nome da marca;
Deve ser possível listar todos os carros disponíveis pelo nome do carro;

**RN**
O usúario não precisa estar logado no sistema;

# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificaão para um carro;
Deve ser possivel listar todas as especificações cadastradas;
Deve ser possível listar todos os carros;


**RN**
Não deve ser possível cadastrar uma especificão em um carro não cadastrado;
Não deve ser possível cadastrar uma especificaão já existente para o mesmo carro;
O usuário responsável pelo cadastro deve ser um usuário administrador;

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro;
Deve ser possível listar todos os carros;

**RNF**
Utilizar o multer para upload dos arquivos;

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
O usuário responsável pelo cadastro deve ser um usuário administrador;

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel;

**RN**
O aluguel deve ter duração mínima de 24 horas;
Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto apara o mesmo usuário;
Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto apara o mesmo carro;