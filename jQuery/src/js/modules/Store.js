let store = require('store2');

function getStore () {
    return initializeStore();
}

function setStoreData (data) {

    for (let key in data) {
        data[key] = Array.from(data[key]);
    }
    store.set('Picker', data);

    return data;
}

function initializeStore () {
    if (!store.has('Picker')) {
        setUpStore();
    }

    return store.get('Picker');
}

function setUpStore () {
    store.set(
        'Picker',
        {
            names : [],
            chosen: []
        }
    );
}

function addStoreData (key, value) {
    let data = initializeStore();

    if (data.hasOwnProperty(key) !== true) {
        return;
    }

    data[key].push(value);
    data[key] = Array.from(new Set(data[key]));

    return setStoreData(data);
}

export default  {
    init: () => initializeStore,
    get : () => {
        return getStore();
    },
    set : (data) => {
        setStoreData(data);
    },
    add : (key, value) => {
        addStoreData(key, value);
    }
}