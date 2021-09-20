---
title: 'Drzewo trie'
content: "
Umiesz już porównywać słowa i korzystać z ich ciekawych własności. Na dzisiejszej lekcji nauczysz się jak optymalnie trzymać cały język (czyli zbiór słów) w pamięci komputera. Nasza struktura musi umieć:
- dodawać nowe słowo do języka,
- sprawdzać, czy dane słowo występuje w języku,
- poosiadać dostęp do wszystkich słów i umieć zapisywać dla nich dodatkowe informacje potrzebne w danym zadaniu

## Drzewo Trie
![Drzewo trie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_06a17c4f8d0cb3dc92bd831293ca2c0a.png)
Strukturą, która ma wszystkie powyższe umiejętności jest drzewo trie. Składa się ono z wierzchołków połączonych krawędziami. Wierzchołek na samej górze nazywa się korzeniem. Każdej krawędzi jest przypisana pojedyncza literka. Jeśli w wierzchołku kończy się jakieś słowo to znajduje się w nim jego unikalny numer (identyfikator). Słowa numerujemy po to, by móc je rozróżniać i zapisywać dla nich dodatkowe informacje. Kiedy dostaniemy na wejściu $n$ słów, możemy ponumerować je kolejnymi liczbami całkowitymi.

Jakie słowo kończy się w wierzchołku $X$? W jakim wierzchołku powinno kończyć się słowo $S?$ Zauważmy, że idąc od korzenia do $X$ napotkamy na drodze jego kolejne literki. Będą one tworzyły słowo przypisane do $X.$ W szczególności korzeń odpowiada pustemu słowu. Analogicznie $S$ będzie przypisane do wierzchołka, w którym skończymy idąc od korzenia drogą odpowiadającą kolejnym jego literkom.

![Ścieżka do wierzchołka w trie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4fe9803a85e2a5e859c7d8267c47e124.png)

Słowo $S$ występuje w języku wtedy i tylko wtedy, gdy istnieje odpowiadający mu wierzchołek i jest mu przypisane jakieś słowo. Wtedy „jakieś słowo” będzie słowem $S.$ Ponieważ bez problemu możemy poruszać się po wierzchołkach i odtwarzać kolejne znaki, drzewo trie umożliwia dostęp do wszystkich słów i informacji z nimi związanych. Pozostało jeszcze odpowiedzieć sobie na pytania: jak dodawać nowe słowa oraz jak to w ogóle zaimplementować.

### Dodawanie nowych słów do drzewa trie
Dodawanie nowego słowa $S$ do drzewa trie jest koncepcyjnie bardzo proste. Na początku nadamy $S$ jego unikatowy numer $d.$ Następnie wyszukamy wierzchołek, w którym powinno się kończyć słowo $S$ i zapiszemy w nim $d.$ Co jeśli taki wierzchołek nie istnieje, tzn. nie ma drogi, po której przejściu powinno powstać $S?$ W takim wypadku musimy tę drogę zbudować! Najpierw znajdźmy najdłuższy prefiks $S$ taki, że w drzewie trie istnieje wierzchołek $V,$ który mu odpowiada. Następnie zbudujmy drogę z $V$ odpowiadającą brakującemu sufiksowi $S.$ Zrobimy to, dodając nowe wierzchołki i krawędzie.
![Dodawanie nowego wierzchołka do trie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_cd33f02d3c1799eb3ebe801aeeacfc36.png)

### Implementacja drzewa trie
Drzewo będziemy trzymać w pamięci, korzystając z tablicy $T[V][A],$ gdzie $V$ to maksymalna liczba wierzchołków, a $A$ to rozmiar alfabetu (czyli liczba możliwych liter). Dodatkowo oznaczmy jako $t$ liczbę wierzchołków w drzewie. Na początku $t = 1,$ ponieważ jedyny wierzchołek w naszym drzewie to korzeń reprezentujący puste słowo.

Niech korzeń będzie wierzchołkiem numer zero. Tak jak w przypadku słów, numerujemy wierzchołki w celu ich rozróżnienia.

W $T[X][c]$ będzie się znajdować numer wierzchołka, do którego prowadzi krawędź wychodząca z wierzchołka $X$ z przypisaną literką $c.$ Jeżeli $T[x][c] = -1,$ to taki wierzchołek nie istnieje.
![Krawędzie w trie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_dcb52fa45cac0e6cdea06bc607b5f97e.png)
Jeśli chcemy dodać nowe słowo $S,$ musimy nauczyć się wędrować po naszym drzewie. W tym celu będziemy przeglądać kolejne prefiksy $S$ i znajdować odpowiadające im wierzchołki. Niech $X$ oznacza wierzchołek, w którym aktualnie jesteśmy. Na początku $X = 0$ (czyli jesteśmy w korzeniu, odpowiadającemu pustemu słowu). Zauważmy, że jeśli wierzchołek $A$ odpowiada prefiksowi słowa $S$ o długości $i-1$ to prefiksowi o długości $i$ odpowiada $T[X][S[i-1]].$ Jeśli $T[X][S[i]] = -1$ to taki wierzchołek nie istnieje i trzeba go zaistnieć. Nadajmy mu numer równy $t:$ jest to bardzo korzystne rozwiązanie, ponieważ dzięki temu dodawane wierzchołki będą miały różne, a w dodatku małe numery. W tym momencie pod $T[X][S[i-1]]$ musimy podstawić $t,$ po czym zwiększyć $t$ o jeden, bo dodaliśmy nowy wierzchołek. Niezależnie od tego co się zdarzyło przed chwilą, możemy przyjąć $X = T[X][S[i-1]]$ (tym samym wchodząc do tego wierzchołka) i kontynuować wędrówkę dla $i+1$-wszego prefiksu $S.$ Kiedy przetworzymy już prefiks długości $X.length(),$ będziemy mogli przypisać do $X$ identyfikator słowa, które właśnie dodaliśmy. Dodanie słowa $X$ kosztowało nas $O(X.length())$ operacji.

