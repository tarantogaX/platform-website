---
title: 'Wielokąty'
content: "
Na poprzedniej lekcji nauczyliśmy się już kilku przydatnych rzeczy związanych z geometrią - między innymi tego, w jaki sposób liczyć odległości między punktami i pola trójkątów. Teraz czas wcielić tą wiedzę w życie i spróbować rozwiązać nasze pierwsze problemy geometryczne. W tym artykule skupimy się na podstawowych zagadnieniach związanych z wielokątami.

## Pole wielokąta

Umiemy już policzyć pole trójkąta. Chcielibyśmy pójść krok dalej i policzyć pole wielokąta. Zastanówmy się nad najłatwiejszym przypadkiem - chcemy policzyć pole wielokąta wypukłego. Zauważmy, że taki wielokąt możemy łatwo podzielić na mniejsze trójkąty, które nie będą na siebie nachodzić
i będą pokrywały cały wielokąt.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_310f175c1ec3695ec97e4381bf0ddc7d.png)


Nie  jest  trudne  do  zauważenia,  że  pole  całego  wielokąta  będzie  równe  sumie  pól  trójkątów, na  które  został  on  podzielony,  czyli  dla  wielokąta  wypukłego $A_1 A_2 A_3 ... A_n,$ będzie zachodziło: $P_{A_1 A_2 ... A_n}$ $=$ $P_{A_1 A_2 A_3}$ $+$ $P_{A_1 A_3 A_4}$ $+$ $P_{A_1 A_4 A_5}$ $+ ... +$ $P_{A_1 A_{n-1} A_n},$ czyli $P_{A_1 A_2 ... A_n}$ $=$ $\\sum_{i=2}^{n-1} P_{A_1 A_i A_{i+1}}.$


A co jeżeli nasz wielokąt nie jest wypukły? Dalej jesteśmy w stanie podzielić go na mniejsze trójkąty,  których  pola  zsumujemy.  Taki  proces  podziału  wielokąta  na  trójkąty  o  wierzchołkach należących do wierzchołków wielokąta nazywa się triangulacją wielokąta. Triangulacja wielokąta o $n$ wierzchołkach składa się zawsze z $n−2$ trójkątów. W przypadku wielokątów wypukłych znalezienie jej jest bardzo proste i zostało przedstawione na poprzednim rysunku. Jak się okazuje, znalezienie triangulacji dowolnego wielokąta jest bardzo trudne (chociaż nie jest niemożliwe). Dlatego też musimy wymyślić inne podejście do tego problemu. Pamiętamy jednak, że poza wzorem na pole trojkąta, na poprzedniej lekcji udało nam się także wyprowadzić wzór na pole ”skierowane”.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_906f7754a8ef5b449314c72e6f8c0cab.png)


Jak widać na rysunku, kiedy ”przejdziemy się” po obwodzie wielokąta i dodamy pola trójkątów łączących punkt $(0, 0)$ z kolejnymi odcinkami, uwzględniając ich skierowanie, to otrzymamy pole wielokąta z dokładnością do znaku. A zatem: $P_s(A_1, A_2, ... A_n)$ $=$ $\\sum_{i=1}^n P_s(O, A_i, A_{i+1}),$ gdzie $O$ jest środkiem układu współrzędnych, a $A_{n+1}=A_1.$ Co  więcej  znak  ten  będzie  zależał  od  tego,  czy przejdziemy wzdłuż tego wielokąta zgodnie ze wskazówkami zegara, czy przeciwnie.


Najprostszy dowód tego faktu wynika bezpośrednio z zasady indukcji matematycznej: chcemy wykazać jego prawidłowość dla $n$-kątów foremnych zakładając, że jest on poprawny dla dowolnych wielokątów o mniejszej liczbie wierzchołków. Dowolny $n$-kąt musi posiadać jakąś przekątną zawierającą się całkowicie w jego środku. Oznaczmy wierzchołki naszego $n$-kąta jako $A_1, A_2, ... A_n$ oraz niech $A_k$ i $A_l$ będą wyznaczały naszą znalezioną przekątną. Podzielmy nasz wielokąt na dwa mniejsze wielokąty: $A_k A_{k+1} ... A_{l-1} A_l$ oraz $A_l A_{l+1} ... A_n A_1 A_2 ... A_{k-1} A_k.$ Wiemy z założenia indukcyjnego, że wzór dla nich jest spełniony, czyli:


