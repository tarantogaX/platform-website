---
title: 'Potęgowanie dynamików'
content: "
Czasami potrzebujemy policzyć pewnego dynamika wiele razy. W pewnych przypadkach możemy zastosować potęgowanie dynamików (a dokładniej, ich wyników) do przyspieszenia tej operacji. Skoro potrafimy potęgować liczby w czasie logarytmicznym, to dlaczego mielibyśmy nie zrobić tego samego z dynamikami?

## Liczba ścieżek w grafie

Jeśli nie miałeś wcześniej styczności z grafami, przed przejściem do tego zadania przeczytaj artykuł  \"Co to jest graf? \" z sekcji o grafach.

Mamy dany pewien nieważony, nieskierowany graf oraz liczbę $M\\leq 10^9.$ Chcemy dla każdej pary wierzchołków znaleźć liczbę ścieżek między nimi, które są długości $M$ (ścieżka może używać danej krawędzi więcej niż raz).

### Rozwiązanie

Spróbujmy zacząć od rozważenia małych $M:$ najpierw niech $M = 0.$ Wówczas tylko z wierzchołka do niego samego istnieje ścieżka długości $0.$ Dla $M = 1$ tylko dla par wierzchołków, pomiedzy którymi jest krawędź, istnieje ścieżka długości $1.$ 


No dobrze, a co z większymi $M$? Zauważmy, że ścieżki mają pewną ciekawą własność. Niech $M = 2^k.$ Czym jest ścieżka długości $2^k?$ Dwoma ścieżkami długości $2^{k-1},$ połączonymi w środkowym wierzchołku. Jest to prawdą nie tylko dla ścieżek długości $2^k:$ dla dowolnych $x, y > 0$ ścieżka długości $x + y$ to ścieżki długości $x$ i $y,$ które spotykają się w wierzchołku. 


