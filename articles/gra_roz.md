---
title: 'Drzewa rozpinające'
content: "
Drzewa są strukturami dużo łatwiejszymi w obsłudze niż zwykłe grafy. Każdy spójny graf $G$ posiada podgraf będący drzewem, który zawiera wszystkie wierzchołki $G.$ Nazywamy go <b>drzewem rozpinającym.</b> Czasem dokładne przyjrzenie się mu znacznie ułatwia rozwiązanie problemów.


### Drzewo DFS i BFS

Krawędzie, którymi wchodzimy do nieodwiedzonych wierzchołków algorytmem $DFS$ stworzą drzewo rozpinające, które nazwiemy drzewem $DFS.$


![Drzewo rozpinające DFS](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a4c396e85e42cd8c70b77b41383bf547.png)


Analogicznie krawędzie, którymi wchodzimy do nieodwiedzonych wierzchołków algorytmem $BFS$ stworzą inne drzewo rozpinające, które nazwiemy drzewem $BFS.$


![Drzewo rozpinające BFS](https://codimd.s3.shivering-isles.com/demo/uploads/upload_966a8c07c19cff247c43ef86ed2cbb75.png)


## Minimalne drzewo rozpinające

Zdecydowanie ciekawszym problemem jest wyznaczanie minimalnego drzewa rozpinającego – drzewa rozpinającego o minimalnej sumie wag krawędzi.


![Minimalne drzewo rozpinające o najmniejszej możliwej sumie wag krawedzi](https://codimd.s3.shivering-isles.com/demo/uploads/upload_7b0f63b10f4458cf3e0ebf07ed0b468e.png)


## Znajdowanie minimalnego drzewa rozpinającego

### Algorytm Prima

Algorytm Prima jest jedną z metod znajdowania minimalnego drzewa rozpinającego. Opiera się na podobnych założeniach, co algorytm Dijkstry. Załóżmy, że mamy już część naszego drzewa rozpinającego, której wierzchołki tworzą zbiór $S.$ W celu powiększenia $S$ musimy wziąć krawędź wychodzącą z $S.$ Będziemy brali zachłannie taką, która biegnie do wierzchołka spoza $S$ i ma minimalną wagę. Ten wierzchołek dodamy do naszego zbioru. W żadnym kroku nie stracimy możliwości zrobienia lepszego ruchu niż te, które wykonaliśmy.


Do zaimplementowania algorytmu Prima użyjemy kolejki priorytetowej, na którą będziemy wrzucać kolejne krawędzie wraz z wierzchołkami, do których biegną. Jego złożoność obliczeniowa wynosi $O((n + m) \\ log (n +  m)).$


```cpp=

void Prim() {

	odw[1] = true; //zaznaczamy, że wierzchołek nr 1 należy do S

	///wrzucamy na kolejkę wszystkie krawędzie wychodzące z S

	for (int i = 0; i < v[1].size(); i ++)

		q.push(make_pair(-waga[1][i], numer_krawedzi[1][i]));

	while (!q.empty()) {

		int nr = q.top().second, w = -q.top().first;

		q.pop();

		if (odw[krawedz[nr].first] && odw[krawedz[nr].second])

			continue; // krawedz prowadzi między dwoma

				  // wierzchołkami należącymi do S

		int a = krawedz[nr].first, b = krawedz[nr].second;

		// budujemy drzewo rozpinajace

		drzewo_rozpinajace[a].push_back(b);

		waga_krawedzi[a].push_back(w);

		drzewo_rozpinajace[b].push_back(a);

		waga_krawedzi[b].push_back(w);

		if (odw[a])

			swap(a, b); ///a ma być wierzchołkem spoza S

		odw[a] = true;

		for(int i = 0; i < v[a].size(); i ++)

			q.push(make_pair(-waga[a][i],

				numer_krawedzi[a][i]) );

	}

}

```


![Algorytm Prima - krok 1](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e52eb62d8549dff98f3efbf23ae95b23.png)


![Algorytm Prima - krok 2](https://codimd.s3.shivering-isles.com/demo/uploads/upload_d373e5e93e102f17936744a78033e4e3.png)


![Algorytm Prima - krok 3](https://codimd.s3.shivering-isles.com/demo/uploads/upload_76df0eb4119dacfd5a03776e8fb7854a.png)


### Algorytm Kruskala

Algorytm Kruskala również znajduje minimalne drzewo rozpinające. Rozpatruje wszystkie krawędzie należące do naszego grafu w kolejności rosnących wag. Na początku każdy wierzchołek jest osobną spójną. Jeżeli dana krawędź łączy dwa wierzchołki nie należące do tej samej spójnej, to jest ona krawędzią o minimalnej wadze, którą da się połączyć te spójne. Dodajemy ją do naszego drzewa rozpinającego i łączymy je używając struktury Find and Union. Po zakończeniu algorytmu otrzymamy jedną spójną połączoną $(n-1)$ krawędziami – drzewo rozpinające. Złożoność czasowa wynosi $O(\\alpha(n) \\cdot n + m \\cdot log \\ m),$ gdzie $\\alpha$ to bardzo wolno rosnąca funkcja (\"prawie\" stała), która bierze się z użycia struktury Find and Union.


![Algorytm Kruskala - krok 1](https://codimd.s3.shivering-isles.com/demo/uploads/upload_60cdead21fff6c4b8451f6c7e2b0428c.png)


![Algorytm Kruskala - krok 2](https://codimd.s3.shivering-isles.com/demo/uploads/upload_3e1b968a38b4cdb8ad63ad0362fdf1cd.png)


![Algorytm Kruskala - krok 3](https://codimd.s3.shivering-isles.com/demo/uploads/upload_984e76ee2f5ca65caabc1af52bf43cca.png)


### Algorytm Borůvki

Algorytm Borůvki jest już trzecią metodą na uzyskanie drzewa rozpinającego przy użyciu tych samych faktów. Na początku każdy wierzchołek jest osobną spójną. Dla każdej z nich weźmiemy najlżejszą krawędź, która z niej wychodzi, dodamy ją do drzewa rozpinającego i połączymy ją ze spójną, do której prowadzi. W ten sposób po n krokach liczba spójnych zmniejszy się dwukrotnie. Po $O(n\\ log\\ n)$ krokach uzyskamy drzewo rozpinające.


![Algorytm Boruvki krok po kroku](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a2c40b3742e27b6a73a57aeb987e3abb.png)


## Zadania

- [Żywopłot (XXIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/dABzva_j1-BvzKMsyxkuRoue/site/?key=statement)

- [Rozdroża parzystości (XXIV OI, III etap)](https://szkopul.edu.pl/problemset/problem/-7cqC3RrH4e-Ar7DWy4GKzLv/site/?key=statement)

- [Clearing Up (Codeforces, Div. 2 E)](https://codeforces.com/contest/141/problem/E)

"
---
