---
title: 'Dynamiki optymalizacyjne'
content: "
W tym artykule nauczysz się rozwiązywać niektóre problemy optymalizacyjne, czyli takie, w których szukamy najlepszego rozwiązania. Zastosujemy w tym celu (a jakżeby inaczej) programowanie dynamiczne, a także struktury danych i heurystyki.

## Zadanie przystawka - najdłuższy podciąg rosnący (Longest Increasing Subsequence LIS)
Zacznijmy  od  jednego  z  najpopularniejszych  problemów  optymalizacyjnych.  Mamy  dany  ciąg $(a_i)$ o długości $n \\leq 10^6$ i chcemy znaleźć długość jego najdłuższego podciągu rosnącego. Dla proszczenia załóżmy, że $a_i⩽ 10^6$, gdyż w innym przypadku możemy bezproblemowo przeskalować wartości.
Poprzez <b>podciąg</b> ciągu $(a_i)$ rozumiemy taki ciąg liczb, który możemy otrzymać z ciągu $(a_i)$ poprzez usunięcie niektórych jego wyrazów.

### Rozwiązanie brutalne
Spróbujmy  rozwiązać  problem  jakkolwiek.  Niech $DP [i]$ będzie  długością  najdłuższego  podciągu rosnącego, który kończy się na $i-$tym elemencie. Jasne jest, że będziemy próbować rozszerzyć jakiś  podciąg,  który  istniał  wcześniej.  Wobec  tego $DP [i] = 1 + max_{j<i, \\ a_j < a_i}DP[j]$ (czyli $DP[j]$ jest największe spośród tych $j,$ które są mniejsze od $i$ oraz których wyraz ciągu jest mniejszy od $a_i,$ czyli które mogą być potencjalnym poprzednim elementem podciągu rosnącego). Jeśli  sprawdzimy  ten  warunek  brutalnie  forem  otrzymamy  bardzo  proste  rozwiązanie  działające  w  czasie $O (n^2).$

```cpp=
int lis(int[] a, int n) {
	int result = 0;
	for (int i = 1; i <= n; i ++) {
		int best = 0;
		for (int j = 1; j < i; j ++)
			if (a[j] < a[i])
				best = max(best, DP[j]);
		DP[i] = best + 1;
		result = max(result, DP[i]);
	}
	return result;
}
```

### Dynamiki i struktury danych
Poprawianie złożoności dynamików często jest niewykonalne bez pomocy odpowiednich struktur danych. Gdyby nie wymaganie, że $a_j < a_i,$ to poradzilibyśmy sobie łatwo maximum prefiksowym. W tym wypadku  jest  tylko  nieznacznie  trudniej. Interesuje nas bowiem  największa  wartość $DP[j]$ dla wszystkich $j,$ które już przetworzyliśmy (bo $j < i$), a ponadto takich że $a_j < a_i$.
Zauważmy, że skoro przetwarzamy podciągi w takiej kolejności, w jakiej się kończą, w momencie gdy chcemy znaleźć $DP[i]$ znamy tylko podciągi, kończące się wcześniej niż na pozycji $i$. Chcemy więc tak właściwie znaleźć po prostu maksimum wartości $DP[j]$ dla $a_j$ na przedziale od $1$ do $a_i-1$.
Możemy zastosować więc jakąś strukturę danych do znajdywania maksimum na prefiksie – na przykład drzewo potęgowe (bardzo proste i bardzo szybkie - nauczyłeś się je implementować na jednej z lekcji o strukturach danych).

```cpp=
// Tutaj implementujemy drzewo potęgowe jako PowerTree

int lis_opt(int[] a, int n) {
	int result = 0;
	PowerTree powerTree = new PowerTree();
	for (int i = 1; i <= n; i ++) {
		int best = powerTree.getMinOnPrefix(a[i] - 1);
		DP[i] = best + 1;
		result = max(result, DP[i]);
		powerTree.insertToTree(a[i], DP[i]);
	}
	return result;
}
```

Po optymalizacji drzewem potęgowym nasz algorytm ma złożoność $O(n \\ log \\ n)$. LIS jest przykładem problemu, w którym odpowiednie wybranie stanu w programowaniu dynamicznym umożliwiło nam optymalizację. Należy o tym pamiętać – czasem warto spróbować kilku różnych podejść. Być może któreś jest bardziej przyjazne do optymalizacji niż inne. Ponadto, im łatwiejsza i szybsza struktura danych której używamy, tym lepiej.

