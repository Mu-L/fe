const ru_RU = {
  auth: {
    '403': 'У вас нет доступа к этой странице, обратитесь к администратору!',
    '404': 'Страница, которую вы пытаетесь открыть, не существует!',
    '404_btn': 'Вернуться на главную страницу',
  },
  business_group: 'Бизнес-группа',
  business_groups: 'Бизнес-группа',
  search_placeholder: 'Пожалуйста, введите ключевое слово для поиска',
  my_business_group: 'Моя бизнес-группа',
  all_business_group: 'Все бизнес-группы',
  not_grouped: 'Не сгруппировано',
  nodata: 'Нет данных',
  log_detail: 'Детальная информация',
  document_link: 'Инструкция',
  required: 'Обязательно',
  unit: 'Единица',
  page_help: 'Инструкция',
  and: 'И',
  yes: 'Да',
  no: 'Нет',
  host: {
    tags: 'Пользовательские теги',
    tags_tip: 'Теги, которые пользователь настраивает на странице, будут добавлены к данным временного ряда, отправляемым на этот хост',
    host_tags: 'Теги, отправляемые',
    host_tags_tip:
      'Теги, настроенные в конфигурации categraf global.labels, будут отображаться здесь, и будут добавлены к данным временного ряда, отправляемым на этот хост, categraf должен быть обновлен до версии v0.3.80 или выше, чтобы поддерживать эту функцию',
  },
  btn: {
    add: 'Добавить',
    create: 'Создать',
    modify: 'Изменить',
    delete: 'Удалить',
    clone: 'Дублировать',
    detail: 'Подробности',
    execute: 'Запрос',
    export: 'Экспорт',
    import: 'Импорт',
    save: 'Сохранить',
    ok: 'ОК',
    cancel: 'Отмена',
    view: 'Просмотр',
    more: 'Дополнительные действия',
    back: 'Назад',
    edit: 'Редактировать',
    submit: 'Отправить',
    operations: 'Действия',
    testAndSave: 'Протестировать и сохранять',
    batch_operations: 'Пакетное выполнение',
    batch_delete: 'Пакетное удаление',
    batch_clone: 'Пакетное клонирование',
    batch_modify: 'Пакетное изменение',
    batch_export: 'Пакетное экспортирование',
    batch_import: 'Пакетное импортирование',
    test: 'Тестирование',
    expand: 'Развернуть',
    collapse: 'Свернуть',
    copy: 'Копировать',
    config: 'Настройка',
    copy2: 'Копировать',
    reload: 'Обновить',
  },
  table: {
    name: 'Имя',
    ident: 'Идентификатор',
    tag: 'Тег',
    update_at: 'Время обновления',
    update_by: 'Обновлено',
    create_at: 'Время создания',
    create_by: 'Создатель',
    status: 'Статус',
    enabled: 'Включено',
    note: 'Примечание',
    operations: 'Действия',
    total: 'Всего {{total}} записей',
    host: 'Хост',
    error_msg: 'Ошибка',
    username: 'Имя пользователя',
    nickname: 'Отображаемое имя',
  },
  datasource: {
    prod: 'Тип мониторинга',
    name: 'Источник данных',
    type: 'Тип источника данных',
    id: 'Источник данных',
    id_required: 'Пожалуйста, выберите источник данных',
    empty_modal: {
      title: 'Нет конфигурации источника данных, обратитесь к администратору для добавления источника данных',
      btn1: 'Перейти к настройке',
      btn2: 'ОК',
    },
    queries: {
      label: 'Фильтрация источника данных',
      match_type_0: 'Точное совпадение',
      match_type_1: 'Поиск по шаблону',
      match_type_1_tip: 'Поддерживаются два шаблона<br>* Можно сопоставить 0 или более произвольных символов<br>? Можно сопоставить только один произвольный символ',
      match_type_2: 'Все источники данных',
      op_in: 'Включает',
      op_not_in: 'Не включает',
      preview: 'Предварительный просмотр источника данных',
    },
    managePageLink: 'Управление источниками данных',
  },
  confirm: {
    delete: 'Вы уверены, что хотите удалить?',
    clone: 'Вы уверены, что хотите дублировать?',
    save: 'Вы уверены, что хотите сохранить?',
  },
  success: {
    submit: 'Отправлено успешно',
    modify: 'Изменено успешно',
    edit: 'Редактировано успешно',
    create: 'Создано успешно',
    add: 'Добавлено успешно',
    delete: 'Удалено успешно',
    clone: 'Клонировано успешно',
    sort: 'Успешно отсортировано',
    import: 'Импортировано успешно',
    save: 'Сохранено успешно',
  },
  error: {
    clone: 'Ошибка клонирования',
    import: 'Ошибка импорта',
  },
  time: {
    millisecond: 'Миллисекунды',
    second: 'Секунды',
    minute: 'Минуты',
    hour: 'Часы',
    day: 'Дни',
    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  },
  severity: {
    '1': 'Критический',
    '2': 'Предупреждение',
    '3': 'Информирование',
  },
  download_json: 'Скачать JSON',
  batch: {
    export: {
      copy: 'Копировать JSON в буфер обмена',
    },
    not_select: 'Пожалуйста, сначала выберите данные',
  },
  invalidDatasource: 'Недопустимый источник данных',
  copyToClipboard: 'Копировать в буфер обмена',
  copyToClipboardFailed: 'Не удалось скопировать в буфер обмена',
  manage: 'Управление',
  reload: 'Обновить',
  public: 'Публичное',
  private: 'Частное',
  tpl: 'Скрипт самовосстановления',
  'tpl.create': 'Создать',
  'tpl.tag.bind': 'Привязать тег',
  'tpl.tag.unbind': 'Отвязать тег',
  'tpl.tag.bind.title': 'Массовое привязывание тегов',
  'tpl.tag.bind.field': 'Теги для привязки',
  'tpl.tag.bind.success': 'Массовое привязывание тегов прошло успешно',
  'tpl.tag.unbind.title': 'Массовое отвязывание тегов',
  'tpl.tag.unbind.field': 'Теги для отвязки',
  'tpl.tag.unbind.success': 'Массовое отвязывание тегов прошло успешно',
  'tpl.node.modify': 'Изменить узел',
  'tpl.node.modify.title': 'Массовое изменение узлов',
  'tpl.batch.modify.group': 'Массовое изменение принадлежащей группы',
  'tpl.title': 'Заголовок',
  'tpl.title.tpl.help': 'Заголовок, описывающий функциональность этого скрипта',
  'tpl.title.task.help': 'Заголовок, описывающий функциональность задачи',
  'tpl.tags': 'Теги',
  'tpl.tags.help': 'Теги, используемые для классификации',
  'tpl.creator': 'Создатель',
  'tpl.last_updator': 'Обновлено',
  'tpl.last_updated': 'Время обновления',
  'tpl.account.help': 'Аккаунт выполнения, (используйте root осторожно)',
  'tpl.batch.help':
    'Способ выполнения. По умолчанию 0 - параллельное выполнение, 1 - последовательное выполнение, 2 означает последовательное выполнение группами по 2',
  'tpl.tolerance.help':
    'Количество допустимых ошибок. По умолчанию 0 - не допускать ошибки. При достижении указанного количества ошибок выполнение останавливается',
  'tpl.timeout.help': 'Таймаут выполнения скрипта на каждом хосте (в секундах)',
  'tpl.pause.help': 'Пауза между выполнениями на разных хостах',
  'tpl.host.help': 'Список хостов для выполнения',
  'tpl.host.help2': 'Предварительная зависимость: на целевом хосте должен быть установлен categraf, и должен быть включен ibex',
  'tpl.host.filter_btn': 'Фильтрация хостов',
  'tpl.script.help': 'Скрипт для выполнения',
  'tpl.args.help': 'Параметры скрипта, разделенные двойной запятой ,, например, arg1,,arg2,,arg3',
  'tpl.modify': 'Редактировать скрипт',
  'tpl.create.task': 'Создать задачу',
  'tpl.callback': 'Адрес обратного вызова для самовосстановления предупреждения',
  'tpl.allOptionLabel': 'Все скрипты',
  task: 'Задача самовосстановления',
  'task.create': 'Создать задачу',
  'task.title': 'Заголовок',
  'task.done': 'Завершено ли',
  'task.clone': 'Дублировать задачу',
  'task.meta': 'Метаинформация',
  'task.creator': 'Создатель',
  'task.created': 'Время создания',
  'task.only.mine': 'Только свои',
  'task.host': 'Хост',
  'task.status': 'Статус',
  'task.output': 'Вывод',
  'task.refresh': 'Обновить',
  'task.control.params': 'Параметры управления',
  'task.account': 'Аккаунт выполнения',
  'task.batch': 'Параллелизм',
  'task.tolerance': 'Допуск',
  'task.timeout': 'Время ожидания',
  'task.script': 'Скрипт',
  'task.script.args': 'Параметры скрипта',
  'task.pause': 'Точка остановки',
  'task.host.list': 'Список хостов',
  'task.clone.new': 'Дублировать новую задачу',
  'task.temporary.create': 'Создать временную задачу',
  'task.save.temporarily': 'Сохранить не выполняя',
  'task.save.execute': 'Сохранить немедленно',
  'task.tip.title': 'Сообщение',
  'task.tip.content':
    'Если ваша роль - администратор, вы можете выполнять скрипты на любом хосте; в противном случае вы можете выполнять скрипты только для бизнес-группы, к которой относится хост',
  'task.allOptionLabel': 'Все задачи',
  'last.7.days': 'Последние 7 дней',
  'last.15.days': 'Последние 15 дней',
  'last.30.days': 'Последние 30 дней',
  'last.60.days': 'Последние 60 дней',
  'last.90.days': 'Последние 90 дней',
  'msg.submit.success': 'Отправлено успешно',
  'msg.modify.success': 'Изменено успешно',
  'msg.create.success': 'Создано успешно',
  'msg.add.success': 'Добавлено успешно',
  'msg.delete.success': 'Удалено успешно',
  'msg.clone.success': 'Клонировано успешно',
  'msg.clone.error': 'Ошибка клонирования',
  'msg.sort.success': 'Успешно отсортировано',
  copy_success: 'Успешно скопировано {{num}} записей',
  request_fail_msg: 'Время ожидания сети превышено, пожалуйста, попробуйте позже',
};

export default ru_RU;
