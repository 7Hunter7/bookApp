# Book Catalog Application

## Описание

Это одностраничное приложение (SPA), разработанное на Vue.js, для управления списком книг. Приложение позволяет пользователям просматривать список книг, добавлять новые книги с указанием названия, автора, года издания и жанра, а также осуществлять поиск по названию. Также реализован адаптивный дизайн для корректного отображения на различных устройствах.

1.  Приложение написано на Vue 3 с использованием Composition API.
2.  Состояние хранится в Pinia.
3.  Количество сторонних библиотек минимизировано.

   Макет:
   [https://www.figma.com/design/Book-App](https://www.figma.com/design/CLaV9D6EFpdZWT2E7HlOMV/Book-App?node-id=0-1&p=f&t=IOEQNqOKHJFEg8kK-0)

## Функционал

### Обязательный функционал:

1.  **Список книг:**

    - Отображение списка книг с полями: название, автор, год, жанр.
    - Обновление списка в реальном времени при добавлении новой книги.

2.  **Добавление книги:**

    - Форма для добавления книги с полями: название (обязательное), автор (обязательное), год (числовое, не превышает текущий год), жанр (необязательное).
    - Валидация полей: название и автор обязательны, год должен быть числом и не превышать текущий год.

3.  **Поиск книг:**

    - Поле для поиска книг по частичному вхождению названия книги.
    - Фильтрация списка в реальном времени при вводе текста.

4.  **Адаптивный дизайн:**
    - Корректное отображение интерфейса на устройствах с различными разрешениями экранов (десктоп, планшет, смартфон).
    - Адаптация всех элементов интерфейса (кнопки, формы, списки).

### Дополнительный функционал:

1.  **Редактирование книги:**
    - Возможность изменять данные существующей книги через модальное окно.
2.  **Удаление книги:**
    - Удаление книги из списка с подтверждением действия (модальное окно).
3.  **Сортировка книг:**
    - Возможность сортировки списка по названию, году или автору.
4.  **Сохранение данных:**
    - Использование localStorage для сохранения списка книг.
    - Автоматическое восстановление данных при перезагрузке страницы.
5.  **Уведомления:**
    - Уведомления об успешных действиях пользователя (например, "Книга добавлена", "Книга удалена").

### Компоненты:

1.  `src/assets/main.css` - Основные стили приложения, включая общие стили, переменные CSS и стили для модального окна и кнопок.
2.  `src/components/BookItem.vue` - Компонент для отображения элемента списка книг.
3.  `src/components/BookListHeader.vue` - Компонент заголовка списка книг, включая счетчик книг и кнопку добавления.
4.  `src/components/BookModalForm.vue` - Компонент модальной формы для добавления и редактирования книг.
5.  `src/components/ButtonWithIcon.vue` - Компонент для кнопок с иконками.
6.  `src/components/Modal.vue` - Компонент модального окна общего назначения.
7.  `src/components/Notification.vue` - Компонент для отображения уведомлений.
8.  `src/components/SearchInput.vue` - Компонент для поля поиска книг.
9.  `src/stores/bookStore.js` - Хранилище состояния приложения, управление списком книг, добавлением, редактированием и удалением, а также поиск.
10. `src/utils/validation.js` - Утилитарный файл для валидации данных книги.
11. `src/views/BookList.vue` - Компонент для отображения списка книг.
12. `src/App.vue` - Главный компонент приложения, объединяет все остальные компоненты.
13. `src/main.js` - Точка входа приложения, инициализация Vue и Pinia.

## Установка и запуск

1.  Клонируйте репозиторий:
    ```bash
    git clone <repository-url>
    ```
2.  Перейдите в директорию проекта:
    ```bash
    cd <project-directory>
    ```
3.  Установите зависимости:
    ```bash
    npm install
    ```
4.  Запустите приложение:
    ```bash
    npm run dev
    ```
5.  Приложение будет доступно по адресу `http://localhost:5173`.

## Автор

Ivan Kalugin
Телеграмм: https://t.me/Ivan_Anatolievich_Kalugin

## Лицензия

**MIT License**
Этот проект лицензирован в соответствии с условиями лицензии MIT. Смотрите файл [LICENSE](LICENSE) для получения подробной информации.