![Łączenie ścieżek](https://codimd.s3.shivering-isles.com/demo/uploads/upload_348fcdf0157fac2b75a7f68a5911c767.png)


To pozwala nam skonstruować efektywny algorytm liczenia ścieżek. Dla każdego $i$ policzymy $pathp[i][a][b]$: liczbę ścieżek długości $2^i$ w naszym grafie pomiędzy wierzchołkami $a$ i $b.$ 


Jak znaleźć $path[0][][]$ już omówiliśmy. Co więcej, omówiliśmy też jak znaleźć $path[i][][].$ Wystarczy teraz zaimplementować nasze rozwiązanie.


```cpp=

// nauczymy się liczyć paths[i][a][b]

// n - liczba wierzchołków, m - liczba krawędzi, M - długość ścieżek

// A[m] i B[m]: tablice z końcami krawędzi

void countPaths(int n, int m, int A[], int B[], int M) {

	for (int i = 1; i <= m; i ++) {

		paths[0][A[i]][B[i]] ++;

		if (A[i] != B[i])

			// każda krawędź prowadzi w obie strony

			paths[0][B[i]][A[i]]++;

	}

	for (int i = 1; i <= log2(M) + 1; i ++)

		for (int a = 1; a <= n; a ++)

			for (int b = 1; b <= n; b ++) {

				paths[i][a][b] = 0;

				for (int mid = 1; mid <= n; mid ++)

					paths[i][a][b] += paths[i-1][a][mid]

						* paths[i-1][mid][b];

			}

	// dla dużych n i m trzeba pamiętać o long longach lub modulowaniu

}

```


Pora na analizę złożoności: Tablica $path$ ma $log \\ M \\cdot n \\cdot n$ komórek. Dla każdej z nich przeglądamy każdy wierzchołek grafu jako potencjalny środek ścieżki, czyli sumarycznie złożoność czasowa to $O(n^3\\cdot log \\ M).$


## Potęgowanie macierzy

Okazuje się, że przed chwilą nauczyliśmy się potęgować macierze. Musimy się jeszcze dowiedzieć dlaczego i czym w ogóle są macierze. Macierz to po prostu tablica dwuwymiarowa. Dodawanie lub odejmowanie dwóch macierzy to nic innego jak dodawanie lub odejmowanie odpowiadających sobie liczb. Mnożenie macierzy jest zdefiniowane w następujący sposób:


```cpp=

// Pierwsza macierz: A[n][m], druga macierz: B[m][o].

// Wynikowa macierz: W[n][o]

// A, B i W indeksujemy od 1.

void pomnozMacierze() {

	for (int i = 1; i <= n; i ++)

		for (int j = 1; j <= o; j ++)

			for (int k = 1; k <= m; k ++)

				W[i][j] += A[i][k] * B[k][j];

}

```


To jest dokładnie to, co zrobiliśmy. Liczbę $k$ w tym wzorze możemy utożsamiać ze środkowym wierzchołkiem naszej ścieżki. Wygląda podobnie, prawda? Porównaj te dwa kody.


### Cache'owanie

Na czas działania naszego programu wpływa wiele czynników, nie tylko złożoność czasowa. Jednym z nich jest odczytywanie danych z pamięci, które wykonuje nasz program. W zależności od tego, jak bardzo przyjacielski jest nasz program dla tej pamięci, możemy otrzymać szybsze lub wolniejsze rezultaty. Ogólnie chodzi o to, żeby Twój program jak najmniej skakał po pamięci w komputerze. Im dłuższe skoki, tym więcej potrzeba na nie czasu.


- Odwoływanie się do tablicy losowo zamiast w kolejności od $T[0]$ do $T[n]$ potrafi być mniej więcej $5$-krotnie wolniejsze dla $n$ rzędu $10^6.$ Naprawdę!

- Kiedy deklarujemy tablice kilkuwymiarowe warto zastanowić się, w jaki sposób będziemy z nich korzystać. Na przykład, tablica $T[MALO][DUZO]$ potrafi być znacznie wolniejsza od $T[DUZO][MALO]$ w jednych przypadkach, a szybsza w innych. Jest tak dlatego, że tablica $T[X][Y]$ składa się z $X$ bloków po $Y$ elementów, a nie chcemy skakać po pamięci.


Dlaczego wspominam o tym akurat teraz? Otóż, przedstawiony powyżej algorytm potęgowania macierzy jest poprawny, ale nieoptymalnie zarządza pamięcią. Dwie ostatnie pętle powinniśmy zamienić miejscami. Zwróć uwagę, że nie ma to wpływu na poprawność algorytmu. Warto poeksperymentować i zobaczyć, że drugie rozwiązanie jest szybsze.


```cpp=

void pomnozMacierzeSzybciej() {

	for (int i = 1; i <= n; i ++)

		for (int k = 1; k <= m; k ++)

			for (int j = 1; j <= o; j ++)

				W[i][j] += A[i][k] * B[k][j];

}

```


Różnica między tymi dwoma podejściami jest dokładnie opisana [tutaj.](https://stackoverflow.com/questions/7395556/why-does-the-order-of-loops-in-a-matrix-multiply-algorithm-affect-performance)


Mam dla Ciebie dobrą wiadomość. Osoby tworzące Olimpiadę Informatyczną wymyśliły <b>oitimetool</b>, czyli olimpijskie narzędzie do sprawdzania czasu działania programu. Jedną z jego najciekawszych cech jest niwelowanie znaczenia cache'owania. Dzięki niemu nie musisz martwić się, czy optymalnie zarządzasz pamięcią.


## Obliczanie ciągu rekurencyjnego potęgowaniem

Mamy dany wzór rekurencyjny na ciąg $a$: $a_n = c_1\\cdot a_{n-1} + c_2\\cdot a_{n-2} + c_3\\cdot a_{n-3}$ $+ ... + c_k \\cdot {a_{n - k}},$ gdzie $c_i$ są stałymi współczynnikami. Możemy łatwo wyliczyć $a_n$ w czasie $O(n\\cdot k),$ licząc kolejne wyrazy ciągu, każdy w czasie $O(k).$ Co jednak, jeśli chcemy obliczyć np. miliardowy wyraz ciągu?


### Rozwiązanie - potęgowanie macierzy ciągu


Okazuje się, że potrafimy policzyć $n$-ty wyraz w czasie $O(log\\ n \\cdot k^3),$ co pozwoli nam obliczać wynik dla $n$ rzędu $10^{18}.$ Jak to zrobić?


Zacznijmy od prostej obserwacji: nie potrzebujemy pamiętać więcej niż $k$ ostatnich liczb ciągu. Mając je w tablicy: $[a_n, a_{n-1}, a_{n-2}, ..., a_{n-k}],$ chcemy nauczyć się  \"przesuwać \" nasz ciąg o jeden element do przodu, czyli robić taką operację, aby po jej wykonaniu pamiętane przez nas elementy były równe $[a_{n+1}, a_{n}, a_{n-1}, ..., a_{n-k+1}].$ 


Jak to zrobić? Do nowego pierwszego elementu musi wpadać $a_n = c_1\\cdot a_{n-1} + c_2\\cdot a_{n-2} + c_3\\cdot a_{n-3}$ $+$ ... $+ c_k \\cdot {a_{n - k}},$ a pozostałe muszą przesunąć się o jeden w prawo. Możemy oczywiście robić to pętlą for, ale pomyślimy o tym inaczej.


Spróbujmy znaleźć taką macierz $M$ o wymiarach $k \\times k,$ żeby po przemnożeniu naszej ciągu ostatnich $k$ elementów przez tę macierz dostać następny ciąg. Zacznijmy od wypełnienia naszej macierzy samymi zerami. Dla $i$ od $2$ do $n$ chcemy, aby w wyniku  \"spadła \" liczba z poprzedniego miejsca w ciągu: $M[i][i-1]=1:$ liczba spadnie, gdy zostanie przemnożona przez $1.$ W pierwszym wierszu macierzy wpisujemy natomiast nasze współczynniki $c,$ a cała macierz wygląda tak:


\\begin{bmatrix}
c_{1}       & c_{2} & c_{3} & \\dots & c_{k - 1} & c_{k}\\\\
1       & 0 & 0 & \\dots & 0 & 0 \\\\
0       & 1 & 0 & \\dots & 0 & 0 \\\\
0       & 0 & 1 & \\dots & 0 & 0 \\\\
\\vdots & \\vdots & \\vdots & \\ddots & \\vdots & \\vdots \\\\
0       & 0 & 0 & \\dots & 1 & 0 \\\\
\\end{bmatrix}


Kiedy $[a_n, a_{n-1}, a_{n-2}, ..., a_{n-k}]$ przez tę macierz, faktycznie otrzymamy $[a_{n+1}, a_{n}, a_{n-1}, ..., a_{n-k+1}].$ Co to nam daje? Skoro nauczyliśmy się przesuwać o $1,$ to możemy też przesuwać o dowolne $M$ -- nic nie stoi na przeszkodzie, by najpierw podnieść macierz przesunięcia do $M$-tej potęgi używając algorytmu, który już znamy, a dopiero potem przemnożyć przez naszą tablicę. Podniesienie macierzy $k \\times k$ do $M$-tej potęgi zajmuje nam czas $O(log \\ M \\cdot k^3).$ Taki jest też sumaryczny czas działania naszego algorytmu


## Ustawianie królów na szachownicy

Wyobraźmy sobie, że mamy długą planszę $k \\times l,$ przy czym $k \\leq 10, \\ l \\leq 10^9.$ Na ile sposobów możemy ustawić królów na tej planszy tak, aby się nie szachowali? Dwaj królowie szachują się, jeśli sąsiadują bokiem lub rogiem.


### Rozwiązanie - potęgowanie rekurencyjne wyniku

Liczba wierszy jest nieduża, spróbujmy więc to wykorzystać. Mamy $2^k$  możliwych ustawień króli w jednej kolumnie - to całkiem niedużo. Możemy rozpatrzyć je wszystkie i sprawdzić, które z nich są zgodne z warunkami zadania. Niech takich  \"dobrych \" kolumn będzie $w.$ Dla każdej pary prawidłowych kolumn $i, j$ chcemy dowiedzieć się, czy ułożenie, w którym kolumna reprezentowana przez $i$ może stać obok kolumny reprezentowanej przez $j$ jest poprawne. To możemy sprawdzić zrobić brutalnie forem.
Dla uproszczenia załóżmy jeszcze, że zerowa kolumna jest ustalona i stoi w niej $0$ króli.


Co nam powstało? Jeśli prawidłowe kolumny potraktujemy jako wierzchołki grafu, a przejścia między kolumnami jako krawędzie to okaże się, że w takim grafie chcemy znaleźć ścieżkę długości $m$ z wierzchołka $0$ (pusta kolumna) do jakiegokolwiek innego wierzchołka. Liczenie ścieżek w grafie już omówiliśmy. Całe rozwiązanie zadziała w czasie $O(2^{2k} + w^3\\cdot log \\ M),$ gdzie $w$ jest liczbą prawidłowych kolumn (czyli liczbą wierzchołków grafu).


To oraz poprzednie zadanie pokazują, że gdy umiemy zrobić przejście o $1$ w $O(x),$ bardzo często umiemy też zrobić przejście o dowolne $M$ w $O(log \\ M \\cdot x).$ Wystarczy tylko przeanalizować, w jaki sposób mają zmieniać nam się elementy lub po prostu zmodelować sytuację jako graf.


## Zadania:

- [Posłaniec (XXIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/Mk-9GNDtSal6h_8T4n9Ezq9M/site/?key=statement)

- [Wycieczki (XXII OI, III etap)](https://szkopul.edu.pl/problemset/problem/zKf5Ua8okcS0jngsrTgKVM9L/site/?key=statement)

- [Chomiki (XVII OI, II etap)](https://szkopul.edu.pl/problemset/problem/mLv0a_y18C5vj5J6jFK2gbwr/site/?key=statement)

"
---
