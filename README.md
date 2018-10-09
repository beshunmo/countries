# Компонент "Country Suggest"

Компонент подсказказывает названия страны с флагом.

## Как установить

Необходимо подключить стили и скрипт
js
```
<link rel="stylesheet" href="./style.css">
<script src="./country.js"></script>
```

## Использование

Создаем форму, к примеру:

html
```
<form>
    <input type="text" name="country-code" id="my-input">
    <button type="submit">Submit</button>
</form>
```

В качестве родительского элемента необходимо использовать input. 

js
```
var flag = new SelectFlag(document.getElementById('my-input'), {
    apiURL: 'https://restcountries.eu/rest/v2/all',
    flagField (item) {
        return item.flag
    },
    outField: 'alpha3Code'
});
```


## Настройки
Функция конструктор вторым аргументом принемает объект с настройками 

### apiURL: string (обязательный)
Необходимо указать ссылку на API

### flagField: string | function(resp)
Коллбек позволяет указать из какого поля ответа получать изображение с флагом    

### nameField: string | function(resp)
Коллбек позволяет указать из какого поля ответа получать название стран 

### outField: string | function(resp)
Коллбек позволяет указать из какого поля ответа получать значение выбранной страны 

### keyName: string
Данное свойство позволяет указать атрибут name для input. Используется для отправки формой.   