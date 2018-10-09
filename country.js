function SelectFlag(input, {
    apiURL,
    keyName = 'country',
    flagField = 'flag',
    outField = 'name',
    nameField = 'name'
}) {
    let parent = input.parentNode;

    let wrapper = document.createElement('div'),
        inputValue = document.createElement('input'),
        list = document.createElement('ul');
    wrapper.classList.add('--country-suggest');
    inputValue.name = input.name || keyName;
    inputValue.name = input.name;
    input.removeAttribute('name');
    inputValue.style.display = 'none';
    input.setAttribute('autocomplete', 'off');

    this.searchText = '';
    this.data = [];

    parent.replaceChild(wrapper, input);

    wrapper.appendChild(input);
    wrapper.appendChild(inputValue);
    wrapper.appendChild(list);

    const update = (countries => {
        const findCountries = countries
        .filter(country => this.searchText !== '' ? country._name.indexOf(this.searchText) + 1 : false);

        list.innerHTML = findCountries
            .reduce((state, { flag, name, value }) => {
                const nameSelect = name.replace(new RegExp(this.searchText, 'gi'), (sub) => {
                    return `<b>${sub}</b>`
                });
                return state + `<li data-value="${value}">
            <img src="${flag}">
            <span>${nameSelect}</span>
            </li>`;
            }, '');

            if(findCountries.length === 1) {
                input.value = findCountries[0].name;
                inputValue.value = findCountries[0].value;
            }
    })

    const getField = (field, item) => {
        if (typeof field === 'string') {
            return item[field];
        } else if (typeof field === 'function') {
            return field(item);
        }
        throw 'Error field parameter';
    }

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            this.data = data.map(country => {
                const
                    name = getField(nameField, country),
                    flag = getField(flagField, country),
                    value = getField(outField, country);

                return {
                    name,
                    _name: name.toUpperCase(),
                    flag,
                    value
                }
            })
            update(this.data);
            console.log(this.data);
        });

    input.addEventListener('keyup', () => {
        this.searchText = input.value.toUpperCase();
        update(this.data);
    })

    list.addEventListener('click', ({ target }) => {
        let select = target.tagName === 'LI'
            ? target
            : target.tagName === 'B'
                ? target.parentNode.parentNode
                : target.parentNode;

        const name = select.querySelector('span').innerText;
        input.value = name;
        inputValue.value = select.dataset.value;
        this.searchText = name.toUpperCase();
        update(this.data);
    });

    console.log(parent);

    return this;
}