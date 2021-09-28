---
title: 'Pierwiatki'
content: "
Często nie mamy pomysłu, w jaki sposób użyć struktur danych, by rozwiązać zadanie szybciej niż $O(n^2)$. W takim wypadku pomocne mogą okazać się tzw. algorytmy pierwiastkowe. Jest kilka różnych technik korzystania z pierwiastków. W tym artykule dowiesz się, jak pisać efektywne algorytmy z ich użyciem.

## Dzielenie na przedziały po pierwiastek 

Ta technika będzie w pewnym sensie podobna do drzewa przedziałowego, tylko prostsza. Wyobraźmy sobie, że mamy ciąg, na którym będziemy chcieli wykonywać operacje:


- Problem wydawania reszty

- Ciągły problem plecakowy


Ten problem powinien być Ci już znany. Możemy go bowiem rozwiązać drzewem przedziałowym. Jeśli nie pamiętasz rozwiązania, zachęcam do przeczytania artykułu o drzewie przedziałowym (punkt - przedział). Tym razem, zamiast pamiętać drzewo przedziałowe, podzielimy sobie nasz ciąg na $O (\\sqrt{n})$ bloków, a dla każdego zapamiętamy sumę liczb, które do niego należą.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c0cd4f5dbc4126b9e9328ab03d4af415.png)


Co musimy zrobić, gdy chcemy dodać? Dwie rzeczy: zaktualizować liczbę w naszym ciągu oraz zaktualizować sumę liczb w bloku. Proste, prawda? Nieco trudniej będzie z zapytaniami. W rozwiązaniu brutalnym przejrzelibyśmy wszystkie elementy z przedziału $<x;y>$ zwykłym forem. Zauważmy jednak, że jeśli mielibyśmy przejść forem cały blok, to równie dobrze możemy od razu zapytać o sumę wszystkich liczb, które się w nim znajdują. To znacznie przyspieszy nasze rozwiązanie.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_bfa60c232b14615f15e29526f527e9a5.png)


Jak szybko to działa? Nietrudno zauważyć, że dodawanie wartości działa w $O(1)$, ponieważ zmieniamy tylko dwie wartości w tablicy. Nieco gorzej poszło nam z zapytaniami. Zarówno na początku, jak i na końcu przedziału z zapytania być może przejrzymy trochę liczb forem, jednak nie więcej
niż zawierają łącznie dwa bloki. W środku będziemy tylko przeglądać całe bloki. Wobec tego, jeśli całkowicie jest $b$ bloków, to w każdym znajduje się $n/b$ liczb, a odpowiedź na zapytanie zadziała w czasie $O(b+n/b)$. To wyrażenie będzie najmniejsze, jeśli ustalimy $b=\\sqrt{n}$, stąd nazwa: dzielenie na przedziały po pierwiastek. A oto kod tego podejścia:


```cpp=

int B = sqrt(n);


int blok(int x)

{

\ \ \ \  return x/B;

}


long long suma[MAXB], tab[MAXN];

void update(int i, long long ile)

{

\ \ \ \  tab[i] += ile;

\ \ \ \  suma[blok(i)] += ile;

}


long long query(int x, int y)

{

\ \ \ \  int b1 = blok(x), b2 = blok(y);

\ \ \ \  long long wyn = 0;

\ \ \ \  if (b1 == b2)

\ \ \ \  {

\ \ \ \ \ \ \ \  //zapytanie jest wewnatrz jednego bloku -> brutalnie

\ \ \ \ \ \ \ \  for (int i=x; i<=y; ++i)

\ \ \ \ \ \ \ \ \ \ \ \  wyn += tab[i];

\ \ \ \ \ \ \ \  return wyn;

\ \ \ \  }


\ \ \ \  //to, co sie nie miesci, robimy osobno

\ \ \ \  while (blok(x) == b1)

\ \ \ \  {

\ \ \ \ \ \ \ \  wyn += tab[x];

\ \ \ \ \ \ \ \  ++x;

\ \ \ \  }

\ \ \ \  while (blok(y) == b2)

\ \ \ \  {

\ \ \ \ \ \ \ \  wyn += tab[y];

\ \ \ \ \ \ \ \  --y;

\ \ \ \  }

\ \ \ \  //teraz trzeba zliczyc pelne bloki

\ \ \ \  for (int i=b1 + 1; i < b2; ++i)

\ \ \ \ \ \ \ \  wyn += suma[i];

\ \ \ \  return wyn;

}

```


