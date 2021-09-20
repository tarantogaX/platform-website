---
title: 'Najkrótsze ścieżki'
content: "
W przypadku grafu bez wag długością ścieżki jest liczba krawędzi, które na niej leżą. Znajdowanie najkrótszej między dwoma wierzchołkami można wykonać poprzez wywołanie algorytmu BFS. Dużo ciekawsze są grafy ważone, gdzie długością ścieżki jest suma wag krawędzi, które się na niej znajdują.

## Algorytm Dijkstry
Jeżeli wszystkie ścieżki mają dodatnie wagi, możemy stosować algorytm Dijkstry. Znajduje on długości najkrótszych ścieżek między wybranym wierzchołkiem $x$ a wszystkimi innymi. Do jego implementacji użyjemy kolejki priorytetowej $q$ i tablicy $D.$ W $D[k]$ po zakończeniu programu będzie się znajdować długość najkrótszej ścieżki biegnącej z $x$ do $k.$

Na początku dla każdego $y \neq x$ $D[y] = INF,$ gdzie $INF$ to „nieskończoność”. Ponieważ nie jesteśmy w stanie trzymać jej w pamięci komputera, wystarczy, że naszą „nieskończonością” będzie duża liczba, większa niż długość najdłuższej możliwej do uzyskania najkrótszej ścieżki – sumy wag wszystkich krawędzi znajdujących się w grafie. Jeżeli po zakończeniu algorytmu dla wierzchołka $k$ zachodzi $D[k] = INF,$ nie istnieje ścieżka między $x$ a $k.$

Kiedy dla wierzchołka $v$ uda nam się zmniejszyć jego $D[v],$ na kolejkę priorytetową wrzucimy parę $(-D[v], v).$ Z przodu zawsze znajdzie się największy element – ten, którego $D[v]$ jest najmniejsze. Najkrótsza ścieżka między $x$ a $x$ to ścieżka pusta – $D[x] = 0.$ Możemy więc wrzucić parę $(0, v)$ na naszą kolejkę.

Dopóki kolejka nie będzie pusta, usuwamy parę z jej początku i przetwarzamy wierzchołek $v,$ który był jej częścią. Niech $u$ będzie sąsiadem $v,$ a krawędź, która je łączy ma wagę $c.$ Z $x$ do $v$ mogliśmy przejść ścieżką o długości $D[v],$ natomiast z $v$ do $u$ prowadzi ścieżka o długości $c.$ Oznacza to, że istnieje ścieżka z $x$ do $u$ o długości $D[v] + c.$ Jeśli $D[v] + c$ jest mniejsze od aktualnego $D[u],$ możemy zaktualizować $D[u]$ i wrzucić parę $(-D[u], u)$ na kolejkę priorytetową.

