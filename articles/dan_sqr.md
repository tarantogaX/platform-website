---
title: 'Pierwiatki'
content: "
### Wstęp: 
Często  nie  mamy  pomysłu,  w  jaki  sposób  użyć  struktur  danych,  by  rozwiązać  zadanie  szybciej niż $O(n^2)$. W takim wypadku pomocne mogą okazać się tzw. algorytmy pierwiastkowe. Pewien człowiek z komitetu Olimpiady powiedział o niech kiedyś: Pierwiastków na OI nigdy nie będzie, ponieważ na to nie da się wpaść - to jest trik, o którym musisz przeczytać w internecie. Tak więc - właśnie o nich czytasz :). 

Jest  kilka  różnych  technik  korzystania  z  pierwiastków.  W  tym  artykule  dowiesz  się,  jak  pisać
efektywne algorytmy z ich użyciem.

### Dzielenie na przedziały po pierwiastek 

Ta technika będzie w pewnym sensie podobna do drzewa przedziałowego, tylko prostsza. Wyobraźmy sobie, że mamy ciąg, na którym będziemy chcieli wykonywać operacje:

- Problem wydawania reszty
- Ciągły problem plecakowy

Ten problem powinien być Ci już znany. Możemy go bowiem rozwiązać drzewem przedziałowym. Jeśli  nie  pamiętasz  rozwiązania,  zachęcam  do  przeczytania  artykułu  o  drzewie  przedziałowym (punkt  -  przedział).  Tym  razem,  zamiast  pamiętać  drzewo  przedziałowe,  podzielimy  sobie  nasz ciąg na $O (\sqrt{n})$ bloków, a dla każdego zapamiętamy sumę liczb, które do niego należą.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_39faa1d43c61fb0ed836e27f6ddfc27f.png)


Co  musimy  zrobić,  gdy  chcemy  dodać?  Dwie  rzeczy:  zaktualizować  liczbę  w  naszym  ciągu  oraz zaktualizować sumę liczb w bloku. Proste, prawda? Nieco trudniej będzie z zapytaniami. W rozwiązaniu  brutalnym  przejrzelibyśmy  wszystkie  elementy  z  przedziału $<x;y>$ zwykłym  forem.
Zauważmy jednak, że jeśli mielibyśmy przejść forem cały blok, to równie dobrze możemy od razu zapytać o sumę wszystkich liczb, które się w nim znajdują. To znacznie przyspieszy nasze rozwiązanie.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_03a58946bf2e3ba62e76dd82afcd4a05.png)


Jak szybko to działa? Nietrudno zauważyć, że dodawanie wartości działa w $O(1)$, ponieważ zmieniamy tylko dwie wartości w tablicy. Nieco gorzej poszło nam z zapytaniami. Zarówno na początku, jak i na końcu przedziału z zapytania być może przejrzymy trochę liczb forem, jednak nie więcej
niż zawierają łącznie dwa bloki. W środku będziemy tylko przeglądać całe bloki. Wobec tego, jeśli całkowicie jest $b$ bloków, to w każdym znajduje się $n/b$ liczb, a odpowiedź na zapytanie zadziała w czasie $O(b+n/b)$. To wyrażenie będzie najmniejsze, jeśli ustalimy $b=\sqrt{n}$, stąd nazwa: dzielenie na przedziały po pierwiastek. A oto kod tego podejścia:

```cpp=
int B = sqrt(n);
int blok(int x)
{
return x/B;
}
long long suma[MAXB], tab[MAXN];
void update(int i, long long ile)
{
tab[i] += ile;
suma[blok(i)] += ile;
}
long long query(int x, int y)
{
int b1 = blok(x), b2 = blok(y);
long long wyn = 0;
if (b1 == b2)
{
//zapytanie jest wewnatrz jednego bloku -> brutalnie
for (int i=x; i<=y; ++i) wyn += tab[i];
return wyn;
}
//to, co sie nie miesci, robimy osobno
while (blok(x) == b1)
{
wyn += tab[x];
++x;
}
while (blok(y) == b2)
{
wyn += tab[y];
--y;
}
//teraz trzeba zliczyc pelne bloki
for (int i=b1 + 1; i < b2; ++i) wyn += suma[i];
return wyn;
}
```

Zapewne zastanawiasz się, po co nam rozwiązywać problem gorzej niż już umiemy to zrobić $O(n \sqrt{n})$ to wszakże gorzej niż $O(n \ log \ n)$. Okazuje się jednak, że to podejście możemy zastosować do rozwiązywania znacznie trudniejszych problemów, z którymi drzewo przedziałowe sobie nie radzi. W szczególności, pierwiastków warto używać do rozwiązywania problemów z zapytaniami w dwóch wymiarach - ze względu na dużą stałą i trudności implementacyjne drzewo dwuwymiarowe w $O(n \ log^2 \ n)$ drastycznie przegrywa z połączeniem pierwiastków i jednowymiarowego drzewa $O(n \sqrt{n} \cdot log \ n).$

