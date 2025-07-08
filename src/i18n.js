import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import React from 'react';

const resources = {
  hy: {
    translation: {
      login: 'Մուտք',
      register: 'Գրանցվել',
      email_label: 'Էլեկտրոնային փոստ',
      password_label: 'Գաղտնաբառ',
      name_label: 'Անուն (Ազգանուն)',
      phone_label: 'Հեռախոսահամար',
      confirm_password_label: 'Հաստատել գաղտնաբառը',
      required_fields: 'Պարտադիր դաշտ է գրացման համար',
      email_invalid: 'Էլ․ փոստի ձևաչափը սխալ է',
      passwords_not_match: 'Գաղտնաբառերը չեն համընկնում',
      or: 'Կամ',
      forgot_password: 'Մոռացել եք գաղտնաբառը',
      server_error: 'Սերվերի սխալ',
      invalid_credentials: 'Սխալ էլ. փոստ կամ գաղտնաբառ',
      already_registered: 'Այս էլ. փոստը կամ հեռախոսահամարը արդեն գրանցված է',
      please_wait: 'Սպասեք...',
      back_to_login: 'Վերադառնալ մուտք',
      password_recovery: 'Գաղտնաբառի վերականգնում',
      back: 'Վերադառնալ',
      email_placeholder: 'Էլեկտրոնային հասցե',
      recover: 'Վերականգնել',
      sending: 'Ուղարկվում է...',
      reset_link_sent: 'Վերականգնման հղումը ուղարկված է ձեր էլ. փոստին',
      user_not_found: 'Օգտատեր չի գտնվել',
      invalid_token: 'Անվավեր կամ ժամկետանց հղում',
      passwords_do_not_match: 'Գաղտնաբառերը չեն համընկնում',
      new_password: 'Նոր գաղտնաբառ',
      confirm_new_password: 'Հաստատել նոր գաղտնաբառը',
      password_changed: 'Գաղտնաբառը հաջողությամբ փոխվեց',
      hide: 'Թաքցնել',
      show: 'Ցուցադրել',
      image: 'Նկար',
      ptoogh_logo: 'Ptoogh Logo',
      fresh_vegetables: 'Թարմ բանջարեղեն',
      home: 'Գլխավոր էջ',
      about: 'Մեր մասին',
      blog: 'Բլոգ',
      products: 'Ապրանքներ',

      search: 'Որոնում',
      clear: 'Մաքրել',
      language: 'Լեզու',
      about_us: 'Մեր Մասին',
      idea: 'Գաղափար',
      mission: 'Առաքելություն',
      values: 'Արժեքներ',
      product: 'Ապրանք',
      fruits: 'Միրգ',
      vegetables: 'Բանջարեղեն',
      breakfast: 'Նախաճաշ',
      greenhouse: 'Ջերմոց',
      harvest: 'Բերքահավաք',
      contact_us: 'Կապ մեզ հետ',
      address: 'ՀՀ, ք. Երևան, Արին Բերդ 6',
      join_community: 'Միացիր մեր համայնքին՝ գտիր և վաճառիր լավագույն մթերքները',
      ptoogh_description: '«Պտուղը հարթակ է, որտեղ ֆերմերները և գնորդները կարող են հեշտությամբ գտնել միմյանց»',
      how_to_use: 'Ինչպես օգտվել կայքից',
      how_to_use_title: 'Ինչպես օգտվել կայքից',
      feedback: 'Հետադարձ կապ',
      register_login: 'Գրանցվեք կամ մուտք գործեք համակարգ',
      browse_products: 'Դիտեք և փնտրեք մթերքներ ըստ կատեգորիաների',
      contact_seller: 'Կապ հաստատեք վաճառողի հետ կամ ավելացրեք Ձեր առաջարկը',
      use_filters: 'Օգտվեք ֆիլտրերից և որոնումից՝ արագ գտնելու համար',
      register_login_desc: 'Ստեղծեք հաշիվ կամ մուտք գործեք համակարգ՝ մթերքներ գնելու կամ վաճառելու համար',
      browse_products_desc: 'Դիտեք մթերքների լայն տեսականի՝ ըստ կատեգորիաների և գնի',
      contact_seller_desc: 'Կապ հաստատեք վաճառողի հետ՝ հարցեր տալու կամ պատվեր կատարելու համար',
      use_filters_desc: 'Օգտվեք ֆիլտրերից՝ գտնելու համար ձեզ անհրաժեշտ մթերքները',
      place_order_desc: 'Կատարեք պատվեր՝ ընտրելով ցանկալի քանակը և հաստատելով գնումը',
      enjoy_products_desc: 'Ստացեք թարմ և որակյալ մթերքներ՝ ուղղակի ձեր դռան մոտ',
      video_tutorial: 'Վիդեո դաս',
      video_coming_soon: 'Վիդեոն շուտով կհայտնվի',
      about_text_1: 'Պտուղ.am-ը ֆերմերի ձեռքերում հզոր գործիք է, իսկ գնորդի համար՝ թարմ և որակյալ մթերքներ ստանալու հուսալի ճանապարհ: Մենք ստեղծել ենք հարթակ, որտեղ ֆերմերը կարող է վաճառել իր արտադրանքը առանց միջնորդների, իսկ գնորդը՝ հեշտությամբ գտնել իրեն անհրաժեշտ տեղական, թարմ և առողջ մթերքները: Մեր նպատակն է ստեղծել երկկողմանի շուկա, որը հիմնված է վստահության վրա, որտեղ ֆերմերը գնահատվում է, իսկ գնորդը չի շփոթվում ընտրության մեջ:',
      about_text_2: 'Պտուղը միավորում է մարդկանց, համայնքները և արժեքները: Մենք հավատում ենք, որ առողջությունը սկսվում է մաքուր հողից, իսկ ուժեղ տնտեսությունը՝ ուժեղ գյուղատնտեսությունից:',
      about_text_3: 'Մեր առաքելությունն է ստեղծել կայուն և հուսալի կապ ֆերմերների և սպառողների միջև՝ նպաստելով առողջ ապրելակերպին:',
      syunik_region: 'Սյունիքի մարզ',
      lori_region: 'Լոռու մարզ',
      gegharkunik_region: 'Գեղարքունիքի մարզ',
      tavush_region: 'Տավուշի մարզ',
      aragatsotn_region: 'Արագածոտնի մարզ',
      greenhouse_work: 'Ջերմոցային աշխատանքների իրականացում',
      short_description: 'Համառոտ նկարագրություն կամ նորությունների ամփոփում:',
      blog_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
      see_more: 'Տեսնել ավելին',
      read_more: 'Կարդալ ավելին',
      news: 'Նորություններ',
      pomegranate: 'Նուռ',
      peach: 'Դեղձ',
      green_apple: 'Կանաչ խնձոր',
      red_apple: 'Կարմիր խնձոր',
      fruit_type: 'Միրգ',
      vegetable_type: 'Բանջարեղեն',
      berries_type: 'Հատապտուղներ',
      price_currency: 'դրամ',
      personal_data: 'Անձնական տվյալներ',
      favorite_products: 'Սիրված ապրանքներ',
      my_orders: 'Իմ պատվերները',
      coupons: 'Կուպոններ',
      logout: 'Դուրս գալ',
      loading: 'Բեռնվում է...',
      name: 'Անուն',
      email_address: 'Էլ. հասցե',
      phone_number: 'Հեռախոսահամար',
      no_favorites: 'Դուք դեռ չեք ավելացրել սիրված ապրանքներ',
      add_favorites_desc: 'Ավելացրեք այստեղ այն ապրանքները, որոնք ցանկանում եք պահպանել ցուցակում արագ որոնման համար:',
      add: 'Ավելացնել',
      no_orders: 'Դուք չունեք պատվերներ',
      no_orders_desc: 'Կատարեք ձեր առաջին պատվերը, և այն կհայտնվի այստեղ:',
      see_offers: 'Տեսնել առաջարկները',
      no_coupons: 'Դուք չունեք կուպոններ',
      no_coupons_desc: 'Կուպոնները կհայտնվեն այստեղ, երբ ստանաք հատուկ առաջարկներ:',
      logout_message: 'Դուք դուրս եք եկել կայքից:',
      thank_you_message: 'Շնորհակալություն Պտուղ օգտագործելու համար',
      piece: 'հատ',
      our_team: 'Մեր թիմը',
      our_story: 'Մեր պատմությունը',
      registration_success: 'Գրանցումը հաջողությամբ ավարտվեց, այժմ կարող եք մուտք գործել',
      login_success: 'Մուտքը հաջողությամբ կատարվեց',
      already_have_account: 'Արդեն ունե՞ք հաշիվ:',
      dont_have_account: 'Չունե՞ք հաշիվ:',
      buy_online: 'Գնել առցանց իմ մոտ',

      all: 'Բոլորը',
      region: 'Մարզ',
      team: 'Թիմ',
      logo: 'Լոգո',
      background: 'Ֆոն',
    }
  },
  en: {
    translation: {
      login: 'Login',
      register: 'Register',
      email_label: 'Email',
      password_label: 'Password',
      name_label: 'Name (Surname)',
      phone_label: 'Phone Number',
      confirm_password_label: 'Confirm Password',
      required_fields: 'Required field for registration',
      email_invalid: 'Email format is incorrect',
      passwords_not_match: 'Passwords do not match',
      or: 'Or',
      forgot_password: 'Forgot password',
      server_error: 'Server error',
      invalid_credentials: 'Invalid email or password',
      already_registered: 'This email or phone number is already registered',
      please_wait: 'Please wait...',
      back_to_login: 'Back to login',
      password_recovery: 'Password Recovery',
      back: 'Back',
      email_placeholder: 'Email address',
      recover: 'Recover',
      sending: 'Sending...',
      reset_link_sent: 'Reset link sent to your email',
      user_not_found: 'User not found',
      invalid_token: 'Invalid or expired link',
      passwords_do_not_match: 'Passwords do not match',
      new_password: 'New Password',
      confirm_new_password: 'Confirm New Password',
      password_changed: 'Password changed successfully',
      hide: 'Hide',
      show: 'Show',
      image: 'Image',
      ptoogh_logo: 'Ptoogh Logo',
      fresh_vegetables: 'Fresh Vegetables',
      home: 'Home',
      about: 'About',
      blog: 'Blog',
      products: 'Products',

      search: 'Search',
      clear: 'Clear',
      language: 'Language',
      about_us: 'About Us',
      idea: 'Idea',
      mission: 'Mission',
      values: 'Values',
      product: 'Product',
      fruits: 'Fruits',
      vegetables: 'Vegetables',
      breakfast: 'Breakfast',
      greenhouse: 'Greenhouse',
      harvest: 'Harvest',
      contact_us: 'Contact Us',
      address: 'RA, Yerevan, Arin Berd 6',
      join_community: 'Join our community - find and sell the best products',
      ptoogh_description: '"Ptoogh is a platform where farmers and buyers can easily find each other"',
      how_to_use: 'How to use the website',
      how_to_use_title: 'How to use the website',
      feedback: 'Feedback',
      register_login: 'Register or login to the system',
      browse_products: 'Browse and search products by categories',
      contact_seller: 'Contact the seller or add your offer',
      use_filters: 'Use filters and search for quick finding',
      register_login_desc: 'Create an account or login to the system to buy or sell products',
      browse_products_desc: 'Browse a wide range of products by categories and price',
      contact_seller_desc: 'Contact the seller to ask questions or place an order',
      use_filters_desc: 'Use filters to find the products you need',
      place_order_desc: 'Place an order by selecting the desired quantity and confirming the purchase',
      enjoy_products_desc: 'Get fresh and quality products right to your door',
      video_tutorial: 'Video Tutorial',
      video_coming_soon: 'Video coming soon',
      about_text_1: 'Ptoogh.am is a powerful tool in the hands of a farmer, and for the buyer - a reliable way to get fresh and quality products. We have created a platform where a farmer can sell their products without intermediaries, and a buyer - easily find the local, fresh and healthy products they need. Our goal is to create a two-way market based on trust, where the farmer is valued and the buyer is not confused in choice.',
      about_text_2: 'Ptoogh unites people, communities and values. We believe that health starts with clean soil, and a strong economy - with strong agriculture.',
      about_text_3: 'Our mission is to create a sustainable and reliable connection between farmers and consumers, promoting a healthy lifestyle.',
      syunik_region: 'Syunik Region',
      lori_region: 'Lori Region',
      gegharkunik_region: 'Gegharkunik Region',
      tavush_region: 'Tavush Region',
      aragatsotn_region: 'Aragatsotn Region',
      greenhouse_work: 'Conducting greenhouse work',
      short_description: 'Brief description or news summary.',
      blog_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
      see_more: 'See more',
      read_more: 'Read more',
      news: 'News',
      pomegranate: 'Pomegranate',
      peach: 'Peach',
      green_apple: 'Green Apple',
      red_apple: 'Red Apple',
      fruit_type: 'Fruit',
      vegetable_type: 'Vegetable',
      berries_type: 'Berries',
      price_currency: 'dram',
      personal_data: 'Personal Data',
      favorite_products: 'Favorite Products',
      my_orders: 'My Orders',
      coupons: 'Coupons',
      logout: 'Logout',
      loading: 'Loading...',
      name: 'Name',
      email_address: 'Email Address',
      phone_number: 'Phone Number',
      no_favorites: 'You have not added favorite products yet',
      add_favorites_desc: 'Add here the products you want to save in the list for quick search.',
      add: 'Add',
      no_orders: 'You have no orders',
      no_orders_desc: 'Place your first order and it will appear here.',
      see_offers: 'See offers',
      no_coupons: 'You have no coupons',
      no_coupons_desc: 'Coupons will appear here when you receive special offers.',
      logout_message: 'You have logged out of the site.',
      thank_you_message: 'Thank you for using Ptoogh',
      piece: 'pcs',
      our_team: 'Our Team',
      our_story: 'Our Story',
      registration_success: 'Registration successful, now you can login',
      login_success: 'Login successful',
      already_have_account: 'Already have an account?',
      dont_have_account: 'Don\'t have an account?',
      buy_online: 'Buy online from me',

      all: 'All',
      region: 'Region',
      team: 'Team',
      logo: 'Logo',
      background: 'Background',
    }
  },
  ru: {
    translation: {
      login: 'Вход',
      register: 'Регистрация',
      email_label: 'Электронная почта',
      password_label: 'Пароль',
      name_label: 'Имя (Фамилия)',
      phone_label: 'Номер телефона',
      confirm_password_label: 'Подтвердить пароль',
      required_fields: 'Обязательное поле для регистрации',
      email_invalid: 'Формат email неверный',
      passwords_not_match: 'Пароли не совпадают',
      or: 'Или',
      forgot_password: 'Забыли пароль',
      server_error: 'Ошибка сервера',
      invalid_credentials: 'Неверный email или пароль',
      already_registered: 'Этот email или номер телефона уже зарегистрирован',
      please_wait: 'Пожалуйста, подождите...',
      back_to_login: 'Вернуться к входу',
      password_recovery: 'Восстановление пароля',
      back: 'Назад',
      email_placeholder: 'Электронный адрес',
      recover: 'Восстановить',
      sending: 'Отправляется...',
      reset_link_sent: 'Ссылка для сброса отправлена на ваш email',
      user_not_found: 'Пользователь не найден',
      invalid_token: 'Недействительная или истекшая ссылка',
      passwords_do_not_match: 'Пароли не совпадают',
      new_password: 'Новый пароль',
      confirm_new_password: 'Подтвердить новый пароль',
      password_changed: 'Пароль успешно изменен',
      hide: 'Скрыть',
      show: 'Показать',
      image: 'Изображение',
      ptoogh_logo: 'Ptoogh Logo',
      fresh_vegetables: 'Свежие овощи',
      home: 'Главная',
      about: 'О нас',
      blog: 'Блог',
      products: 'Продукты',

      search: 'Поиск',
      clear: 'Очистить',
      language: 'Язык',
      about_us: 'О нас',
      idea: 'Идея',
      mission: 'Миссия',
      values: 'Ценности',
      product: 'Продукт',
      fruits: 'Фрукты',
      vegetables: 'Овощи',
      breakfast: 'Завтрак',
      greenhouse: 'Теплица',
      harvest: 'Урожай',
      contact_us: 'Связаться с нами',
      address: 'РА, г. Ереван, Арин Берд 6',
      join_community: 'Присоединяйтесь к нашему сообществу - найдите и продайте лучшие продукты',
      ptoogh_description: '"Птоуг - это платформа, где фермеры и покупатели могут легко найти друг друга"',
      how_to_use: 'Как пользоваться сайтом',
      how_to_use_title: 'Как пользоваться сайтом',
      feedback: 'Обратная связь',
      register_login: 'Зарегистрируйтесь или войдите в систему',
      browse_products: 'Просматривайте и ищите продукты по категориям',
      contact_seller: 'Свяжитесь с продавцом или добавьте свое предложение',
      use_filters: 'Используйте фильтры и поиск для быстрого поиска',
      register_login_desc: 'Создайте аккаунт или войдите в систему для покупки или продажи продуктов',
      browse_products_desc: 'Просматривайте широкий ассортимент продуктов по категориям и цене',
      contact_seller_desc: 'Свяжитесь с продавцом, чтобы задать вопросы или разместить заказ',
      use_filters_desc: 'Используйте фильтры для поиска нужных вам продуктов',
      place_order_desc: 'Разместите заказ, выбрав желаемое количество и подтвердив покупку',
      enjoy_products_desc: 'Получите свежие и качественные продукты прямо к вашей двери',
      video_tutorial: 'Видеоурок',
      video_coming_soon: 'Видео скоро появится',
      about_text_1: 'Птоуг.am - это мощный инструмент в руках фермера, а для покупателя - надежный путь получения свежих и качественных продуктов. Мы создали платформу, где фермер может продавать свою продукцию без посредников, а покупатель - легко найти нужные ему местные, свежие и здоровые продукты. Наша цель - создать двусторонний рынок, основанный на доверии, где фермер ценится, а покупатель не путается в выборе.',
      about_text_2: 'Птоуг объединяет людей, сообщества и ценности. Мы верим, что здоровье начинается с чистой почвы, а сильная экономика - с сильного сельского хозяйства.',
      about_text_3: 'Наша миссия - создать устойчивую и надежную связь между фермерами и потребителями, способствуя здоровому образу жизни.',
      syunik_region: 'Сюникская область',
      lori_region: 'Лорийская область',
      gegharkunik_region: 'Гегаркуникская область',
      tavush_region: 'Тавушская область',
      aragatsotn_region: 'Арагацотнская область',
      greenhouse_work: 'Проведение тепличных работ',
      short_description: 'Краткое описание или сводка новостей.',
      blog_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
      see_more: 'Увидеть больше',
      read_more: 'Читать больше',
      news: 'Новости',
      pomegranate: 'Гранат',
      peach: 'Персик',
      green_apple: 'Зеленое яблоко',
      red_apple: 'Красное яблоко',
      fruit_type: 'Фрукт',
      vegetable_type: 'Овощ',
      berries_type: 'Ягоды',
      price_currency: 'драм',
      personal_data: 'Личные данные',
      favorite_products: 'Избранные продукты',
      my_orders: 'Мои заказы',
      coupons: 'Купоны',
      logout: 'Выйти',
      loading: 'Загрузка...',
      name: 'Имя',
      email_address: 'Эл. адрес',
      phone_number: 'Номер телефона',
      no_favorites: 'Вы еще не добавили избранные продукты',
      add_favorites_desc: 'Добавьте сюда продукты, которые хотите сохранить в списке для быстрого поиска.',
      add: 'Добавить',
      no_orders: 'У вас нет заказов',
      no_orders_desc: 'Разместите ваш первый заказ, и он появится здесь.',
      see_offers: 'Посмотреть предложения',
      no_coupons: 'У вас нет купонов',
      no_coupons_desc: 'Купоны появятся здесь, когда вы получите специальные предложения.',
      logout_message: 'Вы вышли с сайта.',
      thank_you_message: 'Спасибо за использование Птоуг',
      piece: 'шт',
      our_team: 'Наша команда',
      our_story: 'Наша история',
      registration_success: 'Регистрация прошла успешно, теперь вы можете войти',
      login_success: 'Вход выполнен успешно',
      already_have_account: 'Уже есть аккаунт?',
      dont_have_account: 'Нет аккаунта?',
      buy_online: 'Купить онлайн у меня',

      all: 'Все',
      region: 'Регион',
      team: 'Команда',
      logo: 'Логотип',
      background: 'Фон',
    }
  }
};

