---
title: 'Dynamiki wykładnicze'
content: "
Czasami nie umiemy napisać rozwiązania, które by działało w czasie wielomianowym lub po prostu nie jest ono wymagane. Dzisiaj zajmiemy się zastosowaniem programowania dynamicznego do pisania algorytmów działających w czasie wykładniczym. 


## Maski bitowe

Czym jest maska bitowa? To nic innego jak ciąg zer i jedynek. Wiemy, że każdą liczbę możemy zapisać w systemie binarnym, czyli każda liczba reprezentuje nam jakąś maskę bitową.


Maski są przydatne na przykład do reprezentowania zbiorów liczb naturalnych: jeśli jakaś liczba występuje w zbiorze to w odpowiednim miejscu w masce chcemy mieć zapisane $1.$ W przeciwnym wypadku chcemy, by stało tam $0.$


![Zbiór i jego maska bitowa](https://codimd.s3.shivering-isles.com/demo/uploads/upload_6717d6289b2135ae88565ca6d35eea80.png)


Ile jest zbiorów złożonych z $n$ elementów? $2^n,$ ponieważ każdy element może być w masce lub nie. A ile jest masek długości $n?$ Skoro każdemu zbiorowi odpowiada dokładnie jedna, to też $2^n.$ W takim razie do reprezentacji zbiorów $n$-elementowych wystarczą nam tylko liczby całkowite od $0$ do $2^n-1.$ Mając maskę bitową, łatwo jest sprawdzić operacjami bitowymi, czy dany element w niej występuje:


```cpp=

//m to maska bitowa, i to numer elementu zbioru

if (m & (1 << i)) //sprawdzenie, czy i-ty element jest w masce m

m ^= (1 << i) // zmiana stanu i-tego elementu w masce m na przeciwny

```


Jeśli operacje bitowe z powyższego kodu, takie jak ```&```, ```(1 << i)``` lub ```^``` nie są Ci znane, możesz o nich poczytać [tutaj.](https://cpp0x.pl/kursy/Kurs-C++/Poziom-5/Operacje-bitowe/597)


## Wykładniczy dynamik na podzbiorach

Mamy $n\\leq 20$ różnych liczb całkowitych od $-10^9$ do $10^9.$ Chcemy powiedzieć, na ile sposobów możemy ustawić te liczby w ciąg tak, aby żaden prefiks nie miał ujemnej sumy.


### Rozwiązanie


Tak niewielkie $n$ sugeruje brutalnie rozwiązanie przeglądające wszystkie przypadki. Niestety, dla $n$ elementów mamy O($n!$) różnych możliwości ustawienia ich w ciąg. To byłoby zbyt wolne. Zamiast tego, napiszemy rozwiązanie korzystające z programowania dynamicznego na podzbiorach.


Niech $DP[x]$ oznacza liczbę sposobów, na które można ułożyć ciąg reprezentowany przez maskę $x.$ Zauważmy, że gdy będziemy mieli już taką tablicę, wystarczy nam wypisać jako rozwiązanie $DP[2^n -1],$ ponieważ maska $2^n-1$ reprezentuje cały ciąg.


Jakie będą nasze stany bazowe? $DP[0] = 1,$ ponieważ pusty ciąg ma sumę $0.$ To niespecjalnie ciekawy przypadek.


Przypuśćmy, że w naszej masce są jakieś elementy. Zauważmy, że jeśli suma liczb z maski jest ujemna to $DP[x] = 0.$ Nie ma siły - na końcu i tak wyjdzie nam liczba ujemna, więc nie da się spełnić warunków zadania.


Co się dzieje w przeciwnym przypadku? Wiemy, że w każdym ułożeniu któryś z elementów musi być ostatni. Możemy więc dla każdego elementu z maski (oznaczmy ten element przez $y$) założyć, że to właśnie $y$ jest ostatnim elementem w naszym ustawieniu. Co się wówczas stanie? Liczba rozwiązań dla naszej maski jest równa liczbie rozwiązań dla maski bez tego elementu. Stąd ```DP[x] += DP[x ^ (1 << y)]```. Jeśli dokonamy takiego sumowania po wszystkich elementach $y,$ poprawnie zliczymy $DP[x].$


```cpp=

void obliczDP(int i, int[] liczba) { //liczymy wynik dla maski bitowej i

\ \ \ \ //najpierw zliczamy sumę elementów

\ \ \ \ long long suma = 0;

\ \ \ \ for (int j = 0; j < n; j ++)

\ \ \ \ \ \ \ \ if (i & (1 << j))

\ \ \ \ \ \ \ \ \ \ \ \ suma += liczba[j];

\ \ \ \ if (suma < 0)

\ \ \ \ \ \ \ \ DP[i] = 0;

\ \ \ \ else {

\ \ \ \ \ \ \ \ //po ostatnim kroku na pewno suma będzie dodatnia

\ \ \ \ \ \ \ \ for (int j = 0; j < n; j ++)

\ \ \ \ \ \ \ \ \ \ \ \ if (i & (1 << j))

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ DP[i] += DP[i ^ (1 << j)];

\ \ \ \ }

}

```


Zwróc uwagę, że ```i & (1 << j)``` ($j$-ty bit liczby $i$) nie informuje nas o tym, czy liczba $j$ występuje w rozważanym zbiorze, ale czy występuje w nim $j$-ta liczba (czyli $liczba[j]$)!


Jak szybko działa takie podejście? Dla każdego z $2^n$ podzbiorów przeliczamy wzór dla $n$ elementów. Czyli złożoność czasowa to $O(2^n \\cdot n).$


Więcej ciekawej teorii na temat programowania dynamicznego w $O(2^n)$ znajdziesz [tutaj.](http://codeforces.com/blog/entry/337})


## Wykładniczy dynamik na podzbiorach podzbiorów

Dla każdego z $2^n$ pozbiorów zbioru $n-$elementowego chcemy wypisać sumę xorów liczb ze wszystkich jego podzbiorów.


W jakiej złożoności zadziałałoby brutalne przejrzenie dla każdego podzbioru wszystkich jego podzbiorów? Na pierwszy rzut oka widzimy, że nie gorzej niż $O(4^n),$ gdyż każdy z $2^n$ podzbiorów nie może mieć więcej niż $O(2^n)$ własnych podzbiorów. Okazuje się jednak, że możemy to oszacować trochę lepiej.


Tym razem liczbę zapiszemy w systemie trójkowym. Niech $0$ oznacza, że element nie znajduje się w danym podzbiorze, $1$ - że element znajduje się w szukanym zbiorze, ale nie w jego podzbiorze, a $2$ - że znajduje się w obydwu podzbiorach.


![Pozdbiór podzbioru](https://codimd.s3.shivering-isles.com/demo/uploads/upload_53497ce2f7630eb48095d5d2bba6276f.png)


Zauważmy, że w ten sposób jesteśmy w stanie opisać wszystkie podzbiory $n$ elementów z wybranym jego pozdbiorem. Stąd wiemy, że jest ich dokładnie $3^n.$ Wobec tego, jeśli dla każdego podzbioru przejrzymy wszystkie jego podzbiory to nasze rozwiązanie zadziała w $O(3^n).$


## Problem plecakowy raz jeszcze - Meet in the middle

Teraz wrócimy do korzeni. Pamiętasz jeszcze najprostszą wersję problemu plecakowego? Mamy $n$ elementów, liczbę $w$ i chcemy sprawdzić, czy istnieje podzbiór elementów, który sumuje się do $w.$ Nauczyliśmy się algorytmu, który działa w czasie $O(n\\cdot w).$ Jest on jednak nieakceptowalny dla dużych $w.$ 


Rozważmy tym razem nieznacznie inną wersję tego zadania. $n$ jest stosunkowo małe: $n\\leq 20,$ a $w$ w zasadzie dowolne: $w\\leq 10^9.$


### Rozwiązanie


To zadanie potrafimy już łatwo rozwiązać. Gdy $n$ jest nie większe niż $20,$ możemy przejrzeć wszystkie $2^n$ podzbiorów i dla każdego z nich sprawdzić, czy któryś sumuje się do $w.$ Złożoność czasowa: $O(2^n \\cdot n).$


Czy umiemy poradzić sobie z tym zadaniem, gdy $n\\leq 40$? Powyższy algorytm jest wówczas skazany na porażkę. Możemy natomiast podzielić nasz ciąg na dwie części, a następnie zliczyć sumę każdego z $2\\cdot 2^\\frac{n}{2}$ podzbiorów obu jego połówek. Posortujmy otrzymane wyniki i zapiszmy w dwóch osobnych tablicach: $A[]$ i $B[].$


Zauważmy, do czego udało nam się sprowadzić zadanie. Chcemy powiedzieć, czy istnieje taka para liczb $a$ i $b,$ że $a$ znajduje się w tablicy $A[],$ natomiast $b$ znajduje się w tablicy $B[]$ oraz $a + b = w.$ Weźmy dowolny element $a$ z tablicy $A[].$ Jaka musi być wartość $b$? Oczywiście $w - a.$ Musimy więc tylko sprawdzić, czy w tablicy $B[]$ istnieje element $w - a.$ To możemy zrobić przy pomocy bardzo prostego wyszukiwania binarnego, używając mapy lub przechodzac gąsienicą. Czas policzyć złożoność. Operacje na dwóch niezależnych połówkach zajmą nam $2\\cdot O(2^\\frac{n}{2} \\cdot n),$ czyli $O(2^\\frac{n}{2} \\cdot n).$ Sortowanie tablicy $2^\\frac{n}{2}$ elementów również zajmie nam $O(2^\\frac{n}{2} \\cdot n).$ To samo tyczy się odpowiadania na zapytania, więc sumarycznie udało nam się rozwiązać to zadanie w czasie $O(2^\\frac{n}{2} \\cdot n).$


## Sumy na podzbiorach podzbiórów

Ostatnia część dzisiejszej lekcji dotyczy problemu, który już rozważaliśmy: chcemy podać sumę wartości pewnej funkcji (na przykład xor) dla wszystkich podzbiorów każdego ze zbiorów. Nauczymy się teraz, jak robić to w $O(2^n \\cdot n)$ zamiast w $O(3^n \\cdot n),$ które uzyskaliśmy wcześniej. 


### Rozwiązanie


Na początku policzmy xora każdego z podzbiorów i wpiszmy do tablicy $DP[].$ Będziemy chcieli teraz wykonać sumowanie w taki sposób, aby po jego zakończeniu w $DP[x]$ znalazł się poprawny wynik dla zbioru $x.$


Niech $n$ będzie liczbą bitów. Dla każdego z nich dokonamy sumowania: jeśli $i$-ty bit w masce bitowej pewnego podzbioru wynosi $1$ to jego podzbiór może mieć w tym miejscu $0$ lub $1.$ Dodajemy ```DP[x] += DP[x ^ (1 << i)]```, żeby uwzględnić w sumie dla naszego podzbioru sumę jego podzbiorów, które mają $0$ w miejscu $i$-tego bita. Natomiast jeśli $i$-ty bit wynosi $0$ to podzbiór naszego podzbioru też musi mieć w miejscu $i$-tego bita $0.$


```cpp=

// Zakładamy, że w tablicy na DP[x] wstawione są już

// wartości funkcji dla zbioru x

// Chcemy więc tylko posumować z podzbiorami naszych zbiorów

for (int j = 0; j < n; j ++)

\ \ \ \ for (int i = 0; i < (1 << n); i ++)

\ \ \ \ \ \ \ \ if (i & (1 << j))

\ \ \ \ \ \ \ \ \ \ \ \ DP[i] += DP[i ^ (1 << j)];

```


Otrzymaliśmy bardzo proste do implementacji rozwiązanie działące w czasie $O(2^n \\cdot n).$ Jak przekonać się, że ono faktycznie działa? Spróbuj rozrysować sobie małe przypadki i zobaczyć, kiedy do $DP[x]$ wpadają sumy z podzbiorów $x.$


Jeśli spodobała Ci się ta technika, więcej na jej temat możesz znaleźć [tutaj.](http://codeforces.com/blog/entry/45223)


## Zadania

- [Szyfr (IX OI, III etap)](https://szkopul.edu.pl/problemset/problem/cBNmbxNBhgroqh5J3-bDmd7J/site/?key=statement)

- [Turystyka (XXI OI, III etap)](https://szkopul.edu.pl/problemset/problem/QGvPmh3HPUW0aZHn6EZuV-l1/site/?key=statement)

- [Ceny (AMPPZ 2014)](https://szkopul.edu.pl/problemset/problem/Oi53_Ox0ZJp4TPUAokh8mcYx/site/?key=statement)

"
---