Chociaż to drugie jest teoretycznie wolniejsze, w praktyce sprawuje się znacznie lepiej.

Ciekawy blog na temat dzielenia na przedziały po pierwiastek znajdziesz [tutaj.](http://codeforces.com/blog/entry/20489)

### Aktualizacja co pierwiastek

Aktualizacja co pierwiastek to nic innego jak sprytne połączenie dwóch algorytmów. Rozważmy poprzedni problem raz jeszcze:
- I(p, ile): dodaj ile do liczby na pozycji
p
- 
Q
(
x, y
)
: podaj sumę liczb na przedziale
<
x
;
y
>


Gdyby nasz ciąg się nie zmieniał, moglibyśmy użyć sumy prefiksowej i łatwo odpowiadać na za-
pytania w
O(1)
. Jest jednak problem - liczby mogą się zmieniać. Wyobraźmy sobie rozwiązanie,
które pyta o sumę na przedziale przy pomocy sumy prefiksowej, a następnie przegląda wszystkie
poprzednie aktualizacje i rozpatruje je osobno, patrząc czy liczba, do której dodaliśmy zawiera się
w przedziale naszego zapytania. Pesymistycznie dla każdego zapytania musimy jednak przejrzeć
wszystkie aktualizacje, więc nie byłoby to zbyt szybkie. Możemy jednak być sprytni - jeśli lista
aktualizacji stanie się dłuższa niż pewne
c
, zaaplikujemy je wszystkie, przeliczymy sumę prefiksową
od nowa
i wyczyścimy listę aktualizacji.

<b></b>

Ten  algorytm  jest  oczywiście  poprawny,  ale  jak  szybko  on  działa?  Przeanalizujmy  to.  Niech
m
będzie sumaryczną liczbą zapytań i aktualizacji. Zauważmy, że dokonamy sumarycznie nie więcej
niż
m c
wyliczeń sumy prefiksowej, a dla każdego zapytania użyjemy jej w
O(1)
i przejrzymy całą
listę aktualizacji w czasie nie gorszym niż
O(c)
Podsumowując, rozwiązanie zadziała w złożoności:
O((mc⋅n)+(m⋅c))
Ponownie, optymalnym wyborem jest pierwiastek:
c=»(n+m)
.
### "tabela do wstawienia"

To właściwie cała teoria, która stoi za aktualizacją co pierwiastek. A jakie są przesłanki za tym,
żeby jej używać? Przede wszystkim może ona nam się przydać, gdy potrafimy rozwiązać problem
bez aktualizacji, nawet przy pomocy trudnej struktury danych.

### Algorytm MO

Kolejną z technik, które poznasz, będzie algorytm MO. Jest on oparty na optymalizacji pewnego
rozwiązania  brutalnego.  Tym  razem  skupimy  się  nad  innym  problemem.  Rozważmy  ciąg  liczb
naturalnych nie większych niż 10
6
. Chcemy odpowiedzieć na
n
zapytań o liczbę różnych liczb na
przedziale.

<b></b>

Jak moglibyśmy rozwiązać ten problem jakkolwiek? Będziemy utrzymywać tablicę
ILE
[
10
6
]
– ile
razy występuje każda z liczb. Jeśli dodajemy liczbę
x
, dla której
ILE
[
x
]
=
0, to musimy zwiększyć
wynik – mamy nowy rodzaj liczby w naszym ciągu. W ten sposób możemy przejść po kolei po
wszystkich  elementach  przedziału  zapytania  i  w  opisany  sposób  policzyć  wynik  w
O
(
dlugosc
)
.
To jednak pesymistycznie
O
(
n
⋅
m
)
, dlatego będziemy poszukiwać lepszego rozwiązania. Póki co
spójrzmy na kod tego podejścia.

### "tabela do wstawienia"

Spróbujmy poddać ten algorytm modyfikacji. Zauważmy, że zamiast przeglądać wszystkie elementy
z przedziału możemy rozszerzać lub zwężać przedział z poprzedniego zapytania.

### "tabela do wstawienia"

W  tym  celu  będziemy  potrzebować  jeszcze  usuwania  elementu  –  to  też  umiemy  zrobić  łatwo.
Jeśli  dla  naszego
x
okaże  się,  że  po  odjęciu  zachodzi
ILE
[
x
]
=
0,  to  wynik  trzeba  zmniejszyć.
Przesuwanie
na  razie
nie  zmniejszyło  nam  złożoności  algorytmu  –  to  nadal
O
(
n
⋅
m
)
.  Jak  to
napisać?

### "tabela do wstawienia"

Zwróć uwagę, że po użyciu funkcji
query()
pozycje zmiennych
L
i
R
się nie zmieniają –
zerujZmienne()
zniknęło. To będzie kluczowe w dalszej części algorytmu.

<b></b>

Teraz czas na wyciągnięcie królika z kapelusza. Zauważmy, że kolejność zapytań nie ma dla nas
znaczenia w kwestii poprawności algorytmu – możemy odpowiadać na nie w dowolnej kolejności.
Ale może to wpłynąć na czas wykonania. Posortujemy zapytania tak, aby nasz poprzedni algorytm
działał w
O ( n √n). Niech c = √n
. Użyjemy następującego komparatora:

### "tabela do wstawienia"

Co on robi? De facto dzieli zapytania (
xi, yi
) na pierwiastek bloków względem
xi, a w każdym z
nich sortuje po
yi
. Jak już ustaliliśmy, poprawność algorytmu pozostała zachowana. Udowodnimy,
że teraz nasz kod zadziała pesymistycznie w O(n√n).

<b></b>

Dowód
: Rozważmy osobno, ile operacji mogą wykonać lewy i prawy koniec przedziału. Najpierw
lewy. Między dwoma elementami z tego samego bloku
L
nie wykona więcej niż
√
n
operacji, ze
względu na definicję bloku. Zmiana bloku następuje
√
n
razy, więc lewy indeks sumarycznie wy-
kona nie więcej niż
O (n ⋅ √ n)
operacji.

<b></b>

A co z prawym indeksem? On w jednym bloku sumarycznie wykonuje nie więcej niż
O (n)
opera-
cji, ponieważ
y
i
są w tym bloku posortowane, czyli nigdy się nie cofniemy. Jest
√
n
bloków, więc
ponownie sumarycznie nie więcej niż
O (n⋅√n) operacji.

<b></b>

To kończy opis algorytmu MO. Istnieje jeszcze jego wersja, która potrafi radzić sobie z aktuali-
zacjami  w
O (n 53)–  jeśli  jesteś  nią  zainteresowany  zachęcam  do  przeczytania  komentarzy  tutaj
Tutorial na temat MO możesz znaleźć również tutaj

### Rozbijanie na dwa różne algorytmy

Trzy powyższe techniki łączy fakt, że z pewnego powodu działają w złożoności pierwiastkowej. Ko-
lejny trik, który poznasz, cechuje się korzystaniem z własności, że
czegoś
jest niewiele (a dokładniej
O (»)
. Trudno to wytłumaczyć na sucho, więc rozpatrzmy prosty przykład, będący jednocześnie
zadaniem z drugiego etapu 24 OI (kontenery). Treść zadania możesz przeczytać w systemie szkopuł

<b></b>

Załóżmy,  że  zapytanie,  które  mamy  przetworzyć  ma
d
większe  niż
√
n
.  Możemy  rozpatrzyć  je
brutalnie i nie zajmie nam to więcej niż
O (n√n=√n)
. Ta część algorytmu okazała się być bardzo
prosta.

<b></b>

A jak postąpimy z
d
mniejszym niż
√
n
? Z oczywistych względów jest tylko
√
n
różnych
d
, które
nas interesują. Skupmy się teraz na rozwiązaniu podzadania drugiego – sytuacji, w której wszyst-
kie
di
są takie same. Możemy zauważyć, że z pomocą przyjdzie nam suma prefiksowa, nieznacz-
nie zmodyfikowana. Dla każdej reszty modulo policzymy osobną sumę prefiksową według wzoru
p[i]∶=p[i]+p[i−d].
Musimy pamiętać również dla każdego zapytania
(d, a, l) o wcześniejszym
wyznaczeniu jego granic:
p [a]++,p[a⋅l]−−.

### "tabela do wstawienia"

Otrzymujemy więc rozwiązanie problemu w
O (n)
dla jednego
d
. Stąd już prosta droga do rozwią-
zania wzorcowego – Dla każdego z
√
n
przypadków różnego
d
, których jeszcze nie rozważyliśmy,
możemy  rozwiązać  nasz  problem  w
O (n)
.  Sumarycznie  otrzymujemy  dwie  części  algorytmu,  z
których każda działa w
O (n√n).

<b></b>

To zadanie to tylko jeden z wielu przykładów sytuacji, w których możemy zastosować rozbijanie
na dwa różne algorytmy, aby uzyskać efektywne rozwiązanie wyjściowego problemu. Kluczowa jest
różnorodność  tych  algorytmów  –  dzięki  temu,  że  pierwszy  działał  w
O (n⋅nd)
a  drugi
O (d⋅n)
podstawiając
d=√n
udało nam się osiągnąć cel. Często takie podejście odnosi skutek w teorii
liczb, gdzie liczba
a
nie może mieć więcej niż
O (√a)
dzielników


## Zadania
- [Kontenery (XXIV OI, II etap)](https://szkopul.edu.pl/problemset/problem/oNnWY6ZuzzhvG-jCmijiXkIk/site/?key=statement)
- [Holes (Codeforces, Beta Round E)](https://codeforces.com/contest/13/problem/E)
"
---
