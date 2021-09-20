---
title: 'Drzewo przedziałowe'
content: "
Tematem tego artykułu będą operacje na przedziale. Często w zadaniach musimy wykonać coś, czego robienie “brutalnie forem” powoduje, że nasz program działa w niepożądanej złożoności.

W tego typu zadaniach postaramy sie wykorzystać pewną strukturę, dzieki której złożoność operacji zmian na przedziałach uda nam się zbić z liniowej do logarytmicznej. W zależności od potrzeb mamy do dyspozycji kilka jej rodzajów.

Omawianą strukturą jest drzewo przedziałowe. Zacznijmy od omówienia jego ogólnych własności.
1) Drzewa przedziałowe to pełne drzewa binarne. To oznacza, że każdy wierzchołek, który nie jest liściem, ma dokładnie dwóch synów (będziemy ich nazywać prawym i lewym). Numery wierzchołkom nadajemy od góry do dołu, od lewej do prawej, zaczynając od $1.$ Wygląda mniej więcej tak:
![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f158595da63b8719f1b3e54aa2dbb1ac.png)
2) Wierzchołki odpowiadają przedziałom, które reprezentują. Zwróć uwagę, że wszystkie przedziały na danej głębokości drzewa mają tę samą długość.
![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_50ca423090f1ce7ec9d8fdb3e712860f.png)
3) Lewy syn wierzchołka $x$ ma numer $2\cdot x,$ a prawy $2\cdot x + 1.$ Jeżeli $x$ odpowiada przedziałowi od $a$ do $b,$ to jego lewy syn odpowiada przedziałowi od $a$ do $(a + b)/2,$ a prawy - od $(a + b)/2 + 1$ do $b.$

Rozróżniamy trzy podstawowe rodzaje drzewa przedziałowego: punkt – przedział, przedział – punkt i przedział – przedział. Pierwsze dwa różnią się nieznacznie, zaś ostatnie często uchodzi za trudniejsze. 

Zdefiniujmy sobie 2 pojęcia: insert to będzie aktualizacja, a query to zapytanie.

### Drzewo punkt - przedział
W drzewie punkt – przedział aktualizujemy informację w jednym wierzchołku i na drodze od niego do korzenia (czyli do wierzchołka o numerze $1$), a na przedziale zadajemy pytanie (np. o największą liczbę na danym przedziale).

Zbudujmy drzewo przedziałowe na przykładowym ciągu:
$n = 8$ - długość ciągu
$ciag[n] = \{1\ 5\ 2\ 3\ 1\ 7\ 8\ 3\}$ - kolejne elementy ciągu

Niech $r$ to będzie najmniejsza potęga dwójki niemniejsza od $n.$ Zauważmy, że nasze drzewo przedziałowe zawsze będzie miało podstawę będącą potęgą dwójki, a oczywiste jest, że $n$ nie zawsze takie będzie. Wtedy gdy $r$ okaże się większe od $n,$ nadmiarowe elementy wystarczy ustawić na taką wartość, która nie będzie miała wpływu na rozwiązanie. 

W tym przypadku w operacji query mamy podać największą wartość, która znajduje się w danym przedziale. Z tego powodu w naszym drzewie przedziałowym dla każdego wierzchołka będziemy przechowywać maksymalną z wartości jego synów. W ten sposób wartość znajdująca się w nim będzie równa największej wartości w jego przedziale.

Takie drzewo możemy skonstruować w następujący sposób:
```clike=
for (int i = 1; i <= n; i++)
  drzewo[i + r - 1] = ciag[i];

for (int i = r - 1; i >= 1; i--)
  drzewo[i] = max(drzewo[2 * i + 1], drzewo[2 * i]);
```

Nasze drzewo wygląda tak:

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e2d8de668fe2d4ead09adbfbfb434da2.png)


Załóżmy, że w naszym zadaniu $0$ to będzie zapytanie (wypisujemy największą wartość z przedziału od $a$ do $b$), a $1$ aktualizacja (w wierzchołku $a$ ustalamy wartość $b$), wyglądają następująco:

$8$
$1$ $1$ $7$
$1$ $8$ $5$
$0$ $1$ $5$
$1$ $6$ $4$
$1$ $7$ $5$
$0$ $2$ $8$
$1$ $1$ $3$
$0$ $3$ $4$

Gdy zmienimy coś w jednym wierzchołku, może to wpłynąć na jego przodka, - z tego powodu będziemy musieli zaktualizować także całą drogę od wierzchołka do korzenia.

