---
title: "Twierdzenie Sprague'a - Grundy'ego"
content: "
Dziś zajmiemy się grą NIM. To prosta gra, która odnalazła swoje zastosowanie w rozwiązywaniu wielu problemów z teorii gier. Wiele z nich możemy bowiem sprowadzić do gry NIM (czyli pokazać, że w pewnym sensie gramy w zmodyfikowanego nima), a następnie użyć rozwiązania do tej gry.

## NIM

Zasady NIM są całkiem proste. Mamy n stosów kamyczków o danych wielkościach. Dwóch graczy na zmianę wykonuje ruch, polegający na zabraniu pewnej liczby kamyczków z jednego stosu. Przegrywa ten, który nie może wykonać ruchu.


Zastanówmy się, jak wygląda gra w NIM dla dwóch stosów. Nietrudno zauważyć, że stosy o jednakowym rozmiarze to sytuacja przegrywająca. Jest tak dlatego, że kiedy pierwszy gracz wykona ruch na jednym ze stosów, to drugi może powtórzyć ten ruch na drugim ze stosów. Z drugiej strony (z definicji pozycji przegrywającej) jeśli stosy na początku nie mają równej wielkości, to pierwszy gracz może zapewnić sobie zwycięstwo wyrównując stosy.


<b>Kluczowa obserwacja</b> na temat NIM (poparta krzywym dowodem): dwa stosy o rozmiarach $x$ i $y$ możemy zinterpretować jako stos o rozmiarze $x \\oplus y,$ gdzie $\\oplus$ oznacza operację bitowego xora. Spróbuję dać pewną intuicję, czemu ta obserwacja jest poprawna. Xor dwóch liczb jest 0 wtedy i tylko wtedy, gdy obie są równe. To nam pasuje do naszych obserwacji nt. gry. A co z wartościami dodatnimi? Cóż, tu jest trochę trudniej. Dowód można przeprowadzić rysując stosy $x,$ $y$ oraz stos $x \\oplus y,$ a następnie symulując rozgrywkę na tym jednym stosie (przy czym możemy pozwolić sobie na pewne uproszczenia, np. że nie zabieramy stosików jeśli chcemy wykonać taki sam ruch na drugim stosie, i tak dalej). Można oczywiście użyć też twierdzenia Sprague\\'a – Grundy\\'ego, ale je dopiero poznamy.


<b>Wniosek:</b> Skoro dwa stosy możemy reprezentować jako stos o rozmiarze równym ich xorowi, to $n$ stosów $a_1, \\ a_2, \\ ..., \\ a_n$ możemy reprezentować jako stos o rozmiarze $a_1 \\oplus a_2 \\oplus ... \\oplus a_n.$ To pozwala nam natychmiastowo odpowiadać na wszelkiego rodzaju zapytania związane z grą NIM.

### Założenia twierdzenia Srague'a - Grundy'ego

Aby móc poznać twierdzenie, musimy najpierw poznać jego założenia. Twierdzenie Sprague\\'a –
Grundy\\'ego stosujemy do gier podobnych do NIM. Przede wszystkim, muszą być skończone, dla dwóch graczy, zawsze przynosić rozstrzygnięcie, w którym przegrywający to gracz, który nie może wykonać ruchu. Ponadto muszą być symetryczne – każdy gracz musi mieć ten sam zestaw ruchów dostępnych do wykonania. Uff, to chyba wszystko.


Musimy wprowadzić pojęcie <b>nimberów</b> (ang. grundy numbers). Nimberem stanu nazwiemy war tość mex z nimberów wszystkich stanów, do których możemy dojść w jednym ruchu. Teraz mu simy jeszcze wprowadzić pojęcie mex. Minimum excludent (bo stąd nazwa) oznacza najmniejszą liczbę całkowitą, która nie występuje w zbiorze. Nimbery liczymy przy pomocy prostego programowania dynamicznego (lub rekurencji ze spamiętywaniem). Stąd, by policzyć nimber dla stanu, musimy sprawdzić wszystkie stany, do których możemy dojść w jednym ruchu, wrzucić do jakiejś tablicy, a następnie brutalnie wyszukać najmniejszej liczby, która nie znajduje się w tym zbiorze. W szczególności, dla stanów bez krawędzi wychodzących (które na pewno są przegrywające) nimber wynosi 0.


Nimbery mają bardzo ciekawe własności. Pierwszy gracz ma strategię wygrywającą wtedy i tylko wtedy, gdy nimber stanu reprezentującego całą grę jest większy niż 0. W przeciwnym wypadku będzie on zmuszony do porażki. Możemy zauważyć, że nimbery uogólnieniem pozycji przegrywających i wygrywających, ale przy okazji rozróżniają różne typy pozycji wygrywających. Poniżej znajduje się kod rozwiązujący problem z poprzedniego artykułu (ten z drzewem) przy pomocy nimberów.


```cpp=

int nim[MAXN], is[MAXN];

void calc (int x) {

 \ \ \ \ //najpierw musimy przeliczyc wartosci dla synow

 \ \ \ \ for (int i = 0; i < sons[x].size(); i ++)

 \ \ \ \  \ \ \ \ dfs(sons[x][i]);

 \ \ \ \ //teraz mozemy z nich skorzystac

 \ \ \ \ for (int i = 0; i < sons[x].size(); i ++) {

 \ \ \ \  \ \ \ \ int u = sons[x][i];

 \ \ \ \  \ \ \ \ is[nim[u]] = x;

 \ \ \ \ }

 \ \ \ \ //nim[x] to najmniejsza liczba, ktora nie wystepuje w zbiorze

 \ \ \ \ nim[x] = 0;

 \ \ \ \ while (is[nim[x]] == x)

 \ \ \ \  \ \ \ \ nim[x] ++;

}

```