### Algorytm Dijkstry krok po kroku
![Algorytm Dijkstry - krok 1](https://codimd.s3.shivering-isles.com/demo/uploads/upload_9d219c4c5f38a15e04955ef2f4b48444.png)

![Algorytm Dijkstry - krok 2](https://codimd.s3.shivering-isles.com/demo/uploads/upload_16549d45697f0f566fe9378c5f893c12.png)

![Algorytm Dijkstry - krok 3](https://codimd.s3.shivering-isles.com/demo/uploads/upload_630c1a81703e9463dfdaa0d3d00118c8.png)

![Algorytm Dijkstry - krok 4](https://codimd.s3.shivering-isles.com/demo/uploads/upload_3dabd09f8de00dc03b798656401ddd65.png)

![Algorytm Dijkstry - krok 5](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f40dc2f29858d48b2fd8f0d18063c072.png)

![Algorytm Dijkstry - krok 6](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e0adca051387befda19bb0cd07b49f61.png)

![Algorytm Dijkstry - krok 7](https://codimd.s3.shivering-isles.com/demo/uploads/upload_5c5dfffaf40943eeb4a53642c3979097.png)

![Algorytm Dijkstry - krok 8](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4b10bac56e1bd6c29bd060a4f86ef33a.png)

![Algorytm Dijkstry - krok 9](https://codimd.s3.shivering-isles.com/demo/uploads/upload_732e5cd31e135bcf3a422ac92a170fca.png)

![Algorytm Dijkstry - krok 10](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c28f77352306c7e907be1c24a6d6ce88.png)

### Dowód poprawności i analiza Dijkstry
Oznaczmy przez $S$ zbiór wierzchołków, które zostały już zdjęte z kolejki. Dowód opiera się na następujących dwóch faktach (niezmiennikach), prawdziwych przez cały czas trwania algorytmu:

Dla każdego wierzchołka $v \in S,$ liczba $d [ v ]$ jest długością najkrótszej ścieżki od $s$ do $v.$

Dla każdego wierzchołka $v \not\in S,$ $d [ v ]$ jest długością najkrótszej krawędzi do $v$ prowadzącej tylko przez wierzchołki z $S.$

Na początku oba fakty są oczywiste ($S$ jest zbiorem pustym). Przy zdejmowaniu wierzchołka $u$ z kolejki wiemy, na podstawie faktu 2, że nie da się do niego dojść żadną krótszą drogą przez wierzchołki z $S.$ Z drugiej strony, ponieważ $u$ ma najniższy priorytet, przejście przez jakikolwiek inny wierzchołek spoza $S$ dałoby od razu co najmniej tak samo długą ścieżkę. A zatem dołączając wierzchołek $u$ do $S,$ zachowujemy prawdziwość faktu 1. Następnie musimy uwzględnić fakt, że najkrótsza ścieżka do jakiegoś wierzchołka $v$ po wierzchołkach z nowego zbioru $S$ może teraz zawierać wierzchołek $u.$ Ale wtedy musi on być ostatnim na niej wierzchołkiem (do każdego innego dałoby się dojść krócej, nie używając $u,$ a zatem jej długość równa jest $d [ u ] + w ( u , v )$ i zostanie prawidłowo obliczona w następnym kroku algorytmu.

Jako że żadnego wierzchołka nie rozpatrzymy więcej razy, niż wynosi jego stopień, a operacje na kolejce priorytetowej zajmują czas logarytmiczny, złożoność czasowa całego algorytmu wyniesie $O((n + m) \ log (n + m)),$ gdzie $n$ i $m$ to kolejno liczba wierzchołków i krawędzi.

### Odzyskiwanie najkrótszej ścieżki
Mając obliczoną tablicę $D$ bardzo prosto znaleźć jedną z najkrótszych ścieżek między $x$ a wybranym wierzchołkiem $v.$ Niech $u$ będzie synem $v,$ a $c$ wagą krawędzi między $v$ i $u.$ Zauważmy, że jeśli $D[u] + c = D[v],$ przez krawędź $(u, v)$ przechodzi jedna z najkrótszych ścieżek. Możemy wrzucić ją na stos i wywołać się rekurencyjnie na wierzchołku $u.$ W momencie, gdy wywołamy się na $x,$ na stosie znajdzie się najkrótsza ścieżka między $x$ i $v.$

## Ujemne cykle i algorytm Bellmana - Forda
Kiedy w grafie pojawiają się krawędzie o ujemnych wagach, może wystąpić ujemny cykl, czyli cykl, w którym suma wag krawędzi jest ujemna. Wówczas długość każdej ścieżki da się skrócić przechodząc przez niego. Zawsze będzie się to opłacać, więc nigdy nie przestaniemy tego robić – najkrótsze ścieżki nie istnieją.

Z pomocą przychodzi algorytm Bellmana – Forda, który, jeśli ujemny cykl nie istnieje, tak samo, jak Algorytm Dijkstry, znajduje długości najkrótszych ścieżek między wybranym wierzchołkiem $x$ a wszystkimi innymi. Dijkstra w przeciwnym wypadku zwraca błąd.

Na początku zauważmy, że liczba krawędzi na najkrótszej ścieżce jest nie większa niż $n – 1.$ Dlaczego? Otóż jaki jest sens przechodzić dwa razy przez ten sam wierzchołek jeśli ujemny cykl nie istnieje? Żaden. Skoro na ścieżce będzie maksymalnie $n$ wierzchołków, to będzie maksymalnie $(n–1)$ krawędzi.

Tak samo, jak w algorytmie Dijkstry, potrzebujemy tablicy $D$ i na początku ustawimy $D[x] = 0$ i $D[y] = INF$ dla $y \neq x.$ Jednakże kolejne operacje będą dużo bardziej "tępe". Dla każdego wierzchołka $v,$ dla każdego jego sąsiada $u$ sprawdzimy, czy $D[v]$ $+$ $c$ $<$ $D[u]$ i zaktualizujemy $D[u].$ Oczywiście to jeszcze nie działa. Jednakże, jeśli wykonamy te operacje $(n - 1)$ razy, to rozważymy wszystkie ścieżki o długości nie większej niż $(n - 1):$ znajdziemy te najkrótsze. Koszt czasowy wyniesie $O(n \cdot (n + m)).$ Pozostało jeszcze dowiedzieć się, czy istnieje cykl. Jeśli po $(n-1)$-szym powtórzeniu algorytmu istnieje para wierchołków $v$ i $u$ połączonych krawędzią o wadze $c$ takich, że $D[v] + c < D[u],$ na najkrótszej ścieżce od $x$ do $u$ jest więcej niż $n$ $–$ $1$ krawędzi – istnieje ujemny cykl.

```cpp=
// funkcja BF zwraca true jeśli znalazł najkrótsze ścieżki
// lub false jeśli istnieje ujemny cykl
bool BF () {
	for (int i = 1; i <= n; i ++)
		D[i] = INF;
	D[x] = 0;
	for (int I = 1; I < n; I ++) {
		for (int v = 1; v <= n; v ++)
			for (int i = 0; i < sasiedzi[v].size(); i ++)
				if (D[v] + waga[v][i] < D[sasiedzi[v][i]])
					D[sasiedzi[v][i]]
						= D[v] + waga[v][i];
	}
	
	//sprawdanie, czy istnieje ujemny cykl
	for (int v = 1; v <= n; v ++)
		for (int i = 0; i < sasiedzi[v].size(); i ++)
			if (D[v] + waga[v][i] < D[sasiedzi[v][i]])
				return false;
	return true;
}
```


## Algorytm Floyda - Warshalla
Jeśli policzenie najkrótszych ścieżek od jednego wierzchołka do pozostałych nie jest
wystarczająco satysfakcjonujące, możemy użyć algorytmu Floyda-Warshalla. To cudeńko służy do obliczania najkrótszych ścieżek między każdą parą wierzchołków. Tym razem tablica $D$ będzie dwuwymiarowa. W $D[x][y]$ po zakończeniu algorytmu będzie znajdować się długość najkrótszej ścieżki od $x$ do $y.$ Na początku $D[x][x] = 0$; dla $y \neq x D[x][y]$ jest równe wadze krawędzi między $x$ i $y.$ Jeśli takowa nie istnieje, $D[x][y] = INF.$ W tym miejscu użyjemy programowania dynamicznego. Dla każdej trójki $u, x, y$ sprawdzimy, czy $D[x][u] + D[u][y] < D[x][y].$ Jeśli tak, istnieje ścieżka, która składa się ze ścieżek z $x$ do $u$ i z $u$ do $y,$ która jest krótsza niż obecnie policzona najkrótsza ścieżka z $x$ do $y.$ Możemy ją zaktualizować.

![Znajdywanie optymalniejszej ścieżki](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a7006fe8238b48cf0fb962782b2194f1.png)

Jako że powyższe operacje zostaną wykonane dla wszystkich trójek wierzchołków, znajdziemy najkrótsze ścieżki w czasie $O(n^3)$ zużywając $O(n^2)$ pamięci.

```cpp=
for(int u = 1; u <= n; u ++)
	for(int x = 1; x <= n; x ++)
		for(int y = 1; y <= n; y ++)
			D[x][y] = min(D[x][y], D[x][u] + D[u][y]);
```

## Zadania
- [Zawody (XI OI, I etap)](https://szkopul.edu.pl/problemset/problem/UiDG8sd_wsS2RfUPL3zQQ1XW/site/?key=statement)
- [Połączenia (X OI, II etap)](https://szkopul.edu.pl/problemset/problem/91AzX729-axIOm15TM0n2IlS/site/?key=statement)
- [Morskie opowieści (XX OI, II etap)](https://szkopul.edu.pl/problemset/problem/CfSEK4ACOcAPaAfX29Fp7Tud/site/?key=statement)
"
---
