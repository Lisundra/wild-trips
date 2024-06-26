/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tours', [
      {
        name: 'Долина гейзеров',
        title: 'Тур в Долину гейзеров на Камчатке',
        subtitle: 'Незабываемое путешествие по самому крупному гейзерному полю Евразии',
        average_rating: 9.1,
        editors_choice: true,
        description: 'Погрузитесь в уникальную атмосферу Долины гейзеров на Камчатке, которая является самым крупным гейзерным полем в Евразии. Вас ждет захватывающее путешествие по этим местам, где вы сможете увидеть мощные гейзеры, кипящие источники и другие удивительные природные явления. В течение 7 дней вы окунетесь в мир вулканических ландшафтов и уникальной флоры и фауны, которые делают этот регион настоящим чудом природы. Под руководством опытных гидов вы сможете узнать много интересного о гейзерах, вулканах и истории этого удивительного места.',
        start_date: '2024-04-10',
        end_date: '2024-04-16',
        duration: 7,
        price: 150000,
        discount: null,
        country: 'Россия',
        region: 'Камчатка',
        season: 'Весна',
        difficulty: 'Средняя',
        family_friendly: true,
        coordinates: `"\"3Ab0a9713d90dd10222663ccedb5ee2dc8abd9c2876b5276b47e587d2cac16c76e\""`,
        organizer_id: 3,
      },
      {
        name: 'Сафари в Танзании',
        title: 'Уникальное сафари в Национальном парке Серенгети',
        subtitle: 'Встреча с дикой природой Африки: львы, слоны, жирафы и многие другие виды животных',
        average_rating: 4.9,
        editors_choice: false,
        description: 'Отправляйтесь в увлекательное сафари в Национальном парке Серенгети и погрузитесь в мир дикой природы Африки. Вас ждет встреча с многочисленными видами животных, включая львов, слонов, жирафов и многих других. Это уникальное путешествие позволит вам увидеть животных в их естественной среде обитания и насладиться невероятными пейзажами Африканской саванны. Программа длится 10 дней и подходит для всей семьи. Ваше сафари будет запоминающимся и незабываемым приключением!',
        start_date: '2024-07-03',
        end_date: '2024-07-13',
        duration: 10,
        price: 250000,
        discount: 100000,
        country: 'Танзания',
        region: 'Африка',
        season: 'Лето',
        difficulty: 'Низкая',
        family_friendly: true,
        organizer_id: 3,
      },
      {
        name: 'Поход в Гималаи',
        title: 'Экспедиция в Гималаи с опытными гидами',
        subtitle: 'Поход в самые высокие горы мира, включая восхождение на Эверест',
        average_rating: 4.5,
        editors_choice: false,
        description: 'Присоединяйтесь к увлекательной экспедиции в Гималаи и отправляйтесь в путь по самым высоким горам мира. Вас ждет незабываемое путешествие, включая восхождение на Эверест. Программа длится 21 день и подходит для опытных туристов, готовых к высокогорным условиям и физическим нагрузкам. Вы будете проводить время в уникальной природной среде, наслаждаясь потрясающими видами и открывая для себя новые горизонты. Эта экспедиция станет незабываемым приключением в вашей жизни!',
        start_date: '2024-09-01',
        end_date: '2024-09-21',
        duration: 21,
        price: 400000,
        discount: 50000,
        country: 'Непал',
        region: 'Гималаи',
        season: 'Осень',
        difficulty: 'Высокая',
        family_friendly: false,
        organizer_id: 3,
      },
      {
        name: 'Сафари в Кении',
        title: 'Увлекательное сафари в сердце Африки',
        subtitle: 'Путешествие по знаменитым национальным паркам и резерватам',
        average_rating: 4.7,
        editors_choice: true,
        description: 'Отправляйтесь в невероятное приключение и откройте для себя разнообразную фауну Африки. Вас ждут встречи с львами, слонами, жирафами и другими удивительными животными. Программа включает посещение знаменитых национальных парков и резерватов, где вы сможете увидеть животных в их естественной среде обитания. Это путешествие подходит для любителей природы и животных, готовых к увлекательным приключениям.',
        start_date: '2024-05-14',
        end_date: '2024-05-28',
        duration: 14,
        price: 300000,
        discount: null,
        country: 'Кения',
        region: 'Восточная Африка',
        season: 'Весна',
        difficulty: 'Средняя',
        family_friendly: true,
        organizer_id: 1,
        },
        {
        name: 'Треккинг в Патагонии',
        title: 'Необыкновенный треккинг по Патагонии',
        subtitle: 'Исследуйте дикие места Южной Америки вместе с профессиональными гидами',
        average_rating: 4.8,
        editors_choice: true,
        description: 'Отправляйтесь в незабываемое путешествие по Патагонии и откройте для себя удивительные пейзажи и природные достопримечательности Южной Америки. Программа включает треккинг по горным тропам, походы к ледникам и водопадам, а также знакомство с местной флорой и фауной. Это путешествие подойдет для любителей активного отдыха и красивых пейзажей.',
        start_date: '2024-08-02',
        end_date: '2024-08-12',
        duration: 10,
        price: 250000,
        discount: null,
        country: 'Аргентина',
        region: 'Патагония',
        season: 'Лето',
        difficulty: 'Средняя',
        family_friendly: false,
        organizer_id: 3,
        },
        {
        name: 'Тропические приключения в Коста-Рике',
        title: 'Исследование тропических джунглей Коста-Рики',
        subtitle: 'Погрузитесь в уникальную природу и культуру Центральной Америки',
        average_rating: 4.6,
        editors_choice: false,
        description: 'Отправляйтесь в увлекательное приключение и исследуйте тропические джунгли и пляжи Коста-Рики. Программа включает пешие прогулки по джунглям, походы к вулканам, знакомство с местной флорой и фауной, а также отдых на пляжах Тихого океана. Это путешествие подойдет для любителей природы и активного отдыха.',
        start_date: '2024-01-01',
        end_date: '2024-01-12',
        duration: 12,
        price: 280000,
        discount: 40000,
        country: 'Коста-Рика',
        region: 'Центральная Америка',
        season: 'Зима',
        difficulty: 'Низкая',
        family_friendly: true,
        organizer_id: 3,
        },
        {
        name: 'Экспедиция на Северный полюс',
        title: 'Путешествие на край света: экспедиция на Северный полюс',
        subtitle: 'Исследуйте ледяные просторы и встретьте мир дикой природы',
        average_rating: 4.9,
        editors_choice: true,
        description: 'Отправляйтесь в уникальное путешествие и погрузитесь в мир льда и снега Северного полюса. Программа включает полет на специальном летательном аппарате, походы по льдинам, знакомство с местной фауной и флорой, а также ночевки в специально оборудованных лагерях. Это путешествие подойдет для любителей экстремальных приключений и крайних условий.',
        start_date: '2024-04-10',
        end_date: '2024-04-25',
        duration: 15,
        price: 500000,
        discount: null,
        country: 'Арктика',
        region: 'Северный полюс',
        season: 'Весна',
        difficulty: 'Высокая',
        family_friendly: false,
        organizer_id: 2,
        },
        {
        name: 'Путешествие по Древней Индии',
        title: 'Откройте для себя древние тайны Индии',
        subtitle: 'Исследуйте культуру, историю и архитектуру Древней Индии',
        average_rating: 4.6,
        editors_choice: false,
        description: 'Погрузитесь в атмосферу древней Индии и откройте для себя удивительные тайны этой удивительной страны. Программа включает посещение древних храмов, знакомство с местной культурой и кухней, а также экскурсии по историческим местам. Это путешествие подойдет для любителей истории и культуры.',
        start_date: '2024-11-03',
        end_date: '2024-11-17',
        duration: 14,
        price: 320000,
        discount: 35000,
        country: 'Индия',
        region: 'Южная Азия',
        season: 'Осень',
        difficulty: 'Средняя',
        family_friendly: true,
        organizer_id: 3,
        },
        {
        name: 'Авантюрный тур в Новую Зеландию',
        title: 'Необыкновенные приключения на островах Новой Зеландии',
        subtitle: 'Откройте для себя живописные пейзажи и культуру островов',
        average_rating: 4.7,
        editors_choice: false,
        description: 'Отправляйтесь в увлекательное путешествие и исследуйте живописные пейзажи и культуру Новой Зеландии. Программа включает походы по горным тропам, сплавы на байдарках, знакомство с местной флорой и фауной, а также отдых на пляжах. Это путешествие подойдет для любителей активного отдыха и красивых пейзажей.',
        start_date: '2024-07-01',
        end_date: '2024-07-18',
        duration: 18,
        price: 350000,
        discount: 40000,
        country: 'Новая Зеландия',
        region: 'Океания',
        season: 'Лето',
        difficulty: 'Высокая',
        family_friendly: false,
        organizer_id: 2,
        },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tours', null, {});
  },
};