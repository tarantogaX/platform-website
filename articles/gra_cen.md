---
title: 'Centroid'
content: "
W zadaniach typu \"oblicz coś dla wszystkich ścieżek w drzewie, które...\" bardzo przydatna okazuje się technika rozbicia przez centroid - dziel i zwyciężaj na drzewie.


## Rozpatrywanie wszystkich ścieżek w grafie

Ukorzeńmy graf w wierzchołku $C.$ Jeśli ścieżka przechodzi przez $C,$ zaczyna się w poddrzewie jednego z jego synów i kończy albo w $C,$ albo w poddrzewie innego syna $C.$


![Ścieżki przechodzące przez korzeń](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a5f196a345f8396067e943edfb219cec.png)


Taką ścieżkę nazwiemy ścieżką typu pierwszego. Pozostałe, nie przechodzące przez $C,$ nazwiemy ścieżkami typu drugiego. Znajdują się one w całości, w poddrzewie jednego z synów $C.$


![Ścieżki nieprzechodzące przez korzeń](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4f269887d1b97a398f5b6698dbeb0375.png)


Kiedy nauczymy się \"obliczać coś dla wszystkich ścieżek pierwszego typu w drzewie, które...\", moglibyśmy to zrobić, następnie usunąć $C$ z drzewa i wywołać się rekurencyjnie na poddrzewach jego synów. Jest tak dlatego, że dla każdej ścieżki drugiego typu można wybrać inny wierzchołek $C$ tak, by stała się ścieżką pierwszego typu.


### Analiza czasowa


Załóżmy, że umiemy obliczać ścieżki pierwszego typu w $O(T(n)),$ gdzie $n$ to liczba wierzchołków w drzewie. Niech $|x|$ oznacza wielkość poddrzewa ukorzenionego w $x.$ Wówczas po pierwszym wywołaniu rekurencyjnym otrzymujemy złożoność rzędu $O(T(n) + \\sum T(|u_i|)) \\leq O(T(n) + T(n)),$ gdzie $u_i$ to $i$-ty syn $C.$ Po drugim wywołaniu koszt czasowy wyniesie $O(T(n) + T(n) + T(n)).$ Natomiast $r$ wywołań zajmie nie więcej niż $O((r+1) \\cdot T (n)) \\sim O(r \\cdot T(n)).$ Nie umiemy przyspieszyć $T(n).$ Czy umiemy tak wybierać kolejne wierzchołki $C,$ by $r$ było nieduże? Gdybyśmy nie umieli, nie byłoby tego artykułu ;)


## Centroid


Centroid to wierzchołek, który dzieli drzewo na poddrzewa o wielkości nie większej niż połowa całego drzewa. Każde drzewo ma jeden lub dwa centroidy połączone krawędzią.


<b>Dowód</b>: Wybierzmy dowolny wierzchołek $v$ i ukorzeńmy w nim nasze drzewo. Jeśli żadne z poddrzew synów $v$ nie jest większe niż $\\frac{n}{2},$ $v$ jest centroidem. W przeciwnym pod $v$ podstawimy syna, którego poddrzewo jest większe niż $\\frac{n}{2}.$ Może istnieć maksymalnie jeden taki syn. Nowe $v$ stanie się nowym korzeniem. Poddrzewo starego $v$ jest mniejsze niż $\\frac{n}{2}.$ Zmienianie $v$ wykonujemy tak długo, aż nie stanie się ono centroidem. Ponieważ nigdy się nie cofamy, a liczba wierzchołków w drzewie jest skończona w końcu największe poddrzewo będzie musiało być mniejsze niż $\\frac{n}{2}$ – program zawsze się zatrzyma, a centroid zawsze istnieje. Każdy syn $v,$ którego poddrzewo jest mniejsze niż $\\frac{n}{2}$ na pewno nie będzie centroidem, ponieważ gdyby był korzeniem, to poddrzewo $v$ byłoby większe niż $\\frac{n}{2}.$ Tym bardziej żaden wierzchołek w poddrzewie tego syna nim nie będzie. Natomiast syn, którego poddrzewo jest równe $\\frac{n}{2}$ będzie centroidem, a żaden wierzcholek w jego poddrzewie: nie. Taki syn może istnieć maksymalnie jeden i w oczywisty sposób jest połączony krawędzią z $v.$