## Dynamiki przedziałowe - Outer space invaders
Dynamiki przedziałowe to jeden z najdziwniejszych fenomenów, z którymi się dotychczas spotkałem.  Mimo,  że  rozwiązania  z  ich  użyciem  są  zwykle  proste,  to  sieją  pożogę  wśród  uczestników. Rozważmy zadanie Outer space invaders z konkursu [Central Europe Regional Contest 2014](https://cerc.tcs.uj.edu.pl/2014/data.html) – europejskich eliminacji do [Mistrzostw Świata w Programowaniu Zespołowym ACM-ICPC.](https://icpc.global/worldfinals/problems) Zrobiły je tam tylko trzy drużyny, chociaż nie było wcale trudne.

Pomińmy  bajkę  o  kosmitach  i  przejdźmy  od  razu  do  formalnej  treści  problemu.  Dane   jest $n \\leq 300$ poziomych (czerwonych) odcinków $(a_i, h_i), (b_i, h_i)$. Chcemy narysować pionowe (niebieskie) odcinki tak, aby każdy z poziomych odcinków dotykał pewnego pionowego odcinka. Jaką minimalną sumaryczną długość niebieskich odcinków możemy uzyskać?

![Odcinki - przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a828fdc7c8ae3125e6a3a1acf5d90940.png)

### Obserwacja i skalowanie
Zacznijmy od prostej obserwacji. Opłaca nam się rysować niebieskie odcinki tylko w takich $x,$ że istnieje czerwony odcinek, który kończy się w $x.$ Dlaczego? Rozważmy rozwiązanie ’optymalne’, w którym tak nie jest. Wówczas możemy każdy z pionowych odcinków dosunąć w prawo do pierwszego miejsca, w którym kończy się jakiś przedział, i uzyskamy rozwiązanie o tym samym koszcie, spełniające nasz warunek.

Ten  sam  argument  tyczy  się  lewych  końców.  Możemy  więc  przeskalować (skrócić) nasze  przedziały tak, żeby sąsiednie początki i końce kolejnych przedziałów były odległe o co najwyżej $1,$  zachowując  zależności. Dzięki  temu  otrzymamy  problem  równoważny,  w  którym  zachodzi  zawsze $1 \\leq a_i \\leq b_i \\leq 600.$ W tym momencie możemy przejść do opisu dynamika przedziałowego.

### Stan
Niech $DP[a][b]$ będzie kosztem (liczonym w długości niebieskich odcinków, które musimy dodać) odcinków czerwonych, które mieszczą się w całości w  przedziale $[a, b].$ Często jeśli wymyśliliśmy  poprawny  stan  dynamika,  rozwiązanie  znajdzie się samo. Tak jest w tym zadaniu: teraz policzenie dynamika okazuje się znacznie łatwiejsze niż dojście do tego, by właśnie taki stan zastosować.

### Przejścia między stanami dynamika
Jeśli w przedziale $[a, b]$ nie ma żadnego odcinka czerwonego to $DP[a][b] = 0.$ W przeciwnym wypadku istnieje odcinek czerwony z największą współrzędną $y$ (czyli najwyżej położony) - powiedzmy, że pokrywa on przedział $[k, l].$ Jeśli chcemy narysować niebieskie odcinki przez każdy z odcinków czerwonych to przez ten konkretny odcinek też z musi przechodzić jakiś niebieski odcinek. Rozważymy każde możliwe położenie tego niebieskiego odcinka. Leży on gdzies na przedziale $[k, l]$ - niech jego położenie będzie oznaczone przez $m.$ Ten odcinek ma koszt i wysokość $y$ – nie może być krótszy, bo chcemy zahaczyć rozważany czerwony odcinek, a nie ma sensu, żeby był dłuższy. Zauważmy, że przy okazji zahaczymy nim również wszystkie inne czerwone odcinki, przechodzące nad $m.$

Wobec tego zostają nam do pokrycia odcinkami przedziały $[a, m - 1]$ oraz $[m + 1,b].$ Obydwa  te  przedziały  mają  krótsze długości, niż $[a, b]$.  Jeśli  więc  policzymy  tablicę $DP[][]$ w  kolejności przedziałów o rosnącej długości to obydwie te wartości będą już wcześniej wyliczone. Otrzymaliśmy rozwiązanie, działające w czasie $O(n^3)$.

```cpp=
//A[], B[], range[]: charakterystyka czerwonych przedzialow
//DP[][]: tablica z wynikami, na poczatku wypelniona nieskończonościami (inf)

const int inf = 1e9+5;

int grab(intA[], int B[], int Y[], int n, int x, int y)
{
	// Szuka najwyzszego przedzialu, ktory
	// znajduje sie caly w przedziale [x, y]
	int res = 0;
	for (int i = 1; i <= n; i ++)
		if (x <= A[i] && B[i] <= y && Y[res] < Y[i])
	res = i;
	return res;
}

int getDP(int a, int b) {
	// Pomaga nie odwolywac sie do glupich rzeczy
	if (a <= b)
		return DP[a][b];
	return 0;
}

int outer_space_invaders(int A[], int B[], int Y[], int n) {
	// Najpierw skalujemy przedziały - 
	// powiedzmy, że początek pierwszego jest na pozycji 1,
	// a koniec ostatniego na pozycji d
	
	for (int len = 1; len <= d; len ++) {
		for (int i = 1; i + len - 1 <= d; i ++) {
			int j = i + len - 1;
			int best = grab(i, j);
			if (best == 0)
				DP[i][j] = 0;
			else {
				DP[i][j] = inf;
				for (int m = A[best]; m <= B[best]; m ++) {
					int tmp = getDP(i, m - 1);
					tmp += getDP(m + 1, j);
					tmp += Y[best];
					DP[i][j] = min(DP[i][j], tmp);
				}
			}
		}
	}
	return DP[1][DL];
}
```

### Zapiekanki, czyli kompresja stanów i inne heurystyki
Nazwa tego triku wzięła się od zadania z [finału 24 Olimpiady Informatycznej.](https://szkopul.edu.pl/p/default/problemset/oi/24) Koniecznie przeczytaj jego [treść.](https://szkopul.edu.pl/problemset/problem/w-dbshXVyRol4LIT9jeP-bNn/site/?key=statement) Zadanie to było z zamierzenia najtrudniejszym zadaniem z tamtego finału. Jeśli spojrzysz na ranking tego finału, zobaczysz pewnie mnóstwo razy wynik $92$ za nie. Dało się je bowiem ’zrobić’ przy pomocy triku z kompresją stanów.

Przy pomocy programowania dynamicznego chcielibyśmy policzyć $DP[i]$ jako najlepszy rezultat obsłużenia  pierwszych $i$ klientów. Zauważmy jednak, że niekoniecznie  optymalnym  będzie  skorzystanie z najlepszego rozwiązania pod względem wyniku. Czasem może się nam opłacać zadziałać nieco gorzej, aby skończyć wcześniej i później mieć szansę na lepszy rezultat (działanie perspektywiczne). Wobec  tego  stan  oznaczymy  przez  parę $(DP[i], T[i])$ –  najlepszy  możliwy  rezultat  obsłużenia pierwszych $i$ kandydatów pod warunkiem, że kończymy to robić w czasie $T[i]$. Tym razem będzie nieco inaczej niż zwykle. Zamiast jednego stanu będziemy pamiętać cały wektor stanów, zdefniowanych powyżej.

Kluczowa (i niekoniecznie błyskotliwa) obserwacja: jeśli mamy dwa różne stany $S_i, \\ S_j$ oraz $DP[i] \\leq DP[j]$ oraz $T [i] <= T [j]$, to <b>stan $S_j$ jest dla nas bezużyteczny.</b> Nie dość, że mamy gorszy rezultat obsłużenia klientów, to jeszcze kończymy później. To oczywiście bez sensu. Możemy więc zapomnieć o stanie $S_j$. Napiszemy funkcję ```repairDP```, która wyrzuci nam wszystkie bezużyteczne stany z wektora. Dzięki niej nasz kod zacznie działać bardzo szybko.

Dlaczego funkcja ```repairDP``` tak bardzo przyspiesza nasz kod? Jest kilka powodów. Po pierwsze, rozwiązanie bez jej użycia jest pesymistycznie wykładnicze. Po  kompresji  nie  może  istnieć  natomiast więcej  niż $O(n)$ różnych stanów. Podpowiedź jak to udowodnić: zapiekankę zawsze w rozwiązaniu optymalnym pieczemy albo od razu po zakończeniu poprzedniego  pieczenia, albo w momencie, gdy ma przyjść  jakiś klient. Jedna i druga sytuacja występuje $O (n)$ razy. Rozwiązanie nasze działa więc nie gorzej niż $O (n^3)$ (może przemnożone jeszcze przez jakiś $log$ z sortowania).

W praktyce jest jednak niesłychanie trudno ułożyć testy, w których newralgiczne jest pamiętanie dużej liczby stanów, dlatego właśnie rozwiązanie  to  działa  jeszcze  szybciej.  Przypuszczam,  że  nie  istnieje  test,  w  którym  trzeba  pamiętać więcej niż $O (log \\ N)$ stanów. Na zawodach był tylko jeden nieprzyjemny test i rozwiązanie kompresujące stany dostawało właśnie $92$ punkty, tak samo jak bardzo niepoprawne rozwiązanie, pamiętające tylko stan z najlepszym wynikiem. Oto kod, który podczas zawodów zdobył właśnie $92$ punkty:

```cpp=
typedef long long ll;
typedef pair <ll, ll> PLL;
typedef vector <ll> vll;
vll dp[maxn], opt[maxn];
int n, poj;
ll pref[maxn], tab[maxn], czas;

inline ll getSum(int a, int b) {
	return pref[b] - pref[a-1];
}

inline PLL koszt(int skad, int dokad, ll pocz) {
	ll koniec = max((ll)pocz + czas, tab[dokad]);
	ll ret = koniec * (ll)(dokad - skad + 1) - getSum(skad, dokad);
	return mp(ret, koniec);
}

vector <PLL> pom;
inline void repairDP(int i) {
	pom.clear();
	FOR (kt, 0, (int)dp[i].size()-1)
		pom.pb(mp(dp[i][kt], opt[i][kt]));
	sort(pom.begin(), pom.end());
	dp[i].clear(); opt[i].clear();
	dp[i].pb(pom[0].e1); opt[i].pb(pom[0].e2);
	FOR (kt, 1, (int)pom.size()-1) {
		if (opt[i].back() > pom[kt].e2) {
			opt[i].pb(pom[kt].e2);
			dp[i].pb(pom[kt].e1);
		}
	}
}

int main() {
	opt[0].pb(0);
	dp[0].pb(0);
	ios_base::sync_with_stdio(0);
	cin >> n >> poj >> czas;
	FOR (i, 1, n)
		cin >> tab[i];
	pref[0] = 0;
	FOR (i, 1, n)
		pref[i] = pref[i-1] + tab[i];
	FOR(i, 1, n) {
		int all = min(i, poj);
		dp[i].clear(); opt[i].clear();
		FOR (j, 1, all) {
			for (int kt = 0; kt < (int)dp[i-j].size(); ++kt) {
				PLL wyn = koszt(i - j + 1, i, opt[i-j][kt]);
				wyn.e1 += dp[i-j][kt];
				dp[i].pb(wyn.e1);
				opt[i].pb(wyn.e2);
			}
		}
		repairDP(i);
	}
	cout << dp[n][0];
}
```

A jak zdobyć $100$ pkt? Wystarczy przechytrzyć autorów testów. Po pierwsze, możemy uciąć wektory stanów. Zauważmy, że stany układają się tak, że $DP$ tworzą ciąg rosnący, a $T$ – malejący. Im dalszy element, tym gorszy aktualny wynik jest przez niego reprezentowany. Możemy więc założyć, że nie zostaniemy zmuszeni do znacznego pogorszenia wyniku kosztem czasu pieczenia i pamiętać tylko $O ( log \\ N )$ ostatnich  stanów,  resztę  wyrzucić  tak  samo  jak  stany bezużyteczne.  Albo możemy założyć,  że w ogóle testy nie wymuszają zbytniego czekania i zostawić sobie tylko stałą liczbę $C$ najlepszych stanów pod względem wyniku. Już $C = 2$ pozwala uzyskać $100$ punktów.

Dlaczego aż tak prosto przechytrzyć testy w tym zadaniu? Niełatwe jest już skonstruowanie testu, gdzie  opłaca  się  przechodzić  ze  stanów  o  niekoniecznie  najlepszym wyniku, a co  dopiero $log \\ N$ najlepszych wyników. Musimy pamiętać, że autorzy testów to tylko ludzie, a kreatywność naszych heurystyk jest w stanie ich czasami pokonać.

Dynamiki optymalizacyjne cechują się niestety wysoką podatnością na rozwiązania niepoprawne. Dlaczego tak jest? Powiedzmy, że mamy znaleźć jakąś minimalną wartość, którą w wypadku zadania zapiekanki jest czas oczekiwania klientów. Nic nie stoi na przeszkodzie, aby napisać kilka mniej lub bardziej zachłannych rozwiązań, a następnie zwrócić najmniejszy z otrzymanych wyników. Albo przeglądać tylko $100$ najbliższych punktów w każdym kierunku (to z kolei dobra heurystyka do zadań geometrycznych z minimalną odległością). Albo po prostu kompresować stany, tak jak w wypadku zadania zapiekanki. Nie są to rozwiązania zawsze zwracające  poprawną  odpowiedź,  ale  często  wystarczająco  dobre,  aby  otrzymać  dużo  punktów. Tak samo jest z heurami czasowymi – w praktyce zachowują się bardzo dobrze, co nie oznacza wcale, że dostatecznie zmotywowany autor testów nie będzie w stanie zmusić naszego rozwiązania do przekroczenia limitu czasu.

## Zadania

- [Bony (XIX OI, II etap)](https://szkopul.edu.pl/problemset/problem/Y2sHfxzqdwT7qKzabT0fzmlB/site/?key=statement)
- [Konduktor (XVI OI, II etap)](https://szkopul.edu.pl/problemset/problem/PSqCh5o1-Gyl1WaQSGXjxkZN/site/?key=statement)
- [Zapiekanki (XXIV OI, III etap)](https://szkopul.edu.pl/problemset/problem/w-dbshXVyRol4LIT9jeP-bNn/site/?key=statement)
"
---