Aby zaktualizować drogę od wierzchołka do korzenia wystarczy dzielić jego numer przez $2,$ dopóki nie będzie on równy $1.$ Dzieje się tak, ponieważ numer przodka wierzchołka o numerze $x$ jest równy $x/2,$ a jego przodka $x/4,$ itd...

Po pierwszej zmianie nasze drzewo będzie wyglądać tak:

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_b4e632f0821783cd56b6006f021ab909.png)

A następnie:

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f6be2ad97cc12b840a1524f6394053b9.png)

Teraz musimy się dowiedzieć, jaka jest największa wartość, która występuje na przedziale od $1$ do $5.$ Dzięki naszemu sokolemu wzrokowi możemy zauważyć, że tą wartością będzie $7.$ Jeżeli jednak mielibyśmy się zapytać o przedział, który jest znacznie dłuższy (np. ma długość równą $10^6$) byłoby to o wiele trudniejsze.

Wykorzystajmy nasze drzewo przedziałowe! Chcemy zebrać wszystkie informacje o tym przedziale, a przy okazji sprawdzić jak najmniej wierzchołków drzewa, żeby było szybko. Poszukiwanie dobrych przedziałów zaczniemy od korzenia drzewa. Wierzchołek ten zawiera w sobie największą wartość z przedziału od $1$ do $8,$ Istnieje możliwość, że należy ona do przedziału od $6$ do $8.$ Z tego powodu wiemy, że nie możemy brać pod uwagę wartości, która znajduje się w tym wierzchołku. Czas teraz sprawdzić jego synów – odpowiadają oni na przedziały od $1$ do $4$ oraz od $5$ do $8.$

Przedział od $1$ do $4$ zawiera się w naszym zapytaniu! Sprawdzanie jego synów byłoby bezużyteczne, ponieważ łącznie obaj odpowiadają na przedział ich ojca. Możemy więc zapamiętać maximum z tego przedziału I skończyć rozpatrywanie tego go.

Przedział od $5$ do $8,$ podobnie jak w przypadku wierzchołka o numerze $1,$ niekoniecznie zawiera poprawną odpowiedź – z tego powodu sprawdzamy przedziały jego synów.

W ten sposób możemy zapisać nasz algorytm jako funkcję rekurencyjną:
- Jeżeli przedział rozpatrywanego wierzchołka zawiera się w przedziale zapytania, to możemy brać pod uwagę wartość, która się w nim znajduje i skończyć rozpatrywanie tego wierzchołka.
- Jeżeli przedział wierzchołka i przedział zapytania się przecinają, możemy sprawdzić przedziały jego synów.
- Jeżeli przedział danego wierzchołka i przedział zapytania nie mają części wspólnej, nie bierzemy pod uwagę wartości, która się w nim znajduje, i również kończymy rozpatrywanie tego wierzchołka.

Wierzchołki, które weźmiemy pod uwagę to te, które są zaciemnione:

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_1df7a8ad9a74c91d1dd593dcfd9083d8.png)

Ponieważ szukamy największą wartość, która znajduje się w przedziale naszego zapytania, wybieramy największą z wartości, które znaleźliśmy po drodze. Naszą odpowiedzią w tym pytaniu będzie więc $7.$

Po kolejnych aktualizacjach nasze drzewo wygląda następująco:

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_eda57503328b6d2436c123431ba7ed5b.png)

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_bc4aeecd7df44237992a0e258cafc351.png)

Teraz musimy zapytać się o przedział od $2$ do $8.$ W sposób, który został przedstawiony w poprzednim zapytaniu, pytamy się o nowy przedział. Wierzchołki, których przedziały bazowe znajdują się w naszym przedziale zapytania to wierzchołki to te o numerach $3,$ $5$ i $9.$

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e1ef050e5331ed402f2faffe0bd162f9.png)

Największą wartością, która się w nich znajduje jest $5.$

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_8e0353a1a345491c259f2be4d7084ea6.png)

Tym razem pytamy się o przedział od $3$ do $4.$ Wierzchołek, który zawiera w sobie odpowiedź na to zapytanie to wierzchołek o numerze $5,$ a wartość w nim wynosi $3,$ co jest odpowiedzią na nasze pytanie.

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_08bad470d1b607708b2f792370ac088b.png)

Zatem nasze odpowiedzi będą następujące:
$7$
$5$
$3$

### Drzewo przedział - punkt

