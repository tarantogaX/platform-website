export type SectionProps = {
    title: string;
    lessons: Array<LessonProps>;
}

export type LessonProps = {
    title: string;
    id: string;
}

export const sections: Array<SectionProps> = [
    {
        title: "Podstawy programowania",
        lessons: [
            {title: "Złożoność obliczeniowa", id: "http://www.deltami.edu.pl/temat/informatyka/algorytmy/2016/06/22/O_co_chodzi_w_zlozonosci_czasowej/"},
            {title: "Sumy prefiksowe", id: "pod_pre"},
            {title: "Zliczanie kubełkowe", id: "pod_kub"},
            {title: "Wyszukiwanie binarne", id: "pod_bin"},
            {title: "Skalowanie", id: "pod_ska"},
            {title: "Metoda gąsienicy", id: "pod_gas"},
            {title: "Arytmetyka modularna i szybkie potęgowanie", id: "pod_mod"},
            {title: "Standard template library", id: "pod_stl"}
        ]
    },
    {
        title: "Projektowanie algorytmów",
        lessons: [
            {title: "Algorytmy zachłanne", id: "yyyyy"},
            {title: "Wstęp do programowania dynamicznego", id: "yyyyy"},
            {title: "Dziel i zwyciężaj", id: "yyyyy"}
        ]
    },
    {
        title: "Programowanie dynamiczne",
        lessons: [
            {title: "Problem plecakowy", id: "dyn_ple"},
            {title: "Dynamiki kombinatoryczne", id: "yyyyy"},
            {title: "Dynamiki optymalizacyjne", id: "yyyyy"},
            {title: "Dynamiki wykładnicze", id: "yyyyy"},
            {title: "Potęgowanie dynamików", id: "yyyyy"}
        ]
    },
    {
        title: "Algorytmy tekstowe",
        lessons: [
            {title: "Wprowadzenie", id: "yyyyy"},
            {title: "Haszowanie", id: "yyyyy"},
            {title: "Liniowe algorytmy tekstowe", id: "yyyyy"},
            {title: "Drzewo trie", id: "yyyyy"},
            {title: "Porównywanie tekstów z aktualizacjami", id: "yyyyy"},
            {title: "Algorytm Karpa-Millera-Rozenberga", id: "yyyyy"},
            {title: "Tablica sufiksowa", id: "yyyyy"}
        ]
    },
    {
        title: "Struktury danych",
        lessons: [
            {title: "Kolejka monotoniczna", id: "yyyyy"},
            {title: "Find and union", id: "yyyyy"},
            {title: "Drzewo przedziałowe", id: "yyyyy"},
            {title: "Pierwiastki", id: "yyyyy"},
            {title: "Drzewo potęgowe", id: "yyyyy"}
        ]
    },
    {
        title: "Algorytmy grafowe",
        lessons: [
            {title: "Co to jest graf?", id: "yyyyy"},
            {title: "Drzewa - podstawy", id: "yyyyy"},
            {title: "Najgłębszy wspólny przodek", id: "yyyyy"},
            {title: "Najkrótsze ścieżki", id: "yyyyy"},
            {title: "Aktualizacje na poddrzewach", id: "yyyyy"},
            {title: "Rozbicie przez centroid", id: "yyyyy"},
            {title: "Drzewa rozpinające", id: "yyyyy"},
            {title: "Grafy skierowane", id: "yyyyy"},
            {title: "Grafy dwudzielne", id: "yyyyy"},
            {title: "Meduzy", id: "yyyyy"},
            {title: "Dwuspójne składowe", id: "yyyyy"},
            {title: "Grafy planarne", id: "yyyyy"},
            {title: "Problemy NP-trudne", id: "yyyyy"},
            {title: "Przepływy", id: "yyyyy"},
            {title: "Max flow - min cut", id: "yyyyy"}
        ]
    },
    {
        title: "Teoria liczb",
        lessons: [
            {title: "Wstęp do Teorii liczb", id: "yyyyy"},
            {title: "Arytmetyka modulo 1", id: "yyyyy"},
            {title: "Arytmetyka modulo 2", id: "yyyyy"},
            {title: "Bardzo duże liczby", id: "yyyyy"}
        ]
    },
    {
        title: "Teoria gier",
        lessons: [
            {title: "Wstęp do Teorii gier", id: "yyyyy"},
            {title: "Twierdzenie Sprague-Grundy'ego", id: "yyyyy"}
        ]
    },
    {
        title: "Geometria",
        lessons: [
            {title: "Podstawy geometrii", id: "yyyyy"},
            {title: "Wielokąty", id: "yyyyy"},
            {title: "Zamiatanie", id: "yyyyy"},
            {title: "Sortowanie kątowe", id: "yyyyy"},
            {title: "Otoczka wypukła", id: "yyyyy"}
        ]
    }
]