$P_s(A_k, A_{k+1}, ..., A_{l-1} A_l)$ $=$ $P_s(O, A_k, A_{k+1})$ $+$ $P_s(O, A_{k+1}, A_{k+2})$ $+$ $...$ $+$ $P_s(O, A_{l-1}, A_l)$ $+$ $P_s(O, A_l A_k)$ $=$ $\\sum_{i=k}^{l-1} P_s(O, A_i, A_{i+1})$ $+$ $P_s(O, A_l, A_k)$ oraz $P_s(A_l, A_{l+1}, ..., A_{k-1}, A_k)$ $=$ $P_s(O, A_l, A_{l+1})$ $+ ... +$ $P_s(O, A_{n-1}, A_n)$ $+$ $P_s(O, A_n, A_1)$ $+$ $P_s(O, A_1, A_2)$ $+ ... +$ $P_s(O, A_{k-1}, A_k)$ $+$ $P_s(O, A_k, A_l)$ $=$ $\\sum_{i=l}^{n} P_s(O, A_i, A_{i+1})$ $+$ $\\sum_{i=1}^{k-1}P_s(O, A_i, A_{i+1})$ $+$ $P_s(O, A_k, A_l).$


Musimy na podstawie tego wykazać, że $P_s(A_1, A_2, ... A_n)$ $=$ $\\sum_{i=1}^n P_s(O, A_i, A_{i+1}).$ Oczywiste jest, że $P_s(A_1, A_2, ... A_n)=P_s(A_k, ..., A_l) + P_s(A_l, ..., A_k),$ a zatem wystarczy, że pokażemy: $P_s(A_k, ..., A_l) + P_s(A_l, ..., A_k)$ $=$ $\\sum_{i=1}^n P_s(O, A_i, A_{i+1}).$ Podstawiając nasze indukcyjne założenie otrzymamy, że $P_s(A_k, ..., A_l)$ $+$ $P_s(A_l, ..., A_k)$ $=$ $\\sum_{i=1}^{k-1}P_s(O, A_i, A_{i+1})$ $+$ $\\sum_{i=k}^{l-1}P_s(O, A_i, A_{i+1})$ $+$ $\\sum_{i=l}^nP_s(O, A_i, A_{i+1})$ $+$ $P_s(O, A_k, A_l)$ $+$ $P_s(O, A_l, A_k),$ a to jest przecież równe $\\sum_{i=1}^nP_s(O, A_i, A_{i+1})$ $+$ $P_s(O, A_k, A_l)$ $+$ $P_s(O, A_l, A_k).$ Czyli musimy wykazać, że $\\sum_{i=1}^nP_s(O, A_i, A_{i+1})$ $=$ $\\sum_{i=1}^nP_s(O, A_i, A_{i+1})$ $+$ $P_s(O, A_k, A_l)$ $+$ $P_s(O, A_l, A_k)$ a to jest równoważne temu, że $P_s(O, A_k, A_l)$ $+$ $P_s(O, A_l, A_k)$ $=$ $0.$ My  jednak  z  poprzedniej  lekcji  wiemy,  że  zamiana kolejności wierzchołków zmieni znak pola skierowanego, czyli $P_s(O, A_k, A_l)$ $=$ $-P_s(O, A_l, A_k).$ To zatem kończy dowód indukcyjny naszego wzoru.


Czyli ostatecznie wiemy, że $P_s(A_1, A_2, ... A_n)$ $=$ $\\sum_{i=1}^nP_s(O, A_i, A_{i+1}).$ Korzystając z wyprowadzonego na  poprzedniej  lekcji  wzoru  na  pole  skierowane  dla  trójkątów  o  jednym  wierzchołku  w  środku układu współrzędnych możemy otrzymać następujący wzór:


$P_s(A_1, A_2, ... A_n)=\\frac{1}{2}(x_1y_2-x_2y_1 + x_2y_3 - x_3y_2 + ... + x_ny_1 - x_1y_n)$


$P_s(A_1, A_2, ... A_n)=\\frac{1}{2} \\sum_{i=1}^n(x_iy_{i+1} - x_{i+1}y_i),$ gdzie $x_{n+1}=x_1$ i $y_{n+1}=y_1$

## Punkty w wielokątach

Zastanówmy się nad kolejnym problemem: dany jest wielokąt $A_1 A_2 ... A_n$ oraz punkt $P.$ Chcemy odpowiedzieć na pytanie, czy punkt P znajduje się wewnątrz wielokąta. Zauważmy, że do rozwiązania  naszego  problemu  możemy  wykorzystać  wcześniej  wyprowadzony  przez  nas  wzór  na  pole wielokąta, tylko nieco przekształcony na nasze potrzeby. Będziemy ponownie ”wędrować” wzdłuż kolejnych  boków  naszego  wielokąta,  ale  tym  razem  nie  będziemy  dodawać  ich  pól. Zdefiniujmy następującą wartość:


