---
title: 'Problem plecakowy'
content: "
## Knapsack problem - problem plecakowy

Podczas wykładu o algorytmach zachłannych postawiliśmy taki problem:


Mamy $n$ przedmiotów. Każdy ma swoją masę $m_i$ i wartość $w_i.$ Dysponujemy plecakiem, który jest w stanie pomieścić przedmioty o sumarycznej masie nie większej niż $M,$ ponieważ w przeciwnym wypadku rozerwie się. Chcemy zapakować do plecaka przedmioty o jak największej sumarycznej wartości.


Wówczas okazało się, że nie umiemy go rozwiązać metodami zachłannymi. Wracamy do niego, aby się z nim rozprawić - tym razem używając programowania dynamicznego.


## Coś prostszego - problem sumy

Dana jest liczba naturalna $w$ i $n$ liczb naturalnych $a_1,$ $a_2,$ ..., $a_n.$ Chcemy powiedzieć, czy da się wybrać niektóre z liczb $a_i$ tak, aby sumowały się do $w.$


### Rozwiązanie zachłanne


Zachłanne podejścia nie działają, ale umiemy już myśleć dynamicznie - spróbujmy więc rozwiązać ten problem w ten sposób.
Niech $DP[]$ będzie tablicą, w której przechowujemy wyniki. $DP[i]=0,$ jeśli liczby $i$ nie da się utworzyć, a w przeciwnym przypadku $DP[i]=1.$


Stan już zdefiniowaliśmy. Teraz czas na algorytm. Będziemy dodawać elementy po kolei i aktualizować tablicę $DP[]$ tak, aby w każdym momencie poprawnie mówiła nam, czy daną sumę da się uzyskać.


Pusty zbiór ma sumę zero, więc stanem brzegowym jest $DP[0]=1.$ Dla reszty $DP$ wynosi na początku $0.$


Teraz kolej na przejścia. Jakie mamy zależności między naszymi stanami? Rozważmy dodawanie liczby $k.$ Wówczas, jeśli umieliśmy utworzyć sumę $s$ bez tej liczby to z pewnością liczbę $k+s$ też możemy w jakiś sposób utworzyć. Wystarczy bowiem wziąć ten zbiór, który dawał nam $s$ i dodać do niego liczbę $k.$ Więcej przejść nie potrzebujemy: te nam w zupełności wystarczą, aby napisać działający algorytm.


Jest jeszcze mały szczegół, dość typowy dla programowania dynamicznego. Ale o nim przekonamy się, ucząc na błędach.


```cpp=

const int MAX_W = 1000002;

bool DP[MAX_W + 1];

bool suma(a[], int n, int w) {

\ \ \ \ DP[0] = 1;

\ \ \ \ for (int i = 1; i <= w; i ++)

\ \ \ \ \ \ \ \ DP[i] = 0;

\ \ \ \ for (int i = 1; i <= n; i ++) {

\ \ \ \ \ \ \ \ int k = a[i];

\ \ \ \ \ \ \ \ for (int j = 0; j <= w-k; j ++)

\ \ \ \ \ \ \ \ \ \ \ \ if (DP[j] == 1)

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ DP[j + k] = 1;

\ \ \ \ }

\ \ \ \ return DP[w];

}

```


W kodzie powyżej jest pewien błąd, który powoduje że algorytm jest niepoprawny. Znalezienie go to dobry sposób na przetestowanie rozumienia algorytmu. Trafność swojego pomysłu będziesz mógł sprawdzić podczas rozwiązywania zadań do lekcji. Ze swojej strony tylko skomentuję, że to jest jedna z rzeczy, o której łatwo zapomnieć podczas projektowania algorytmu programowania dynamicznego. Oprócz niej zdarza się nie rozważyć przypadków bazowych i wyjść poza tablicę.


Otrzymaliśmy (prawie) działające rozwiązanie w złożoności czasowej $O(nw)$ i pamięciowej $O(n).$ Okazuje się, że możemy poradzić sobie nieznacznie lepiej.


### Optymalizacja przy pomocy bitseta

Czytając ten artykuł powinieneś już znać pojęcie bitseta z artykułu o STLu. Użyjemy go, aby nieco poprawić nasz algorytm. Ponieważ tablica $DP$ składa się z zer i jedynek, możemy użyć bitseta, aby ją pamiętać. To już daje nam złożoność pamięciową o $32$ razy mniejszej stałej, niż gdybyśmy trzymali $DP$ jako tablicę intów. Możemy rownież poprawić złożoność czasową, uważnie analizując działanie naszego algorytmu.


