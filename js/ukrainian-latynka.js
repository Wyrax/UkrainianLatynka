window.addEventListener('DOMContentLoaded', () => {
console.log('%c >>> DOM loaded ', 'background: #222; color: #fcee21');

let firstTextArea = document.getElementById('first_textarea');
let secondTextArea = document.getElementById('second_textarea');
let thirdTextArea = document.getElementById('third_textarea');
let firstButton = document.getElementById('first_button');
let secondButton = document.getElementById('second_button');
// let thirdButton = document.getElementById('third_button');

let apostrophe = '\''; // Common (wrong) apostrophe
// let apostrophe = '’'; // Proper apostrophe
// let brackets = '(?![^\{]*\})';

let commonApostropheCount;
let properApostropheCount;

// let leftProtectionSymbol = '`';
let leftProtectionSymbol = '\u200d';
// let rightProtectionSymbol = '´';
let rightProtectionSymbol = '\u200c';

// let brackets = '(?![^`]*´)'; // Acute accent typed as alt+0180
let brackets = '(?![^'+leftProtectionSymbol+']*'+rightProtectionSymbol+')'; // Acute accent typed as alt+0180
let protectedURLsArray = [];

firstButton.addEventListener('click', () => {
    let text = firstTextArea.value;
    secondTextArea.value = ukrToLat(text);
});
secondButton.addEventListener('click', () => {
    let text = secondTextArea.value;
    thirdTextArea.value = latToUkr(text);
    if (firstTextArea.value === thirdTextArea.value) {
        document.getElementById('compare_info').textContent = 'These two texts are identical!';
        document.getElementById('compare_info').style.color = 'green';
    } else {
        if (commonApostropheCount > 0 && properApostropheCount > 0) {
            document.getElementById('compare_info').textContent = 'These two texts are different. Different apostrophe symbols in the source text detected.';
            document.getElementById('compare_info').style.color = 'red';
        } else {
            document.getElementById('compare_info').textContent = 'These two texts are different';
            document.getElementById('compare_info').style.color = 'red';
        }
    }
});

// function protectURLs(text) {
//     let matchIndex = -1;
//     text = text.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, function(match) {
//         protectedURLsArray.push(match);
//         matchIndex++;
//         return 'bb'+'PrURL'+'-'+matchIndex+'bb';
//     });
//     console.log(protectedURLsArray);
//     return text;
// }

function ukrToLat(text) {
    // text = text || '';

    if (/\'|’/.test(text)) {
        commonApostropheCount = (/\'/.test(text)) ? text.match(/\'/g).length : 0;
        console.log('commonApostropheCount = '+commonApostropheCount);
        // properApostropheCount = text.match(/’/g).length;
        properApostropheCount = (/’/.test(text)) ? text.match(/’/g).length : 0;
        console.log('properApostropheCount = '+properApostropheCount);

        apostrophe = (commonApostropheCount > properApostropheCount) ? '\'' : '’';
        console.log('apostrophe = '+apostrophe);
        console.log('apostrophe variable type: ' + typeof apostrophe);
    }

    // let matchIndex = -1;
    let protectIndex = -1;
    protectedURLsArray = [];
    text = text.replace(/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, function(match) {
        protectedURLsArray.push(match);
        return 'ProtectedURLArrayItem';
    });
    console.log(protectedURLsArray);

    // return text
    text = text
        // ToDo:
        // visitors counter
        // abbreviation logic must differ from allcaps logic :( Районний Відділ Юстиції = RVJ/RVJu != RVJU

        // .replace(/([\-?'=\/\\\|<>]*([0-9]?[a-zA-Z]+[\-?&'":\.=\/\\\|<>]*(\s[0-9]?[a-zA-Z])?){1,})(\s+)?/g, '{{$1}}$4') // with digits? Protection of basic 26 latin characters
        
        // .replace(/([\-?'=\/\\\|<>]*([a-zA-Z]+[\-?&'":\.=\/\\\|<>]*(\s[a-zA-Z])?){1,})(\s+)?/g, '`$1´$4') // Protection of basic 26 latin characters
        .replace(/([\-–—?&'"«»:=\/\\\|<>\u0301]*([a-zA-ZÀ-ž]+[\-–—?&'"«»:=\/\\\|<>\u0301]*(\s[a-zA-ZÀ-ž])?){1,})(\s+)?/g, leftProtectionSymbol+'$1'+rightProtectionSymbol+'$4') // Protection of basic 26 latin characters

        // [\?\:\=\-\,\.\(\\\/\|]*\d+([\?\:\=\-\,\.\(\\\/\|]*(\d+))* // digits between
        // ([\?\:\=\-\,\.\(\\\/\|]*\d+([\?\:\=\-\,\.\(\\\/\|]*(\d+))*) // digits between in the capturing group

        // .replace(new RegExp(oldWord, 'g'), '"' // PATTERN with variables

        .replace(/['’]я/g, 'ja')
        .replace(/['’]є/g, 'je')
        .replace(/['’]ї/g, 'ji')
        .replace(/['’]ю/g, 'ju')
        .replace(/['’]Я/g, 'JA')
        .replace(/['’]Є/g, 'JE')
        .replace(/['’]Ї/g, 'JI')
        .replace(/['’]Ю/g, 'JU')

        .replace(/бя/g, 'b́a')
        .replace(/бє/g, 'b́e')
        .replace(/бю/g, 'b́u')
        .replace(/Бя/g, 'B́a')
        .replace(/Бє/g, 'B́e')
        .replace(/Бю/g, 'B́u')
        .replace(/БЯ/g, 'B́A')
        .replace(/БЄ/g, 'B́E')
        .replace(/БЮ/g, 'B́U')
        .replace(/вя/g, 'v́a')
        .replace(/вє/g, 'v́e')
        .replace(/вю/g, 'v́u')
        .replace(/Вя/g, 'V́a')
        .replace(/Вє/g, 'V́e')
        .replace(/Вю/g, 'V́u')
        .replace(/ВЯ/g, 'V́A')
        .replace(/ВЄ/g, 'V́E')
        .replace(/ВЮ/g, 'V́U')
        .replace(/гя/g, 'ǵa')
        .replace(/гє/g, 'ǵe')
        .replace(/гю/g, 'ǵu')
        .replace(/Гя/g, 'Ǵa')
        .replace(/Гє/g, 'Ǵe')
        .replace(/Гю/g, 'Ǵu')
        .replace(/ГЯ/g, 'ǴA')
        .replace(/ГЄ/g, 'ǴE')
        .replace(/ГЮ/g, 'ǴU')
        .replace(/ґя/g, 'ğ́a')
        .replace(/ґє/g, 'ğ́e')
        .replace(/ґю/g, 'ğ́u')
        .replace(/Ґя/g, 'Ğ́a')
        .replace(/Ґє/g, 'Ğ́e')
        .replace(/Ґю/g, 'Ğ́u')
        .replace(/ҐЯ/g, 'Ğ́A')
        .replace(/ҐЄ/g, 'Ğ́E')
        .replace(/ҐЮ/g, 'Ğ́U')
        .replace(/жя/g, 'ž́a')
        .replace(/жє/g, 'ž́e')
        .replace(/жю/g, 'ž́u')
        .replace(/Жя/g, 'Ž́a')
        .replace(/Жє/g, 'Ž́e')
        .replace(/Жю/g, 'Ž́u')
        .replace(/ЖЯ/g, 'Ž́A')
        .replace(/ЖЄ/g, 'Ž́E')
        .replace(/ЖЮ/g, 'Ž́U')
        .replace(/кя/g, 'ḱa')
        .replace(/кє/g, 'ḱe')
        .replace(/кю/g, 'ḱu')
        .replace(/Кя/g, 'Ḱa')
        .replace(/Кє/g, 'Ḱe')
        .replace(/Кю/g, 'Ḱu')
        .replace(/КЯ/g, 'ḰA')
        .replace(/КЄ/g, 'ḰE')
        .replace(/КЮ/g, 'ḰU')
        .replace(/мя/g, 'ḿa')
        .replace(/мє/g, 'ḿe')
        .replace(/мю/g, 'ḿu')
        .replace(/Мя/g, 'Ḿa')
        .replace(/Мє/g, 'Ḿe')
        .replace(/Мю/g, 'Ḿu')
        .replace(/МЯ/g, 'ḾA')
        .replace(/МЄ/g, 'ḾE')
        .replace(/МЮ/g, 'ḾU')
        .replace(/пя/g, 'ṕa')
        .replace(/пє/g, 'ṕe')
        .replace(/пю/g, 'ṕu')
        .replace(/Пя/g, 'Ṕa')
        .replace(/Пє/g, 'Ṕe')
        .replace(/Пю/g, 'Ṕu')
        .replace(/ПЯ/g, 'ṔA')
        .replace(/ПЄ/g, 'ṔE')
        .replace(/ПЮ/g, 'ṔU')
        .replace(/фя/g, 'f́a')
        .replace(/фє/g, 'f́e')
        .replace(/фю/g, 'f́u')
        .replace(/Фя/g, 'F́a')
        .replace(/Фє/g, 'F́e')
        .replace(/Фю/g, 'F́u')
        .replace(/ФЯ/g, 'F́A')
        .replace(/ФЄ/g, 'F́E')
        .replace(/ФЮ/g, 'F́U')
        .replace(/хя/g, 'h́a')
        .replace(/хє/g, 'h́e')
        .replace(/хю/g, 'h́u')
        .replace(/Хя/g, 'H́a')
        .replace(/Хє/g, 'H́e')
        .replace(/Хю/g, 'H́u')
        .replace(/ХЯ/g, 'H́A')
        .replace(/ХЄ/g, 'H́E')
        .replace(/ХЮ/g, 'H́U')
        .replace(/чя/g, 'č́a')
        .replace(/чє/g, 'č́e')
        .replace(/чю/g, 'č́u')
        .replace(/Чя/g, 'Č́a')
        .replace(/Чє/g, 'Č́e')
        .replace(/Чю/g, 'Č́u')
        .replace(/ЧЯ/g, 'Č́A')
        .replace(/ЧЄ/g, 'Č́E')
        .replace(/ЧЮ/g, 'Č́U')
        .replace(/шя/g, 'š́a')
        .replace(/шє/g, 'š́e')
        .replace(/шю/g, 'š́u')
        .replace(/Шя/g, 'Š́a')
        .replace(/Шє/g, 'Š́e')
        .replace(/Шю/g, 'Š́u')
        .replace(/ШЯ/g, 'Š́A')
        .replace(/ШЄ/g, 'Š́E')
        .replace(/ШЮ/g, 'Š́U')

        // Đđ Ƶƶ

        .replace(/дя/g, 'ďa')
        .replace(/дє/g, 'ďe')
        .replace(/дю/g, 'ďu')
        .replace(/дь/g, 'ď')
        .replace(/зя/g, 'źa')
        .replace(/зє/g, 'źe')
        .replace(/зю/g, 'źu')
        .replace(/зь/g, 'ź')
        .replace(/ля/g, 'ľa')
        .replace(/лє/g, 'ľe')
        .replace(/лю/g, 'ľu')
        .replace(/ль/g, 'ľ')
        .replace(/ня/g, 'ńa')
        .replace(/нє/g, 'ńe')
        .replace(/ню/g, 'ńu')
        .replace(/нь/g, 'ń')
        .replace(/ря/g, 'ŕa')
        .replace(/рє/g, 'ŕe')
        .replace(/рю/g, 'ŕu')
        .replace(/рь/g, 'ŕ')
        .replace(/ся/g, 'śa')
        .replace(/сє/g, 'śe')
        .replace(/сю/g, 'śu')
        .replace(/сь/g, 'ś')
        .replace(/тя/g, 'ťa')
        .replace(/тє/g, 'ťe')
        .replace(/тю/g, 'ťu')
        .replace(/ть/g, 'ť')
        .replace(/ця/g, 'ća')
        .replace(/цє/g, 'će')
        .replace(/цю/g, 'ću')
        .replace(/ць/g, 'ć')

        .replace(/Дя/g, 'Ďa')
        .replace(/Дє/g, 'Ďe')
        .replace(/Дю/g, 'Ďu')
        .replace(/Дь/g, 'Ď')
        .replace(/Зя/g, 'Źa')
        .replace(/Зє/g, 'Źe')
        .replace(/Зю/g, 'Źu')
        .replace(/Зь/g, 'Ź')
        .replace(/Ля/g, 'Ľa')
        .replace(/Лє/g, 'Ľe')
        .replace(/Лю/g, 'Ľu')
        .replace(/Ль/g, 'Ľ')
        .replace(/Ня/g, 'Ńa')
        .replace(/Нє/g, 'Ńe')
        .replace(/Ню/g, 'Ńu')
        .replace(/Нь/g, 'Ń')
        .replace(/Ря/g, 'Ŕa')
        .replace(/Рє/g, 'Ŕe')
        .replace(/Рю/g, 'Ŕu')
        .replace(/Рь/g, 'Ŕ')
        .replace(/Ся/g, 'Śa')
        .replace(/Сє/g, 'Śe')
        .replace(/Сю/g, 'Śu')
        .replace(/Сь/g, 'Ś')
        .replace(/Тя/g, 'Ťa')
        .replace(/Тє/g, 'Ťe')
        .replace(/Тю/g, 'Ťu')
        .replace(/Ть/g, 'Ť')
        .replace(/Ця/g, 'Ća')
        .replace(/Цє/g, 'Će')
        .replace(/Цю/g, 'Ću')
        .replace(/Ць/g, 'Ć')

        .replace(/ДЯ/g, 'ĎA')
        .replace(/ДЄ/g, 'ĎE')
        .replace(/ДЮ/g, 'ĎU')
        .replace(/ДЬ/g, 'Ď')
        .replace(/ЗЯ/g, 'ŹA')
        .replace(/ЗЄ/g, 'ŹE')
        .replace(/ЗЮ/g, 'ŹU')
        .replace(/ЗЬ/g, 'Ź')
        .replace(/ЛЯ/g, 'ĽA')
        .replace(/ЛЄ/g, 'ĽE')
        .replace(/ЛЮ/g, 'ĽU')
        .replace(/ЛЬ/g, 'Ľ')
        .replace(/НЯ/g, 'ŃA')
        .replace(/НЄ/g, 'ŃE')
        .replace(/НЮ/g, 'ŃU')
        .replace(/НЬ/g, 'Ń')
        .replace(/РЯ/g, 'ŔA')
        .replace(/РЄ/g, 'ŔE')
        .replace(/РЮ/g, 'ŔU')
        .replace(/РЬ/g, 'Ŕ')
        .replace(/СЯ/g, 'ŚA')
        .replace(/СЄ/g, 'ŚE')
        .replace(/СЮ/g, 'ŚU')
        .replace(/СЬ/g, 'Ś')
        .replace(/ТЯ/g, 'ŤA')
        .replace(/ТЄ/g, 'ŤE')
        .replace(/ТЮ/g, 'ŤU')
        .replace(/ТЬ/g, 'Ť')
        .replace(/ЦЯ/g, 'ĆA')
        .replace(/ЦЄ/g, 'ĆE')
        .replace(/ЦЮ/g, 'ĆU')
        .replace(/ЦЬ/g, 'Ć')

        .replace(/ий/g, 'ý')
        .replace(/ия/g, 'ýa')
        .replace(/иє/g, 'ýe')
        .replace(/иї/g, 'ýi')
        .replace(/ию/g, 'ýu')

        .replace(/а/g, 'a')
        .replace(/б/g, 'b')
        .replace(/в/g, 'v')
        .replace(/г/g, 'g')
        .replace(/ґ/g, 'ğ')
        .replace(/д/g, 'd')
        .replace(/е/g, 'e')
        .replace(/є/g, 'je')
        .replace(/ж/g, 'ž')
        .replace(/з/g, 'z')
        .replace(/и/g, 'y')
        .replace(/і/g, 'i')
        .replace(/ї/g, 'ji')
        .replace(/й/g, 'j')
        .replace(/к/g, 'k')
        .replace(/л/g, 'l')
        .replace(/м/g, 'm')
        .replace(/н/g, 'n')
        .replace(/о/g, 'o')
        .replace(/п/g, 'p')
        .replace(/р/g, 'r')
        .replace(/с/g, 's')
        .replace(/т/g, 't')
        .replace(/у/g, 'u')
        .replace(/ф/g, 'f')
        .replace(/х/g, 'h')
        .replace(/ц/g, 'c')
        .replace(/ч/g, 'č')
        .replace(/ш/g, 'š')
        .replace(/щ/g, 'šč')
        .replace(/ь/g, 'ĵ◄') // 'watcher wrong' replace
        .replace(/ю/g, 'ju')
        .replace(/я/g, 'ja')

        .replace(/А/g, 'A')
        .replace(/Б/g, 'B')
        .replace(/В/g, 'V')
        .replace(/Г/g, 'G')
        .replace(/Ґ/g, 'Ğ')
        .replace(/Д/g, 'D')
        .replace(/Е/g, 'E')
        .replace(/Є([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JE$1')
        .replace(/Є/g, 'Je')
        .replace(/Ж/g, 'Ž')
        .replace(/З/g, 'Z')
        .replace(/Ий/g, 'Ý')
        .replace(/Ия/g, 'Ýa')
        .replace(/Иє/g, 'Ýe')
        .replace(/Иї/g, 'Ýi')
        .replace(/Ию/g, 'Ýu')

        .replace(/ИЙ/g, 'Ý')
        .replace(/ИЯ/g, 'ÝA')
        .replace(/ИЄ/g, 'ÝE')
        .replace(/ИЇ/g, 'ÝI')
        .replace(/ИЮ/g, 'ÝU')

        .replace(/И/g, 'Y')
        .replace(/І/g, 'I')
        .replace(/Ї([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JI$1')
        .replace(/Ї/g, 'Ji')
        .replace(/Й/g, 'J')
        .replace(/К/g, 'K')
        .replace(/Л/g, 'L')
        .replace(/М/g, 'M')
        .replace(/Н/g, 'N')
        .replace(/О/g, 'O')
        .replace(/П/g, 'P')
        .replace(/Р/g, 'R')
        .replace(/С/g, 'S')
        .replace(/Т/g, 'T')
        .replace(/У/g, 'U')
        .replace(/Ф/g, 'F')
        .replace(/Х/g, 'H')
        .replace(/Ц/g, 'C')
        .replace(/Ч/g, 'Č')
        .replace(/Ш/g, 'Š')
        .replace(/Щ([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'ŠČ$1')
        .replace(/Щ/g, 'Šč')
        .replace(/Ь/g, 'Ĵ◄')
        .replace(/Ю([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JU$1')
        .replace(/Ю/g, 'Ju')
        .replace(/Я([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JA$1')
        .replace(/Я/g, 'Ja');

        text = text.replace(/ProtectedURLArrayItem/g, function() {
            // protectedURLsArray.push(match);
            protectIndex++;
            return protectedURLsArray[protectIndex];
            });
        return text;
}

function latToUkr(text) {
    // text = text || '';

    return text

        // (?![^\[\]]*\]) // 'not in a squre brackets' example

        .replace(/b́a/g, 'бя')
        .replace(/b́e/g, 'бє')
        .replace(/b́u/g, 'бю')
        .replace(/B́a/g, 'Бя')
        .replace(/B́e/g, 'Бє')
        .replace(/B́u/g, 'Бю')
        .replace(/B́A/g, 'БЯ')
        .replace(/B́E/g, 'БЄ')
        .replace(/B́U/g, 'БЮ')
        .replace(/v́a/g, 'вя')
        .replace(/v́e/g, 'вє')
        .replace(/v́u/g, 'вю')
        .replace(/V́a/g, 'Вя')
        .replace(/V́e/g, 'Вє')
        .replace(/V́u/g, 'Вю')
        .replace(/V́A/g, 'ВЯ')
        .replace(/V́E/g, 'ВЄ')
        .replace(/V́U/g, 'ВЮ')
        .replace(/ǵa/g, 'гя')
        .replace(/ǵe/g, 'гє')
        .replace(/ǵu/g, 'гю')
        .replace(/Ǵa/g, 'Гя')
        .replace(/Ǵe/g, 'Гє')
        .replace(/Ǵu/g, 'Гю')
        .replace(/ǴA/g, 'ГЯ')
        .replace(/ǴE/g, 'ГЄ')
        .replace(/ǴU/g, 'ГЮ')
        .replace(/ğ́a/g, 'ґя')
        .replace(/ğ́e/g, 'ґє')
        .replace(/ğ́u/g, 'ґю')
        .replace(/Ğ́a/g, 'Ґя')
        .replace(/Ğ́e/g, 'Ґє')
        .replace(/Ğ́u/g, 'Ґю')
        .replace(/Ğ́A/g, 'ҐЯ')
        .replace(/Ğ́E/g, 'ҐЄ')
        .replace(/Ğ́U/g, 'ҐЮ')
        .replace(/ž́a/g, 'жя')
        .replace(/ž́e/g, 'жє')
        .replace(/ž́u/g, 'жю')
        .replace(/Ž́a/g, 'Жя')
        .replace(/Ž́e/g, 'Жє')
        .replace(/Ž́u/g, 'Жю')
        .replace(/Ž́A/g, 'ЖЯ')
        .replace(/Ž́E/g, 'ЖЄ')
        .replace(/Ž́U/g, 'ЖЮ')
        .replace(/ḱa/g, 'кя')
        .replace(/ḱe/g, 'кє')
        .replace(/ḱu/g, 'кю')
        .replace(/Ḱa/g, 'Кя')
        .replace(/Ḱe/g, 'Кє')
        .replace(/Ḱu/g, 'Кю')
        .replace(/ḰA/g, 'КЯ')
        .replace(/ḰE/g, 'КЄ')
        .replace(/ḰU/g, 'КЮ')
        .replace(/ḿa/g, 'мя')
        .replace(/ḿe/g, 'мє')
        .replace(/ḿu/g, 'мю')
        .replace(/Ḿa/g, 'Мя')
        .replace(/Ḿe/g, 'Мє')
        .replace(/Ḿu/g, 'Мю')
        .replace(/ḾA/g, 'МЯ')
        .replace(/ḾE/g, 'МЄ')
        .replace(/ḾU/g, 'МЮ')
        .replace(/ṕa/g, 'пя')
        .replace(/ṕe/g, 'пє')
        .replace(/ṕu/g, 'пю')
        .replace(/Ṕa/g, 'Пя')
        .replace(/Ṕe/g, 'Пє')
        .replace(/Ṕu/g, 'Пю')
        .replace(/ṔA/g, 'ПЯ')
        .replace(/ṔE/g, 'ПЄ')
        .replace(/ṔU/g, 'ПЮ')
        .replace(/f́a/g, 'фя')
        .replace(/f́e/g, 'фє')
        .replace(/f́u/g, 'фю')
        .replace(/F́a/g, 'Фя')
        .replace(/F́e/g, 'Фє')
        .replace(/F́u/g, 'Фю')
        .replace(/F́A/g, 'ФЯ')
        .replace(/F́E/g, 'ФЄ')
        .replace(/F́U/g, 'ФЮ')
        .replace(/h́a/g, 'хя')
        .replace(/h́e/g, 'хє')
        .replace(/h́u/g, 'хю')
        .replace(/H́a/g, 'Хя')
        .replace(/H́e/g, 'Хє')
        .replace(/H́u/g, 'Хю')
        .replace(/H́A/g, 'ХЯ')
        .replace(/H́E/g, 'ХЄ')
        .replace(/H́U/g, 'ХЮ')
        .replace(/č́a/g, 'чя')
        .replace(/č́e/g, 'чє')
        .replace(/č́u/g, 'чю')
        .replace(/Č́a/g, 'Чя')
        .replace(/Č́e/g, 'Чє')
        .replace(/Č́u/g, 'Чю')
        .replace(/Č́A/g, 'ЧЯ')
        .replace(/Č́E/g, 'ЧЄ')
        .replace(/Č́U/g, 'ЧЮ')
        .replace(/š́a/g, 'шя')
        .replace(/š́e/g, 'шє')
        .replace(/š́u/g, 'шю')
        .replace(/Š́a/g, 'Шя')
        .replace(/Š́e/g, 'Шє')
        .replace(/Š́u/g, 'Шю')
        .replace(/Š́A/g, 'ШЯ')
        .replace(/Š́E/g, 'ШЄ')
        .replace(/Š́U/g, 'ШЮ')

        // .replace(/(^|[\s-\('"«»:\\\/])NA(JA|JE|JI|JU)((BED)|(VN[YÝIO])|(VU)|(DK?[\sAYIOU])|(KIR)|(LO[ŽZ])|(RMAR)|(ME?Ć)|(MN[AYIOU])|(BSTV)|(B[\sAYIU])|(DA[NT])|(DEN)|(DŽ)|(ŽAČ)|(ŽDŽ)|(ŽEN)|(ŽYT)|(ŽUV)|(Z[DN])|(N[\sAYIOU])|(ST)|(TYV)|(HAT))/g, '$1НА$2$3')
        .replace(/(ščo|jak)naj/g, '$1най')
        .replace(/(Ščo|Jak)naj/g, '$1най')
        .replace(/(ŠČO|JAK)NAJ/g, '$1НАЙ')

        .replace(/na(ja|je|ji|ju)((([mh]\s)|(ju|my)|([\s]))|(bed)|(vn[ayýiou])|(vu)|(dk?[\sayiou])|(kir)|(lo[žz])|(rmar)|(me?ć)|(mn[ayiou])|(bstv)|(b[\sayiou])|([vl])|(da[nt])|(den)|(dž)|(žač)|(ždž)|(žen)|(žyt)|(žuv)|(z[dn])|(n[\sayiou])|(st)|(tyv)|(hat))/g, 'на$1$2')
        .replace(/Na(ja|je|ji|ju)((([mh]\s)|(ju|my)|([\s]))|(bed)|(vn[ayýiou])|(vu)|(dk?[\sayiou])|(kir)|(lo[žz])|(rmar)|(me?ć)|(mn[ayiou])|(bstv)|(b[\sayiou])|([vl])|(da[nt])|(den)|(dž)|(žač)|(ždž)|(žen)|(žyt)|(žuv)|(z[dn])|(n[\sayiou])|(st)|(tyv)|(hat))/g, 'На$1$2')
        .replace(/NA(JA|JE|JI|JU)((([MH]\s)|(JU|MY)|([\s]))|(BED)|(VN[AYÝIOU])|(VU)|(DK?[\sAYIOU])|(KIR)|(LO[ŽZ])|(RMAR)|(ME?Ć)|(MN[AYIOU])|(BSTV)|(B[\sAYIOU])|([VL])|(DA[NT])|(DEN)|(DŽ)|(ŽAČ)|(ŽDŽ)|(ŽEN)|(ŽYT)|(ŽUV)|(Z[DN])|(N[\sAYIOU])|(ST)|(TYV)|(HAT))/g, 'НА$1$2')

        .replace(/(^|[\s-\('"«»:\\\/])naj([aeiu])/g, '$1най$2')
        .replace(/(^|[\s-\('"«»:\\\/])Naj([aeiu])/g, '$1Най$2')
        .replace(/(^|[\s-\('"«»:\\\/])NAJ([AEIU])/g, '$1НАЙ$2')
        .replace(/([bpvmfžčšgkhğdtzcslnr])jevrop/g, '$1'+apostrophe+'європ')  //Тверді: б, п, в, м, ф, ж, ч, ш, дж, г, к, х, ґ, д, т, з, ц, дз, с, л, н, р.
                                                //                                        ž č

        // .replace(/([BbPpVvMmFfRrZzDdNnKkŽžHhŠšTtGgĞğ])j([aeiu])/g, '$1'+apostrophe+'j$2')
        .replace(new RegExp('([BbPpVvMmFfRrZzDdNnKkŽžHhŠšTtGgĞğ])j([aeiu])' + brackets, 'g'), '$1'+apostrophe+'j$2')
        // .replace(/([BbPpVvMmFfRrZzDdNnKkŽžHhŠšTtGgĞğ])J([AEIU])/g, '$1'+apostrophe+'J$2')
        .replace(new RegExp('([BbPpVvMmFfRrZzDdNnKkŽžHhŠšTtGgĞğ])J([AEIU])' + brackets, 'g'), '$1'+apostrophe+'J$2')

        .replace(/ďa/g, 'дя')
        .replace(/ďe/g, 'дє')
        .replace(/ďu/g, 'дю')
        // .replace(/ď/g, 'дь')
        .replace(new RegExp('ď' + brackets, 'g'), 'дь')
        .replace(/źa/g, 'зя')
        .replace(/źe/g, 'зє')
        .replace(/źu/g, 'зю')
        // .replace(/ź/g, 'зь')
        .replace(new RegExp('ź' + brackets, 'g'), 'зь')
        .replace(/ľa/g, 'ля')
        .replace(/ľe/g, 'лє')
        .replace(/ľu/g, 'лю')
        // .replace(/ľ/g, 'ль')
        .replace(new RegExp('ľ' + brackets, 'g'), 'ль')
        .replace(/ńa/g, 'ня')
        .replace(/ńe/g, 'нє')
        .replace(/ńu/g, 'ню')
        // .replace(/ń/g, 'нь')
        .replace(new RegExp('ń' + brackets, 'g'), 'нь')
        .replace(/ŕa/g, 'ря')
        .replace(/ŕe/g, 'рє')
        .replace(/ŕu/g, 'рю')
        // .replace(/ŕ/g, 'рь')
        .replace(new RegExp('ŕ' + brackets, 'g'), 'рь')
        .replace(/śa/g, 'ся')
        .replace(/śe/g, 'сє')
        .replace(/śu/g, 'сю')
        // .replace(/ś/g, 'сь')
        .replace(new RegExp('ś' + brackets, 'g'), 'сь')
        .replace(/ťa/g, 'тя')
        .replace(/ťe/g, 'тє')
        .replace(/ťu/g, 'тю')
        // .replace(/ť/g, 'ть')
        .replace(new RegExp('ť' + brackets, 'g'), 'ть')
        .replace(/ća/g, 'ця')
        .replace(/će/g, 'цє')
        .replace(/ću/g, 'цю')
        // .replace(/ć/g, 'ць')
        .replace(new RegExp('ć' + brackets, 'g'), 'ць')

        .replace(/Ďa/g, 'Дя')
        .replace(/Ďe/g, 'Дє')
        .replace(/Ďu/g, 'Дю')
        .replace(/Źa/g, 'Зя')
        .replace(/Źe/g, 'Зє')
        .replace(/Źu/g, 'Зю')
        .replace(/Ľa/g, 'Ля')
        .replace(/Ľe/g, 'Лє')
        .replace(/Ľu/g, 'Лю')
        .replace(/Ńa/g, 'Ня')
        .replace(/Ńe/g, 'Нє')
        .replace(/Ńu/g, 'Ню')
        .replace(/Ŕa/g, 'Ря')
        .replace(/Ŕe/g, 'Рє')
        .replace(/Ŕu/g, 'Рю')
        .replace(/Śa/g, 'Ся')
        .replace(/Śe/g, 'Сє')
        .replace(/Śu/g, 'Сю')
        .replace(/Ťa/g, 'Тя')
        .replace(/Ťe/g, 'Тє')
        .replace(/Ťu/g, 'Тю')
        .replace(/Ća/g, 'Ця')
        .replace(/Će/g, 'Цє')
        .replace(/Ću/g, 'Цю')

        // .replace(/JA([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"\'»,:;)\?!\-\.\s\r])/g, 'Я$1')
        // .replace(/JA/g, 'Я')
        .replace(new RegExp('JA([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"\'»,:;\)\?!\-\.\s\r])' + brackets, 'g'), 'Я$1')
        .replace(new RegExp('JA' + brackets, 'g'), 'Я')
        // .replace(/JE([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"\'»,:;\)\?!\-\.\s\r])/g, 'Є$1')
        // .replace(/JE/g, 'Є')
        .replace(new RegExp('JE([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"\'»,:;\)\?!\-\.\s\r])' + brackets, 'g'), 'Є$1')
        .replace(new RegExp('JE' + brackets, 'g'), 'Є')
        // .replace(/JI([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"\'»,:;\)\?!\-\.\s\r])/g, 'Ї$1')
        // .replace(/JI/g, 'Ї')
        .replace(new RegExp('JI([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"\'»,:;\)\?!\-\.\s\r])' + brackets, 'g'), 'Ї$1')
        .replace(new RegExp('JI' + brackets, 'g'), 'Ї')
        // .replace(/JU([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"\'»,:;\)\?!\-\.\s\r])/g, 'Ю$1')
        // .replace(/JU/g, 'Ю')
        .replace(new RegExp('JU([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"\'»,:;\)\?!\-\.\s\r])' + brackets, 'g'), 'Ю$1')
        .replace(new RegExp('JU' + brackets, 'g'), 'Ю')
        .replace(/ŠČ([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"\'»,:;\)\?!\-\.\s\r])/g, 'Щ$1')
        .replace(/ŠČ/g, 'Щ')

        .replace(/ĎA/g, 'ДЯ')
        .replace(/ĎE/g, 'ДЄ')
        .replace(/ĎU/g, 'ДЮ')
        .replace(/ŹA/g, 'ЗЯ')
        .replace(/ŹE/g, 'ЗЄ')
        .replace(/ŹU/g, 'ЗЮ')
        .replace(/ĽA/g, 'ЛЯ')
        .replace(/ĽE/g, 'ЛЄ')
        .replace(/ĽU/g, 'ЛЮ')
        .replace(/ŃA/g, 'НЯ')
        .replace(/ŃE/g, 'НЄ')
        .replace(/ŃU/g, 'НЮ')
        .replace(/ŔA/g, 'РЯ')
        .replace(/ŔE/g, 'РЄ')
        .replace(/ŔU/g, 'РЮ')
        .replace(/ŚA/g, 'СЯ')
        .replace(/ŚE/g, 'СЄ')
        .replace(/ŚU/g, 'СЮ')
        .replace(/ŤA/g, 'ТЯ')
        .replace(/ŤE/g, 'ТЄ')
        .replace(/ŤU/g, 'ТЮ')
        .replace(/ĆA/g, 'ЦЯ')
        .replace(/ĆE/g, 'ЦЄ')
        .replace(/ĆU/g, 'ЦЮ')

        .replace(/Ď([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'ДЬ$1')
        .replace(/Ź([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'ЗЬ$1')
        .replace(/Ľ([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'ЛЬ$1')
        .replace(/Ń([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'НЬ$1')
        .replace(/Ŕ([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'РЬ$1')
        .replace(/Ś([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'СЬ$1')
        .replace(/Ť([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'ТЬ$1')
        .replace(/Ć([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'ЦЬ$1')

        .replace(/Ý([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'ИЙ$1') // test
        
        .replace(/Ď/g, 'Дь')
        .replace(/Ź/g, 'Зь')
        .replace(/Ľ/g, 'Ль')
        .replace(/Ń/g, 'Нь')
        .replace(/Ŕ/g, 'Рь')
        .replace(/Ś/g, 'Сь')
        .replace(/Ť/g, 'Ть')
        .replace(/Ć/g, 'Ць')

        // .replace(/Ja/g, 'Я')
        .replace(new RegExp('Ja' + brackets, 'g'), 'Я')
        // .replace(/Je/g, 'Є')
        .replace(new RegExp('Je' + brackets, 'g'), 'Є')
        // .replace(/Ji/g, 'Ї')
        .replace(new RegExp('Ji' + brackets, 'g'), 'Ї')
        // .replace(/Ju/g, 'Ю')
        .replace(new RegExp('Ju' + brackets, 'g'), 'Ю')
        .replace(/Šč/g, 'Щ')

        // .replace(/ja/g, 'я')
        .replace(new RegExp('ja' + brackets, 'g'), 'я')
        // .replace(/je/g, 'є')
        .replace(new RegExp('je' + brackets, 'g'), 'є')
        // .replace(/ji/g, 'ї')
        .replace(new RegExp('ji' + brackets, 'g'), 'ї')
        // .replace(/ju/g, 'ю')
        .replace(new RegExp('ju' + brackets, 'g'), 'ю')
        .replace(/ýa/g, 'ия') // ??? АЛАРМ брокен лоджик ия - ия /зен  и - и
        .replace(/ýe/g, 'иє')
        .replace(/ýi/g, 'иї')
        .replace(/ýu/g, 'ию')
        .replace(/šč/g, 'щ')



        // .replace(/a/g, 'а')
        .replace(new RegExp('a' + brackets, 'g'), 'а')
        // .replace(/b/g, 'б')
        .replace(new RegExp('b' + brackets, 'g'), 'б')
        // .replace(/v/g, 'в')
        .replace(new RegExp('v' + brackets, 'g'), 'в')
        // .replace(/g/g, 'г')
        .replace(new RegExp('g' + brackets, 'g'), 'г')
        .replace(/ğ/g, 'ґ')
        // .replace(/d/g, 'д')
        .replace(new RegExp('d' + brackets, 'g'), 'д')
        // .replace(/e/g, 'е')
        .replace(new RegExp('e' + brackets, 'g'), 'е')
        .replace(/ž/g, 'ж')
        // .replace(/z/g, 'з')
        .replace(new RegExp('z' + brackets, 'g'), 'з')
        .replace(/ý/g, 'ий')
        // .replace(/y/g, 'и')
        .replace(new RegExp('y' + brackets, 'g'), 'и')
        // .replace(/i/g, 'і')
        .replace(new RegExp('i' + brackets, 'g'), 'і')
        // .replace(/j/g, 'й')
        .replace(new RegExp('j' + brackets, 'g'), 'й')
        // .replace(/k/g, 'к')
        .replace(new RegExp('k' + brackets, 'g'), 'к')
        // .replace(/l/g, 'л')
        .replace(new RegExp('l' + brackets, 'g'), 'л')
        // .replace(/m/g, 'м')
        .replace(new RegExp('m' + brackets, 'g'), 'м')
        // .replace(/n/g, 'н')
        .replace(new RegExp('n' + brackets, 'g'), 'н')
        // .replace(/o/g, 'о')
        .replace(new RegExp('o' + brackets, 'g'), 'о')
        // .replace(/p/g, 'п')
        .replace(new RegExp('p' + brackets, 'g'), 'п')
        // .replace(/r/g, 'р')
        .replace(new RegExp('r' + brackets, 'g'), 'р')
        // .replace(/s/g, 'с')
        .replace(new RegExp('s' + brackets, 'g'), 'с')
        // .replace(/t/g, 'т')
        .replace(new RegExp('t' + brackets, 'g'), 'т')
        // .replace(/u/g, 'у') // protection test below
        // .replace(/u(?![^\{]*\})/g, 'у')
        .replace(new RegExp('u' + brackets, 'g'), 'у')
        // .replace(/f/g, 'ф')
        .replace(new RegExp('f' + brackets, 'g'), 'ф')
        // .replace(/h/g, 'х')
        .replace(new RegExp('h' + brackets, 'g'), 'х')
        // .replace(/c/g, 'ц')
        .replace(new RegExp('c' + brackets, 'g'), 'ц')
        .replace(/č/g, 'ч')
        .replace(/š/g, 'ш') // АЛАРМ ?? why
        .replace(/ĵ◄/g, 'ь')

        // .replace(/A/g, 'А')
        .replace(new RegExp('A' + brackets, 'g'), 'А')
        // .replace(/B/g, 'Б')
        .replace(new RegExp('B' + brackets, 'g'), 'Б')
        // .replace(/V/g, 'В')
        .replace(new RegExp('V' + brackets, 'g'), 'В')
        // .replace(/G/g, 'Г')
        .replace(new RegExp('G' + brackets, 'g'), 'Г')
        .replace(/Ğ/g, 'Ґ')
        // .replace(/D/g, 'Д')
        .replace(new RegExp('D' + brackets, 'g'), 'Д')
        // .replace(/E/g, 'Е')
        .replace(new RegExp('E' + brackets, 'g'), 'Е')
        .replace(/Ž/g, 'Ж')
        // .replace(/Z/g, 'З')
        .replace(new RegExp('Z' + brackets, 'g'), 'З')
        .replace(/Ý/g, 'Ий') // тест аббрев капс етс.
        // .replace(/Y/g, 'И')
        .replace(new RegExp('Y' + brackets, 'g'), 'И')
        // .replace(/I/g, 'І')
        .replace(new RegExp('I' + brackets, 'g'), 'І')
        // .replace(/J/g, 'Й')
        .replace(new RegExp('J' + brackets, 'g'), 'Й')
        // .replace(/K/g, 'К')
        .replace(new RegExp('K' + brackets, 'g'), 'К')
        // .replace(/L/g, 'Л')
        .replace(new RegExp('L' + brackets, 'g'), 'Л')
        // .replace(/M/g, 'М')
        .replace(new RegExp('M' + brackets, 'g'), 'М')
        // .replace(/N/g, 'Н')
        .replace(new RegExp('N' + brackets, 'g'), 'Н')
        // .replace(/O/g, 'О')
        .replace(new RegExp('O' + brackets, 'g'), 'О')
        // .replace(/P/g, 'П')
        .replace(new RegExp('P' + brackets, 'g'), 'П')
        // .replace(/R/g, 'Р')
        .replace(new RegExp('R' + brackets, 'g'), 'Р')
        // .replace(/S/g, 'С')
        .replace(new RegExp('S' + brackets, 'g'), 'С')
        // .replace(/T/g, 'Т')
        .replace(new RegExp('T' + brackets, 'g'), 'Т')
        // .replace(/U/g, 'У')
        .replace(new RegExp('U' + brackets, 'g'), 'У')
        // .replace(/F/g, 'Ф')
        .replace(new RegExp('F' + brackets, 'g'), 'Ф')
        // .replace(/H/g, 'Х')
        .replace(new RegExp('H' + brackets, 'g'), 'Х')
        // .replace(/C/g, 'Ц')
        .replace(new RegExp('C' + brackets, 'g'), 'Ц')
        .replace(/Č/g, 'Ч')
        .replace(/Š/g, 'Ш')
        .replace(/Ĵ◄/g, 'Ь')
        
        // .replace(/\{\{/g, '') // old protection brackets
        // .replace(/\}\}/g, '') // old protection brackets
        // .replace(/`/g, '') //new protection symbol
        // .replace(/´/g, '') //new protection symbol
        .replace(new RegExp(leftProtectionSymbol, 'g'), '') //new protection symbol
        .replace(new RegExp(rightProtectionSymbol, 'g'), ''); //new protection symbol

        // .replace(/([^аеоу])\u0301/g, '$1'); //U+0301 combining acute 

        // .replace(/'/g, '')
        // .replace(/’/g, '');
}

});