$F_P(A, B, C)$


$0$, gdy $P$ nie należy do trójkąta $ABC$


$1$, gdy $P$ należy do trojkąta $ABC$ oraz $F_s(A, B, C)$ jest dodatnie


$−1,$ gdy $P$ należy do trójkąta $ABC$ oraz $F_s(A, B, C)$ jest ujemne


Zauważmy, że $\\sum_{i=1}^n F_p(O, A_i, A_{i+1})$ będzie równe $0,$ gdy punkt będzie leżał na zewnątrz wielokąta, a $1$ lub $-1$ w przeciwnym wypadku (jako $O$ oznaczyliśmy środek układu współrzędnych).


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4f6b3ded1f01b3c50666fcc3b578f005.png)


Oznaczmy taką sumę jako $F_P(A_1, A_2, ..., A_n).$ We wzorze tym widać analogię do wzoru na pole wielokąta, a dowód tej własności możemy przeprowadzić na takiej samej zasadzie: będziemy indukcyjnie zakładać, że wszystkie wielokąty o mniejszej liczbie wierzchołków niż $n$ spełniają powyższą własność. Dowolny $n$-kąt będziemy mogli podzielić na dwa mniejsze, dla których na mocy indukcji ta zależność będzie zachodzić. Następnie możemy zauważyć, że suma wartości $F_P$ dla dwóch wielokątów da nam informacje o tym czy punkt zawiera się w którymś z nich na tej samej zasadzie. Czyli wystarczy pokazać, że $F_P(A_1, ..., A_n)$ $=$ $F_P(A_k, ..., A_l)$ $+$ $F_P(A_l, ..., A_k)$, a to możemy zrobić w podobny sposób co przy dowodzie wzoru na pole, sumując czynniki i pokazując, że zawsze zachodzi $F_P(O, A, B)=−F_P(O, B, A)$ (dowód tego faktu pozostawiamy jako ćwiczenie dla czytelnika).


Pozostaje jedynie ostatnie pytanie: jak policzyć wartość $F_P(A, B, C)$? A dokładniej: jak sprawdzić  czy  punkt $P$ znajduje  się  w  trójkącie  $ABC$?  Takie  sprawdzenie  okazuje  się  bardzo  proste:  zauważmy  bowiem,  że  punkt $P$ znajduje  się  w $ABC$ wtedy  i  tylko  wtedy,  gdy $P_{ABC}=P_{ABP}+P_{BCP}+P_{CAP}$ (mowa tutaj już o klasycznym polu trójkąta, bez skierowania).


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_b2fae8f031085f05ee1d79041eadcf63.png)



## Punkty w wielokątach wypukłych

Przedstawiona  w  poprzedniej  sekcji  metoda  jest  uniwersalna  dla  dowolnych  wielokątów,  jednak jak to często bywa, w przypadku wielokątów wypukłych być może problem ten da się rozwiązać łatwiej. Pamiętamy, że tak jak to było na początku artykuły powiedziane, wielokąt wypukły jest łatwo <b>striangulować.</b> Żeby sprawdzić, czy punkt znajduje się w wielokącie, wystarczy sprawdzić czy znajduje się w jakimkolwiek trójkącie powstałym przez jego triangulację. Przedstawiony sposób jest łatwiejszy w zrozumieniu, aczkolwiek działa tylko w przypadku wielokątów wypukłych (gdyż tylko  te,  możemy  w  trywialny  sposób  striangulować).  Co  jednak  w  przypadku,  gdyby  punktów o  które  się  pytamy  było  dużo?  Wszystkie  przedstawione  metody  rozwiązywały  nasz  problem  w czasie $O(n).$ Chielibyśmy teraz znaleźć rozwiązanie działające szybciej.


Chcemy sprawdzić szybko, czy $P$ należy do wielokąta $A_1 A_2 ... A_n.$ Poprowadźmy z wierzchołka $A_1$ promienie  wychodzące  w  kierunku  wszystkich  pozostałych  wierzchołków.  Podzielą  one  nam część płaszczyzny na ”nieskończenie długie” trójkąty.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_66f107c939866e9a542d3a779731761f.png)