Doszliśmy wreszcie do meritum, czyli twierdzenia Sprague\\'a – Grundy\\'ego.

## Twierdzenie Sprague\\'a – Grundy\\'ego

Jeśli cała gra składa się z $k$ <b>niezależnych</b> gier $G_1, \\ G_2, \\ ..., G_k,$ to <b>ich nimber równy jest xorowi nimberów tych gier.</b> Innymi słowy, $Nim(G_1 \\cup G_2 \\cup ... \\cup G_k)$ równy jest $Nim(G_1) \\oplus Nim(G_2) \\oplus ... \\oplus Nim(G_k).$ Pamiętajmy, że nie mogą być to kompletnie losowe gry, muszą spełniać założenia podane wyżej. Dowód nie jest bardzo trudny, ale jest za to bardzo żmudny. Ponownie, pozwolę sobie powiedzieć intuicyjnie, co robi to twierdzenie i dlaczego w ogóle jest poprawne. Nimbery są tak zdefiniowane, że gra o nimberze $x$ to w pewnym sensie NIM na stosie wielkości $x.$ Korzystając z tej równoważności możemy użyć rozwiązania dla gry NIM, czyli zxorować wielkości powstałych stosików :)

### Gra Hackenbush


Hackenbush to gra, w której dany jest kolorowy graf ”przyczepiony do podłogi”, a gracze na zmianę odcinają krawędzie w kolorach dla nich dozwolonych. Więcej o hackenbushu (w szczególności formalne zasady) przeczytasz [na Wikipedii.](https://en.wikipedia.org/wiki/Hackenbush)


Nie wszystkie wersje gry zostały przez ludzkość rozkminione. Odpowiedź umiemy podać dla wszystkich krawędzi jednego koloru. Ta wersja gry zwykle nazywa się Green Hackenbush.


My skupimy się na przypadku dla drzewa (o ogólnej wersji możesz przeczytać klikając w powyższy link, gdyż jest tam opisane Colon principle). Drzewo przyczepione jest korzeniem, a wyjmować możemy dowolne krawędzie. Przegrywa ten, kto nie może wykonać ruchu.


Rozwiążemy tę wersję Hackenbusha sprowadzając ją do gry NIM i stosując twierdzenie Sprague\\'a - Grundy\\'ego. Zauważmy, że ten Hackenbush na drzewie będącym ścieżką jest po prostu grą NIM. Interesuje nas jednak coś więcej. Przy pomocy programowania dynamicznego policzymy nimbery dla wszystkich wierzchołków (i ich poddrzew). Chcemy policzyć nim[x]. Zauważmy, że mamy do czynienia z kilkoma różnymi niezależnymi grami, gdzie każda będzie rozgrywana na jakimś synu $x.$ Wystarczy więc tylko zxorować wartości nimberów z synów, zgodnie z twierdzeniem Sprague\\'a - Grundy\\'ego. To wszystko? Nie do końca. Musimy pamiętać, że $nim[x]$ oznacza wynik dla poddrzewa zaczepionego w $x.$ Nie rozważyliśmy jeszcze krawędzi, która wychodzi z $x$ do góry. To okazuje się być łatwe. Skoro nimber równy k możemy utożsamiać jako stosik nima wielkości k, to możemy go też utożsamiać ze ścieżką wielkości k. Teraz już ładnie widać, że dodając jedną krawędź do góry po prostu zwiększamy ścieżkę o 1, czyli tym samym nimber.


<b>Wniosek:</b> Aby policzyć $nim[x]$ wystarczy zxorować wartości nimberów z synów, powiększone wcześniej o 1.

### Liczenie nimberów - implementacja


```cpp=

int nim[MAXN];

void calc (int x) {

 \ \ \ \ int result = 0;

 \ \ \ \ for (int i = 0; i < sons[x].size(); i ++) {

 \ \ \ \  \ \ \ \ dfs(sons[x][i]); //standardowo, dfs po synach

 \ \ \ \  \ \ \ \ result ^= (1 + nim[sons[x][i]]); //wystarczy zxorowac

 \ \ \ \ }

 \ \ \ \ nim[x] = result;

}

```


Więcej o twierdzeniu Sprague\\'a - Grundy\\'ego możesz przeczytać w [tym artykule z Delty.](http://www.deltami.edu.pl/temat/matematyka/gry_zagadki_paradoksy/2014/05/31/Gra_Grim/)

## Zadania

- [Paski (VII OI, I etap)](https://szkopul.edu.pl/problemset/problem/-V7jnI3hTRYAtQ2DJGibzJ0s/site/?key=statement)

- [Kamyki (XVI OI, I etap)](https://szkopul.edu.pl/problemset/problem/Ih7AP4H11ARFeeV2nDSeZlQG/site/?key=statement)

- [Gra (XI OI, I etap)](https://szkopul.edu.pl/problemset/problem/n-nVHgHyiFCIDsAF_bhQbERH/site/?key=statement)

"
---
