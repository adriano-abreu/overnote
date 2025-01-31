# Como executar a aplicação

1. Clone o repositório
2. Rode o comando `npm install` para instalar as dependências
3. Copie o arquivo `.env.example` para `.env` e preencha com as informações do seu ambiente
4. Rode o comando `docker-compose up -d` para subir o banco de dados em um container
5. Rode o comando `npx prisma migrate dev` para executar as migrations do banco de dados
6. Rode o comando `npm run dev` para executar a aplicação

# Desafio Técnico Dev Fullstack - Overlens

Disponível em: [desafio-tecnico.md](./desafio-tecnico.md)

Caso precisem de ajuda, ou tenham alguma sugestão, podem entrar em contato através:

- Email: [pessoas@overlens.com.br](mailto:pessoas@overlens.com.br)
- WhatsApp: [+5531996191047](https://wa.me/5531996191047)


## Feedback sobre o Desafio

Gostaria de expressar minha gratidão pela oportunidade de realizar este desafio técnico. Foi uma experiência enriquecedora, permitindo-me explorar diferentes aspectos do desenvolvimento fullstack.

No início, enfrentei algumas dificuldades relacionadas à experiência do usuário, pois a ausência de um design pré-definido exigiu um esforço adicional para estruturar a interface de forma intuitiva. No entanto, com a implementação da página /dashboard, onde o usuário pode visualizar todas as anotações e criar novas, o fluxo do sistema tornou-se mais claro e de fácil compreensão.

Para a busca e manipulação dos dados, utilizei o TanStack Query, empregando useQuery para buscar as anotações e useMutation para salvá-las de forma eficiente. A criação de uma nova anotação ocorre assim que o usuário seleciona essa opção, registrando no banco de dados um título vazio e redirecionando imediatamente para a página de edição.

Na página de edição, implementei um editor rich text utilizando o TipTap, que oferece diversas APIs prontas para uso. Para o autosave, utilizei useRef para armazenar o conteúdo do editor e configurei um temporizador de 5 segundos. Esse temporizador é reiniciado a cada alteração feita pelo usuário, garantindo que o sistema não execute salvamentos excessivos.

A interface também conta com um menu bar contendo funcionalidades essenciais:

Botão de Publicar: Abre um diálogo onde o usuário pode definir a visibilidade da anotação (pública ou privada);

Botão de Copiar Link: Copia o link da anotação para a área de transferência.

Caso o usuário opte por publicar a anotação, o sistema atualiza seu status no banco de dados e disponibiliza o link público para compartilhamento. Além disso, quando um usuário acessa uma anotação pública, ele pode visualizar e editar seu conteúdo. Se a anotação for privada e não pertencer ao usuário, ele é redirecionado para o dashboard.

Esse desafio foi uma excelente oportunidade para aprimorar minhas habilidades técnicas e de organização de código. Agradeço novamente pela experiência e fico à disposição para eventuais dúvidas ou feedbacks adicionais!