Ten rodzaj drzewa przedziałowego od poprzedniego różni się nieznacznie – tym razem, będziemy aktualizować informacje na przedziale, a pytać o wartość na pozycji, czyli odwrotnie niż w poprzednim przypadku.

Dla ułatwienia zostaniemy przy ciągu z poprzedniej części artykułu, a nasze operacje będą wyglądać następująco:

$insert(a, b, c)$ – liczby z przedziału $<a;\ b>$ zmieniamy na $c$

$query(a)$ – podajemy wartość ciągu na pozycji $a$-tej.

Dla każdego wierzchołka w naszym drzewie będziemy zapamiętywać dwie liczby: wartość, na którą zmieniamy wszystkie inne z przedziału, który reprezentuje ten wierzchołek, oraz moment, w którym wykonujemy daną operację.

Dzięki takiej budowie naszego drzewa w momencie, w którym będziemy pytać się o to, jaka wartość jest aktualna na danej pozycji, interesuje nas najpóźniejsza z dokonanych zamian – wszystkie poprzednie zostały już przez nią zastąpione.

Nasze drzewo wygląda następująco:

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_85ce3c4c4f25d97b0d2a3a271ad5de98.png)

Rozpatrzmy przykładowy zbiór zapytań, z którymi będziemy chcieli sobie poradzić.

$9$
$I$ $1$ $5$ $3$
$I$ $3$ $6$ $5$
$Q$ $4$
$I$ $6$ $8$ $7$
$I$ $1$ $7$ $2$
$Q$ $5$
$Q$ $8$
$I$ $3$ $5$ $8$
$Q$ $4$

Operacja insert w drzewie przedział – punkt jest podobna do operacji query w drzewie punkt – przedział. Schodzenie po drzewie wykonujemy dokładnie w ten sam sposób.

Nasze drzewo, po początkowych operacjach wstawiania elementów, wygląda następująco:

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e679a47dbc8748e4b33295ab0390277b.png)

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_47be6791daca1da9364ca57de097a0f9.png)

Teraz musimy podać, jaka wartość znajduje się na pozycji czwartej. Wiemy, że będzie to najpóźniejsza z informacji $(3, 0),\ (5, 2),\ (3, 1)$ i $(0, 0),$ ponieważ tylko na ścieżce z $4$-tego elementu do korzenia znajdują się informacje, które go dotyczą. Łatwo zauważamy, że najpóźniejszą z nich jest ustawienie piątki w momencie $2$ – taka jest więc aktualna wartość.

Aby przejrzeć wszystkich przodków danego wierzchołka wystarczy dzielić jego numer przez $2$ dopóki nie jest on równy $1.$ Czyli dokładnie tak, jak robiliśmy to w drzewie punkt – przedział, aby zmienić wartość elementu.

Kolejne zmiany zostawiają nam takie drzewo:

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_dfe040afb700c4a79f73ca3f2f9180c8.png)

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_dba20b40ddf7a758a6f620407fdb6327.png)

Teraz dla czwartej pozycji odpowiedzią będzie liczba $8.$

### Drzewo przedział - przedział

Drzewo przedziałowe przedział – przedział często uchodzi za trudniejsze niż pozostałe dwa rodzaje drzew przedziałowych, jednak tak naprawdę wiele się od nich nie różni.

W tym rodzaju drzewa przedziałowego w obu operacjach insert i query będziemy działać na przedziałach.

- $I(a, b, c)$ – do każdego elementu ciagu z przedzialu $<a;\ b>$ dodaj $c$
- $Q(a, b)$ – podaj sumę elementów na przedziale $<a;\ b>$ 

W zasadzie moglibyśmy rozwiązać zadanie w podobny sposób, jak w przypadku wcześniejszych drzew. Dla każdego z wierzchołków w drzewie będziemy trzymać dwie wartości – sumę na przedziale, który reprezentuje dany wierzchołek oraz sumę aktualizacji, jakie wykonaliśmy na jego przedziale. Jeśli przez $y$ oznaczmy liczbę wierzchołków należących do początkowego ciągu, które reprezentuje wierzchołek $x,$ to będziemy chcieli, aby zawsze zachodziło:

```clike
suma[x] = suma[2 * x] + suma[2 * x + 1] + y * dodaj[x];
```

Pojawił się jednak pewien problem.

<b>Problem</b>: Rozważmy krótki ciąg operacji dla dwuelementowego ciągu.

$I(1, 2, 1)$
$Q(1, 1)$

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4d502e124e4f5fb0733658058533e3ba.png)

