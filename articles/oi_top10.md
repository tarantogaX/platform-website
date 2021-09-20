---
title: 'TOP 10 – co trzeba znać na II etap XXVIII Olimpiady Informatycznej?'
content: "
## Wstęp

Zgodnie z ogłoszeniem organizatorów II etap olimpiady odbędzie się w tym roku 16-18 lutego. Zawody odbędą się zdalnie, a do finałowego etapu zakwalifikuje się około 1 na 3~5 uczestników. Zauważyliśmy, że na przestrzeni poprzednich edycji olimpiady pewne tematy i “triki” powtarzają się o wiele częściej niż inne. Warto je znać i zagwarantować sobie wstęp na wymarzoną uczelnię, a może nawet wyjazd na międzynarodówkę.


Poniżej przedstawiamy te rzeczy i co trzeba o nich wiedzieć. Zachęcamy, żeby nauczyć się/powtórzyć poniższe tematy przed II etapem Olimpiady. Jeżeli nie masz dużo czasu, nie musisz zaimplementować wszystkich zadań, ale gorąco zachęcamy, żeby co najmniej spróbować wymyślić rozwiązania.



## 1 Drzewa przedziałowe

Drzewa przedziałowe to struktura danych, umożliwiająca wykonywanie operacji i odpowiadanie na zapytania o przedziały na ciągu liczb w czasie logarytmicznym od długości ciągu. Dzięki drzewom przedziałowym możemy liczyć sumy, maksima lub wartości innych funkcji na przedziałach w czasie O (log N). Warto znać wszystkie typy, w tym punkt-przedział, przedział-punkt, przedział-przedział.

### Co trzeba wiedzieć?

- Najbardziej popularne operacje to zmień wartość w punkcie/ oblicz wynik na przedziale (suma / maximum),

- W powyższym wypadku można wykonywać również “nietrywialne obliczenia” na przedziale. Jeżeli umiemy utrzymać odpowiednie informacje o przedziale i je łączyć możemy symulować wyniki prostych pętli for lub podejścia zachłanne na dowolnym przedziale w czasie logarytmicznym. (np. na ciągu bitowym operacja zmiany bitu, zapytanie o najdłuższy spójny przedział zapalonych bitów),

- Przydaje się przyłożyć do treningu implementacji, żeby być w stanie je zaimplementować w 15 minut na zawodach. Jest kilka typów często powtarzających się bugów, więc dodatkowo dobrze jest pamiętać przed zawodami, co może pójść nie tak żeby szybciej je znaleźć.

### Zadanka