![Centroid](https://codimd.s3.shivering-isles.com/demo/uploads/upload_72e34db992397087717ffe16a4c0b82a.png)


![Dwa centroidy](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f5e086fa49e0f0c6e74f28a3dffd972c.png)


#### Znajdowanie centroidu - implementacja


```cpp=

int find_centroid (int x){

	for (int i = 0;i < v[x].size(); i ++) {

		//w ile[x] trzymamy wielkosc poddrzewa x

		if (ile[v[x][i]] > n / 2) {

			//zmienienie korzenia zmienia wielkosci poddrzew

			ile[x] -= ile[v[x][i]];

			ile[v[x][i]] = n;

			return find_centroid(v[x][i]);

		}

	}

	return x;

}

```


## Rozbicie przez centroid

Jako wierzchołki $C$ wybieramy centroidy. Po każdej rekurencji rozmiar drzew będzie się dwukrotnie zmniejszał. To znaczy, że po $log \\ n$ krokach nie będziemy się mieli na czym wywoływać. Nasz algorytm działa w $O(T(n) log \\ n).$


```cpp=

int centroid_decomposition (int x) {

	// w tym miejscu należy przetworzyć przydatne

	// informacje o drzewie takie jak wielkości poddrzew
	

	int centroid = find_centroid(x);

	// rozwiąż problem dla ścieżek typu pierwszego, następnie

	// wyczyść wszystkie struktury, których będziesz potem używać
	

	//informacja, że tego wierzchołka już nie ma w drzewie

	wyrzucony[centroid] = true;

	for (int i = 0; i < v[centroid].size(); i ++) {

		if (!wyrzucony[v[centroid][i]])

			wyn += centroid_decomposition(v[centroid][i]);

			// lub wyn = max(wyn,

			// centroid_decomposition(v[centroid][i]));

	}

	return wyn;

}

```


## Zadanie: zerowe ścieżki

Dane jest drzewo ważone, którego wagi krawędzi są z zakresu $[-2; 2].$ Oblicz ile jest ścieżek, których suma wag krawędzi jest równa $0.$


### Rozwiązanie

Dla centroidu $C$ obliczymy wszystkie ścieżki typu pierwszego, których suma wag krawędzi jest równa $0.$ Nazwijmy je dobrymi. Następnie wywołamy się rekurencyjnie na poddrzewach jego synów. Niech $w(x)$ oznacza sumę wag na ścieżce od $C$ do $x.$ Te wartości można bardzo łatwo obliczyć w $O(n)$ zwykłym algorytmem DFS lub BFS. Dobre ścieżki to takie, które biegną między wierzchołkami $x$ i $y$ z poddrzew różnych synów $C,$ gdy $w(x) + w(y) = 0$ oraz takie, co biegną między $x$ a $C$ dla $w(x) = 0.$ Zliczenie tych drugich nie powinno być problemem. Z pierwszymi pomoże nam tablica $T.$ W $T[a]$ będziemy trzymali liczbę takich wierzchołków $k,$ które znajdują się we wcześniej przejrzanych poddrzewach synów $C$ i $w(k) = a.$ Przejrzymy po kolei wszystkie poddrzewa synów $C.$ Kiedy wejdziemy do wierzchołka $x$ można na $T[-w(x)]$ sposobów wybrać dobra ścieżkę, która ma w nim początek i kończy się w którymś z już odwiedzonych poddrzew. Dodając te wartości dla wszystkich wierzchołków otrzymamy wynik. Po wyjściu z poddrzewa syna $C$ należy zaktualizować $T$ o wierzchołki, które się w nim znajdują. Cały algorytm działa w $O(n \\cdot log \\ n).$


![Ścieżki w grafie z centroidem](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4780681f7c6682e2b311f358c05fbec6.png)


## Zadania

- [Polaryzacja (XX OI, III etap)](https://szkopul.edu.pl/problemset/problem/vG3DC9--8cjl4sPNwjBj9ag6/site/?key=statement)

- [Ciel the Commander (Codeforces, Div. 1 C)](https://codeforces.com/contest/321/problem/C)

- [Digit Tree (Codeforces, Div. 1 C)](https://codeforces.com/contest/715/problem/C)

"
---
