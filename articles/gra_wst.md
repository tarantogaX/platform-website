---
title: 'Wstęp do grafów'
content: "
## Rodzaje grafów
Graf jest strukturą, na którą składają się dwa typy elementów: wierzchołki oraz krawędzie, które łączą ze sobą pary wierzchołków.

![Graf](https://codimd.s3.shivering-isles.com/demo/uploads/upload_bc63c539a065160bdcf57a90a612c3e8.png)

Wierzchołki numerujemy w celu ich rozróżnienia. Na rysunkach są przedstawiane jako kółka, a krawędzie jako kreski między nimi. Wyróżniamy kilka podstawowych typów grafów:

- <b>Graf nieskierowany</b> - krawędzie są "symetryczne":

![Graf nieskierowany](https://codimd.s3.shivering-isles.com/demo/uploads/upload_2fe00b9092d5f8c9d8502d714c7153c2.png)

- <b>Graf skierowany</b> - krawędzie prowadzą z jednego wierzchołka do drugiego, jak np. jednokierunkowe drogi:

![Graf skierowany](https://codimd.s3.shivering-isles.com/demo/uploads/upload_84b20120578b891abe5a9ea0e43ee809.png)

- <b>Graf ważony</b> - krawędzie mają wagi, np. jak trudno jest je przebyć:

![Graf ważony](https://codimd.s3.shivering-isles.com/demo/uploads/upload_7fc9cfe92639674321470ee82cae3e30.png)

## Kilka definicji

- <b>Ścieżka</b> – ciąg wierzchołków $v_0, v_1, v_2, ... , v_k$ taki, że pomiędzy wierzchołkami $v_i$ i $v_{i+1}$ biegnie krawędź.

![Ścieżka](https://codimd.s3.shivering-isles.com/demo/uploads/upload_72b0f9c257b72cdc8c375c2e53e288a0.png)

- <b>Pętla</b> - krawędź z wierzchołka $a$ do $a.$

![Pętla](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c67fe67e08afd9bb051916665c9cd2a9.png)

- <b>Krawędź wielokrotna</b> – więcej niż 1 krawędź, które biegną między tymi samymi wierzchołkami.

![Krawędź wielokrotna](https://codimd.s3.shivering-isles.com/demo/uploads/upload_1b1266a84884ff7c20197ec0af37b3b3.png)

- <b>Cykl</b> – ścieżka, która zaczyna się i kończy na tym samym wierzchołku.

![Cykl](https://codimd.s3.shivering-isles.com/demo/uploads/upload_22281e46399389ae1be551b8c50fd713.png)

- <b>Cykl prosty</b> - cykl, który nie przechodzi przez żaden wierzchołek więcej niż raz.

![Cykl prosty](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c70003032220a8f3549bb72f9b0d7ffc.png)

- <b>Spójna składowa</b> – zbiór wierzchołków, między którymi istnieją ścieżki.

![Spójna składowa](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f25136724a8270278c90c4686034c65b.png)

- <b>Stopień wierzchołka</b> – liczba krawędzi, które z niego wychodzą.

![Stopień wierzchołka](https://codimd.s3.shivering-isles.com/demo/uploads/upload_29be69ac6b339cec9624091b9eec9abe.png)

Wierzchołki sąsiadują ze sobą, jeśli istnieje między nimi krawędź.

## Dwa sposoby implementacji grafu
### Macierz incydencji
Pierwszą metodą utrzymywania grafu w pamięci komputera jest macierz incydencji – dwuwymiarowa tablica $T.$ W przypadku grafu ważonego w $T[i][j]$ będziemy trzymać wagę krawędzi biegnącej między wierzchołkami $i$ i $j$ lub wartość spoza zakresu możliwych wag, gdy takowa nie istnieje. Dla grafu, który nie jest ważony $T[i][j] = 1,$ jeśli istnieje krawędź z $i$ do $j$ lub $0$ w przeciwnym wypadku.

![Macierz incydencji](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f301a1a51f2104841cbbc26c5f8bd26c.png)

Złożoność pamięciowa takiej implementacji wynosi $O(n^2)$ dla $n$ będącego liczbą wierzchołków. Chociaż zdecydowanie nie jest to optymalne podejście, macierze incydencji są czasami przydatne.

### Lista sąsiedztwa
Dużo częstszym i szybszym sposobem zapisywania grafu jest lista sąsiedztwa – vector lub lista $v.$ W $v[x]$ będziemy trzymać numery wszystkich sąsiadów $x$ lub krawędzi wychodzących z $x$ w zależności od tego, która implementacja będzie przyjemniejsza dla danego przypadku.

![Lista sąsiedztwa](https://codimd.s3.shivering-isles.com/demo/uploads/upload_103290ad6958f3a66728536bcac18892.png)

Złożoność pamięciowa takiego rozwiązania wynosi $O(m),$ gdzie $m$ to liczba krawędzi.

## Depth First Search - Przeszukiwanie grafu w głąb
Podstawową metodą poruszania się po grafie jest przeszukiwanie grafu w głąb – algorytm DFS. Podczas wędrówki, w zależności od problemu, będziemy liczyć różne wartości dla wierzchołka, który aktualnie przeglądamy. Następnie wywołamy się we wszystkich jego sąsiadach, w których jeszcze nie byliśmy i wykonamy analogiczne
operacje.

![Graf przeszukany w głąb](https://codimd.s3.shivering-isles.com/demo/uploads/upload_d62a6fcaa4cfd326612c4a6ab8ed3df1.png)

```cpp=
bool odw[MAX_N]; //Jesli odw[x] = 1, x został już odwiedzony
void dfs (int x) {
	odw[x] = true; //oznaczamy x jako odwiedzony
	
	//tutaj wykonujemy jakieś obliczenia dla danego problemu
	
	//przegladamy wszystkich sasiadow
	for(int i = 0; i < v[x].size(); i ++)
		//jesli jeszcze nie odwiedzilismy danego sasiada,
		//musimy to zrobic
		if(odw[v[x][i]] == false)
			dfs(v[x][i]);
			
	//tutaj wykonujemy inne obliczenia dla danego problemu
}
```

$DFS$ jest przykładem funkcji rekurencyjnej – wywołującej samą siebie. Zauważmy, że skoro dla każdego wierzchołka przeglądamy wszystkich jego sąsiadów, to podczas działania algorytmu przejrzymy całą spójną składową. W celu przejścia po grafie wystarczy puścić po jednym $DFS$'ie dla każdej z nich.

```cpp=
for(int i = 1; i <= n; i ++)
	if(odw[i] == false)
		dfs(i);
```

Złożoność czasowa $DFS$'a wynosi $O(n + m),$ ponieważ do każdego z $n$ wierzchołków wejdziemy dokładnie raz i przejrzymy w sumarycznym czasie $O(m)$ całą listę sąsiedztwa.

## Breadth First Search – Przeszukiwanie grafu wszerz
$BFS$ działa podobnie jak $DFS,$ jednak przeszukuje wierzchołki w innej kolejności. Zamiast wywoływać się rekurencyjnie, najpierw odwiedzimy wszystkich sąsiadów, a następnie wszystkich nieodwiedzonych jeszcze sąsiadów sąsiadów itd. W tym celu będziemy utrzymywać $q$ – kolejkę nieodwiedzonych wierzchołków, o których istnieniu wiemy. Załóżmy, że jesteśmy obecnie w $x.$ Policzymy to, co musimy obliczyć, a następnie wrzucimy na koniec kolejki wszystkich nieodwiedzonych sąsiadów $x.$ Kiedy skończymy obliczenia dla $x,$ zaczniemy przetwarzać wierzchołek z początku $q.$

```cpp=
void bfs(int pp) { // pp: wierzcholek, z którego zaczynamy bfs’a
	odw[pp] = true;
	q.push(pp);
	while (!q.empty()) {
		int x = q.front();
		q.pop();
		
		// w tym miejscu wykonujemy jakieś obliczenia
		// dla danego problemu
		
		//przegladamy wszystkich sasiadow
		for (int i = 0; i < v[x].size(); i ++)
			if(odw[v[x][i]] == false) {
				odw[v[x][i]] = true;
				q.push(v[x][i]);
			}
	}
}
```

![Graf przeszukany wszerz](https://codimd.s3.shivering-isles.com/demo/uploads/upload_b75d48b41e9130382eb0cf06398a1ba7.png)

Tak samo jak w przypadku $DFS$'a, $BFS$ przejrzy całą spójną składową. Złożoność czasowa to również $O(n + m).$

## Cykl Eulera
Cykl Eulera jest to cykl, który przechodzi przez wszystkie krawędzie grafu dokładnie raz.

![Cykl Eulera](https://codimd.s3.shivering-isles.com/demo/uploads/upload_d1cf1c0578686137c6b9601e2f27aafc.png)

<b>Twierdzenie</b>: Cykl Eulera w spójnym grafie nieskierowanym istnieje wtedy i tylko wtedy, gdy wszystkie jego wierzchołki mają parzysty stopień.

<b>Dowód</b>: Przechodząc przez kolejne wierzchołki cyklu, do każdego z nich wejdziemy tyle samo razy, co wyjdziemy. Jeśli w grafie istnieje wierzchołek o stopniu nieparzystym, jest to niemożliwe. Oznacza to, że wierzchołki muszą mieć parzyste stopnie.

![Wchodzenie i wychodzenie z wierzchołka](https://codimd.s3.shivering-isles.com/demo/uploads/upload_df22f813593f969b419d903e12092c99.png)

Niech $x$ będzie wierzchołkiem, w którym wywołamy algorytm $DF$S. Zamiast wchodzić do nieodwiedzonych wierzchołków, przechodzimy nieodwiedzonymi krawędziami. Niech $d(a)$ będzie liczbą nieodwiedzonych krawędzi wychodzących z wierzchołka $a.$ Po przejściu z $x$ do jego sąsiada, $d(x)$ stanie się nieparzyste. Po wywołaniu $DFS$’a w jakimkolwiek innym wierzchołku $y$ $d(y)$ będzie nieparzyste – większe od zera. Oznacza to, że zawsze da się wejść, do któregoś z jego synów, co też zrobimy. Nie wywołamy $DFS$’a w sąsiedzie wierzchołka a tylko wtedy, gdy po wejściu do a, $d(a)$ będzie równe zero. Ponieważ $0$ jest parzyste, taka sytuacja zachodzi tylko dla $a = x.$ Jako, że $m$ jest skończone, kiedyś będzie musiało do tego dojść. Podczas wychodzenia z danego wierzchołka, dodamy krawędź, którą do niego weszliśmy na stos. Kiedy powrócimy do wierzchołka $y,$ dla którego $d(y) > 0,$ przejdziemy nieodwiedzoną krawędzią do jego sąsiada. Analogicznie co poprzednio, zatrzymamy wywoływanie $DFS$’a dopiero, kiedy wrócimy do $y.$ Z tego powodu po zakończeniu algorytmu na stosie znajdzie się cykl Eulera.

```cpp=
void dfs (int x) {
	for (int i = 0; i < v[x].size(); i ++)
	if (!odw[nr_krawedzi[x][i]]) {
		odw[nr_krawedzi[x][i]] = true;
		dfs(v[x][i]);
		stos.push_back(nr_krawedzi[x][i]);
	}
}
```

## Ścieżka Eulera

Ścieżka Eulera to ścieżka, która przechodzi przez wszystkie krawędzie grafu dokładnie raz i kończy w innym wierzchołku niż zaczyna.

![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e107ddae2719aef669feb2dcf12dacb4.png)

<b>Twierdzenie</b>: Ścieżka Eulera w spójnym grafie nieskierowanym istnieje wtedy i tylko
wtedy, gdy wszystkie wierzchołki oprócz dwóch mają parzysty stopień.

Dowód jest analogiczny do poprzedniego, więc pozostawiam go jako proste ćwiczenie dla czytelnika. Algorytm znajdowania ścieżki Eulera również jest podobny: wybieramy jako wierzchołek startowy jeden z wierzchołków o nieparzystym stopniu, a następnie puszczamy z niego prosty algorytm DFS.

## Zadania
- [Bitmapa (VI OI, II etap)](https://szkopul.edu.pl/problemset/problem/fIwYfy0zzmVZJJXTShFq2ICC/site/?key=statement)
- [Trójkąty jednobarwne (IV OI, III etap)](https://szkopul.edu.pl/problemset/problem/UU2Uj-barjiONnRxd9aEVoDj/site/?key=statement)
- [Zwiedzanie miasta (VIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/rWYE5XwIo1j6GRd_Js7Jfv3U/site/?key=statement)
"
---