Zapewne zastanawiasz się, po co nam rozwiązywać problem gorzej niż już umiemy to zrobić $O(n \\sqrt{n})$ to wszakże gorzej niż $O(n \\ log \\ n)$. Okazuje się jednak, że to podejście możemy zastosować do rozwiązywania znacznie trudniejszych problemów, z którymi drzewo przedziałowe sobie nie radzi. W szczególności, pierwiastków warto używać do rozwiązywania problemów z zapytaniami w dwóch wymiarach - ze względu na dużą stałą i trudności implementacyjne drzewo dwuwymiarowe w $O(n \\ log^2 \\ n)$ drastycznie przegrywa z połączeniem pierwiastków i jednowymiarowego drzewa $O(n \\sqrt{n} \\cdot log \\ n).$


Chociaż to drugie jest teoretycznie wolniejsze, w praktyce sprawuje się znacznie lepiej.


Ciekawy blog na temat dzielenia na przedziały po pierwiastek znajdziesz [tutaj.](http://codeforces.com/blog/entry/20489)


### Aktualizacja co pierwiastek

Aktualizacja co pierwiastek to nic innego jak sprytne połączenie dwóch algorytmów. Rozważmy poprzedni problem raz jeszcze:

- ```I(p, ile)```: dodaj $ile$ do liczby na pozycji $p$

- ```Q(x, y)```: podaj sumę liczb na przedziale $<x, y>$


Gdyby nasz ciąg się nie zmieniał, moglibyśmy użyć sumy prefiksowej i łatwo odpowiadać na zapytania w $O(1)$. Jest jednak problem - liczby mogą się zmieniać. Wyobraźmy sobie rozwiązanie, które pyta o sumę na przedziale przy pomocy sumy prefiksowej, a następnie przegląda wszystkie poprzednie aktualizacje i rozpatruje je osobno, patrząc czy liczba, do której dodaliśmy zawiera się w przedziale naszego zapytania. Pesymistycznie dla każdego zapytania musimy jednak przejrzeć
wszystkie aktualizacje, więc nie byłoby to zbyt szybkie. Możemy jednak być sprytni - jeśli lista aktualizacji stanie się dłuższa niż pewne $c$, zaaplikujemy je wszystkie, przeliczymy sumę prefiksową od nowa i wyczyścimy listę aktualizacji.


Ten algorytm jest oczywiście poprawny, ale jak szybko on działa? Przeanalizujmy to. Niech $m$ będzie sumaryczną liczbą zapytań i aktualizacji. Zauważmy, że dokonamy sumarycznie nie więcej niż $\\frac{m}{c}$ wyliczeń sumy prefiksowej, a dla każdego zapytania użyjemy jej w
$O(1)$ i przejrzymy całą listę aktualizacji w czasie nie gorszym niż $O(c)$ Podsumowując, rozwiązanie zadziała w złożoności: $O((mc⋅n)+(m⋅c))$ Ponownie, optymalnym wyborem jest pierwiastek: $c=\\sqrt{n+m}$.


```cpp=

long long pref[MAXN], tab[MAXN];

vector <pair <int, int> > zmiany;

//warto jeszcze pamietac, zeby na samym poczatku programu

//policzyc sume prefiksowa - jedno rebuild() wystarczy


void rebuild()

{

\ \ \ \ for (int i=0; i<zmiany.size(); ++i)

\ \ \ \ \ \ \ \ tab[zmiany[i].first] += zmiany[i].second;

\ \ \ \ zmiany.clear();

\ \ \ \ pref[0] = 0;

\ \ \ \ for (int i=1; i<=n; ++i)

\ \ \ \ \ \ \ \ pref[i] = pref[i-1] + tab[i];

}


void update(int x, long long ile)

{

\ \ \ \ zmiany.push_back(make_pair(x, ile));

\ \ \ \ if (zmiany.size() > sqrt(n))

\ \ \ \ \ \ \ \ rebuild();

}


long long query(int x, int y)

{

\ \ \ \ long long wyn = pref[y] - pref[x-1];

\ \ \ \ for (int i=0; i<zmiany.size(); ++i)

\ \ \ \ {

\ \ \ \ \ \ \ \ int gdzie = zmiany[i].first;

\ \ \ \ \ \ \ \ if (x <= gdzie && gdzie <= y)

\ \ \ \ \ \ \ \ \ \ \ \ wyn += zmiany[i].second;

\ \ \ \ }

\ \ \ \ return wyn;

}

```


To właściwie cała teoria, która stoi za aktualizacją co pierwiastek. A jakie są przesłanki za tym, żeby jej używać? Przede wszystkim może ona nam się przydać, gdy potrafimy rozwiązać problem bez aktualizacji, nawet przy pomocy trudnej struktury danych.

## Algorytm MO

Kolejną z technik, które poznasz, będzie algorytm MO. Jest on oparty na optymalizacji pewnego rozwiązania brutalnego. Tym razem skupimy się nad innym problemem. Rozważmy ciąg liczb naturalnych nie większych niż $10^6$. Chcemy odpowiedzieć na $n$ zapytań o liczbę różnych liczb na
przedziale.


Jak moglibyśmy rozwiązać ten problem jakkolwiek? Będziemy utrzymywać tablicę ```ILE[1e6]``` – ile razy występuje każda z liczb. Jeśli dodajemy liczbę $x$, dla której ```ILE[x]=0```, to musimy zwiększyć wynik – mamy nowy rodzaj liczby w naszym ciągu. W ten sposób możemy przejść po kolei po wszystkich elementach przedziału zapytania i w opisany sposób policzyć wynik w $O(dlugosc)$. To jednak pesymistycznie $O(nm)$, dlatego będziemy poszukiwać lepszego rozwiązania. Póki co spójrzmy na kod tego podejścia.


```cpp=

void add(int x)

{

\ \ \ \  if (ILE[x] == 0) ++wynik;

\ \ \ \  ILE[x]++;

}


int query(int x, int y)

{

\ \ \ \  zerujZmienne(); //przywracamy zera wszedzie gdzie trzeba

\ \ \ \  for (int i = x; i <= y; ++i)

\ \ \ \ \ \ \ \  add(tab[i]);

\ \ \ \  return wynik;

}

```


Spróbujmy poddać ten algorytm modyfikacji. Zauważmy, że zamiast przeglądać wszystkie elementy z przedziału możemy rozszerzać lub zwężać przedział z poprzedniego zapytania.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_99fc85e9409899210ad2622bdcc83ae1.png)


