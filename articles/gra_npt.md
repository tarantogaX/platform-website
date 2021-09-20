---
title: 'Problemy NP-trudne'
content: "
### Wstęp
Jednym z największych wyzwań informatyki teoretycznej jest odpowiedzenie na pytanie: <b>Czy $P$~$=$~$NP$?</b>. W tym artykule dowiesz się, co to znaczy, a także jak radzić sobie z problemami NP-trudnymi.

### Sprawdzenie rozwiązania, a znalezienie go
Aby rozpocząć omawanie problemów NP-trudnych musimy rozróżnić znalezienie i sprawdzenie rozwiązania. Sprawdzenie polega na tym, że mając w ręku jakiegoś <b>kandydata</b> na rozwiązanie chcemy powiedzieć, czy faktycznie spełnia warunki zadania. Tak może być w przypadku problemu kliki.

Wyobraźmy sobie, że mamy dany graf nieskierowany i chcemy znaleźć największy jego podgraf taki, że każda para wierzchołków jest połączona krawędzią (czyli klikę). W tym wypadku sprawdzenie rozwiązania jest tak samo trudne jak znalezienie go -- gdy chcemy się upewnić, że nie ma lepszego tak czy inaczej musimy poszukać większych klik. 

Z drugiej strony, gdybyśmy mieli dane $k$ i chcieli znaleźć klikę z $k$ wierzchołków, to sprawdzenie jest znacznie prostsze -- wystarczy tylko upewnić się, że wyróżniliśmy $k$ wierzchołków, a każda para z nich jest połączona krawędzią. To pokazuje, że sprawdzenie rozwiązania może być prostsze niż znalezienie go, choć tak być nie musi.

### Rodzaje problemów
Problemy natury obliczeniowej możemy podzielić na kilka grup. W problemach <b>decyzyjnych</b> zwykle pytanie zaczyna się od <b>czy?</b>, a naszym zadaniem jest odpowiedzieć <b>TAK</b> lub <b>NIE</b>. Takim problemem jest na przykład sprawdzenie, czy w grafie istnieje klika rozmiaru $k$ (powyższe zadanie). Inną grupą są problemy optymalizacyjne, gdzie musimy znaleźć w pewnym sensie <b>najlepsze</b> rozwiązanie. Problem znalezienie największej kliki jest problemem optymalizacyjnym. Zauważmy, że te dwa problemy są w pewnym sensie podobne. Jeśli umiemy rozwiązać sprawdzanie, czy istnieje klika wielkości $k,$ to możemy przeiterować się po każdym możliwym $k$ i znaleźć największe takie $k,$ dla którego rozwiązanie istnieje, aby rozwiązać drugi problem (lub w przypadkach ekstremalnej desperacji użyć wyszukiwania binarnego po wyniku aby zbić $O(n)$ do $O(logN)$). Są jeszcze inne rodzaje problemów, ale w tym miejscu nie potrzebujemy ich definiować.

### Klasy problemów pod względem złożoności obliczeniowej

\\begin{center}
\\includegraphics[width=6.5in]{problemy_np.png}
\\end{center}

Co to dla nas oznacza? Hipoteza $P \\neq NP$ mówi, że istnieją problemy decyzyjne, których nie da się rozwiązać w czasie wielomianowym (przy założeniu kilku drobnych szczegółów). Od wielu lat informatycy starają się zarówno rozstrzygnąć hipotezę, jak i radzić z problemami NP-trudnymi przy założeniu, że jednak łatwe nie są.

