---
title: 'Find and union'
content: "
Ludzie od wieków grupują wszystko, co napotkają na swojej drodze. Każdy człowiek znajduje się w wielu grupach: paczce przyjaciół, rodzinie, klasie, szkole itd. W matematyce zamiast \"grupy\" będziemy mówić zbiory. Na dzisiejszej lekcji nauczymy się:

- łączyć dwa zbiory

- sprawdzać, czy dwa elementy są w tym samym zbiorze


## Zbiory rozłączne

Każdemu zbiorowi przypiszemy dokładnie jednego reprezentanta. Mówiąc o reprezentancie elementu będę miał na myśli reprezentanta zbioru, do którego należy.


![Reprezentant zbioru](https://codimd.s3.shivering-isles.com/demo/uploads/upload_26395761751f00acdb2bcdefe1521de7.png)


- Spostrzeżenie 1: Dwa elementy są w tym samym zbiorze wtedy, gdy mają takich samych reprezentantów.

- Spostrzeżenie 2: Aby połączyć dwa zbiory wystarczy ustawić reprezentanta jednego z nich jako reprezentanta obu.


![Łączenie zbiorów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e590eb38e802011f544aa0b872d03e66.png)


Struktura zbiorów rozłącznych, inaczej Find & Union, umożliwia wykonywanie tych operacji. Zanim przejdziemy do jej omówienia, zdefiniujemy kilka pojęć:


- ```rep[x]``` - jeśli $x$ jest swoim reprezentantem ```rep[x] = x```; w przeciwnym wypadku ```rep[x]``` będzie \"starać się\" wskazywać na reprezentanta $x$

- ```ile[x]``` - liczba elementów w zbiorze, którego reprezentantem jest $x$

- ```Find(a)``` - funkcja, która zwraca reprezentanta elementu $a$

- ```Union(a,b)``` - funkcja, która łączy zbiory, w których znajduje się $a$ i $b$


Żeby sprawdzić czy $a$ i $b$ są w tym samym zbiorze wystarczy sprawdzić, czy ```Find(a)=Find(b)```. Zauważmy, że mając funkcje ```Find(a)``` i ```Union(a,b)```, będziemy już umieli zrobić wszystko, czego chcieliśmy się dzisiaj nauczyć.


Na samym początku żadne dwa elementy nie są w tym samym zbiorze - każdy z nich tworzy jednoelementowy zbiór. Reprezentantem $x$ jest $x,$ ```rep[x]=x```, a ```ile[x]=1```


![Stan początkowy](https://codimd.s3.shivering-isles.com/demo/uploads/upload_6dbce158202f10bcad7311d7e1474437.png)


## Łączenie zbiorów: Union

Załóżmy, że dla każdego $i$ ```rep[i]``` wskazuje na reprezentanta i.
Union(2, 5)


![Struktura po kilku wywołaniach union](https://codimd.s3.shivering-isles.com/demo/uploads/upload_61ab40ce59bca673101bc846952ddf77.png)


```cpp=

void Union (int a,int b) {

\ \ \ \ a = Find(a);

\ \ \ \ b = Find(b);

\ \ \ \ rep[a] = b;

\ \ \ \ ile[b] += ile[a];

}

```


Niech $a$ i $b$ będą reprezentantami kolejno $A$ i $B.$ Żeby połączyć dwa zbiory ustawimy ```rep[a]``` na $b$ i zaktualizujemy wartość ```ile[b]``` dodając do niej ```ile[a]```.


## Zbiór, zawierający element: Find

Zauważmy, że ```rep[a]``` \"stara się\" być reprezentantem $a$ - wskazuje albo na niego, albo na element, który kiedyś nim był. Co więcej ```rep[rep[a]], rep[rep[rep[a]]]``` itd. również się \"starają\", a każdemu z nich wychodzi to lepiej.


![Szukanie reprezentanta zbioru](https://codimd.s3.shivering-isles.com/demo/uploads/upload_27c0eac4c287f06e9dbd9ad2a4d98d10.png)


Jako, że łączymy w zbiory skończenie wiele elementów, istnieje takie ```rep[rep[rep[...rep[x]]]]``` będące reprezentantem $x.$ Wiemy również, że wskazuje on na samego siebie. Oznacza to, że możemy go znaleźć prostą rekurencją:


```cpp=

int Find (int a) {

\ \ \ \ if (rep[a] == a)

\ \ \ \ \ \ \ \ return a;

\ \ \ \ return Find(a);

}

```


Wyżej opisane Find \\& Union działa poprawnie, ale istnieją przypadki, dla których będzie wolne. Zauważmy, że złożoność ```Union(a,b)``` jest taka sama, jak ```Find(a)```, która z kolei zależy tylko i wyłącznie od liczby wywołań rekurencyjnych. Chcielibyśmy aby była jak najmniejsza. Niestety przy obecnej implementacji może się zdarzyć, że będzie trwać nawet $O(n)$. Dzieje się tak w przypadku, gdy wszystkie elementy są w jednym zbiorze i wartości ```rep[i]``` są parami różne. Wówczas ```Find(x)``` dla $x,$ który nie reprezentuje nikogo będzie kosztował nas $O(n)$ operacji.


![Najbardizej niekorzystny find](https://codimd.s3.shivering-isles.com/demo/uploads/upload_ca31db1f9301a640088be579bd7afd12.png)


Pomimo, że pojedyncze zapytanie o $x$ nie jest jeszcze aż tak czasochłonne, to jeśli spytamy się o niego wiele razy będziemy mieli duży problem.

### Optymalizacja Union(A,B)

Jeżeli zawsze będziemy przypinać mniejszy zbiór do większego, to złożoność ```Find(x)``` dla dowolnego $x$ spadnie do $O(log \\ n)$.


<b>Dowód:</b> Zauważmy, że jeśli ```rep[x] != x```, to wcześniej musieliśmy wywołać funkcję ```Union(x,rep[x])```. \\mbox{Oznacza to,} że liczba elementów w zbiorze ```rep[x]``` była nie mniejsza niż w zbiorze $x.$ ```ile[rep[x]]``` jest dwukrotnie większe od ```ile[x]```. Wartości ```ile[i]``` nie mogą przekroczyć $n,$ więc kroków rekurencyjnych może być maksymalnie $O(log \\ n)$.


```cpp=

void Union (int a, int b) {

\ \ \ \ if (ile[a] > ile[b])

\ \ \ \ \ \ \ \ swap(a, b);

\ \ \ \ rep[a] = b;

\ \ \ \ ile[b] += ile[a];

}

```


### Optymalizacja Find - skaracanie ścieżek

Kiedy raz znajdziemy reprezentanta a możemy od razu zaktualizować ```rep[a]```. W ten sposób pominiemy konieczność wywoływania takich samych rekurencji wiele razy.


![Kolejne operacje z aktualizowanie rep](https://codimd.s3.shivering-isles.com/demo/uploads/upload_9cf5398572d533dfd015e109fb8e0523.png)


![Kolejne operacje z aktualizowanie rep - c.d.](https://codimd.s3.shivering-isles.com/demo/uploads/upload_06743b9d8a3191f84667c3a101dafa0d.png)



```cpp=

int Find (int a) {

\ \ \ \ if (rep[a] != a)

\ \ \ \ \ \ \ \ rep[a] = Find(rep[a]);

\ \ \ \ return rep[a];

}

```


Sumaryczna złożoność wszystkich zapytań wyniesie $O(n \\alpha)$, gdzie alpha jest odwrotnością funkcji Aackermana i rośnie bardzo wolno. $\\alpha = 5$ dla ekstremalnie dużych wartości, więc Find \\& Union działa prawie liniowo. Pozwolę sobie pominąć dowód tego faktu. Tak napisana struktura zbiorów rozłącznych jest superszybka i w dodatku przyjemnie się ją implementuje.


## Zadania

- [Małpki (X OI, III etap)](https://szkopul.edu.pl/problemset/problem/kd-sEDS37q_Q8vr-RjxBhw4p/site/?key=statement)

- [Biura (XIV OI, I etap)](https://szkopul.edu.pl/problemset/problem/9k-oNM_F-2na0A-IWrUtQ0I7/site/?key=statement)

- [Tour de Bajtocja (XIX OI, II etap)](https://szkopul.edu.pl/problemset/problem/RAWtcawtbUaBmPDAW0que_s9/site/?key=statement)

"
---
