import storage from 'good-storage';

export function setData(key, val) {
	storage.set(key, val)
}

export function getData(key) {
	return storage.get(key)
}