Co dzieje się, gdy dokładamy jedną liczbę $k$? Każda jedynka z tablicy $DP$ przelatuje o $k$ miejsc w prawo, jeśli tam jeszcze nie było jedynki. Możemy zapisać tę operację jako złożenie dwóch operacji bitowych - najpierw przesuwamy bitowo o $k$ tablicę $DP,$ a potem używamy funkcji $OR,$ aby zanotować, że jeśli była jedynka w miejscu $i$ wcześniej lub znajduje się teraz to chcemy tę jedynkę zostawić. Teraz złażoność naszego programu to nadal $O(nw),$ ale działa on $32$ razy szybciej!


```cpp=

const int MAX_W = 1000002;

bool sumaBitset(a[], int n, int w) {

\ \ \ \ bitset <MAX_W> DP; //pamietaj, ze bitset ma staly rozmiar

\ \ \ \ DP.reset();

\ \ \ \ DP.set(0, 1);

\ \ \ \ for (int i = 1; i <= n; i ++)

\ \ \ \ {

\ \ \ \ \ \ \ \ int k = a[i];

\ \ \ \ \ \ \ \ DP |= (DP << k);

\ \ \ \ \ \ \ \ //|= to operator  \"zorowania \" bitsetu DP

\ \ \ \ \ \ \ \ //z kolei << odpowiada za przesuniecie bitowe w lewo

\ \ \ \ }

}

```


## Dyskretny problem plecakowy - rozwiązanie dynamiczne

To już chyba nasze trzecie podejście do tego problemu. Czas go wreszcie rozwiązać. Przejdziemy przez dokładnie ten sam proces, w jaki myśleliśmy poprzednio. Intuicyjne wydaje się, że dla każdego $i$ będziemy chcieli stablicować największą możliwą wartość elementów wybranych do plecaka pod warunkiem, że zużyliśmy $i$ miejsca w plecaku. Oznaczymy to przez $DP[i]$ - to nasz stan.


Czego jeszcze potrzebujemy? Stanów bazowych. Na początku nie mamy żadnych elementów, czyli w tablicy $DP$ są same zera.


Teraz kolej na przejścia. Zrobimy dokładnie to samo, co poprzednio. Powiedzmy, że rozpatrujemy $j$-ty przedmiot o masie $m_j$ i wartości $w_j.$ Dla każdej poprzedniej możliwości możemy teraz dodać ten element. Zapiszmy więc: $DP[i + m_j] = max(DP[i + m_j], DP[i] + w_j).$


Nie potrzebujemy już nic więcej, aby napisać algorytm. Jest on w pewnym sensie podobny do poprzednich kodów - schemat taki sam, tylko wzory nieco inne.


```cpp=

const int MAX_W = 1000002;

const int MAX_N = 1000002;

int problemPlecakowy(m[], w[], n) {

\ \ \ \ int DP[MAX_W], m[MAX_N + 1], w[MAX_N + 1];

\ \ \ \ int W = 0;

\ \ \ \ for (int j = 1; j <= n; j ++)

\ \ \ \ \ \ \ \ W += m[j];

\ \ \ \ for (int i = 0; i <= W; i ++)

\ \ \ \ \ \ \ \ DP[i] = 0;

\ \ \ \ for (int j = 1; j <= n; j ++)

\ \ \ \ \ \ \ \ for (int i = W-m[j]; i >= 0; i --)

\ \ \ \ \ \ \ \ \ \ \ \ DP[i + m[j]] = max(DP[i + m[j]], DP[i] + w[j]);

}

```

Otrzymaliśmy algorytm działający w złożoności $O(n\\cdot W).$ Umiejętność napisania poprawnego dynamika jest bardzo cenna. Nie wszystkie podejścia da się bowiem łatwo zoptymalizować - czasem trzeba rozważyć to, które ma większe możliwości. A czasem obydwa, łącząc je. Dobrze zobrazuje to poniższy przykład.


## Sumy pierwiastkowe