const savedLanguage = localStorage.getItem('language') || 'hy';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'hy',
    interpolation: {
      escapeValue: false
    }
  });

export const changeLanguage = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem('language', language);
};

export const changePageLanguage = (language) => {
  sessionStorage.setItem('pageLanguage', language);
  
  window.dispatchEvent(new CustomEvent('pageLanguageChanged', { 
    detail: { language } 
  }));
};

export const changeGlobalLanguage = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem('language', language);
  sessionStorage.removeItem('pageLanguage');
};

export const usePageLanguage = () => {
  const [pageLanguage, setPageLanguage] = React.useState(() => {
    return sessionStorage.getItem('pageLanguage') || i18n.language;
  });

  React.useEffect(() => {
    const handlePageLanguageChange = (event) => {
      setPageLanguage(event.detail.language);
    };

    window.addEventListener('pageLanguageChanged', handlePageLanguageChange);
    return () => {
      window.removeEventListener('pageLanguageChanged', handlePageLanguageChange);
    };
  }, []);

  return pageLanguage;
};

export const useAuthPageLanguage = () => {
  const [authPageLanguage, setAuthPageLanguage] = React.useState(() => {
    return sessionStorage.getItem('authPageLanguage') || i18n.language;
  });

  React.useEffect(() => {
    const handleAuthPageLanguageChange = (event) => {
      setAuthPageLanguage(event.detail.language);
    };

    window.addEventListener('authPageLanguageChanged', handleAuthPageLanguageChange);
    return () => {
      window.removeEventListener('authPageLanguageChanged', handleAuthPageLanguageChange);
    };
  }, []);

  return authPageLanguage;
};

export const changeAuthPageLanguage = (language) => {
  sessionStorage.setItem('authPageLanguage', language);
  
  window.dispatchEvent(new CustomEvent('authPageLanguageChanged', { 
    detail: { language } 
  }));
};

export const useAuthTranslation = () => {
  const authPageLanguage = useAuthPageLanguage();
  
  const t = (key) => {
    const currentLanguage = authPageLanguage;
    const translations = resources[currentLanguage]?.translation || resources.hy.translation;
    const translation = translations[key] || key;
    
    return translation;
  };

  return { t, language: authPageLanguage };
};

export default i18n; 