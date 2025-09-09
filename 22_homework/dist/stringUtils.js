// Задание 1
// Модули для работы со строками
// Создайте файл `stringUtils.ts`, в котором определите функции:
// `capitalize`, которая делает первую букву строки заглавной.
// `reverseString`, которая переворачивает строку задом наперед.
// В файле `main.ts` импортируйте эти функции и протестируйте их на примерах строк.
// Делаем первую букву строки заглавной
export function capitalize(str) {
    if (!str)
        return '';
    return str[0].toUpperCase() + str.slice(1);
}
// Переворачиваем строку задом наперёд
export function reverseString(str) {
    return str.split('').reverse().join('');
}
//# sourceMappingURL=stringUtils.js.map