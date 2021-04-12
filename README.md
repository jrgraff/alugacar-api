**RF** => Requisitos funcionais<br>
**RNF** => Requisitos não funcionais<br>
**RN** => Regras de negócio<br>

## Cadastro de carro

**RF**<br>
Deve ser possível cadastrar um novo carro;<br>

**RN**<br>
Não deve ser possível cadastrar um carro com uma placa já cadastrada;<br>
O usuário responsável pelo cadastro deve ser um administrador **;<br>
O Carro deve ser cadastrado, por padrão, com disponibilidade;<br>

## Listage de carros

**RF**<br>
Deve ser possível listar todos os carros disponíveis;<br>
Deve ser possível listar todos os carros disponíveis pelo nome da categoria;<br>
Deve ser possível listar todos os carros disponíveis pelo nome da marca;<br>
Deve ser possível listar todos os carros disponíveis pelo nome do carro;<br>

**RN**<br>
O usúario não precisa estar logado no sistema;<br>

## Cadastro de especificação no carro

**RF**<br>
Deve ser possível cadastrar uma especificaão para um carro;<br>


**RN**<br>
Não deve ser possível cadastrar uma especificão em um carro não cadastrado;<br>
Não deve ser possível cadastrar uma especificaão já existente para o mesmo carro;<br>
O usuário responsável pelo cadastro deve ser um usuário administrador;<br>

## Cadastro de imagens do carro

**RF**<br>
Deve ser possível cadastrar a imagem do carro;<br>

**RNF**<br>
Utilizar o multer para upload dos arquivos;<br>

**RN**<br>
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;<br>
O usuário responsável pelo cadastro deve ser um usuário administrador;<br>

## Aluguel de carro

**RF**<br>
Deve ser possível cadastrar um aluguel;<br>

**RN**<br>
O aluguel deve ter duração mínima de 24 horas;<br>
Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto apara o mesmo usuário;<br>
Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto apara o mesmo carro;<br>
O usuário deve estar logado na aplicação;<br>
Ao realizar o aluguel, seu status deve ser alterado para indisponível,;<br>

## Aluguel de carro

**RF**<br>
Deve ser possível realizar a devolução de um carro;<br>

**RN**<br>
Se o carro for devolvido com menos de 24h, deverá ser cobrada a diária completa;<br>
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;<br>
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel;<br>
Ao realizar a devolução, deverá ser calculado o total do aluguel;<br>
Caso a data de devolução seja superior a data prevista de entrega, deverá ser cobrado multa proporcional aos dias de atraso;<br>
Caso haja multa, deverá ser somada ao total do aluguel;<br>