Najpierw  musimy  sprawdzić,  czy $P$ będzie  się  zawierał  w  obszarze  wyznaczanym  przez  kąt $A_2 A_1 A_n.$ Możemy to zrobić sprawdzając czy $P$ leży po tej samej stronie prostej $A_1 A_2$ co $A_n$ oraz po tej samej stronie prostej $A_1 A_n$ co $A_2.$ Jeżeli tak to zawiera się w tym kącie, a w przeciwnym wypadku leży poza nim - a to oznacza, że na pewno nie należy do wielokąta. Możemy zatem założyć, że punkt $P$ znajduje się w tym kącie. Zauważmy wtedy, że punkt o który się pytamy będzie należał do maksymalnie jednego z tych ”nieskończonych” trójkątów. Co więcej, są one ułożone po kolei od lewej do prawej. Możemy zatem użyć wyszukiwania binarnego, by znaleźć obszar zawierający punkt $P.$ W trakcie wyszukiwania binarnego, jeżeli strzelimy w obszar wyznaczany przez półproste $A_1 A_k$ oraz $A_1 A_{k+1}$ to musimy sprawdzić następujące rzeczy: jeżeli $P$ leży po innej stronie $A_1 A_k$ niż $A_{k+1}$ to znajduje on się w obszarze na lewo. Jeżeli $P$ leży po innej stronie $A_1 A_{k+1}$ niż $A_k$ to znajduje on się w obszarze na prawo. W przeciwnym wypadku, trafiliśmy w obszar zawierający $P$. Kiedy znajdziemy już obszar zawierający $P$ (niech będzie to obszar między $A_1 A_l$ a $A_l A_{l+1}$) to sprawa jest prosta: wystarczy sprawdzić czy $P$ należy do trójkąta $A_1 A_l A_{l+1}.$ Dzięki temu otrzymamy algorytm odpowiadający w czasie $O(log \\ n)$ na zapytanie o punkt.


Pozostaje  jedynie  pytanie  jak  sprawdzić  czy  dwa  punkty  znajdują  się  po  tej  samej  stronie pewnej  prostej.  Najłatwiej  zrobić  to  korzystając  z  iloczynu  wektorowego,  o  którym  była  mowa na  poprzedniej  lekcji.  Jeżeli  chcemy  zobaczyć,  czy  $X$  i  $Y$  leża  po  tej  samej  stronie  prostej  $AB,$ wystarczy sprawdzić czy znaki $P_s(A, B, X)$ i $P_s(A, B, Y)$ są równe. Więcej na ten temat zostanie powiedziane w kolejnym artykule.

## Zadanie

Teraz w ramach ćwiczeń przedstawimy przyjemne zadanie geometryczne:


Dany jest wielokąt wypukły o $n$ wierzchołkach $A_1, A_2, ... A_n$ i $q$ zapytań postaci: dla danych $a$ i $b$ podaj  pola  dwóch  wielokątów,  które  powstaną  przez rozdzielenie  wejściowego  wielokąta  wzdłuż przekątnej $A_a A_b$. Oczekiwana złożoność: $O(n+q)$. Zachęcamy do samodzielnego pomyślenia nad rozwiązaniem zanim sięgniesz do rozwiązania przedstawionego poniżej:


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f49b9b54d1a1da5ef244c2c0a7f7aa82.png)


Możemy  podzielić  nasz  wielokąt  na  trójkąty $A_1 A_2 A_3, \\ A_1 A_3 A_4, \\ A_1 A_4 A_5$ itd.  Niech $S(i)=P_{A_1 A_2 A_3} + P_{A_1 A_3 A_4} + P_{A_1 A_{i-1} A_1}$. Innymi słowy $S(i)$ będzie oznaczać sumę prefiksową pól trójkątów, na które podzieliliśmy nasz wielokąt. Chcemy umieć w czasie $O(1)$ podać pole wielokąta $A_a A_{a+1} ... A_{b-1} A_b$ dla dowolnych $a$ i $b$. Zauważmy, że $P_{A_a ... A_b}=S(b)-S(a)-P_{A_1 A_a A_b}$. Wzór na pole $A_b A_{b+1} ... A_n A_1 ... A_{a-1} A_a$ możemy wyprowadzić w analogiczny sposób. Zatem gdy stablicujemy na początku wartości $S(i)$ to możemy odpowiadać na takie zapytania w czasie stałym.


Innym bardzo ciekawym (choć nieco trudniejszym) i nie wymagającym dużej wiedzy geometrycznej zadaniem jest Najazd z XIII Olimpiady Informatycznej, którego treść i opracowanie można znaleźć na stronie oi.edu.pl w dziale Książeczki.


## Zadania

- [Najazd (XIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/ifGPlMtR2muaLl-03rmGj6T8/site/?key=statement)

- [Okno (V OI, II etap)](https://szkopul.edu.pl/problemset/problem/6vQz3xrV-X1aXufZwBP2Uljp/site/?key=statement)

- [Alyona and Triangles (Codeforces, Div. 2 E)](https://codeforces.com/problemset/problem/682/E)

"
---