Istnieje jeszcze jedna przydatna optymalizacja do <b>problemu sumy,</b> którą warto znać. Załóżmy, że wszystkie liczby z ciągu $a$ sumują się do pewnej liczby $s.$ Okazuje się, że umiemy wówczas zaproponować algorytm działający w złożoności czasowej $O(s\\sqrt s),$ łącząc dwa powyżej omówione rozwiązania. Zauważmy, istnieje maksymalnie $O(\\sqrt s)$ różnych elementów, ponieważ suma wszystkich elementów wynosi $s,$ a najmniejsza możliwa suma $k$ różnych elementów to $1+2+3+...+k=k(k+1) / 2.$


Nic nie stoi na przeszkodzie, aby <b>wszystkie takie same elementy rozważyć jednocześnie.</b> Zajmie to nam nie więcej niż $O(\\sqrt s \\cdot t),$ gdzie $t$ to czas rozważenia jednego typu elementów. Spróbujmy to zrobić. Zliczmy w pomocniczej tablicy $ILE[]$ ile razy występuje każdy z elementów. Niech liczba $m$ występuje $w$ razy. $C[i]$ będzie mówiło nam, ile minimalnie elementów typu $m$ potrzebujemy, aby dało się przedstawić $i$ jako sumę pewnych elementów ze zbioru.


Na początku wszystkie $C[i]$ przyjmują wartość $\\infty,$ z wyjątkiem tych $i,$ dla których $DP[i]$ wynosiło już wcześniej $1.$ Logiczne, prawda?


Potrzebujemy jeszcze przejść. Te będą z kolei bardzo podobne do tych, które powinieneś otrzymać rozwiązując zadanie z poprzedniego akapitu. $C[i+m] = min(C[i+m], C[i]+1).$ Ten wzór nie jest trudny - mamy do wyboru zostawić poprzednią opcję lub wziąć o jeden więcej element typu $m.$ To co? Czas na rozwiązanie.


```cpp=

const int MAX_S = 2003;

const int inf = 1000000009;

int DP[MAX_S + 1], C[MAX_S + 1], ILE[MAX_S + 1];

int sumaPierwiastkowa(int m[], int n, int w) {

\ \ \ \ int s = 0;

\ \ \ \ for (int j = 1; j <= n; j ++) {
        
\ \ \ \ \ \ \ \ s += m[j];

\ \ \ \ \ \ \ \ ILE[m[j]] ++;

\ \ \ \ }

\ \ \ \ for (int i = 0; i <= s; i ++)

\ \ \ \ \ \ \ \ DP[i] = 0;

\ \ \ \ DP[0] = 1;



\ \ \ \ for (int j = 1; j <= s; j ++)

\ \ \ \ \ \ \ \ if (ILE[j] > 0) {

\ \ \ \ \ \ \ \ \ \ \ \ //rozwazamy elementy rodzaju j, ktorych jest ILE[j]

\ \ \ \ \ \ \ \ \ \ \ \ //w tym miejscu nie bedziemy wiecej niz sqrt(s) razy

\ \ \ \ \ \ \ \ \ \ \ \ for (int i = 0; i <= s; i ++) {

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ if (DP[i] == 0)

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ C[i] = inf;

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ else

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ C[i] = 0;

\ \ \ \ \ \ \ \ \ \ \ \ }

\ \ \ \ \ \ \ \ \ \ \ \ for (int i = 0; i <= s-j; i ++)

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ C[i + j] = min(C[i + j], C[i] + 1);

\ \ \ \ \ \ \ \ \ \ \ \ for (int i = 0; i <= s; i ++)

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ if (C[i] <= ILE[j])

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ DP[i] = 1;

\ \ \ \ \ \ \ \ }
    
\ \ \ \ return DP[w];

}

```


## Zadania

- [Płetwonurek (V OI, II etap)](https://szkopul.edu.pl/problemset/problem/sJ1qx1ofWZlg2bZR40XJB_0O/site/?key=statement)

- [Waga (IV OIJ, III etap)](https://szkopul.edu.pl/problemset/problem/BrQp-HTIOGxQM6aruH7KJprP/site/?key=statement)

- [Klocki (III OIJ, III etap)](https://szkopul.edu.pl/problemset/problem/UUw6ABmeLv0dpfsviYlhdnnz/site/?key=statement)

- [Szatnia (XIX OI, II etap)](https://szkopul.edu.pl/problemset/problem/E_UP8if3dQ6IUlFNsD1CQOdy/site/?key=statement)
"
---