- [Logistyka (XXII OI, II etap)](https://szkopul.edu.pl/problemset/problem/ShrCwRqlzMKLBb269GkVbWg_/site/?key=statement)

- [Karty (XXI OI, II etap)](https://szkopul.edu.pl/problemset/problem/EHW4BOJee7VD-R9MaDAokZ6O/site/?key=statement)

- [Przekaźniki telekomunikacyjne (XXV OI, II etap)](https://szkopul.edu.pl/problemset/problem/GmAagCBetbskP0qiKlgVd-6A/site/?key=statement)

- [Oceny (XXIV OI, III etap)](https://szkopul.edu.pl/problemset/problem/0KG8REkSLNnY5sVkm7Aei_R7/site/?key=statement)





## 2 Gąsienica i Gąsienica ze Stosem (kolejka monotoniczna)

Metodę gąsienicy należy stosować na jednowymiarowej tablicy, w której poszukujemy najdłuższego spójnego przedziału o pewnej własności lub rozważamy wszystkie przedziały o zadanej długości. Jeżeli umiemy sprowadzić oryginalny problem do “Znajdź najdłuższy spójny przedział, dla którego wartość pewnej nie malejącej funkcji nie przekracza zadanej stałej” należy spróbować rozwiązać je gąsienicą. Przykładem takiego zadania jest “Znajdź najdłuższy spójny przedział, dla którego suma wszystkich elementów jest mniejsza od zadanej stałej C”.


Zwróć uwagę, że metoda gąsienicy nie zadziała, jeżeli liczby w ciągu mogą być ujemne. (wtedy funkcja sumy może maleć). W takim wypadku można zastosować metodę gąsienicy aby obliczyć wartość funkcji dla wszystkich przedziałach o zadanej długości. W przypadku sumy zadanie to można wykonać prościej za pomocą sum prefiksowych. Natomiast 
jeżeli funkcją jest na przykład mediana zbioru liczb, problem staje się trudniejszy i można go rozwiązać za pomocą gąsienicy wspomaganej strukturą set z C++ (Jak?). Jeżeli nasze zadanie dodatkowo wymaga szybkiego znajdowania minimów lub maksimów na rozważanym przedziale należy dodatkowo użyć posortowanego stosu.

### Co trzeba wiedzieć?

- Jak zaimplementować gąsienice i gąsienice ze stosem w czasie liniowym,

- Metodę gąsienicy możemy stosować do znajdowania najdłuższego przedziału o żądanej własności tylko jeżeli funkcja jest monotoniczna,

- Metodę gąsienicy możemy również stosować do rozważenia wszystkich przedziałów o zadanej długości. W tym wypadku nie jest wymagane, aby funkcja była monotoniczna,

- Jak wyznaczać minima i maksima na przedziale gąsienicy w zamortyzowanej złożoności czasowej O(1) przy pomocy posortowanego stosu.

### Zadanka

- [Wilcze doły (XIX OI, II etap)](https://szkopul.edu.pl/problemset/problem/07Q0fFk7fU2TmGr6wpPeDCZj/site/?key=statement)

- [Ptaszek (XXI OI, II etap)](https://szkopul.edu.pl/problemset/problem/A3QYXKEiRLgKerciOwA_lbCD/site/?key=statement)

- [Piloci (XVII OI, III etap)](https://szkopul.edu.pl/problemset/problem/4ZH1h7Wr18Yb7B0L7ym_Km0L/site/?key=statement)


## 3 Silnie Spójne Składowe (SSS) + Sortowanie Topologiczne

Silnie spójna składowa to taki zbiór wierzchołków grafu skierowanego, że z dowolnego jej wierzchołka możemy się dostać do dowolnego innego. Natomiast sortowanie topologiczne to sposób uporządkowania wierzchołków w grafie skierowanym bez cykli, w taki ciąg, aby wszystkie krawędzie były skierowane na prawo.


Często w zadaniach algorytmicznych, gdzie występują grafy skierowane, przydaje się najpierw podzielić je na SSS (jeżeli nie są acykliczne), a następnie posortować je topologicznie. Na tak posortowanym grafie można stosować programowanie dynamiczne, algorytmy zachłanne a nawet drzewa przedziałowe. Również, na tak posortowanym grafie czasem łatwiej jest dostrzec pewne kluczowe zależności.

### Co trzeba wiedzieć?

- Przekształcanie grafu skierowanego na graf silnie spójnych składowych,

- Sortowanie topologiczne grafu,

- Podstawowe własności: odwrócenie skierowania krawędzi nie psuje sortowania, graf silnie spójnych zawsze jest dagiem.

### Zadanka

- [Pustynia (XIX OI II etap)](https://szkopul.edu.pl/problemset/problem/_PLjXEFyR0XMBQ-kZ1k_GgHE/site/?key=statement)

- [Rajd (XXI OI, II etap)](https://szkopul.edu.pl/problemset/problem/orur2kPvWQR0LzMXXoP6pCat/site/?key=statement)

- [Drogi zmiennokierunkowe (XXIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/9TaxfuNdAv2FPpQ6PeB-vlti/site/?key=statement)

- [Osiedla (XXVI OI, II etap)](https://szkopul.edu.pl/problemset/problem/nldsb4EW1YuZykBlf4lcZL1Y/site/?key=statement)

## 4 Programowanie Dynamiczne na Drzewie

Ukorzenione drzewa to struktura danych bardzo “przyjazna” dla rekurencji. Często przydatne jest przeiterowanie się po drzewie DFSem, licząc interesujący nas wynik dla każdego wierzchołka na podstawie wyników dla jego synów. W tym temacie warto powtórzyć najbardziej klasyczne problemy jak: obliczenie wielkości i głębokości wszystkich poddrzew, znalezienie najdłuższej ścieżki w całym drzewie i każdym poddrzewie, zliczanie sumy długości wszystkich ścieżek. Binsearch po wyniku może być tutaj często przydatny.

### Co trzeba wiedzieć?

- Znajdować zależności między wynikiem dla wierzchołka oraz wynikami dla jego synów. Analogicznie, czasem interesuje nas wynik dla poddrzewa wierzchołka w odniesieniu do wyników dla poddrzew jego synów,

- W niektórych przypadkach, żeby przyspieszyć takiego dynamika, możemy jako korzenia użyć centroidu - tzn. takiego jego wierzchołka, dla którego wielkości poddrzew synów są mniej więcej zbalansowane (tzn. żadne z nich nie jest większe, niż połowa drzewa). W każdym drzewie istnieją 1 lub 2 centroidy, które możemy znaleźć w czasie liniowym,

- Jeżeli potrzeba policzyć wynik dla wszystkich poddrzew drzewa nie ukorzenionego, należy najpierw je ukorzenić, najpierw obliczyć wyniki dla wszystkich poddrzew, następnie dla wszystkich krawędzi prowadzących “do korzenia”,

- Istnieją drzewa, w których wierzchołki mogą mieć “dużo” synów. Czasami obliczanie funkcji wyniku trzeba wspomóc odpowiednią strukturą danych.

### Zadanka

- [Dostawca pizzy (XXIV OI, III etap)](https://szkopul.edu.pl/problemset/problem/q_HBwDECevrQ2iQh1wT6ssx2/site/?key=statement)

- [Inspekcja (XVIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/bLHHUzy1-byoiJSbilgpI6Dc/site/?key=statement)

- [Łuk triumfalny (XX OI, II etap)](https://szkopul.edu.pl/problemset/problem/jgCcEjQu3kdpM4BmxA6GujfX/site/?key=statement)

- [Strajki (XXIV OI, II etap)](https://szkopul.edu.pl/problemset/problem/lR_LabSUC2n7EMmDHpw-wk_b/site/?key=statement&fbclid=IwAR1shhxyH6qShhUn5Gkj4XSnUXUomKvvoOmMd4nElL7vZp0J_Rfp0US6ld4)

## 5 Spostrzeżenie Zachłanne lub Leniwe

Często zadania wymagają od nas znalezienia najtańszego, najmniejszego, najszybszego rozwiązania. Jeżeli mamy takie zadanie warto zastanowić się czy taka optymalna strategia lub optymalny ciąg ma jakąś specjalną własność, lub da się ją zrealizować w prosty sposób. Często będziemy w stanie powiedzieć zdanie, które zaczyna się od “zawsze opłaca się nam / możemy ...”, “nigdy nie opłaca nam się/nie musimy ...”. Jeżeli szukamy podciągów lub ciągów, czasem też warto spojrzeć, kiedy taki optymalny ciąg można przedłużyć lub skrócić.


Tego typu spostrzeżenia można często zrealizować drzewem przedziałowym lub trzeba je wspomóc wyszukiwaniem binarnym. Jako że w tym przypadku trudno jest nauczyć się teorii, proponujemy skupić się na ćwiczeniu zadań.

### Zadanka

- [Tomik Poezji (XXV OI, II etap)](https://szkopul.edu.pl/problemset/problem/Hhip15j-8Ro2dOb_4oB98C-G/site/?key=statement)

- [Trzy wieże (XXII OI, II etap)](https://szkopul.edu.pl/problemset/problem/Grfouq9u3g_TYktFXO2sNjCU/site/?key=statement)

- [Superkomputer (XXI OI, II etap)](https://szkopul.edu.pl/problemset/problem/e9vyycMN_DMDnRVsNpTUcH5K/site/?key=statement)

- [Apteka (VI OIG, I etap)](https://szkopul.edu.pl/problemset/problem/mZDGm1hDFvHQwi1VEXmkuIZs/site/?key=statement)

- [Jutro (AMPPZ 2012)](https://szkopul.edu.pl/problemset/problem/EMB5uNAIW1GVi_U23U-pqurR/site/?key=statement)

## 6 Pierwiastki

Jeżeli $a \\cdot b = n$ dla pewnych liczb dodatnich $a, b, n$ to jedna z liczb $a, b$ jest równa co najwyżej $\\sqrt{n}$. Dzięki temu spostrzeżeniu możemy rozwiązać wiele zadań w złożoności czasowej $O(n \\sqrt{n})$ zamiast $O(n^2)$ lub $O(\\sqrt{n})$ zamiast $O(n).$ Stosowanie poniższych trików często nie prowadzi do rozwiązania wzorcowego, ale pozwala łatwo dobyć dużo punktów za trudne zadanie.

### Co trzeba wiedzieć?

- Jeżeli musimy rozważać skoki długości k, na ciągu długości n, to długość skoku lub maksymalna liczba skoków będzie zawsze 
mniejsza niż $\\sqrt{n}$. Dzięki temu możemy rozwiązać zadanie rozważając dwa różne algorytmy (osobny dla każdego przypadku),

- Jeżeli rozważamy rodzinę zbiorów o sumarycznym rozmiarze n, możemy użyć innego algorytmu dla “dużych” zbiorów, tórych jest mniej niż $\\sqrt{n}$ oraz dla „małych” zbiorów, z których każdy zawiera mniej niż $\\sqrt{n}$ elementów. Analogicznie jest, gdy rozważamy zbiór słów o sumarycznej długości co najwyżej $n,$

- Aby znaleźć wszystkie dzielniki $l$ iczby $n,$ wystarczy rozważyć tylko liczby mniejsze od $\\sqrt{n}$ (dlaczego?). Ten trik jest również przydatny w zadaniach z teorii liczb rozważających podzielność lub reszty z dzielenia,

- Podział ciągu długości $n,$ na $\\sqrt{n}$ przedziałów długości $\\sqrt{n}$ i wykonywanie na nich operacji w czasie liniowym od ich długości,

- Jeżeli umiemy stworzyć strukturę danych która znajduje wyniki dla zapytań, ale nie potrafimy jej aktualizować, możemy rozważać wszystkie aktualizacje ręcznie i budować strukturę danych od nowa co pierwiastek z liczby zapytań.

### Zadanka

- [Kontenery (XXIV OI, II etap)](https://szkopul.edu.pl/problemset/problem/oNnWY6ZuzzhvG-jCmijiXkIk/site/?key=statement)

- [Odwiedziny (XXII OI, III etap)](https://szkopul.edu.pl/problemset/problem/Mlar--JvS1gThazr04pNorHN/site/?key=statement)

- [Kolacje (XXVI OI, II etap)](https://szkopul.edu.pl/problemset/problem/CACYTyPO4YJxyZzNumr0zr5e/site/?key=statement)

- [Stumilowy sad (ONTAK 2015)](https://sio2.mimuw.edu.pl/c/wiekuisty_ontak2015/p/sad/)

## 7 Wyznaczanie i Operacje na Przedziałach 1D i 2D

Często zadanie wymaga od nas operacji na zbiorze przedziałów. Czasami są one podane na wejściu, a czasami trudność zadania polega na “interpretacji geometrycznej” warunków na wejściu. Cudzysłów został użyty, ponieważ fakt czy interpretacja w 1D może być nazywa geometryczną jest dyskusyjny. Niezależnie od notacji, jeżeli mamy do czynienia ze zbiorem przedziałów powinniśmy rozważyć sortowanie ich (na przykład od lewej do prawej) po ich początkach bądź końcach a następnie przeglądanie ich w tej kolejności. W zależności od zadania będziemy musieli dodatkowo zastosować drzewo przedziałowe lub strukturę set z C++, aby szybko wykonywać wymagane operacje. Takie podejście nazywa się “zamiatanie”. Warto rozważyć również sortowanie końcowych i początkowych punktów przedziałów razem. Dzięki temu możemy kontrolować wszystkie “otwarte” przedziały i otwierać nowe, kiedy pojawi się początek przedziału a zamykać je, gdy pojawi się koniec. (Przy tym odpowiednio aktualizując odpowiednią strukturę danych).

### Co trzeba wiedzieć?

- Jak operować na zbiorze przedziałów 1D i 2D za pomocą drzew przedziałowych i zamiatania,

- Szybkie operacje na zbiorze przedziałów za pomocą sortowania i struktury set w C++,

- Jeżeli musimy operować na zbiorze przedziałów 2D (prostokątów) warto rozważyć je najpierw jako przedziały 1D w osi X, a następnie w osi Y.

### Zadanka

- [Podział naszyjnika (XXII OI, II etap)](https://szkopul.edu.pl/problemset/problem/SbvfueoDtZe2DQFHrywTIakc/site/?key=statement)

- [Zamek (XXIV OI, II etap)](https://szkopul.edu.pl/problemset/problem/7Lmwi_qxvuplTPlhRuci1UBt/site/?key=statement)

- [Kurs szybkiego czytania (XXII OI, II etap)](https://szkopul.edu.pl/problemset/problem/vX48bEW0i5IRszoCOP_f78Dc/site/?key=statement)

- [Konduktor (XXV OI, II etap)](https://szkopul.edu.pl/problemset/problem/lbADmW7d353d0F0iw4kXTjsl/site/?key=statement)

## 8 BFS/DFS na Uważnie Skonstruowanym Grafie

Często zdarzają się na olimpiadzie zadania, które wymagają interpretacji pewnej sytuacji matematycznej jako grafu i zastosowanie na nim znanego algorytmu. W niedawnych edycjach olimpiady był to głównie DFS lub BFS a trudność zadania polegała na skonstruowaniu odpowiedniego grafu. Zdarzały się również inne warianty, jak znajdowanie minimalnych drzew rozpinających lub najkrótszych ścieżek, przy użyciu np. Dijkstry.

### Co trzeba wiedzieć?

- W przypadku takiego zadania łatwo jest dostać punkty budując graf metodą brutalną. Warto od tego zacząć nawet jeżeli mamy pomysł na rozwiązanie wzorcowe,

- Często znalezienie krawędzi grafu wymaga zastosowania struktury Set w C++, drzew przedziałowych lub umiejętnego sortowania,

- Nie trzeba generować wszystkich krawędzi od razu, często łatwiej jest je znajdować dla każdego wierzchołka dopiero kiedy są potrzebne. Uważaj na pamięć, pamiętaj, że wektory mogą zająć jej dużo.

### Zadanka

- [Drzewo czwórkowe (XXVII OI, II etap)](https://szkopul.edu.pl/problemset/problem/GcP-wwgKv1HiCzuFRKE6n7-U/site/?key=statement)

- [Morskie opowieści (XX OI, II etap)](https://szkopul.edu.pl/problemset/problem/CfSEK4ACOcAPaAfX29Fp7Tud/site/?key=statement)

- [Powódź (XXV OI, I etap)](https://szkopul.edu.pl/problemset/problem/xCiDtZ0ZX70fyac1Sav8d37J/site/?key=statement)

- [Żywopłot (XXIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/dABzva_j1-BvzKMsyxkuRoue/site/?key=statement)

## 9 Haszowanie

Haszowanie to prosty w implementacji algorytm heurystyczny, bardzo pomocny w rozwiązywaniu zadań na tekstach. Jego główna idea jest taka, żeby każdy string reprezentować za pomocą szczególnie obliczonej liczby, dzięki czemu możemy sprawdzać czy dwa stringi są takie same w czasie stałym i porównywać je leksykograficznie w czasie O (log n). Tę samą technikę można stosować również do innych obiektów matematycznych, na przykład w geometrii. Haszowanie nie zawsze prowadzi do optymalnego rozwiązania, natomiast często pozwala szybko zdobyć punkty, jeżeli nie mamy lepszego pomysłu na rozwiązanie.

### Co trzeba wiedzieć?

- Jak policzyć hasze dla zadanego słowa w czasie liniowym i porównywać dowolne podsłowa w czasie stałym,

- Hasze są algorytmem heurystycznym i należy pamiętać, że prawdopodobieństwo kolizji zależy od liczby porównań oraz rozmiaru modulo,

- Jeżeli sortujemy hasze i szukamy pary takich samych to należy liczyć kwadratową liczbę porównań. Aby zredukować prawdopodobieństwo kolizji można użyć dwóch funkcji haszujących lub zwiększyć modulo,

- Podstawowe operacje na haszach jak szukanie palindromów, prefikso-sufiksów, kwadratów itp.

### Zadanka

- [Korale (XVII OI, I etap)](https://szkopul.edu.pl/problemset/problem/6x4-Pmy-UoyrQpi19NsAz6Rn/site/?key=statement)

- [Okropny wiersz (XIX OI, II etap)](https://szkopul.edu.pl/problemset/problem/h9erYqBkPcC8KtSvLhMzhgjw/site/?key=statement)

- [Osie symetrii (XIV OI, I etap)](https://szkopul.edu.pl/problemset/problem/ERkPm5ZV8stQhX8u7-1D5_ES/site/?key=statement)

## 10 Testowanie i Pisanie Rozwiązań Brutalnych

To chyba najbardziej niedoceniane umiejętności przez zawodników, które są niezwykle ważne.


Jeżeli zaimplementujemy zadanie (nawet jeżeli było proste), należy je przetestować. Po pierwsze warto ułożyć na kartce kilka nietrywialnych testów i obejrzeć czy wszystkie policzone przez nasz program wartości są takie jakich się spodziewamy. Warto również przetestować kilka prostych testów maksymalnych rozmiarów. (na przykład: ciąg złożony ze wszystkich takich samych liczb, ciąg 1,2,3,4 ... N, graf, który jest ścieżką lub cyklem maksymalnej długości.) Najczęstszymi błędami są za małe tablice, nierozważenie przypadku brzegowego (np. kiedy wszystkie liczby są równe 0, lub graf jest pojedynczym wierzchołkiem) oraz zastosowanie w jednym miejscu zmiennej int zamiast long long.


Jeżeli mamy dużo czasu i chcemy go wykorzystać, żeby mieć pewność, że nasze rozwiązania otrzymują punkty, których się spodziewamy przydatne jest pisanie zaimplementowanie kilku prostych programów, które generują losowe dane do zadania. Następnie możemy skuteczniej przetestować nasze rozwiązanie porównując jego wyniki na wygenerowanych testach z prostszym do zaimplementowania rozwiązaniem.


Z drugiej strony prawie każde zadanie oferuje nam pulę łatwych do zdobycia punktów, na przykład za zaimplementowanie rozwiązania wykładniczego albo napisanie 2 pętli for sprawdzających wszystkie przypadki. Warto rozpocząć zawody od przeczytania wszystkich zadań a następnie zgarnięcia darmowych punktów. Nie jest to marnowanie czasu, ponieważ po pierwsze możemy nie mieć potem czasu złapać tych darmowych punktów, pisanie rozwiązania brutalnego pomaga nam dostrzec pewne zależności, których od razu nie widać oraz lepiej testować pod koniec zawodów. Pamiętaj, że zawodów II stopnia nie trzeba wygrywać, ale ich nie zepsuć.

### Co trzeba wiedzieć?

- Nie tracić przez nieuwagę punktów które nam się należą,

- “Podnieść z chodnika” punkty, które są nam oferowane za darmo,

- Nie kozaczyć, tylko zbierać punkty.


"
---
