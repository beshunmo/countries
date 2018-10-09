# Компонент "Country Suggest"

Компонент подсказказывает названия страны с флагом.

## Как установить

Создать input элемент, подключить country.js. Код ниже вставить в тело HTML после country.js.

```
let flag = new SelectFlag(document.getElementById('country'), {
            apiURL: 'https://restcountries.eu/rest/v2/all',
            flagField (item) {
                return item.flag
            },
            keyName: '',
            outField: 'alpha3Code'
        });
```    