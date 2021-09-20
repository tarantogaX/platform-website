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
            {title: "Algorytmy zachłanne", id: "pro_zac"},
            {title: "Wstęp do programowania dynamicznego", id: "pro_dyn"},
            {title: "Dziel i zwyciężaj", id: "pro_dzi"}
        ]
    },
    {
        title: "Programowanie dynamiczne",
        lessons: [
            {title: "Problem plecakowy", id: "dyn_ple"},
            {title: "Dynamiki kombinatoryczne", id: "dyn_kom"},
            {title: "Dynamiki optymalizacyjne", id: "dyn_opt"},
            {title: "Dynamiki wykładnicze", id: "dyn_wyk"},
            {title: "Potęgowanie dynamików", id: "dyn_pot"}
        ]
    },
    {
        title: "Algorytmy tekstowe",
        lessons: [
            {title: "Wprowadzenie", id: "tex_wpr"},
            {title: "Haszowanie", id: "tex_has"},
            {title: "Liniowe algorytmy tekstowe", id: "tex_lin"},
            {title: "Drzewo trie", id: "tex_tri"},
            {title: "Porównywanie tekstów z aktualizacjami", id: "tex_akt"},
            {title: "Algorytm Karpa-Millera-Rozenberga", id: "tex_kmr"},
            {title: "Tablica sufiksowa", id: "tex_suf"}
        ]
    },
    {
        title: "Struktury danych",
        lessons: [
            {title: "Kolejka monotoniczna", id: "dan_kol"},
            {title: "Find and union", id: "dan_fau"},
            {title: "Drzewo przedziałowe", id: "dan_prz"},
            {title: "Pierwiastki", id: "dan_sqr"},
            {title: "Drzewo potęgowe", id: "dan_pot"}
        ]
    },
    {
        title: "Algorytmy grafowe",
        lessons: [
            {title: "Co to jest graf?", id: "gra_wst"},
            {title: "Drzewa", id: "gra_drz"},
            {title: "Najgłębszy wspólny przodek", id: "gra_lca"},
            {title: "Najkrótsze ścieżki", id: "gra_dij"},
            {title: "Aktualizacje na poddrzewach", id: "gra_pod"},
            {title: "Rozbicie przez centroid", id: "gra_cen"},
            {title: "Drzewa rozpinające", id: "gra_roz"},
            {title: "Grafy skierowane", id: "gra_ski"},
            {title: "Grafy dwudzielne", id: "gra_dwu"},
            {title: "Meduzy", id: "gra_med"},
            {title: "Dwuspójne składowe", id: "gra_spo"},
            {title: "Grafy planarne", id: "gra_pla"},
            {title: "Problemy NP-trudne", id: "gra_npt"},
            {title: "Przepływy", id: "gra_prz"},
            {title: "Max flow - min cut", id: "gra_flo"}
        ]
    },
    {
        title: "Teoria liczb",
        lessons: [
            {title: "Wstęp do Teorii liczb", id: "num_wst"},
            {title: "Arytmetyka modulo", id: "num_mo1"},
            {title: "Arytmetyka modulo: generatory", id: "num_mo2"},
            {title: "Bardzo duże liczby", id: "num_big"}
        ]
    },
    {
        title: "Teoria gier",
        lessons: [
            {title: "Wstęp do Teorii gier", id: "gry_wst"},
            {title: "Twierdzenie Sprague-Grundy'ego", id: "gry_spr"}
        ]
    },
    {
        title: "Geometria",
        lessons: [
            {title: "Podstawy geometrii", id: "geo_pod"},
            {title: "Wielokąty", id: "geo_wie"},
            {title: "Zamiatanie", id: "geo_zam"},
            {title: "Sortowanie kątowe", id: "geo_sor"},
            {title: "Otoczka wypukła", id: "geo_oto"}
        ]
    }
]