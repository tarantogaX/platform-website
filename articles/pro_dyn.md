---
title: 'Wstęp do programowania dynamicznego'
content: "
Programowanie dynamiczne to kolejna z metod projektowania algorytmów, które poznasz. Jest ona tak obszerna, że poświęciliśmy jej cały dział, a i tak pomysły z jej użyciem przeplatają się również w innych działach. Zacznijmy od odrobiny teorii. Przytoczmy cytat z [Wikipedii](https://pl.wikipedia.org/wiki/Programowanie_dynamiczne): "Programowanie dynamiczne opiera się na podziale rozwiązywanego problemu na podproblemy względem kilku parametrów." Co to dla nas znaczy? Aby rozwiązać problem przy pomocy programowania dynamicznego, podzielimy problem na mniejsze i rozwiążemy je rekurencyjnie przy pomocy tego samego algorytmu (a skoro zmniejszamy problem, to kiedyś uda  nam  się  zakończyć  ten  proces).  Czyli  co?  Dziel  i  zwyciężaj?  Nie  do  końca.  Różnica  polegana spamiętywaniu. Rozważmy pewien przykład:

## Zadanie przystawka - podziały liczby
Chcemy wiedzieć, na ile sposobów możemy przedstawić liczbę $n$ jako sumę dodatnich liczb całkowitych, nie większych niż $k$ (ich kolejność ma znaczenie).
Np., dla $n=4$ oraz $k=3$ liczbę $n$ możemy przedstawić na $7$ sposobów:
$1+1+1+1=1+1+2=1+2+1=2+1+1=2+2=1+3=3+1$

### Wolne rozwiązanie rekurencyjne

Zastanówmy się nad jakimkolwiek podejściem do "przystawki". Niech $W_n$ będzie wynikiem dla liczby $n.$  Spróbujmy  zastosować  definicję  programowania  dynamicznego.  Rozważymy  wszystkie możliwe pierwsze liczby w naszej sumie. Dla $n \leqslant 0$ wynikiem jest oczywiście $0.$ Ponadto, dla pozostałych $n$ zachodzi $W_n=\sum^{n}_{i=1}W_{n-i},$ ponieważ możemy najpierw wybrać ostatnią liczbę, a następnie skorzystać z wyniku dla mniejszej sumy.

```cpp=
int podzialy_liczby(int n){
    //Liczby 0 nie możemy zapisać jako sumy dodatnich liczb całkowitych
    if (n <= 0)
        return 0; /*To bardzo wazne!
        Bez tego warunku funkcja dzialalaby w nieskonczonosc!*/
    //1 możemy zapisać na tylko jeden sposób: 1=1
    if (n == 1)
        return 1;
    int wynik = 0;
    /*Wybieramy pierwszą liczbę, a następnie sprawdzamy,
    ile pozostało nam mozliwości:*/
    for (int i = 1; i <= k; i ++)
        wynik += podzialy_liczby(n-i);
    return wynik;
}
```

### Lepsze rozwiązanie rekurencyjne ze spamiętywaniem

Takie rozwiązanie jest poprawne, ale bardzo wolne (czytelnik dociekliwy powie: wykładniczo wolne).  Dla $n>60$  taki  kod  jest  daleki  od  podania  wyniku  przed  skończeniem  wszechświata. Co tutaj sprawia najwięcej kłopotu naszemu programowi? Zauważmy, że nie opłaca się liczyć tej samej wartości $W(i)$ dwukrotnie – wynik na pewno nie może się zmienić. Użyjemy więc spamiętywania, aby przyspieszyć nasze rozwiązanie.

```cpp=
const int MAX_N = 1000003;
int wyliczone[MAX_N];

int podzialy_liczby_dp(int n){
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;
    if (wyliczone[n])
        return wyliczone[n];
    int wynik = 0;
    for (int i = 1; i <= k; i ++)
        wynik += podzialy_liczby_dp(n-i);
    wyliczone[n] = wynik;
    return wynik;
}
```

Dzięki temu, nasz program nigdy nie będzie liczyć żadnej funkcji dwukrotnie. Możemy już łatwo oszacować złożoność naszego algorytmu – skoro funkcja nie zostanie wywołana dla żadnej liczby więcej niż raz, a w jej środku przeglądamy $k$ elementów, to złożoność programu wynosi $O(n⋅k$). Zastosowane przez nas podejście nazywamy <b>rekurencją ze spamiętywaniem.</b>

### Aternatywne lepsze rozwiązanie

To nie jest jednak najlepsze rozwiązanie, na jakie nas stać. Spróbujmy nieco zmienić linię ataku. Zamiast skupiać się na rekurencji, rozwiążmy problem przy pomocy zwykłej pętli for:

```cpp=
const int MAX_N = 1000003;

int podzialy_liczby_dp2(int n, int k) {
    int W[n+2];
    W[0] = 1;
    for (int i = 1; i <= n; i ++) {
        W[i] = 0;
        for (int j = 1; j <= k && j <= i; j ++)
            W[i] += W[i - j];
    }
    return W[n];
}
```

### Optymalne rozwiązanie dynamiczne

Zauważmy, że tak naprawdę obydwa kody robią dokładnie to samo – tylko tym razem odrobinę łatwiej powiedzieć, dlaczego złożoność wynosi $O(n⋅k$). Mamy też pole do optymalizacji. Widzimy, że  dodajemy $i-1$ pierwszych  liczb  w  tablicy ```wyliczone```.  Tak  naprawdę  pytamy  więc  o  sumę  na  przedziale w tablicy ```wyliczone```: od ```wyliczone[1]``` do ```wyliczone[i-1]```. Jeśli jesteś wyspany i wypoczęty, powinno już być dla Ciebie jasne, co nam może przyjść z pomocą: suma prefiksowa!

```cpp=
const int MAX_N = 1000003;
int wyliczone[MAX_N], pref[MAX_N];
int podzialy_liczby_opt(int n) {
    wyliczone[1] = 1;
    pref[1] = 1;
    for (int i = 2; i <= n; i ++) {
        wyliczone[i] = pref[i-1];
        if (i-k-1 >= 0)
            wyliczone[i] -= pref[i-k-1];
        pref[i] = pref[i-1] + wyliczone[i];
    }
}
```

### Analizujemy przystawkę

Łatwo zauważyć, że poprawiliśmy złożoność do $O(n).$ To już bardzo dobry wynik. W dalszej części kursu poznasz narzędzie, które pozwoli Ci robić zadania tego rodzaju jeszcze szybciej, ale póki co nasz wynik jest zadowalający. Otrzymaliśmy dwa rozwiązania: jedno przy pomocy rekurencji ze spamiętywaniem "od góry", a drugie iteracyjne, "od dołu", przy pomocy tablicy i pętli for. Każde z tych podejść ma swoje zalety. Rekurencyjne jest zwykle bardziej intuicyjne i może się przydać, gdy niespecjalnie wiemy w jakiej kolejności chcielibyśmy liczyć wzór. Iteracyjne często ma prostszy kod, jest łatwiejsze do optymalizacji i nieznacznie szybsze.

Udało nam się rozwiązać problem przy pomocy programowania dynamicznego. Wprowadźmy teraz odrobinę definicji (nie do końca formalnych), abyśmy wiedzieli z czym to się je:

- Podstawowym pojęciem dotyczącym programowania dynamicznego jest <b>stan</b>, który oznacza pewne miejsce, do którego można "dojść" i niezależnie "rozejrzeć się" za najlepszym rozwiązaniem  z  tego  miejsca.  Stan  może  być  charakteryzowany  przez  jedną  lub  kilka  wartości. W naszym przykładzie stanem była jedna liczba $n,$ mówiąca dla jakiej liczby szukamy wyniku.
- <b>Stanem (warunkiem) brzegowym</b> nazywamy stan, dla którego łatwo jest podać wynik w czasie stałym. Zauważmy, że gdyby nie było takiego stanu, nasz program by się zapętlił.
- Kolejnym z pojęć, których będziemy używać są <b>przejścia między stanami.</b> Chodzi o zależności, których używamy do wyliczania wartości stanów. W naszym przykładzie przejściem jest wzór: $W_n=\sum^{n}_{i=1}W_{n-i}.$
- Istnieje jeszcze coś takiego jak <b>własność optymalnej podstruktury.</b> W swojej kilkuletniej karierze olimpijczyka nie spotkałem się z sytuacją, by ktoś użył tego sformułowania podczas wykładu czy omówienia zadania, a jednak w formalnej literaturze możesz o tym przeczytać. O problemie powiemy, że ma własność optymalnej podstruktury, jeśli jego optymalne rozwiązanie jest funkcją optymalnych rozwiązań podproblemów. Dość formalne, prawda? Zwykle intuicyjnie potrafimy powiedzieć, kiedy możemy użyć programowania dynamicznego, a kiedy nie.

### Zadanie - Najdłuższy wspólny podciąg

Rozważymy  teraz  problem  najdłuższego  wspólnego  podciągu,  LCS  (skrót  od  angielskiej  nazwy problemu: Longest Common Subsequence). Dane mamy dwa teksty $S1[1..n], \ S2[1..m]$ i chcemy podać ich LCS, czyli najdłuższy taki ciąg, że możemy go otrzymać zarówno z $S1$ i z $S2$ przez usunięcie niektórych liczb.

![Najdłuższy wspólny podciąg](https://codimd.s3.shivering-isles.com/demo/uploads/upload_710ad77759308d1ac76475959a27bc60.png)

### Rozwiązanie - dynamiczne szukanie najdłuższego wspólnego podciągu

Mówi się, że w programowaniu dynamicznym gdy mamy poprawnie ustalony stan to już jesteśmy w połowie sukcesu. Często stanem jest długość ciągu, którą już rozważyliśmy – tak będzie i tym razem. Niech DP[i][j]$ będzie wynikiem,  jeśli  rozważymy  tylko $i$ pierwszych liter  ze  słowa $S1$ oraz $j$ pierwszych liter  ze  słowa $S2.$  Najpierw sprawdźmy warunki brzegowe – dla $i=0$ lub $j=0$ wynikiem jest $0.$ Spróbujmy teraz znaleźć przejścia. Powiedzmy, że chcemy znaleźć $DP[i][j]$ dla pewnych $i, \ j.$ Spójrzmy na literki kończące obydwa fragmenty. Jeśli są równe to wiemy, że $DP[i][j]$ jest równe przynajmniej tyle, ile $DP[i-1][j-1]+1.$ Oprócz tego, zawsze możemy zignorować jedną z tych liter i rozpatrzyć $DP[i-1][j]$ lub $DP[i][j-1].$ To już wszystkie przejścia. Możemy przejść więc do algorytmu:

```cpp=
int lcs(string s1, string s2) {
    for (int i = 0; i <= s1.length(); i ++)
        for (int j = 0; j <= s2.length(); j ++) {
            if (i == 0 || j == 0)
                dp[i][j] = 0;
            else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                if (s1[i-1] == s2[j-1])
                    dp[i][j] = max(dp[i][j], dp[i-1][j-1] + 1);
            }
        }
    return dp[s1.length()][s2.length()];
}
```

Jak szybko to działa? W $O(n⋅m$) (ze względu na dwie zagnieżdżone pętle for). W programowaniu dynamicznym często istotna będzie również złożoność pamięciowa, którą liczymy analogicznie jak złożoność czasową programu. Ona również wynosi $O(n⋅m$). Jest jednak sposób, aby ją zmniejszyć. Zauważmy, że do liczenia $DP[i][j]$ używamy tylko $DP[i-1][j-1],$ $DP[i-1][j]$ i $DP[i][j-1].$ Możemy więc  pamiętać  w  każdym  kroku tylko  dwa  ostatnie  wiersze  tablicy: $DP[i][0..m]$ oraz $DP[i-1][0..m],$ a resztę zapomnieć, gdyż nigdy więcej i tak z niej nie skorzystamy. Ta drobna poprawka zbiła nam złożoność pamięciową do $O(n).$ Optymalizacja pamięci zwykle nie jest główną trudnością, ale istnieją zadania, które na tym bazują, na przykład "Kucharz" z finału 24 Olimpiady Informatycznej.

## Znane algorytmy wykorzystujące programowanie dynamiczne

- Algorytm <b>liczenia LCS</b>
- Algorytm liczenia odległości edycyjnej dwóch słów
- Algorytm <b>Floyda - Warshalla</b> liczenia najkrótszych ścieżek w grafie
- Algorytm znajdujący cykl Hamiltona
- Znajdowanie rozwiązania problemu optymalnego nawiasowania macierzy
- Algorytm rozwiązujący <b>problem plecakowy</b> (dla rozsądnie małych wartości przedmiotów)

## Zadania

- [Zapałki (V OIJ, I etap)](https://szkopul.edu.pl/problemset/problem/ZLG7FB_afACLMh8-zsupw5zV/site/?key=statement)
- [Flappy Bird (XXIV OI, I etap)](https://szkopul.edu.pl/problemset/problem/eLy9p2a1VStZ4y9y-LdeB-8f/site/?key=statement)
- [Basketball Exercise (Codeforces, Div. 2 C)](https://codeforces.com/contest/1195/problem/C)
- [Destroy it! (Codeforces, Div. 3 F)](https://codeforces.com/contest/1176/problem/F)
"
---
