

export enum BasicMessages {
    SOMETHING_WENT_WRONG = "Něco se nepovedlo",
    SAVED = "Uloženo",
    PHOTO_FAILED_TO_SAVE = "Fotku :name se nepodařilo uložit",
    PHOTO_INFO_FAILED_TO_SAVE = "Informace u fotky :caption se nepodařilo uložit",
    PHOTO_INVALID_FORMAT = "Nepodporovaný formát, podporujeme pouze fotky *.png a *jpg.",
    ARCHIVED = "Archivováno"
}


export const yupLocalization = {
    mixed: {
        defined: 'Položka je povinná',
        required: 'Položka je povinná',
        oneOf: 'Položka musí obsahovat jednu z následujících hodnot: ${values}',
        notOneOf: 'Položka nesmí obsahovat žádnou z následujících hodnot: ${values}'
    },
    string: {
        length: 'Položka musí obsahovat přesně ${length} znaků',
        min: 'Položka musí obsahovat minimálně ${min} znaků',
        max: 'Položka musí obsahovat maximálně ${max} znaků',
        matches: 'Položka musí splňovat pravidlo: "${regex}"',
        email: 'Položka musí být platná emailová adresa',
        url: 'Položka musí být platná URL adresa',
        trim: 'Položka nesmí obsahovat mezery',
        lowercase: 'Položka musí obsahovat jen malá písmena',
        uppercase: 'Položka musí obsahovat jen velká písmena'
    },
    number: {
        min: 'Položka musí být větší nebo rovno ${min}',
        max: 'Položka musí být menší nebo rovno ${max}',
        lessThan: 'Položka musí být menší než ${less}',
        moreThan: 'Položka musí být větší než ${more}',
        notEqual: 'Položka nesmí se rovnat "${notEqual}"',
        positive: 'Položka musí být kladné číslo',
        negative: 'Položka musí být záporné číslo',
        integer: 'Položka musí být celé číslo'
    },
    date: {
        min: 'Položka musí být po ${min}',
        max: 'Položka musí být před ${max}'
    },
    object: {
        noUnknown: '${path}-pole nesmí obsahovat nespecifikované klíče'
    },
    array: {
        min: '${path}-pole musí obsahovat alespoň ${min} položky',
        max: '${path}-pole musí obsahova maximálně ${max} položky'
    }
};