W tym celu będziemy potrzebować jeszcze usuwania elementu – to też umiemy zrobić łatwo. Jeśli dla naszego $x$ okaże się, że po odjęciu zachodzi ```ILE[x]=0```, to wynik trzeba zmniejszyć. Przesuwanie
na razie nie zmniejszyło nam złożoności algorytmu – to nadal $O(nm)$. Jak to napisać?


```cpp=

void add(int x)

{

\ \ \ \  if (ILE[x] == 0) ++wynik;

\ \ \ \  ILE[x]++;

}


void remove(int x)

{

\ \ \ \  ILE[x]--;

\ \ \ \  if (ILE[x] == 0) --wynik;

}


int L = 0, P = 0;

int query(int x, int y)

{

\ \ \ \  while (L < x)

\ \ \ \  {

\ \ \ \ \ \ \ \  remove(L);

\ \ \ \ \ \ \ \  ++L;

\ \ \ \  }

\ \ \ \  while (L > x)

\ \ \ \  {

\ \ \ \ \ \ \ \  add(L);

\ \ \ \ \ \ \ \  --L;

\ \ \ \  }

\ \ \ \  while (P < y)

\ \ \ \  {

\ \ \ \ \ \ \ \  add(P);

\ \ \ \ \ \ \ \  ++P;

\ \ \ \  }

\ \ \ \  while (P > y)

\ \ \ \  {

\ \ \ \ \ \ \ \  remove(P);

\ \ \ \ \ \ \ \  --P;

\ \ \ \  }

\ \ \ \  return wynik;

}

```


Zwróć uwagę, że po użyciu funkcji ```query()``` pozycje zmiennych ```L``` i ```R``` się nie zmieniają – ```zerujZmienne()``` zniknęło. To będzie kluczowe w dalszej części algorytmu.


Teraz czas na wyciągnięcie królika z kapelusza. Zauważmy, że kolejność zapytań nie ma dla nas znaczenia w kwestii poprawności algorytmu – możemy odpowiadać na nie w dowolnej kolejności. Ale może to wpłynąć na czas wykonania. Posortujemy zapytania tak, aby nasz poprzedni algorytm
działał w $O ( n \\sqrt{n})$. Niech $c = \\sqrt{n}$. Użyjemy następującego komparatora:


```cpp=

bool cmp(pair <int, int> zap1, pair <int, int> zap2)

{

\ \ \ \  if (zap1.first / c != zap2.first / c)

\ \ \ \ \ \ \ \  return (zap1.first < zap2.first);

\ \ \ \  return (zap1.second < zap2.second);

}

```