Zauważmy, że operacja $Insert(1, 2, 1)$ zostanie rozważona tylko w korzeniu $(1),$ a dla query odpowiemy w wierzchołku numer $2,$ ponieważ tylko on zawiera się w przedziale $<1,\ 1>.$ W wierzchołku numer $2$ suma dodawań jest $0.$ Coś tu nie gra.

<b>Analiza problemu</b>: Co się stało? Nasze drzewo przestało być aktualne. Dokładniej, kiedy dodaliśmy aktualizację w pewnym wierzchołku, to wszystkie informacje w jego poddrzewie przestały być aktualne. Niestety, przy dodawaniu nie możemy schodzić niżej, ponieważ otrzymalibyśmy złożoność rozwiązania brutalnego, co nas wcale nie urządza.

<b>Rozwiązanie</b>: Możemy jednak podejść do problemu od drugiej strony. Zamiast przepisywać te informacje od razu, <b>poczekamy</b> do momentu, kiedy będą nam potrzebne. Zwróćmy uwagę na to, że w funkcji rekurencyjnej najpierw rozpatrujemy korzeń, który na pewno jest aktualny. Dla wszystkich innych wierzchołków możemy przepchać informacje w dół drzewa przed zejściem w tym kierunku. Dla naszego przypadku przepychanie będzie działać następująco:

```clike=
void add(int x, long long ile)
{
    dodaj[x] += ile;
    suma[x] += dlugosc(x) * ile;
}

void push(int x)
{
    add(2 * x, dodaj[x]);
    add(2 * x + 1, dodaj[2 * x + 1]);
    dodaj[x] = 0;
}
```

Co tu się wydarzyło? Dodanie $ile$ w wierzchołku $x$ to nic innego, jak dodanie $ile$ w obydwu synach wierzchołka, a następnie <b>wyzerowanie</b> $dodaj[x].$ Pamiętaj o tym wyzerowaniu – jeśli dodaliśmy w synach, to w $x$ już nie dodajemy. Oto kompletna realizacja operacji naszego przykładowego drzewa przedziałowego:

```clike=
long long suma[2 * R + 5], dodaj[2 * R + 5];

void add(int x, int dl, long long ile)
{
    dodaj[x] += ile;
    suma[x] += ile * dl;
}

void push(int x, int dl)
{
    add(2 * x, dl / 2, dodaj[2 * x]);
    add(2 * x + 1, dl / 2, dodaj[2 * x + 1]);
    dodaj[x] = 0;
}

void insert(int gdzie, int pocz, int kon, int x, int y, long long ile)
{
    if (x <= pocz && y >= kon)
    {
        add(gdzie, kon - pocz + 1, ile);
        return;
    }
    push(gdzie, kon - pocz + 1);
    int sr = (pocz + kon) / 2;
    if (x <= sr) insert (2 * gdzie, pocz, sr, x, y, ile);
    if (y > sr) insert (2 * gdzie + 1, sr + 1, kon, x, y, ile);
    suma[gdzie] = suma[2 * gdzie] + suma[2 * gdzie + 1] + dodaj[gdzie] * (kon - pocz + 1);
}

long long query(int gdzie, int pocz, int kon, int x, int y)
{
    if (x <= pocz && y >= kon) return suma[gdzie];
    push (gdzie, kon - pocz + 1);
    int sr = (pocz + kon) / 2;
    long long wyn = 0;
    if (x <= sr) wyn += query(2 * gdzie, pocz, sr, x, y);
    if (y > sr) wyn += query(2 * gdzie + 1, sr + 1, kon, x, y);
    suma[gdzie] = suma[2 * gdzie] + suma[2 * gdzie + 1] + dodaj[gdzie] * (kon - pocz + 1);
    return wyn;
}
```

Technika ta, nazywana $\textit{lazy propagation}$ jest najczęściej stosowana właśnie w drzewach przedział – przedział.

## Zadania
- [Kinoman (XXII OI, I etap)](https://szkopul.edu.pl/problemset/problem/k-RYEjhwNTo_XdaCidXQUGMU/site/?key=statement)
- [Oceny (XXIV OI, III etap)](https://szkopul.edu.pl/problemset/problem/0KG8REkSLNnY5sVkm7Aei_R7/site/?key=statement)
- [Karty (XXI OI, II etap)](https://szkopul.edu.pl/problemset/problem/EHW4BOJee7VD-R9MaDAokZ6O/site/?key=statement)
"
---
