module.exports=[
  //maximo de perguntas 28
  {
    question: 'Qual o seu nome?',
    name:'Oi, meu nome é'
  },
  {
    question: 'Qual a sua idade?',
    name:'Minha idade é'
  },
  {
    question: 'De qual região do Brasil você mora?',
    placeholder: 'Selecione a região',
    customId: 'Eu moro',
    minValues: 1,
    maxvalues: 1,
    options:[
      {
        label: 'Fora do Brasil',
        value: 'fora do Brasil',
        description: 'Selecione essa opção caso more fora do Brasil',
        emoji: '🌎'
      },
      {
        label: 'Norte',
        value: 'na região norte do Brasil',
        description: 'Amazonas, Acre, Rondônia, Pará, Amapá, Roraima e Tocantins.',
        emoji: '🌳'
      },
      {
        label: 'Nordeste',
        value: 'na região nordeste do Brasil',
        description: 'Maranhão, Piauí, Ceará, Bahia, Pernambuco, Rio Grande do Norte, Sergipe, Alagoas e Paraíba.',
        emoji: '🏖️'
      },
      {
        label: 'Centro-Oeste',
        value: 'na região centro-oeste do Brasil',
        description: 'Mato Grosso, Goiás, Mato Grosso do Sul e Distrito Federal.',
        emoji: '🌾'
      },
      {
        label: 'Sudeste',
        value: 'na região sudeste do Brasil',
        description: 'Minas Gerais, São Paulo, Rio de Janeiro e Espírito Santo.',
        emoji: '🏭'
      },
      {
        label: 'Sul',
        value: 'na região Sul do Brasil',
        description: 'Paraná, Santa Catarina e Rio Grande do Sul.',
        emoji: '🐄'
      }
    ]
  },
  {
    question: 'Você joga MU online? se SIM à quanto tempo?',
    name:'Eu jogo mu online?'
  },
  {
    question: 'Qual o horário que você joga mais?',
    placeholder: 'Selecione o período',
    customId: 'Eu costumo',
    minValues: 1,
    maxvalues: 1,
    options:[
      {
        label: 'Não jogo',
        value: 'não jogar',
        description: 'Selecione caso você não tenha o habito de jogar',
        emoji: '⛔'
      },
      {
        label: 'Em horários flexiveis',
        value: 'jogar em horários flexiveis',
        description: 'Selecione caso jogue em diversos horários',
        emoji: '🌓'
      },
      {
        label: 'Matutino',
        value: 'jogar no periodo da manhã',
        description: 'Selecione caso jogue no periodo da manhã',
        emoji: '⛅'
      },
      {
        label: 'Vespertino',
        value: 'jogar no periodo da tarde',
        description: 'Selecione caso jogue no periodo da tarde',
        emoji: '☀️'
      },
      {
        label: 'Noturno',
        value: 'jogar no periodo da noite',
        description: 'Selecione caso jogue no periodo da noite',
        emoji: '🌑'
      },
      {
        label: 'Madrugada',
        value: 'jogar de madrugada',
        description: 'Selecione caso jogue de madrugada',
        emoji: '☁️'
      },
    ]
  },
  {
    question: 'Quais classe de chars do MU você costuma jogar?',
    placeholder: 'Selecione a classe do char',
    customId: 'No MU eu costumo jogar com',
    minValues: 1,
    maxvalues: 7,
    options:[
      {
        label: 'Nenhum char',
        value: 'nennhum char',
        description: 'Selecione caso você não jogue',
        emoji: '⛔'
      },
      {
        label: 'Fairy Elf',
        value: 'Fairy Elf',
        description: 'Selecione caso jogue de Fairy Elf',
        emoji: '🧚'
      },
      {
        label: 'Dark Wizard ',
        value: 'Dark Wizard ',
        description: 'Selecione caso jogue de Dark Wizard ',
        emoji: '🧙'
      },
      {
        label: 'Dark Knight',
        value: 'Dark Knight',
        description: 'Selecione caso jogue de Dark Knight',
        emoji: '⚔️'
      },
      {
        label: 'Magic Gladiator',
        value: 'Magic Gladiator',
        description: 'Selecione caso jogue de Magic Gladiator',
        emoji: '🦸‍♂️'
      },
      {
        label: 'Dark Lord',
        value: 'Dark Lord',
        description: 'Selecione caso jogue de Dark Lord ',
        emoji: '🧝‍♂️'
      },
      {
        label: 'Summoner',
        value: 'Summoner',
        description: 'Selecione caso jogue de Summoner',
        emoji: '🧙‍♀️'
      },
      {
        label: 'Rage Fighter',
        value: 'Rage Fighter',
        description: 'Selecione caso jogue de Rage Fighter',
        emoji: '💂'
      }
    ]
  },
  {
    question: 'Defina-se em uma frase.',
    name:'Um pouco mais sobre mim'
  },
]