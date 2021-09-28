---
title: 'Wprowadzenie do teorii gier'
content: "

## Podział gier

Teoria gier zajmuje się – któż by pomyślał – odpowiadaniem na pytania dotyczące różnego rodzaju gier. To nauka z pogranicza matematyki i nauk społecznych. Gracze podejmują bowiem decyzje według pewnych strategii. Wyróżniamy kilka różnych podziałów gier. Ich rozważenie pomoże nam dowiedzieć się, czym my, jako informatycy, będziemy się zajmować.

1. Podział ze względu na kolejność podejmowania decyzji

- Gry  w  postaci  strategicznej  (normalnej)  –  Gracze  podejmują  decyzję  niezależnie  od innych graczy.

- Gry w postaci ekstensywnej (rozwiniętej) – Gracze podejmują decyzję na zmianę.

2. Podział ze względu na posiadaną wiedzę

- Gry z kompletną informacją – Gracze podejmują decyzję wiedząc informację o wszystkich poczynaniach.

- Gry z niekompletną informacją – Gracze czasami podejmują decyzję ”w ciemno”. Taki jest np. poker.

3. Podział ze względu na liczbę graczy

- Gry jednoosobowe.

- Gry wieloosobowe.

4. I wiele, wiele innych...


Będziemy głównie zajmować się grami skończonymi, w których informacja jest kompletna. Rzadko również liczba graczy będzie większa niż dwa – utrudnia to analizę. W grach jednoosobowych zwykle pytani jesteśmy o to, czy grę da się wygrać lub jaki maksymalny wynik (minimalną karę) da się uzyskać. Z kolei w grach dwuosobowych zwykle chcemy powiedzieć, który z graczy jest w stanie pokonać drugiego (cokolwiek to znaczy). Jeśli gracz jest w stanie pokonać drugiego niezależnie od wykonywanych przez tamtego ruchów to powiemy, że ma strategię wygrywającą.


## Gra jako graf

W każdej grze mamy do czynienia ze stanami. No, może nie w każdej, ale grami typu tenis zajmować się nie będziemy. Stanem w grze, podobnie jak w programowaniu dynamicznym, nazywamy informacje potrzebne, by tę grę opisać. Przykładowo, stanem w ”kółko i krzyżyk” jest po prostu stan  planszy,  a  do  opisania  gry  w  karty  wystarczy  nam  informacja  nt.  tych  kart.  Nie  musi  być prawdą, że im bardziej skomplikowana gra, tym bardziej złożone stany.


Między tymi stanami występują połączenia. Gdy z jednego stanu możemy w jednym ruchu przejść do innego stanu, dodajemy zwykle krawędź (skierowaną) między tymi stanami.


### Pozycje przegrywające i wygrywające

Rozważmy prostą grę. Mamy dwóch graczy i dane ukorzenione drzewo. Na początku w korzeniu stoi pionek. Gracze wykonują kolejno ruchy przesuwając pionek w dół drzewa do jednego z synów wierzchołka. Kto nie może wykonać ruchu - przegrywa.


Aby  zbadać  tę  grę,  musimy  najpierw  zastanowić  się,  jakie  ma  własności.  Po  pierwsze,  gra  jest skończona i nigdy nie może paść remis - skoro drzewo jest skończone, a w każdym wierzchołku dokonujemy przechodzenia w dól, to z pewnością kiedyś nastąpi koniec i któryś z graczy przegra. Wiemy stąd, że gra się skończy – a ponadto nie skończy się remisem.


<b>Pozycją wygrywającą</b> nazwiemy pozycję, w której gracz jest w stanie zagwarantować sobie zwycięstwo nad drugim graczem. <b>Pozycja przegrywająca</b> to taka, w której niezależnie od ruchów, jakie  wykonamy,  nasz  przeciwnik  będzie  w  stanie  zmusić  nas  do  porażki.  Pozycje  wygrywające będziemy oznaczać jako $1,$ a przegrywające – jako $0.$


Zauważmy, że pionek w liściu drzewa jest zawsze pozycją przegrywającą, ponieważ nie możemy wykonać żadnego ruchu. Powiedzmy, że istnieje taki syn wierzchołka, że jego pozycja jest przegrywająca. Wobec tego, jeśli przesuniemy pionek do tego syna, nasz przeciwnik znajdzie się w sytuacji przegrywającej. Nic więcej nam nie trzeba – wiemy, że uda nam się go zmusić do przegrania. Z drugiej strony, jeśli taki syn nie istnieje, to mamy problem. Niezależnie od tego, jaki ruch wykonamy, znajdziemy się w pozycji wygrywającej. To oznacza, że nasz przeciwnik będzie w stanie wygrać. Ups.


```cpp=

void calc (int x) {

 \ \ \ \ bool winning = 0;

 \ \ \ \ for (int i = 0; i < sons[x].size(); i ++) {

 \ \ \ \  \ \ \ \ dfs(sons[x][i]);

 \ \ \ \  \ \ \ \ if (win[sons[x][i]] == false)

 \ \ \ \  \ \ \ \  \ \ \ \ winning = 1;

 \ \ \ \ }

 \ \ \ \ win[x] = winning;

}

```


Nietrudno zauważyć, że wykonaliśmy bardzo proste programowanie dynamiczne na drzewie, które  pozwoliło  nam  policzyć  wynik  w $O(n).$  Zauważmy,  że  umiemy  przy  okazji  wskazać  strategię wygrywającą, jeżeli istnieje. Wystarczy przesuwać się do syna oznaczonego zerem.


