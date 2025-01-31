# Desafio Técnico Dev Fullstack - Overlens

## Visão Geral

Desenvolver uma plataforma de compartilhamento de anotações. Os usuários devem poder criar, editar, excluir e compartilhar anotações com outros usuários.

**Obs.:** A autenticação já está disponível no projeto. O foco será apenas nas features principais do sistema.

## Stack Tecnológica

- Next.js 14+ (App dir)
- TipTap
- Prisma

## Funcionalidades

- Editor Rich Text WYSIWYG
- Autosave durante edição
- Feed de anotações geral
- Feed de anotações do usuário
- Visibilidade pública/privada
- Link de acesso público para a anotação

## Entrega

Envie um e-mail para pessoas@overlens.com.br com o assunto "Desafio Técnico Dev Fullstack - [SEU NOME]". Este e-mail deve conter:

1. Link para repositório no GitHub contendo:

- Aplicação funcionando
- README: Detalhando a solução, decisões importantes e o passo a passo para executar a aplicação localmente.
- .env.example

2. Link do deploy do sistema:

- Frontend (Recomendações: Vercel, Netlify)
- Banco de dados (Recomendações: Neon, Supabase)

## Prazo

Até 4 dias corridos após o recebimento do desafio.

**Obs.:** Caso o prazo não encaixe no seu cronograma, por favor envie um e-mail para [pessoas@overlens.com.br](mailto:pessoas@overlens.com.br) com o assunto "Desafio Técnico Dev Fullstack - Prazo de entrega" para encontrarmos a melhor solução.

## Observações Importantes

- Defina as principais funcionalidades do projeto;
- Mantenha o código limpo, organizado e modularizado;
- Priorize a experiência do usuário;
- Documente decisões importantes;
- Lembre-se:
  > "We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil." - Donald Knuth

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