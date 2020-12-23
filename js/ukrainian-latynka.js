window.addEventListener('DOMContentLoaded', () => {
    console.log('%c >>> DOM loaded ', 'background: #222; color: #fcee21');

    let firstTextArea = document.getElementById('first_textarea');
    let secondTextArea = document.getElementById('second_textarea');
    let thirdTextArea = document.getElementById('third_textarea');
    let firstButton = document.getElementById('first_button');
    let secondButton = document.getElementById('second_button');
    // let thirdButton = document.getElementById('third_button');


    firstButton.addEventListener('click', () => {
        let text = firstTextArea.value;
        secondTextArea.value = ukrToLat(text);
    });
    secondButton.addEventListener('click', () => {
        let text = secondTextArea.value;
        thirdTextArea.value = latToUkr(text);
    });
});

function ukrToLat(text) {
    // text = text || '';

    return text
             // ToDo: protect latin characters option with brackets [] and in latToCyr() exclude chars inside [] from transliteration
             // visitors counter
             // abbreviation logic must differ from allcaps logic :( Районний Відділ Юстиції = RVJ/RVJu != RVJU
        // .replace(/іє/g, 'ie') // Exception
        // .replace(/Іє/g, 'Ie') // Exception
        // .replace(/ія/g, 'ia') // Exception
        // .replace(/Ія/g, 'Ia') // Exception
        // .replace(/зг/g, 'zgh') // Exception
        // .replace(/Зг/g, 'Zgh') // Exception
        // .replace(/ьо/g, 'io') // Exception

        // .replace(/дж/g, 'Ǆǅǆ')

        .replace(/дя/g, 'ďa')
        .replace(/дє/g, 'ďe')
        .replace(/дї/g, 'ďi') // n/e
        .replace(/дю/g, 'ďu')
        .replace(/дь/g, 'ď')
        .replace(/зя/g, 'źa')
        .replace(/зє/g, 'źe')
        .replace(/зї/g, 'źi') // n/e
        .replace(/зю/g, 'źu')
        .replace(/зь/g, 'ź')
        .replace(/ля/g, 'ľa')
        .replace(/лє/g, 'ľe')
        .replace(/лї/g, 'ľi') // n/e
        .replace(/лю/g, 'ľu')
        .replace(/ль/g, 'ľ')
        .replace(/ня/g, 'ńa')
        .replace(/нє/g, 'ńe')
        .replace(/нї/g, 'ńi') // n/e
        .replace(/ню/g, 'ńu')
        .replace(/нь/g, 'ń')
        .replace(/ря/g, 'ŕa')
        .replace(/рє/g, 'ŕe')
        .replace(/рї/g, 'ŕi') // n/e
        .replace(/рю/g, 'ŕu')
        .replace(/рь/g, 'ŕ')
        .replace(/ся/g, 'śa')
        .replace(/сє/g, 'śe')
        .replace(/сї/g, 'śi') // n/e
        .replace(/сю/g, 'śu')
        .replace(/сь/g, 'ś')
        .replace(/тя/g, 'ťa')
        .replace(/тє/g, 'ťe')
        .replace(/тї/g, 'ťi') // n/e
        .replace(/тю/g, 'ťu')
        .replace(/ть/g, 'ť')
        .replace(/ця/g, 'ća')
        .replace(/цє/g, 'će')
        .replace(/цї/g, 'ći') // n/e
        .replace(/цю/g, 'ću')
        .replace(/ць/g, 'ć')

        .replace(/Дя/g, 'Ďa')
        .replace(/Дє/g, 'Ďe')
        .replace(/Дї/g, 'Ďi') // n/e
        .replace(/Дю/g, 'Ďu')
        .replace(/Дь/g, 'Ď')
        .replace(/Зя/g, 'Źa')
        .replace(/Зє/g, 'Źe')
        .replace(/Зї/g, 'Źi') // n/e
        .replace(/Зю/g, 'Źu')
        .replace(/Зь/g, 'Ź')
        .replace(/Ля/g, 'Ľa')
        .replace(/Лє/g, 'Ľe')
        .replace(/Лї/g, 'Ľi') // n/e
        .replace(/Лю/g, 'Ľu')
        .replace(/Ль/g, 'Ľ')
        .replace(/Ня/g, 'Ńa')
        .replace(/Нє/g, 'Ńe')
        .replace(/Нї/g, 'Ńi') // n/e
        .replace(/Ню/g, 'Ńu')
        .replace(/Нь/g, 'Ń')
        .replace(/Ря/g, 'Ŕa')
        .replace(/Рє/g, 'Ŕe')
        .replace(/Рї/g, 'Ŕi') // n/e
        .replace(/Рю/g, 'Ŕu')
        .replace(/Рь/g, 'Ŕ')
        .replace(/Ся/g, 'Śa')
        .replace(/Сє/g, 'Śe')
        .replace(/Сї/g, 'Śi') // n/e
        .replace(/Сю/g, 'Śu')
        .replace(/Сь/g, 'Ś')
        .replace(/Тя/g, 'Ťa')
        .replace(/Тє/g, 'Ťe')
        .replace(/Тї/g, 'Ťi') // n/e
        .replace(/Тю/g, 'Ťu')
        .replace(/Ть/g, 'Ť')
        .replace(/Ця/g, 'Ća')
        .replace(/Цє/g, 'Će')
        .replace(/Цї/g, 'Ći') // n/e
        .replace(/Цю/g, 'Ću')
        .replace(/Ць/g, 'Ć')

        .replace(/ДЯ/g, 'ĎA')
        .replace(/ДЄ/g, 'ĎE')
        .replace(/ДЇ/g, 'ĎI') // n/e
        .replace(/ДЮ/g, 'ĎU')
        .replace(/ДЬ/g, 'Ď')
        .replace(/ЗЯ/g, 'ŹA')
        .replace(/ЗЄ/g, 'ŹE')
        .replace(/ЗЇ/g, 'ŹI') // n/e
        .replace(/ЗЮ/g, 'ŹU')
        .replace(/ЗЬ/g, 'Ź')
        .replace(/ЛЯ/g, 'ĽA')
        .replace(/ЛЄ/g, 'ĽE')
        .replace(/ЛЇ/g, 'ĽI') // n/e
        .replace(/ЛЮ/g, 'ĽU')
        .replace(/ЛЬ/g, 'Ľ')
        .replace(/НЯ/g, 'ŃA')
        .replace(/НЄ/g, 'ŃE')
        .replace(/НЇ/g, 'ŃI') // n/e
        .replace(/НЮ/g, 'ŃU')
        .replace(/НЬ/g, 'Ń')
        .replace(/РЯ/g, 'ŔA')
        .replace(/РЄ/g, 'ŔE')
        .replace(/РЇ/g, 'ŔI') // n/e
        .replace(/РЮ/g, 'ŔU')
        .replace(/РЬ/g, 'Ŕ')
        .replace(/СЯ/g, 'ŚA')
        .replace(/СЄ/g, 'ŚE')
        .replace(/СЇ/g, 'ŚI') // n/e
        .replace(/СЮ/g, 'ŚU')
        .replace(/СЬ/g, 'Ś')
        .replace(/ТЯ/g, 'ŤA')
        .replace(/ТЄ/g, 'ŤE')
        .replace(/ТЇ/g, 'ŤI') // n/e
        .replace(/ТЮ/g, 'ŤU')
        .replace(/ТЬ/g, 'Ť')
        .replace(/ЦЯ/g, 'ĆA')
        .replace(/ЦЄ/g, 'ĆE')
        .replace(/ЦЇ/g, 'ĆI') // n/e
        .replace(/ЦЮ/g, 'ĆU')
        .replace(/ЦЬ/g, 'Ć')

        .replace(/а/g, 'a')
        .replace(/б/g, 'b')
        .replace(/в/g, 'v')
        .replace(/г/g, 'g')
        .replace(/ґ/g, 'ğ')
        .replace(/д/g, 'd')
        .replace(/е/g, 'e')
        // .replace(/(^|\s)є/g, '$1ye')
        .replace(/є/g, 'je')
        .replace(/ж/g, 'ž')
        .replace(/з/g, 'z')
        .replace(/ий/g, 'ý')
        .replace(/ия/g, 'ýa')
        .replace(/иє/g, 'ýe')
        .replace(/иї/g, 'ýi')
        .replace(/ию/g, 'ýu')
        .replace(/и/g, 'y')
        .replace(/і/g, 'i')
        // .replace(/(^|\s)ї/g, '$1yi')
        .replace(/ї/g, 'ji')
        // .replace(/(^|\s)й/g, '$1y')
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
        .replace(/ь/g, 'Ĵ◄')
        // .replace(/(^|\s)ю/g, '$1yu')
        .replace(/ю/g, 'ju')
        // .replace(/(^|\s)я/g, '$1ya')
        .replace(/я/g, 'ja')

        .replace(/А/g, 'A')
        .replace(/Б/g, 'B')
        .replace(/В/g, 'V')
        .replace(/Г/g, 'G')
        .replace(/Ґ/g, 'Ğ')
        .replace(/Д/g, 'D')
        .replace(/Е/g, 'E')
        // .replace(/(^|\s)Є/g, '$1Ye')
        .replace(/Є([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JE$1')
        .replace(/Є/g, 'Je')
        .replace(/Ж/g, 'Ž')
        .replace(/З/g, 'Z')
        .replace(/Ий/g, 'Ý')
        .replace(/И/g, 'Y')
        .replace(/І/g, 'I')
        // .replace(/(^|\s)Ї/g, '$1Yi')
        .replace(/Ї([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JI$1')
        .replace(/Ї/g, 'Ji')
        // .replace(/(^|\s)Й/g, '$1Y')
        .replace(/Й/g, 'J')
        .replace(/К/g, 'K')
        // .replace(/Ль/g, 'Ľ')
        .replace(/Л/g, 'L')
        .replace(/М/g, 'M')
        // .replace(/Нь/g, 'Ń')
        .replace(/Н/g, 'N')
        .replace(/О/g, 'O')
        .replace(/П/g, 'P')
        // .replace(/Рь/g, 'Ŕ')
        .replace(/Р/g, 'R')
        // .replace(/Сь/g, 'Ś')
        .replace(/С/g, 'S')
        // .replace(/Ть/g, 'Ť')
        .replace(/Т/g, 'T')
        .replace(/У/g, 'U')
        .replace(/Ф/g, 'F')
        .replace(/Х/g, 'H')
        // .replace(/Ць/g, 'Ć')
        .replace(/Ц/g, 'С')
        .replace(/Ч/g, 'Č')
        .replace(/Ш/g, 'Š')
        .replace(/Щ([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'ŠČ$1')
        .replace(/Щ/g, 'Šč')
        .replace(/Ь/g, 'ĴĴ◄')
        // .replace(/(^|\s)Ю/g, '$1Yu')
        .replace(/Ю([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JU$1')
        // .replace(/Ю([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»(?:^|\\s)])/g, 'JU$1')
        // .replace(/Ю([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ])|([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ])Ю/g, '$1JU$2')
        // .replace(/Ю([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ])|([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ])Ю/g, function($1, $2, $3) {
        //     console.log({$1});
        //     console.log({$2});
        //     console.log({$3});
        //     if($2 == 'https://') {
        //         return "2" + $3
        //     } else {
        //         return "1" + $3
        //     }
        // })
        .replace(/Ю/g, 'Ju')
        // .replace(/(^|\s)Я/g, '$1Ya')
        .replace(/Я([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JA$1')
        .replace(/Я/g, 'Ja')
        .replace(/'/g, '')
        .replace(/’/g, '');
}

function latToUkr(text) {
    // text = text || '';

    return text
        // .replace(/a/g, 'a◄')
        .replace(/ďa/g, 'дя')
        .replace(/ďe/g, 'дє')
        .replace(/ďi/g, 'дї') // n/e
        .replace(/ďu/g, 'дю')
        .replace(/ď/g, 'дь')
        .replace(/źa/g, 'зя')
        .replace(/źe/g, 'зє')
        .replace(/źi/g, 'зї') // n/e
        .replace(/źu/g, 'зю')
        .replace(/ź/g, 'зь')
        .replace(/ľa/g, 'ля')
        .replace(/ľe/g, 'лє')
        .replace(/ľi/g, 'лї') // n/e
        .replace(/ľu/g, 'лю')
        .replace(/ľ/g, 'ль')
        .replace(/ńa/g, 'ня')
        .replace(/ńe/g, 'нє')
        .replace(/ńi/g, 'нї') // n/e
        .replace(/ńu/g, 'ню')
        .replace(/ń/g, 'нь')
        .replace(/ŕa/g, 'ря')
        .replace(/ŕe/g, 'рє')
        .replace(/ŕi/g, 'рї') // n/e
        .replace(/ŕu/g, 'рю')
        .replace(/ŕ/g, 'рь')
        .replace(/śa/g, 'ся')
        .replace(/śe/g, 'сє')
        .replace(/śi/g, 'сї') // n/e
        .replace(/śu/g, 'сю')
        .replace(/ś/g, 'сь')
        .replace(/ťa/g, 'тя')
        .replace(/ťe/g, 'тє')
        .replace(/ťi/g, 'тї') // n/e
        .replace(/ťu/g, 'тю')
        .replace(/ť/g, 'ть')
        .replace(/ća/g, 'ця')
        .replace(/će/g, 'цє')
        .replace(/ći/g, 'цї') // n/e
        .replace(/ću/g, 'цю')
        .replace(/ć/g, 'ць')

        .replace(/Ďa/g, 'Дя')
        .replace(/Ďe/g, 'Дє')
        .replace(/Ďi/g, 'Дї') // n/e
        .replace(/Ďu/g, 'Дю')
        .replace(/Ď/g, 'Дь')
        .replace(/Źa/g, 'Зя')
        .replace(/Źe/g, 'Зє')
        .replace(/Źi/g, 'Зї') // n/e
        .replace(/Źu/g, 'Зю')
        .replace(/Ź/g, 'Зь')
        .replace(/Ľa/g, 'Ля')
        .replace(/Ľe/g, 'Лє')
        .replace(/Ľi/g, 'Лї') // n/e
        .replace(/Ľu/g, 'Лю')
        .replace(/Ľ/g, 'Ль')
        .replace(/Ńa/g, 'Ня')
        .replace(/Ńe/g, 'Нє')
        .replace(/Ńi/g, 'Нї') // n/e
        .replace(/Ńu/g, 'Ню')
        .replace(/Ń/g, 'Нь')
        .replace(/Ŕa/g, 'Ря')
        .replace(/Ŕe/g, 'Рє')
        .replace(/Ŕi/g, 'Рї') // n/e
        .replace(/Ŕu/g, 'Рю')
        .replace(/Ŕ/g, 'Рь')
        .replace(/Śa/g, 'Ся')
        .replace(/Śe/g, 'Сє')
        .replace(/Śi/g, 'Сї') // n/e
        .replace(/Śu/g, 'Сю')
        .replace(/Ś/g, 'Сь')
        .replace(/Ťa/g, 'Тя')
        .replace(/Ťe/g, 'Тє')
        .replace(/Ťi/g, 'Тї') // n/e
        .replace(/Ťu/g, 'Тю')
        .replace(/Ť/g, 'Ть')
        .replace(/Ća/g, 'Ця')
        .replace(/Će/g, 'Цє')
        .replace(/Ći/g, 'Цї') // n/e
        .replace(/Ću/g, 'Цю')
        .replace(/Ć/g, 'Ць')

        .replace(/ДЯ/g, 'ĎA') // TODOTODOTODO
        .replace(/ДЄ/g, 'ĎE')
        .replace(/ДЇ/g, 'ĎI') // n/e
        .replace(/ДЮ/g, 'ĎU')
        .replace(/ДЬ/g, 'Ď')
        .replace(/ЗЯ/g, 'ŹA')
        .replace(/ЗЄ/g, 'ŹE')
        .replace(/ЗЇ/g, 'ŹI') // n/e
        .replace(/ЗЮ/g, 'ŹU')
        .replace(/ЗЬ/g, 'Ź')
        .replace(/ЛЯ/g, 'ĽA')
        .replace(/ЛЄ/g, 'ĽE')
        .replace(/ЛЇ/g, 'ĽI') // n/e
        .replace(/ЛЮ/g, 'ĽU')
        .replace(/ЛЬ/g, 'Ľ')
        .replace(/НЯ/g, 'ŃA')
        .replace(/НЄ/g, 'ŃE')
        .replace(/НЇ/g, 'ŃI') // n/e
        .replace(/НЮ/g, 'ŃU')
        .replace(/НЬ/g, 'Ń')
        .replace(/РЯ/g, 'ŔA')
        .replace(/РЄ/g, 'ŔE')
        .replace(/РЇ/g, 'ŔI') // n/e
        .replace(/РЮ/g, 'ŔU')
        .replace(/РЬ/g, 'Ŕ')
        .replace(/СЯ/g, 'ŚA')
        .replace(/СЄ/g, 'ŚE')
        .replace(/СЇ/g, 'ŚI') // n/e
        .replace(/СЮ/g, 'ŚU')
        .replace(/СЬ/g, 'Ś')
        .replace(/ТЯ/g, 'ŤA')
        .replace(/ТЄ/g, 'ŤE')
        .replace(/ТЇ/g, 'ŤI') // n/e
        .replace(/ТЮ/g, 'ŤU')
        .replace(/ТЬ/g, 'Ť')
        .replace(/ЦЯ/g, 'ĆA')
        .replace(/ЦЄ/g, 'ĆE')
        .replace(/ЦЇ/g, 'ĆI') // n/e
        .replace(/ЦЮ/g, 'ĆU')
        .replace(/ЦЬ/g, 'Ć')

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
        .replace(/ий/g, 'ý')
        .replace(/ия/g, 'ýa')
        .replace(/иє/g, 'ýe')
        .replace(/иї/g, 'ýi')
        .replace(/ию/g, 'ýu')
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
        .replace(/ь/g, 'Ĵ◄')
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
        .replace(/Ц/g, 'С')
        .replace(/Ч/g, 'Č')
        .replace(/Ш/g, 'Š')
        .replace(/Щ([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'ŠČ$1')
        .replace(/Щ/g, 'Šč')
        .replace(/Ь/g, 'ĴĴ◄')
        .replace(/Ю([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JU$1')
        .replace(/Ю/g, 'Ju')
        .replace(/Я([A-ZĞŽÝĽŃŔŚŤĆČŠА-ЯҐЄІЇ\"»,:;)\?!\-\.\s\r])/g, 'JA$1')
        .replace(/Я/g, 'Ja')
        .replace(/'/g, '')
        .replace(/’/g, '');
}