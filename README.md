# PokeDex
 
## 🖥️
![Desktop](readme-imgs/desktop.gif)

## 📱
<table>
  <tr>
    <td>Tablet</td>
     <td>Mobile Medium</td>
  </tr>
  <tr>
    <td valign="top"><img height="700px" width="auto" src="readme-imgs/tablet.gif"></td>
    <td valign="top"><img height="700px" width="auto" src="readme-imgs/mobile-m.gif"></td>
  </tr>
 </table>
 
 ## 📝 Sobre o projeto
 
 Senti a necessidade de desenvolver um projeto para ter um primeiro contato real com o consumo de API's.
 
 Com isso resolvi fazer um sistema de busca de pokemons a partir da API disponibilizada gratuitamente pela [PokeAPI](https://pokeapi.co).
 A mesma possui um sistema bem simples, onde só permite requisições GET, e retorna dessa requisição um arquivo JSON. Fiz uso da API .fetch() por
 ser muito simples de implementar. E permitir que com poucas linhas de codigo eu ja tenha acesso a um objeto convertido diretamente do "response" da
 função.
 
 Acredito que a maior dificuldade com esse projeto tenha sido lidar com as Promises, ja que se faz necessario o uso de metodos ASYNC, e é muito facil
 acabar caindo em uma variavel undefined, principalmente com a implementação dinamica dos cards a partir dos dados presentes no objeto retornado pelo
 .fetch().
 
 ### ⚙️ Caso queira executar o projeto, basta clonar esse repositorio ou fazer o download do .zip, e abrir o "index.html". 
 ### 🔗 Ou acesse atraves do link - [PokeDex](https://luan-sabino.github.io/PokeDex/).
 
 ## 🛠️ Construido com
 * Vanilla JS
 * CSS
 * HTML

 ## ✔️ Metas
 - [x] Sistemas de busca, e consumo da API
 - [x] Reset da interface
 - [x] Busca randomica de 4 pokemons para o usuario.
 - [x] Tratamento das entradas
 - [x] Aviso de erro
 - [x] Bloqueio de interações durante o consumo da API.
 - [x] Card de bem vindo
 - [x] Interface responsiva
 - [ ] Hospedagem do projeto junto ao portifólio
 