Co on robi? De facto dzieli zapytania $(x_i, y_i)$ na pierwiastek bloków względem $x_i$, a w każdym z nich sortuje po $y_i$. Jak już ustaliliśmy, poprawność algorytmu pozostała zachowana. Udowodnimy, że teraz nasz kod zadziała pesymistycznie w $O(n \\sqrt{n})$.


<b>Dowód:</b> Rozważmy osobno, ile operacji mogą wykonać lewy i prawy koniec przedziału. Najpierw lewy. Między dwoma elementami z tego samego bloku $L$ nie wykona więcej niż
$\\sqrt{n}$ operacji, ze względu na definicję bloku. Zmiana bloku następuje $\\sqrt{n}$ razy, więc lewy indeks sumarycznie wykona nie więcej niż $O (n \\sqrt{n})$ operacji.


A co z prawym indeksem? On w jednym bloku sumarycznie wykonuje nie więcej niż $O(n)$ operacji, ponieważ $y_i$ są w tym bloku posortowane, czyli nigdy się nie cofniemy. Jest $\\sqrt{n}$ bloków, więc ponownie sumarycznie nie więcej niż
$O (n \\sqrt{n})$ operacji.


To kończy opis algorytmu MO. Dodatkowy tutorial na temat MO możesz znaleźć również [tutaj.](https://blog.anudeep2011.com/mos-algorithm/)


## Rozbijanie na dwa różne algorytmy

Trzy powyższe techniki łączy fakt, że z pewnego powodu działają w złożoności pierwiastkowej. Kolejny trik, który poznasz, cechuje się korzystaniem z własności, że czegoś jest niewiele (a dokładniej $O (\\sqrt{})$). Trudno to wytłumaczyć na sucho, więc rozpatrzmy prosty przykład, będący jednocześnie zadaniem z drugiego etapu 24 OI (kontenery). Treść zadania możesz przeczytać [w systemie szkopuł](https://szkopul.edu.pl/problemset/problem/oNnWY6ZuzzhvG-jCmijiXkIk/statement/)


Załóżmy, że zapytanie, które mamy przetworzyć ma $d$ większe niż $\\sqrt{n}$. Możemy rozpatrzyć je brutalnie i nie zajmie nam to więcej niż $O (n / \\sqrt{n}=\\sqrt{n})$. Ta część algorytmu okazała się być bardzo prosta.


A jak postąpimy z $d$ mniejszym niż $\\sqrt{n}$? Z oczywistych względów jest tylko $\\sqrt{n}$ różnych $d$, które nas interesują. Skupmy się teraz na rozwiązaniu podzadania drugiego – sytuacji, w której wszystkie $d_i$ są takie same. Możemy zauważyć, że z pomocą przyjdzie nam suma prefiksowa, nieznacznie zmodyfikowana. Dla każdej reszty modulo policzymy osobną sumę prefiksową według wzoru ```p[i]∶=p[i]+p[i−d]```. Musimy pamiętać również dla każdego zapytania $(d, a, l)$ o wcześniejszym wyznaczeniu jego granic: ```p [a]++,p[a⋅l]−−```.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_9caee09726879bf7e2904dc3f3ff02a2.png)


Otrzymujemy więc rozwiązanie problemu w $O (n)$ dla jednego $d$. Stąd już prosta droga do rozwiązania wzorcowego – Dla każdego z $\\sqrt{n}$ przypadków różnego $d$, których jeszcze nie rozważyliśmy, możemy rozwiązać nasz problem w $O (n)$. Sumarycznie otrzymujemy dwie części algorytmu, z których każda działa w $O (n \\sqrt{n})$.


To zadanie to tylko jeden z wielu przykładów sytuacji, w których możemy zastosować rozbijanie na dwa różne algorytmy, aby uzyskać efektywne rozwiązanie wyjściowego problemu. Kluczowa jest różnorodność tych algorytmów – dzięki temu, że pierwszy działał w $O (n\\frac{n}{d})$ a drugi $O (d⋅n)$ podstawiając $d=\\sqrt{n}$ udało nam się osiągnąć cel. Często takie podejście odnosi skutek w teorii liczb, gdzie liczba $a$ nie może mieć więcej niż $O (\\sqrt{a})$ dzielników.


## Zadania

- [Kontenery (XXIV OI, II etap)](https://szkopul.edu.pl/problemset/problem/oNnWY6ZuzzhvG-jCmijiXkIk/site/?key=statement)

- [Holes (Codeforces, Beta Round E)](https://codeforces.com/contest/13/problem/E)

"
---