Więcej o hipotezie $P \\neq NP$ możesz przeczytać \\href{http://www.deltami.edu.pl/temat/informatyka/2016/12/27/Czemu_nikt_nie_wierzy_ze_P_NP/}{tutaj}.

### Problemy NP-zupełne
Problemy NP-zupełne to szczególna klasa problemów NP. Aby zadowolić formalistów (z wikipedii): 



- Problem NP (ang. nondeterministic polynomial, niedeterministycznie wielomianowy): problem decyzyjny, dla którego rozwiązanie można zweryfikować w czasie wielomianowym. Równoważna definicja mówi, że problem jest w klasie NP, jeśli może być rozwiązany w wielomianowym czasie na niedeterministycznej maszynie Turinga.
- Problem NP-zupełny: problem, który należy do klasy NP oraz dowolny problem należący do~NP może być do niego zredukowany w czasie wielomianowym.



Co to dla nas oznacza? Ze względu na drugą definicję jeśli udałoby się rozwiązać choć jeden z problemów NP-zupełnych w czasie wielomianowym, to <b>wszystkie</b> problemy NP-zupełne byłyby rozwiązywalne w czasie wielomianowym(!). Również z tego powodu większość naukowców nie wierzy w to, że $P = NP.$

Jakie problemy są NP-zupełne? 


- Znalezienie cyklu Hamiltona w dowolnym grafie
- Znajdowanie klik w dowolnym grafie
- Problem spełnialności formuł logicznych (SAT).
- Problem plecakowy


Szczególnie ta ostatnia wiadomość mogła być zaskakująca. Tak, problem plecakowy jest NP-zupełny. Nasze algorytmy działały w czasie $O(n\\cdot w),$ gdzie $w$ było wielkością liczby. To nie jest czas wielomianowy względem samego $n$ :)

