---
title: 'Standard template library'
content: "
### Standard template library

Czym właściwie jest STL? Gdybyśmy dokładnie przetłumaczyli dosłownie ten skrót na polski, otrzymalibyśmy: <b>Standardowa Biblioteka Szablonów.</b> Jest to nic innego jak zbiór gotowych struktur, algorytmów i innych narzędzi, które mogą nam się przydać. Większość z nich potrafimy bez trudu zaimplementować samemu, ale dla uproszczenia pracy często z nich korzystamy.


Cała [dokumentacja standardowej biblioteki](https://en.cppreference.com/w/cpp/container) jest dostępna w internecie w języku angielskim (w języku polskim też można co nieco znaleźć, ale to nie musi być najlepszy pomysł...). Zawiera mnóstwo informacji, które dla osoby niewprawionej mogą okazać się dosyć nieprzystępne. W tym artykule znajdziesz opis najbardziej przydatnych rzeczy, które możesz w znaleźć STL-u.


Wszystkie opisane poniżej funkcje znajdziesz w bibliotece <b>bits/stdc++.h,</b> którą wystarczy dołączyć na początku programu pisząc: ```#include<bits/stdc++.h>```. Ponadto, przyda się jeszcze linijka ```using namespace std;```, aby nie musieć za każdym razem pisać <b>std::</b> przed nazwą każdej struktury. 

### Para - pair

Zacznijmy od czegoś prostego: ```pair<typ1, typ2>``` to, jak nazwa wskazuje, para elementów typów ```typ1``` i ```typ2``` (np. możemy w ten sposób obsługiwać parę liczb całkowitych), przy czym wcale nie muszą być one identyczne ani podstawowe (możemy zrobić parę par par i to bezproblemowo się skompiluje). Jak korzystać z pary?


 - ```pair <int, double> moja_para = make_pair(1, 2.55);``` -- utworzenie pary liczby całkowitej i rzeczywistej, w której pierwszy element jest równy 1, a drugi 2.55

 - ```moja_para.first``` -- odwołanie do pierwszego elementu pary ```moja_para```

 - ```moja_para.second = 1.4;``` -- zmiana wartości drugiego elementu pary na $1.4$ 


Pary możemy też porównywać jako całość, przy pomocy domyślnych operatorów (np. $==,$ $<,$ $>$ itd). Wówczas kompilator najpierw porówna pierwsze elementy, a potem drugie.


Więcej o parze możesz przeczytać w [dokumentacji](http://www.cplusplus.com/reference/utility/pair/).

### Vector

Teraz czas na vector. Nie różni się on znacznie od zwykłej tablicy. Jest nieco wolniejszy, ale potrafi zmieniać swój rozmiar. Co nam oferuje?


 - ```vector<typ> moj_vector;``` -- tworzy nam nowy, początkowo pusty, vector o wybranej nazwie, przechowujący elementy wybranego typu

 - ```moj_vector.push_back(element);``` -- dorzuca na koniec vectora ```moj_vector``` wybrany przez nas element. Podobnie jak przy używaniu tablic, typ elementu musi się zgadzać

 - ```moj_vector.push_front(element);``` -- dorzuca na początek vectora wybrany przez nas element

 - ```moj_vector.pop_back();``` -- usuwa ostatni element z vectora

 - ```moj_vector.size()``` -- zwraca nieujemną liczbę całkowitą, która mówi, ile elementów znajduje się w vectorze
 
 - ```moj_vector.clear()``` -- usuwa wszystkie elementy z vectora (uwaga - nie czyści on pamięci po vectorze)
 
 - ```moj_vector.empty()``` -- zwraca true, jeśli vector jest pusty, a false w przeciwnym wypadku
 
 - ```moj_vector[a]``` -- odwołuje się do elementu, który ma indeks $a$ w naszym vectorze. Zwróć uwagę, że elementy w vectorze, podobnie jak w tablicy, zaczynają się od elementu na zerowej pozycji


Więcej o vectorze możesz przeczytać w jego [dokumentacji](http://www.cplusplus.com/reference/vector/vector/).

### Queue - kolejka

Czym jest kolejka? Kolejka zasadniczo jest podobna do kolejki w sklepie -- umożliwia Ci dodanie elementu na jej koniec lub usunięcie elementu z jej początku. Przydaje się nam np. przy algorytmie BFS. Używamy jej następująco:


 - ```queue<typ> moja_kolejka;``` -- tworzy nam nową, pustą kolejkę
 
 - ```moja_kolejka.push(element);``` -- dorzuca do kolejki ```moja_kolejka``` wybrany przez nas element. W przeciwieństwie do vectora używamy tylko push, gdyż jest tylko jeden sposób dodawania nowych elementów -- na koniec
 
 - ```moja_kolejka.pop();``` -- usuwa element, który do kolejki dodany został najwcześniej
 
 - ```moja_kolejka.size()``` -- zwraca nieujemną liczbę całkowitą, która mówi, ile elementów znajduje się na kolejce
 
 - ```moja_kolejka.empty()``` -- zwraca true, jeśli kolejka jest pusta, a false w przeciwnym wypadku
 
 - ```moja_kolejka[a]``` -- tej funkcji nie ma! Kolejka nie pozwala nam odwoływać się do dowolnego elementu z jej wnętrza. Czasem ta funkcja jest potrzebna -- zalecamy wówczas własną implementację kolejki
 
 - ```moja_kolejka.front()``` -- zwraca wartość pierwszego elementu z kolejki. Pamiętaj, aby nie wywoływać tej funkcji, gdy kolejka jest pusta!


Więcej o kolejce możesz przeczytać w jej [dokumentacji](http://www.cplusplus.com/reference/queue/queue/).


A oto przykład programu, który \"symuluje\" kolejkę przed kasą. Gdy wczytuje on liczbę większą niż $0,$ dodaję ją na koniec kolejki, a gdy wczytuje $0,$ wypisuje pierwszą liczbę w kolejce i usuwa ją:


'''clike=
#include <bits/stdc++.h>
using namespace std;

int n, a;
queue<int> kolejka;
int main() {
    cin >> n;
    for (int i = 1; i <= n; i ++) {
        cin >> a;
        if (a > 0)
            kolejka.push(a);
        else if (!kolejka.empty()) {
            cout << kolejka.top() << \"\\n\";
            kolejka.pop();
        }
    }
}
'''

### Stack - stos

Stos to struktura danych, która dobrze symuluje stos talerzy. Od kolejki różni się tym, że mamy dostęp do <b>najpóźniej</b> wstawionego elementu. Koncepcja stosu jest bardzo prosta, ale niech Cię to nie zmyli -- wiele jego zastosowań jest niebanalnych. A oto minidokumentacja stosu:


 - ```stack<typ> moj_stos;``` -- tworzy nowy, pusty stos

- ```moj_stos.push(element);``` -- dorzuca do końca stosu ```moj_stos``` wybrany przez nas element

- ```moj_stos.pop();``` -- usuwa element z końca stosu

- ```moj_stos.size()``` -- zwraca nieujemną liczbę całkowitą, która mówi, ile elementów znajduje się na stosie

- ```moj_stos.empty()``` -- zwraca true, jeśli stos jest pusty, a false w przeciwnym wypadku

- ```moj_stos[a]``` -- tej funkcji nie ma! Stos, podobnie jak kolejka, nie jest random access, czyli nie pozwala nam odwoływać się do dowolnego elementu z jego wnętrza. Czasem ta funkcja jest potrzebna -- zalecamy wówczas własną implementację stosu

- ```moj_stos.top()``` -- zwraca wartość ostatniego elementu ze stosu. Pamiętaj, aby nie wywoływać tej funkcji, gdy stos jest pusty!


Zapewne w tym miejscu zastanawiasz się, dlaczego ktoś miałby używać stosu, skoro vector potrafi znacznie więcej. Jest to słuszne pytanie -- zwykle stos można w banalny sposób napisać samemu, korzystając z vectora lub zwykłej tablicy. W wypadku stosu pomysł jest jednak najważniejszy -- często ta prosta technika przynosi nam ciekawe zastosowania.
 

Więcej o stosie możesz przeczytać w jego [dokumentacji](http://www.cplusplus.com/reference/stack/stack).
 
### Priority queue - kolejka priorytetowa

Czym różni się kolejka priorytetowa od zwykłej kolejki? Udostępnia praktycznie te same funkcje, jednak tym razem elementy trzymane są według priorytetu. Element najważniejszy (czyli pierwszy) to ten o największej wartości, itd. Z kolejki priorytetowej korzystamy tak: 


- ```priority_queue<typ> moja_kolejka_priorytetowa;``` -- tworzy nam nową, pustą kolejkę priorytetową

- ```moja_kolejka_priorytetowa.push(element);``` -- dorzuca do kolejki wybrany przez nas element

- ```moja_kolejka_priorytetowa.pop();``` -- usuwa z kolejki element o najwyższym priorytecie

- ```moja_kolejka_priorytetowa.size()``` -- podaje rozmiar kolejki priorytetowej

- ```moja_kolejka_priorytetowa.empty()``` -- zwraca true, jeśli kolejka jest pusta, a false w przeciwnym wypadku

- ```moja_kolejka_priorytetowa.top()``` -- podaje wartość elementu o najwyższym priorytecie


Więcej o kolejce priorytetowej możesz przeczytać w jej [dokumentacji](http://www.cplusplus.com/reference/queue/priority\\_queue).

### Bitset

Bitset działa jak tablica o stałym rozmiarze, która potrafi przechowywać wyłącznie zera lub jedynki. Zajmuje jednak znacznie mniej pamięci -- dla $n$ elementów będzie to $\\frac{n}{8}$ bajtów (zwykła tablica $n$ booli zajmuje $n$ bajtów) -- co czasem bywa przydatne. Ponadto, potrafi wykonywać operacje bitowe $8$ razy szybciej niż brutalnie. Posiada następujące funkcje:


- ```bitset<n> moj_bitset;``` -- deklaruje bitset o $n$ elementach

- ```moj_bitset[i]``` -- zwraca stan bitu numer $i,$ działa podobnie jak w przypadku tablicy

- ```moj_bitset.count()``` -- zwraca liczbę zapalonych bitów

- ```moj_bitset.size()``` -- zwraca rozmiar bitseta. Zauważ, że rozmiar ten nie może nigdy się zmienić

- ```moj_bitset.test(i)``` -- zwraca bool, czy $i$-ty bit jest zapalony

- ```moj_bitset.flip(i)``` -- zmienia stan $i$-tego bitu

- ```moj_bitset | moj_bitset2``` -- wykonuje operację bitową OR na dwóch bitsetach i zwraca nowyego bitseta jako wynik. Bit $i$ będzie wówczas zapalony, gdy w przynajmniej jednym z bitsetów był zapalony

- ```moj_bitset & moj_bitset2``` -- wykonuje operację bitową AND na dwóch bitsetach. Bit $i$ będzie wówczas zapalony, gdy w obu bitsetach był zapalony

- ```moj_bitset ^ moj_bitset2``` -- wykonuje operację bitową XOR na dwóch bitsetach. Bit $i$ będzie wówczas zapalony, gdy w dokładnie jednym z bitsetów był zapalony


O bitsecie więcej przeczytasz więcej w jego [dokumentacji](http://www.cplusplus.com/reference/bitset/bitset/).

### Przydatne funkcje: nim, max, __gcd, sort

W tej części artykułu poznasz inne przydatne funkcje STLa. 


- ```max(a, b)``` -- zwraca większą z wartości ```a``` i ```b```

- ```min(a,b)``` -- zwraca mniejszą z wartości ```a``` i ```b```

- ```__gcd(a,b)``` -- zwraca największy wspólny dzielnik liczb ```a``` i ```b```. Powinny to być dwie liczby całkowite. Niezalecane jest wywoływanie ```__gcd(0, 0)```. Narażamy się wówczas na błąd wykonania programu. 


- ```sort(pt1, pt2)``` -- sortuje niemalejąco zakres od wskaźnika ```pt1``` włącznie do wskaźnika ```pt2``` wyłącznie. Jeśli jeszcze nie wiesz nic o wskaźnikach, nie musisz się niczego obawiać. Powinieneś jedynie wiedzieć, że i-ty element tablicy ```tab``` ma wskaźnik ```tab+i```, a odpowiedno początek i koniec wektora ```vec``` mają wskaźniki ```vec.begin()``` i ```vec.end()```. Dlatego chcąc posortować całą tablicę ```tab``` o rozmiarze ```n``` i cały vector ```vec``` napiszemy odpowiednio ```sort(tab, tab+n);``` i ```sort(vec.begin(), vec.end());```. Istnieje również możliwość niestandardowego sortowania poprzez ```sort(tab+a, tab+b, comp)```, gdzie comp jest funkcją przyjmującą jako argumenty wartości elementów tablicy i zwracającą true, jeżeli pierwszy element powinien znaleźć się przed drugim. Dzięki temu, możesz np. posortować tablicę nierosnąco.
Jeśli czujesz niedosyt wejdź [tutaj](http://www.cplusplus.com/reference/algorithm/sort/).

 - ```next_permutation(pt1, pt2)``` -- tworzy następną leksykograficznie permutację od wskaźnika ```pt1``` włącznie do 
 
 wskaźnika ```pt2``` wyłącznie i zwraca ```true``` jeśli taka istnieje. W przeciwnym wypadku po prostu zwraca ```false```.
 
 - ```prev_permutation(pt1, pt2)``` -- analogiczna do ```next_permutation```, ale zwraca poprzednią permutację.
 
 - ```random_shuffle(pt1, pt2)``` -- losowo permutuje zakres od ```pt1``` włącznie do ```pt2``` wyłącznie. 

### Iteratory

Większość kontenerów (inaczej: struktur) C++ posiada iterator -- typ, który służy do wskazywania pojedynczych elementów danego kontenera i chodzenia po sąsiednich elementach. Jak on działa?


 - ```kontener::iterator moj_iterator``` -- tak deklarujemy iterator. Przykładowo: ```vector<int>::iterator it```.
 
 - ```*moj_iterator``` -- w taki sposób otrzymujemy wartość elementu, na który wskazuje nasz iterator.
 
 - ```++moj_iterator``` -- przejdź iteratorem do następnego elementu w kontenerze.

- ```--moj_iterator``` -- przejdź iteratorem do poprzedniego elementu w kontenerze.

O iteratorach więcej przeczytasz [tutaj](http://www.cplusplus.com/reference/iterator/).

### Set i multiset - zbiory

Set i multiset, z angielskiego zbiór i multizbiór, pozwalają nam trzymać zbiory elementów w kolejności posortowanej. Istotna różnica między nimi jest taka, że set nie potrafi trzymać dwóch takich samych elementów. Co nam udostępniają?

 - ```set<typ> moj_set;``` -- tak deklarujemy seta. Domyślnie trzyma on elementy wybranego typu w kolejności rosnącej.

- ```multiset<typ> moj_multiset;``` -- tak deklarujemy multiseta. Wszystkie poniżej opisane funkcje dziąłają praktycznie tak samo dla seta jak i multiseta.

- ```moj_set.insert(element);``` -- dodaje do naszego seta nowy element.

- ```moj_set.erase(element);``` -- usuwa wystąpienie (w przypadku multiseta wszystkie wystąpienia) danego elementu z seta.

- ```moj_set.erase(iterator);``` -- usuwa z seta tylko i wyłącznie element, na który wskazuje podany iterator. Wszystkie inne pozostają nienaruszone (możemy go też użyć dla multiseta, gdy chcemy usunąć tylko jeden element o danej wartości).

- ```moj_set.size()``` -- podaje liczbę elementów znajdujących się aktualnie w secie.

- ```moj_set.clear();``` -- usuwa wszystkie elementy z seta.

- ```moj_set.empty()``` -- zwraca true, jeśli set jest pusty, a false w przeciwnym wypadku.

- ```moj_set.find(wartosc)``` - zwraca iterator do dowolnego elementu o wskazanej wartości lub iterator na koniec seta (czyli iterator będzie wtedy równy ```moj_set.end()```), jeśli nie udało się znaleźć odpowiedniego. 

- ```moj_set.lower_bound(wartosc)``` - zwraca iterator do pierwszego elementu nie mniejszego niż wskazana wartość lub iterator na koniec seta, jeśli nie udało się znaleźć odpowiedniego. 

- ```moj_set.upper_bound(wartosc)``` - zwraca iterator do pierwszego elementu większego od wskazanej wartości lub iterator na koniec seta, jeśli nie udało się znaleźć odpowiedniego. 


Sety to bardzo potężne narzędzia. Więcej o nich przeczytasz [tutaj](http://www.cplusplus.com/reference/set/set/).


A oto przykład prostego programu z zastosowaniem seta, który wczytuje $n$ słów i dla każdego z nich mówi, czy takie słowo już się wcześniej pojawiło na wejściu:


'''clike=
#include<bits/stdc++.h>
using namespace std;

int n;
string slowo;
int main() {
    cin >> n;
    set<string> wszystkie_slowa;
    for (int i = 1; i <= n; i ++) {
        cin >> slowo;
        if (wszystkie_slowa.find(slowo) != wszystkie_slowa.end())
            cout << \"TAK\\n\";
        else
            cout << \"NIE\\n\";
        wszystkie_slowa.insert(slowo);
    }
}
'''

### Map - mapa

Ostatnim kontenerem, który omówimy, jest mapa. Mapa w pewnym sensie przypomina tablicę, z tą różnicą, że indeksami mogą być dowolne porównywalne obiekty (string, float, double, int, pair<int, int>, itp.). Główną różnicą jest to że program powiększa zbiór indeksów przy dodawaniu nowych elementów do mapy. Indeks może niektórym kojarzyć się z liczbą naturalną (tak jak w tablicy), więc będziemy używać teraz słowa: klucz. Zatem mapa jest w istocie zbiorem par (klucz, wartość). A oto funkcje, które udostępnia nam mapa: 


 - ```map<typKlucza, typWartosci> moja_mapa``` -- deklaruje mapę o wskazanym typie klucza i wartości, początkowo pustą (chociaż z pewnych przyczyn zajmuje ona znacznie więcej pamięci niż np. pusty vector). Załóżmy, że zadeklarowaliśmy: ```map<string, int> moja_mapa```.

- ```moja_mapa[\"kompendium\"]=1337``` -- ustala wartość ```moja_mapa[\"kompendium\"]``` na $1337.$ Zauważmy, że \"kompendium\" to ```string```, a $1337$ to ```int```, czyli wszystko się zgadza. Zauważyłeś podobieństwo do tablicy?

- ```moja_mapa[\"kompendium]\"``` -- zwraca wartość, przypisaną w mapie do klucza \"kompendium\" (czyli $1337$).


Istnieje także nieuporządkowana odmiana seta i mapy -- unordered_set i unordered_map. Dzięki niej możemy przyspieszyć nasz program, gdyż zamiast porównywania używają haszowania (patrz dział Algorytmy Tekstowe), dzięki któremu nasze operacje zamiast $O(log(rozmiar)),$ kosztują nas zamortyzowane $O(1).$ Niestety, nie możemy korzystać z funkcji bazujących na tym, że nasze dane są trzymane jako posortowane (np. ```lower_bound()```).
 

W zasadzie nic więcej nie potrzebujemy wiedzieć o mapie. Jeśli jednak czujesz niedosyt zajrzyj [tutaj](http://www.cplusplus.com/reference/map/map/).
  
### Typ auto

Słowo kluczowe ```auto``` oznacza zastępczy typ zmiennej, który zostanie wydedukowany na podstawie wartości za pomocą której zmienna zostanie zainicjalizowana. Zmienna, której nadano zastępczy typ auto musi zostać zainicjalizowana w chwili jej tworzenia. W przeciwnym wypadku zostanie zwrócony błąd kompilacji. Typ ten jest szczególnie przydatny przy iteracji po kontenerach. Przykładowo zastosowanie znajduje się na końcu tego artykułu. Niezalecane jest nadużywanie auto.
 

### Przeładowywanie - jak zmienić działanie kontenera?

Jak pewnie zauważyłeś, opisane struktury mają ograniczoną funkcjonalność. Przykładowo, domyślne porównywanie par porównuje najpierw ich pierwsze liczby, a następnie (jeśli są równe), drugie. Co gdybyśmy chcieli zrobić coś innego, np. porównywać pary w ten sposób, żeby mniejsza para to była ta o mniejszej sumie swoich liczb? Programiści STL zdawali sobie sprawę z tego problemu, dlatego stworzyli przeładowywanie. Polega ono na zastąpieniu domyślnej wersji czegoś swoją własną interpretacją. Niestety, niektóre z podanych struktur przeładowuje się inaczej niż inne, dlatego, w przypadku konieczności przeładowania działania jakiegoś kontenera, będziesz musiał wyszukać, jak się to robi w tej konkretnej sytuacji.

### Złożoności czasowe kontenerów

Aby artykuł był kompletny, musimy jeszcze wspomnieć o złożonościach czasowych, w jakich działają wszystkie oferowane funkcje:

- Kolejka, stos, vector, para -- to zawsze czas stały $O(1)$. Przeglądanie całego kontenera działa oczywiście w $O(n),$ gdzie $n$ jest liczbą elementów aktualnie w nim się znajdujących

- Mapa, set i kolejka priorytetowa -- to prawie zawsze $O(log \\ n)$ na jedną operację (z wyjątkiem podawania rozmiaru i przechodzenia do kolejnego elementu)

- Max i min -- ponownie czas stały. Funkcja ```__gcd(m, M)``` działa w $O(M)$ (gdzie $M$ to większa spośród dwóch liczb). Wszystkie funkcje odnoszące się do pewnego zakresu tablicy o długości $n$ działają w $O(n),$ z wyjątkiem sortowania, które działa w $O(n \\ log \\ n).$


Podczas projektowania algorytmów z użyciem Standard Template Library musisz pamiętać, że większość struktur oferuje znacznie więcej niż jest Ci potrzebne, dlatego napisane własnoręcznie i posiadające tylko potrzebne fukncje mogą okazać się znacznie szybsze.

### Zastosowanie

Oto przykładowy program, służący do wypisania wszystkich permutacji podanych liczb, od najmniejszej (tzn. mającej jak najmniejsze liczby po lewej) do największej, w pełni wykorzystujący dobrodziejstwa STLa.


'''clike=
#include<bits/stdc++.h>
using namespace std;
    
int n, a;
int main() {
    cin >> n;
    vector<int> v = {};
    for (int i = 1; i <= n; i ++) {
        cin >> a;
        v.push_back(a);
    }
    sort(v.begin(), v.end());
    do {
        for(auto x: v) {
            cout<<x<<' ';
        }
        cout<<'\\n';
    }
    while(next_permutation(v.begin(), v.end()));
}
'''


Zastanów się, dlaczego najpierw posortowaliśmy ciąg i dlaczego użyliśmy do...while zamiast while. Jak myślisz, co robi tutaj funkcja ```next_permutation(v.begin(), v.end())```? Jeśli nie jesteś pewien, poszukaj o tym w dokumnetacji!
 
### Zadania

- [Sortowanie biżuterii (I OIJ, I etap)](https://szkopul.edu.pl/problemset/problem/ERz8Uez5UFnNbPH2Jn965eZ3/site/?key=statement)

- [Frania (AMPPZ 2011)](https://szkopul.edu.pl/problemset/problem/dSuTaLN34_1tReKxNQH5gntf/site/?key=statement)

- [Tea Queue (Codeforces, Edu Round B)](https://codeforces.com/contest/920/problem/B)

- [Segments Removal (Codeforces, Div. 2 E)](https://codeforces.com/contest/899/problem/E)
"
---
