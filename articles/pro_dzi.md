---
title: 'Dziel i zwyciężaj'
content: "
## Divide and conquer - dziel i zwyciężaj

Dziel i zwyciężaj to kolejna z metod projektowania algorytmów, które poznasz. Jest znacznie rzadziej spotykana niż algorytmy zachłanne, ale również przydatna. Pomysł jest w miarę prosty: aby rozwiązać cały problem, podzielimy go na mniejsze problemy <b>(dziel),</b> a następnie złączymy otrzymane rezultaty <b>(zwyciężaj).</b> Zapoznamy się teraz z najpopularniejszym algorytmem dziel i zwyciężaj:


## Sortowanie metodą dziel i zwyciężaj - mergesort

Mamy dany ciąg, a naszym zadaniem jest go posortować. Załóżmy, że interesuje nas sortowanie nierosnące czyli takie, w którym dla każdych $i,j$ jeśli $i\\leqslant j,$ to $a_i\\leqslant a_j.$


<b>Faza dzielenia:</b> jeśli ciąg składa się z jednego elementu to nie dzieje się nic ciekawego -- jest już posortowany. W przeciwnym razie podzielimy go \"na pół\" na dwa ciągi, a następnie posortujemy każdy z nich tym samym algorytmem mergesort, rekurencyjnie.
<b>Faza zwyciężania:</b> załóżmy, że obydwa nasze krótsze ciągi są już posortowane. Jedyne, co nam pozostało to złączenie obydwu wyników tak, aby rozważany przez nas ciąg także był posortowany. Tutaj pomoże nam podejście zachłanne. Zastanówmy się, jak wybrać pierwszy element do nowego ciągu. Z pewnością musi to być jeden z pierwszych elementów w dwóch rozważanych ciągach. Powtarzając tę procedurę uzyskamy prosty algorytm scalania dwóch posortowanych ciągów w jeden.


![Merge sort krok po kroku](https://codimd.s3.shivering-isles.com/demo/uploads/upload_38c25f160301706844ae0b824a822d2a.png)
  

Jak szybko działa taki algorytm? Procedura <b>merge</b> łączenia dwóch posortowanych ciągów działa w $O(n),$ gdzie $n$ to suma długości posortowanych ciągów. Musimy jednak pamiętać, że wywołujemy nasz algorytm rekurencyjnie. Niech $T(n)$ będzie czasem działania naszego algorytmu dla ciągu długości $n.$ Zachodzi wówczas: $T(n) = 2\\cdot T(\\frac{n}{2}) + O(n).$ Jest to przykład prostego równania rekurencyjnego. Jego rozwiązaniem jest $T(n) = O(n \\cdot log \\ n).$ Możesz przekonać się o tym zauważając, że żaden element nie zostanie rozpatrzony więcej niż $O(log \\ n)$ razy. Oto pseudokod, implementujący algorytm sortowania tablicy metodą dziel i zwyciężaj:


```cpp=

const int MAX_N = 1000003;

int pomoc[MAX_N], tab[MAX_N];

void merge(int poczatek, int srodek, int koniec) {

    int dl = koniec - poczatek + 1;

    /*musimy przepisać tablicę do pomocniczej,

    żeby nie nadpisać elementów nowymi wartościami*/

    for (int i = poczatek; i <= koniec; i ++)

        pomoc[i] = tab[i];

    int a = poczatek;

    int b = srodek + 1;

    int i = poczatek;

    while (a <= srodek && b <= koniec){

        i ++;

        if (pomoc[a] <= pomoc[b]) {

            tab[i] = pomoc[a];

            a ++;

        }

        else {

            tab[i] = pomoc[b];

            b ++;

        }

    }

    /*może się okazać, że zostały jeszcze elementy

    z lewej lub prawej części - musimy to naprawić*/

    while (a <= srodek) {

        i ++;

        tab[i] = pomoc[a];

        a ++;

    }

    while (b <= koniec) {

        i ++;

        tab[i] = pomoc[b];

        b ++;

    }

}


void mergesort (int poczatek, int koniec){

    if (poczatek == koniec)

        return;

    int srodek = (poczatek + koniec) / 2;

    mergesort(poczatek, srodek);

    mergesort(srodek + 1, koniec);

    //w tym momencie obydwa rozważane fragmenty tablicy są już posortowane

    merge(poczatek, srodek, koniec);

}

```


## Zliczanie inwersji przy użyciu dziel i zwyciężaj

Inwersją w ciągu $a$ nazywamy parę takich elementów $a_i, \\ a_j,$ że $i < j$ oraz $a_i > a_j.$ Chcemy poznać liczbę inwersji w ciągu $a.$ Niestety, inwersji może być nawet $O(n^2),$ więc brutalne sprawdzenie wszystkich par może okazać się zbyt wolne. Jednym z szybkich algorytmów zliczenia liczby inwersji jest ten oparty na metodzie dziel i zwyciężaj. Okazuje się, że możemy nieznacznie ulepszyć sortowanie przez scalanie, aby przy okazji otrzymać liczbę inwersji. Na warsztat weźmiemy funkcję <b>merge</b>. Jeśli w pewnym kroku element z ciągu drugiego wskoczy przed elementy z ciągu pierwszego to wszystkie pozostałe elementy z ciągu pierwszego stanowią z nim inwersję. 


![Zliczanie inwersji podczas scalania dwóch ciągów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c1f017a5b401fa4ef2145bd76ed61a7d.png)
  

Skomplikowanie użycia metody dziel i zwyciężaj zależy wyłącznie od trudności w funkcji merge, schemat zwykle się nie zmienia. W ten sposób możemy uzyskać proste rozwiązania trudnych problemów, ale i trudne rozwiązania trudnych problemów. Należy pamiętać, że nie zawsze optymalnym jest podzielić ciąg na dwa mniej więcej równe, czasem można podzielić w innej proporcji, a czasem na inną liczbę ciągów. Ponadto, pamiętajmy także, że nie zawsze musimy w ogóle dzielić -- mając działający algorytm dziel i zwyciężaj warto się zastanowić, czy potrafimy rozwiązać problem bez rozdzielania. W takim przypadku otrzymalibyśmy algorytm o lepszej złożoności.
  

## Znane algorytmy dziel i zwyciężaj

Dziel i zwyciężaj występuje szczególnie w problemach z dziedziny kombinatoryki. Również większość struktur danych używa tej metody. Oto przykłady algorytmów, które ją wykorzystują (z większością spotkasz się w dalszej części kursu):


- Sortowanie szybkie - <b>quicksort</b>

- <b>Wyszukiwanie binarne</b>

- <b>Drzewo przedziałowe</b>

- Dziel i zwyciężaj na drzewie - <b>rozbicie przez centroid</b>

- Znajdowanie pary najbliższych punktów na płaszczyźnie

- Algorytm Cooleya-Tukeya dokonujący szybkiej transformaty Fouriera



## Zadania

- [Gdzie jest jedynka? (XX OI, III etap)](https://szkopul.edu.pl/problemset/problem/2TMZ0x-MC86QBBwLrqDfUVVd/site/?key=statement)

- [Permutacje antyarytmetyczne (III OI, III etap)](https://szkopul.edu.pl/problemset/problem/o3I4XUqwNMkk1U3lziuP7h9c/site/?key=statement)

- [A Story of One Country (Codeforces, Div. 2 E1)](https://codeforces.com/contest/1181/problem/E1)

"
---