Podobna metoda przechodzenia działa w przypadku sprawdzania, czy słowo $X$ występuje w słowniku. Jeśli w pewnym momencie natrafimy na sytuację, w której nie ma drogi $(T[X][S[i]] = -1)$ to danego słowa nie ma w słowniku.

Swobodne poruszanie się po drzewie w celu np. wypisania wszystkich słów umożliwiają wszelkie algorytmy przeszukiwania grafów, takie jak $DFS$ czy $BFS.$ Jeżeli jeszcze nie znasz żadnego z nich gorąco polecam w tej chwili szybko przeczytać i zrozumieć działanie algorytmu $DFS.$ Jest bardzo prosty, więc szybko go ogarniesz i bez problemu będziesz mógł kontynuować czytanie tego artykułu :)

### Alternatywna Implementacja

Powyższa implementacja w większości przypadków jest wystarczająca, ale zajmuje $O(V \\cdot A)$ pamięci, dlatego może się nie sprawdzić kiedy rozmiar alfabetu jest duży albo ograniczenia pamięciowe małe. Możemy to rozwiązać np. zmieniając tablicę $T[V][A]$ na dostępną w STLu mapę: ```map <int, char> T[n];```. Złożoność dodawania słów i $DFS$’a będzie gorsza o $O(log \\ A),$ gdyż tyle będzie nas kosztować wyciąganie informacji o krawędziach. W zamian za to wykorzystamy jedynie $O(V)$ pamięci.

Drugi sposób to użycie vectora: ```vector <int> T[n];```. Wszystkie operacje będą się odbywać analogicznie jak w wersji tablicowej, ale zamiast odwoływać się bezpośrednio do krawędzi o znaku $c$ będziemy musieli przejrzeć cały vector, a gdy taka krawędź nie istnieje dodać ją na koniec vectora. W tym wypadku złożoność pamięciowa wyniesie $O(V),$ a operacje dodawania słów i przeszukiwania drzewa będą wolniejsze o $O(A).$

## Zadania z zastosowaniem drzewa trie
- <b>Problem 1:</b> Mamy dany język na drzewie trie i słowo $S.$ Sprawdź, czy $S$ jest prefiksem któregoś ze słów w języku.
- <b>Problem 2:</b> Mając drzewo trie zaimplementowane na tablicy $T$ wypisz wszystkie słowa z języka posortowane leksykograficznie (czyli alfabetycznie).
- <b>Problem 3:</b> Mając słowo $S$ stwierdź, ile jest słów $x$ w danym języku, takich że $S$ jest prefiksem $x.$

### Rozwiązania zadań na trie
<b>Rozwiązanie 1:</b> Jeżeli istnieje wierzchołek $A,$ któremu odpowiada słowo $S,$ to w języku istnieje słowo, którego $S$ jest prefiksem. Dlaczego? Przecież $A$ musiał w jakiś sposób powstać!

<b>Rozwiązanie 2:</b> Skorzystajmy z algorytmu $DFS.$ Ponownie zaczynamy od korzenia. Znajdując się w wierzchołku $X$ będziemy wchodzić do jego synów od tego, do którego prowadzi krawędź z najwcześniejszą literką, do tego, do którego prowadzi krawędź z najpóźniejszą. Żeby móc szybko wypisywać słowa, będziemy trzymać vector $vec,$ zawierający wszystkie znaki na ścieżce od korzenia do aktualnego wierzchołka. Wchodząc do nowego wierzchołka na końcu $vec$ należy dodać krawędź, którą do niego weszliśmy, a wychodząc: usunąć. W ten sposób będzie się na nim utrzymywać słowo odpowiadające wierzchołkowi, w którym aktualnie jesteśmy.

![DFS po trie i vec](https://codimd.s3.shivering-isles.com/demo/uploads/upload_3c89745c8ac0201354dac69ee68ed4ff.png)

Kiedy wejdziemy do wierzchołka, w którym mamy zaznaczony koniec jakiegoś słowa - wypisujemy $vec$

<b>Rozwiązanie 3:</b> Zdefiniujmy tablicę pomocniczą $ile[n].$ Podczas dodawania nowych słów do drzewa zwiększamy wartość $ile[x]$ dla każdego wierzchołka $x$ na ścieżce od korzenia do wierzchołka, w którym kończy się nowe słowo.

![Trie i tablica ile](https://codimd.s3.shivering-isles.com/demo/uploads/upload_b8b31677a10ad50268c6ab1bb8afcdf3.png)

Niech $s$ będzie wierzchołkiem odpowiadającym $S.$ Rozwiązanie zadania to po prostu $ile[s].$

### Jak mówić o trie?
Istnieją dwa (oba poprawne) sposoby wymawiania \"trie\": jedno brzmi dokładnie tak, jak angielskie słowo \"tree\" (i środkowa sylaba wyrazu \"retrieval\"), natomiast drugie brzmi tak, jak słowo \"try\" i pomaga rozróżnić, czy mówimy o drzewie trie czy też o zwykłym drzewie.

## Zadania
- [Najlżejszy język (V OI, III etap)](https://szkopul.edu.pl/problemset/problem/9-tYuiHpeLAJBtw2vDdNgWbh/site/?key=statement)
- [Xor-MST (Codeforces, Edu Round G)](https://codeforces.com/contest/888/problem/G)
"
---