## Niezmienniki

Zarówno w grze jednoosobowej, jak i dwuosobowej przydaje się znajomość niezmienników. <b>Niezmiennikiem</b> nazywamy własność, która podczas gry nie ulega zmianie. Rozważmy taką grę.


### Zadanie - gra w kule

Jaś i Małgosia na zmianę wykonują ruchy w pewnej grze. W urnie jest $n$ kul białych i $n$ czarnych. Gracz w każdym ruchu wyciąga dwie kule, a następnie musi dołożyć jedną. Jeśli były identyczne, to gracz musi dołożyć białą kulę, w przeciwnym wypadku musi dołożyć czarną kulę. Jaś wygra, jeśli ostatnia kula pozostała w pudełku będzie biała, Małgosia – jeśli będzie czarna. Które z dzieci ma strategię wygrywającą?


### Rozwiązanie

Pierwsza rzecz – gra zawsze się zakończy, ponieważ po każdym kroku liczba kul zmniejsza się o 1. Co więcej, będzie $2 ⋅ n − 1$ tur, ale to nie jest istotne. Istotne jest uproszczenie definicji ruchów. Zauważmy, że tak naprawdę mamy dwa różne dostępne ruchy.

- Zabranie jednej białej kuli

- Zabranie dwóch czarnych kul i dołożenie jednej białej kuli


Wniosek:  Parzystość  liczby  czarnych  kul  nigdy  się  nie  zmienia.  Końcowa  sytuacja  to  zero  lub  jedna czarna kula. Wiemy więc, że nie tylko czasem da się wygrać – ale jeśli da się wygrać, to nie da się w ogóle przegrać. Gra jest o tyle nieciekawa, że niezależnie od tego, jakie ruchy wykonują gracze, i  tak jeśli $n$ jest  parzyste  wygra  Jaś,  a  w  przeciwnym  wypadku  Małgosia.  Taką  grę  nazywamy zdeterminowaną.


## Symetria

Czasem do wskazania, że któryś z graczy ma strategię wygrywającą, wystarczy użyć symetrii. Być może jesteśmy w stanie zawsze wykonywać ruchy symetryczne do przeciwnika – względem środka planszy, boku lub innego obiektu. W takim wypadku drugi gracz ma strategię wygrywającą, gdyż zawsze może kontrować przeciwnika. Możliwe, że umiemy doprowadzić do sytuacji, gdzie to my będziemy mogli kontrować przeciwnika. Dobrze pokazuje to zadanie Vasya and Game z propozycji zadań. Spróbuj je rozwiązać!


## Strategy stealing - kradzież strategii

Tym razem rozważymy jedno z najtrudniejszych zadań z Mistrzostw Wielkopolski w Programowaniu Zespołowym 2016. Mamy tam pokonać program, który gra w pewną symetryczną grę (zbiór ruchów  nasz  i  programu  jest  taki  sam).  Z  zasad  gry  wynika  również,  że  nigdy  nie  może  zakończyć się remisem, jest skończona i że mamy do dyspozycji pominięcie ruchu, czyli oddanie planszy przeciwnikowi.


Rozwiązanie wzorcowe polega na zaimplementowaniu strategii komputera. Pomysł jest taki: Zagrajmy dokładnie tak samo, jakby komputer grał sam ze sobą. Zasymulujmy tę grę. Jeśli okazało się, że przegraliśmy, wykonajmy jedno pominięcie na początku i pozwólmy komputerowi przegrać tą samą strategią.


Ta  technika  nazywana  jest strategy  stealing - kradnięcie strategii (ang.).  Jest  ona  przydatna w  wykonywaniu  dowodów,  że  pierwszy  gracz  ma  strategię  wygrywającą.  Jeśli  dodatkowy  ruch nie  może  nam  pogorszyć  sytuacji  (lub  możemy  go  pominąć  jak  w  powyższym  przypadku),  to wchodzimy  chwilowo  w  buty  drugiego  gracza  i  pozwalamy  mu  zacząć.  Gdyby  drugi  gracz  miał strategię wygrywającą, to równie dobrze mógł by zastosować ją gracz pierwszy.


Więcj o strategy stealing możesz przeczytać w [Delcie.](http://www.deltami.edu.pl/temat/matematyka/gry_zagadki_paradoksy/2017/04/27/Zlodziej_strategii/)


## Przeszukiwanie z nawrotami i znajdowanie wzorów

Czasem gra jest zbyt skomplikowana lub trudno wpaść na jej szukane własności. Warto się wówczas posłużyć przeszukiwaniem z nawrotami. Więcej o tej technice przeczytasz w artykule o problemach NP-trudnych, na końcu teorii grafów. Takie przeszukiwanie nie zawsze zmieści się w limicie czasu, ale  może  nam  pomóc  w  inny  sposób.  Napisanie  rozwiązania  brutalnego  pozwala  nam  przeanalizować wyniki – a nuż można z nich wywnioskować coś ciekawego? Spójrz na zadanie Game of stones z zaproponowanych zadań.


## Zadania

- [Wcale nie Nim (XXIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/M5CruI5eCu8elnNFHuiXBrvV/site/?key=statement)

- [Gra Ulama (V OI, III etap)](https://szkopul.edu.pl/problemset/problem/si6uepnYG6tvH4BK2MHrgvbe/site/?key=statement)

- [Game of Stones (Codeforces, Div. 1 + Div. 2 E)](https://codeforces.com/problemset/problem/768/E)

"
---