Wiele innych problemów jest NP-zupełnych. Pokaźną ich listę znajdziesz \\href{https://en.wikipedia.org/wiki/List_of_NP-complete_problems}{tutaj}. Z kolei o redukcjach między problemami możesz przeczytać w \\href{http://www.deltami.edu.pl/temat/informatyka/2017/08/24/Dlaczego_niektore_lamiglowki/}{Delcie}.

### Programowanie dynamiczne
Jedną z metod radzenia sobie z problemami NP-trudnymi jest użycie programowania dynamicznego. Łatwo domyślić się, że będzie ono działać w czasie wykładniczym. Artykuł na ten temat już prawdopodobnie czytałeś. Jeśli nie, zajrzyj koniecznie na \\href{http://kompendium.meetit.pl/kurs#dp4}{naszą stronę}.

### Backtracking, czyli przeszukiwanie z nawrotami
Każdy z poniższych tematów to temat--rzeka. O problemach NP-trudnych powstało mnóstwo zaawansowanej teorii. Postaram się przybliżyć podstawy, a rozszerzeniem będą linkowane artykuły.

Przeszukiwanie bez nawrotów <b>po prostu</b> rozpatrzyłoby wszystkie możliwości. Przykładowo -- aby znaleźć cykl Hamiltona w grafie możemy po prostu rozważyć wszystkie kolejności wierzchołków, ale to osiągnęłoby złożoność $O(n! \\cdot n).$ Zamiast tego możemy być odrobinę sprytniejsi.

Zaczniemy tak samo, będziemy próbować generować cykl, począwszy od pewnego wierzchołka. Następnie, jeśli $x$ jest ostatnim znalezionym wierzchołkiem, to każdy kolejny potencjalny wierzchołek na cyklu musi być sąsiadem $x.$ Ponadto, ten nowy wierzchołek nie mógł się wcześniej znajdować na cyklu. To najczęściej znacznie ogranicza nam liczbę możliwości do sprawdzenia.

Ponadto, przerywanie przeszukiwania jest bardzo ważnym czynnikiem. Gdy z jakiegoś powodu jesteśmy w stanie stwierdzić, że <b>coś się zepsuło</b> i nie ma szans na znalezienie rozwiązania, to możemy cofnąć przesukiwanie. Z tego właśnie powodu ta technika nazywa się przeszukiwaniem z nawrotami.

Być może przeczytałeś już o backtrackingu podczas kursu algorytmiki na <b>MAIN 2</b>. Jeśli nie, zachęcam żeby na niego spojrzeć pod \\href{https://main2.edu.pl/main2/courses/show/7/18/}{tym linkiem}.

### Prostsze przypadki
Nie należy też zapominać o tym, że wspomniane wyżej problemy <b>w ogólności</b> są trudne. To wcale nie oznacza, że jest tak zawsze! Mając dodatkowe warunki (na przykład specjalne grafy) możemy spokojnie poradzić sobie ze zmodyfikowanymi wersjami problemów NP-trudnych. Spróbuj swoich sił z <b>Clique problem</b> z dołączonych zadań, aby się o tym przekonać.

### Algorytmy parametryzowane
Prawdopodobnie nie umiemy rozwiązywąć problemów NP-trudnych w czasie wielomianowym. Możemy natomiast rozwiązywać je w czasie wykładniczym względem innych cech. Przykładowo, jeśli najdłuższa ścieżka prosta w grafie nie przekracza $k$ wierzchołków, to istnieje algorytm, który znajduje minimalne pokrycie wierzchołkowe w tym grafie ($n$ wierzchołków, $m$ krawędzi) w czasie $O((1 + \\sqrt{2})^k \\cdot (n+m)).$ Rozwiązuje on zadanie <b>Turystyka</b>, które dołączone jest do artykułu o dynamikach wykładniczych. 

### Heurystyki i aproksymacje
Skoro nie umiemy czegoś zrobić tak dobrze jak byśmy chcieli, to możemy pójść na pewne ustępstwa i poszukać algorytmów <b>heurystycznych</b>. Heurystyka to \"metoda znajdowania rozwiązań, dla której nie ma gwarancji znalezienia rozwiązania optymalnego, a często nawet prawidłowego. Rozwiązań tych używa się np. wtedy, gdy pełny algorytm jest z przyczyn technicznych zbyt kosztowny lub gdy jest nieznany\". Czasami możemy użyć też tzw. heurystyki czasowej, czyli założenia, które praktycznie przyspieszy nasz algorytm dla większości przypadków. Taką jest na przykład algorytm SPFA znajdowania najkrótszych ścieżek w grafie -- choć istnieją instancje problemu na których działa w złożoności $O(n\\cdot m),$ to w praktyce jest znacznie szybszy. Jego faktyczna złożoność wynosi $O(m)$ dla losowego grafu.

Innym ustępstwem są aproksymacje. To kolejny duży dział informatyki teoretycznej. Chodzi o to, aby zamiast rozwiązania optymalnego znaleźć \\textit{niewiele} gorsze. Formalnie, powiemy że algorytm jest $C$--aproksymacyjny, jeśli znajduje rozwiązanie nie więcej niż $C$ razy gorsze niż optymalne. Naprawdę często zdarzają się tutaj ciekawe i zaskakujące wyniki. Przykładowo, dla pewnego problemu w sposób banalny pokazujemy algorytm $2$--aproksymacyjny, a istnienie jakiegokolwiek lepszego algorytmu natychmiast implikowałoby potężny przełom w informatyce (coś prawie tak wielkiego jak $P \\neq NP$). Więcej znajdziesz \\href{http://smurf.mimuw.edu.pl/node/1142}{w tym artykule}.

A na koniec ciekawostka z olimpiady. Jednym z najtrudniejszych i najciekawszych zadań $22$ Olimpiady Informatycznej były <b>Tablice kierunkowe</b> autorstwa <b>Wojciecha Nadary</b>. Zadanie sprowadzało się do znalezienia największej kliki w dość specyficznym grafie. Kilku zawodników zdecydowało się spróbować zadziwiająco głupiego podejścia -- \\textit{Dopóki graf nie jest kliką, wyjmuj wierzchołek o najmniejszym stopniu}. Takie rozwiązania dostawały $100$ punktów. Kurtyna.

## Zadania
- [Podział królestwa (XV OI, III etap)](https://szkopul.edu.pl/problemset/problem/a-E26wgLFqHZJv98qc9jQe2E/site/?key=statement)
- [Koleje (XIV OI, III etap)](https://szkopul.edu.pl/problemset/problem/tNexGGGfl9rXi0IJkMjeA-SM/site/?key=statement)
- [Zosia (XIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/Igfr_XfXWhPW-td_1TuZvWm1/site/?key=statement)
"
---
