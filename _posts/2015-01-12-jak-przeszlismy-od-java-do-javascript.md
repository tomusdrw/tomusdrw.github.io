---
layout: post
title: "Jak przeszliśmy od Java do Javascript"
author: "Tomasz Drwięga"
categories: old
tags: [old]
image: up.jpg
---

Nokia to nie tylko _BTSy_ i _C++_. Tworzymy również oprogramowanie, które usprawnia naszą wewnętrzną pracę i wspomaga nas w automatyzacji i wykonywaniu codziennych zadań. W dziale Big Data & Network Engineering budujemy narzędzia, które pomagają przetwarzać i analizować duże ilości danych telekomunikacyjnych.

## Etap 1: Offline

Kiedy dołączyłem do naszego działu zajmowaliśmy się kilkoma narzędziami, które tworzone były jako aplikacje desktopowe. Pracowaliśmy nad projektem pisanym w _Javie_ (rozwijanym do dzisiaj), który używany jest podczas analizy pracy sieci oraz planowania nowych stacji bazowych.

Aplikacja desktopowa jest oczywiście instalowana na komputerze użytkownika i dzięki temu można ją uruchomić, nawet kiedy nie ma on dostępu do Internetu. Problem pojawia się, kiedy aplikacja jest intensywnie rozwijana i chcemy, żeby wszyscy użytkownicy zawsze korzystali z najnowszej wersji. Dzień, w którym wychodziła nowa wersja naszej aplikacji i okres, który poprzedzał release był najbardziej intensywnym i stresującym okresem - w momencie, kiedy przygotowaliśmy instalator i wysłaliśmy wiadomość do użytkowników o nowej wersji wszystko musiało być dopięte na ostatni guzik. Kiedy użytkownicy pobiorą instalator nie będzie już odwrotu i możliwości wysłania im poprawek.

Kolejną bolączką było tworzenie _GUI_. Stworzenie spójnego interfejsu wymagało od nas napisania wielu abstrakcyjnych komponentów, co było bardzo czasochłonne. Interfejs aplikacji desktopowej jest też ograniczony kontrolkami, które dostępne są w danym systemie operacyjnym. Nasze _GUI_ było po prostu brzydkie i nie było mowy o wprowadzeniu żadnych animacji czy wizualnych efektów.

Z tych powodów zaczęliśmy szukać alternatywnego podejścia do tworzenia naszych narzędzi.

## Etap 2: Going Online

Pierwszym podejściem do rozwiązania tych problemów była próba stworzenia aplikacji webowej, a właściwie strony internetowej. Idea jest prosta - zamiast uruchamiać aplikację na komputerze użytkownika, uruchamiamy ją na naszym serwerze, a użytkownikowi dajemy tylko adres, pod którym może ją znaleźć. Dzięki takiemu podejściu to my kontrolujemy wersję aplikacji, z której korzystają wszyscy użytkownicy, ale niestety dostęp do Internetu (czy przynajmniej tej samej sieci, w której znajduje się serwer) staje się niezbędny.

Na tym etapie nie wiedzieliśmy prawie nic o pisaniu aplikacji internetowych. Kilku z nas miało pewne doświadczenie w tworzeniu stron z wykorzystaniem _HTML_ i _jQuery_, ale na tym nasza wiedza się kończyła.

Pierwszy prototyp stworzyliśmy korzystając z _PHP_ w oparciu o framework _Symfony_. Najważniejszą zaletą aplikacji było to, że nie musieliśmy już prosić użytkowników o instalację programu (lub uaktualnienia) i generowanie licencji - wystarczyło wysłać im link i od razu mogli z niej korzystać!

Korzystanie z technologi webowych pozwoliło nam także na szybsze tworzenie funkcjonalnego interfejsu. Stworzenie _GUI_ było też o wiele prostsze niż w _Javie_ i mogliśmy wykorzystać otwarte biblioteki oraz zasoby, których w Internecie jest dużo więcej dla technologi webowych niż dla _Javy_.

Sposoby tworzenia interfejsu również zmieniały się wraz z zagłębianiem sie w to, co możliwe jest do zrobienia z użyciem _HTML_. Rozpoczynaliśmy od stylowania komponentów za pomocą _CSS i problemów z nazewnictwem klas, specyficznością i kompatybilnością między przeglądarkami. Bardzo szybko zaczęliśmy korzystać z preprocesorów _CSS_ (np. _LESS_), a ostatecznie użyliśmy frameworku _Twitter Bootstrap_, który zaadaptowaliśmy do naszych potrzeb. Dzięki takiemu podejściu mogliśmy łatwo tworzyć spójny interfejs i bardzo szybko prototypować różne układy strony. Większość z nas jest typowymi programistami, a nie designerami, więc pozwala nam to skupić się na tworzeniu logiki naszej aplikacji, która przy okazji wygląda całkiem nieźle.

Aplikacja w postaci strony internetowej ma oczywiście swoje wady. Każda akcja użytkownika na naszej stronie była wysyłana do serwera, który generował nowy kod do wyświetlenia użytkownikowi. Powodowało to spore opóźnienia, ponieważ za każdym razem nasza strona musiała się odświeżyć. Użytkownicy oczekiwali od naszego narzędzia dużo więcej - trzeba było coś z tym zrobić.

## Etap 3: JavaScript

Jedną z niewielu dostępnych opcji wprowadzenia dynamicznej zawartości na stronę jest użycie _JavaScriptu_. Kojarzył się nam wtedy z prostym językiem skryptowym, który nie nadaje się do tworzenia bardziej zaawansowanych aplikacji, a pisanie w nim jest największą karą, która może spotkać "prawdziwych programistów".

Początkowo traktowaliśmy wstawki _JS_ jako dodatek do statycznie wygenerowanej strony, które wprowadzały dynamiczne zachowanie w niektórych miejscach aplikacji: proste obliczenia, walidację itd. W miarę zwiększania się ilości kodu pisanego w _JS_, zaczęliśmy szukać informacji o tym jak pisać kod dobrze i jak o niego dbać. Coraz bardziej przekonywaliśmy się do _JavaScriptu_ jako "prawdziwego" języka programowania.

Z obowiązkowych narzędzi każdego programisty _JS_ należy tutaj wymienić _JSLint_ (lub _JSHint_), który wykonuje statyczną analizę kodu, znajdując najczęściej popełniane błędy i pozwala także kontrolować, czy zachowane są reguły, według których formatujemy nasz kod. Warto skorzystać też z biblioteki _lodash_ (lub _underscore_), zawierającej wiele pomocniczych funkcji.

Dynamiczne elementy strony wymagane były coraz częściej, a nasza wiedza na temat _JS_ cały czas rosła. Wtedy padła szalona propozycja: "Zróbmy SPA!".

## Etap 4: SPA

Idea _Single Page Application_ (_SPA_) polega na tym, że użytkownik ładuje początkową stronę, która zawiera całą aplikację. Kolejne odwołania do serwera robione są nie po to, aby wygenerować kolejny widok, ale w celu pobrania od serwera wyłącznie danych. Cała logika ładowana jest w przeglądarce użytkownika i pisana w języku _JavaScript_!

Pisanie SPA wymaga zupełnie innego podejścia niż pisanie zwykłej strony internetowej. Rozdzielamy naszą aplikacje na dwie części: pierwsza działa na naszym serwerze i wysyła dane (back end), natomiast druga to widok i logika aplikacji (front end). Back end odpowiedzialny jest za komunikację z bazą danych, autoryzację i ekspozycję danych, najczęściej w formie _RESTowego API_. Jako format wymiany danych używany jest _JSON_, który jest łatwo parsowalny po stronie klienta za pomocą _JS_. Frontend zawiera wszystko to, co widzi użytkownik i jest odpowiedzialny za obsługę interakcji z nim.

Przygotowania rozpoczęliśmy od wyboru frameworku _JavaScriptowego_, na którym miała być oparta aplikacja. Nasz pierwszy wybór padł na _Backbone.js_, którego krzywa wejścia jest dość łagodna (łatwo rozpocząć w nim pisać, jeżeli zna się trochę _JS_), a dzięki podziałowi na Model, Widok i Kontroler wymusza dobrą strukturę aplikacji. Dodatkowo, w celu rozwiązania problemu paczkowania wielu plików _JS_ po stronie klienta, skorzystaliśmy z _RequireJS_, który dba o ładowanie wymaganych modułów. Przez wprowadzenie podziału na front end i back end nasz kod _JavaScriptowy_ stał się de facto niezależną aplikacją, która podlega takim samym procesom projektowym jak np. kod w Javie.

Tworzenie wielu plików _JS_ wymagało od nas także wprowadzenia dodatkowego kroku poprzedzającego deploy nowego kodu na produkcję. Uruchomienie naszej aplikacji wymaga od przeglądarki użytkownika pobrania wszystkich plików _JS_ z serwera. Z tego powodu ładowanie strony trwałoby bardzo długo (przeglądarki mają limit równolegle ściąganych plików z danej domeny). Przed uruchomieniem aplikacji na serwerze produkcyjnym łączymy wszystkie pliki _JS_ w jeden, który następnie minimalizujemy, korzystając z narzędzi takich, jak _UglifyJS_ czy _Closure Compiler_.

W celu automatyzacji procesu budowania aplikacji używamy _Grunta_ - narzędzia, które rozszerzone o odpowiednie pluginy, pozwala na uruchamianie wszystkich zadań związanych z przygotowaniem aplikacji do przesłania na serwer produkcyjny. _Grunt_ generuje raport z _JSLinta_ i uruchamia testy, natomiast _UglifyJS_ tworzy pojedynczy plik zawierający kod całej aplikacji.

Dodatkowo, tak jak podczas pisania aplikacji desktopowych, nasz kod po trafieniu do repozytorium pobierany jest przez _Jenkinsa_ - serwer _Continuous Integration_. _Jenkins_ uruchamia Grunta i przygotowuje najnowszą wersję aplikacji, która jest zawsze gotowa do testowania.

Proces tworzenia aplikacji webowych jest tak samo wymagający, jak proces tworzenia programów innego typu (desktop, mobile, serwer). W przypadku _SPA_ dodatkowy problem może stanowić sam język _JS_. Pomimo tego, że łatwo zacząć w nim pisać, to jego opanowanie jest nie lada wyzwaniem.

## Etap 5: Learning

W naszym przypadku, zarówno jako metodę uczenia nowych osób dołączających do projektu, jak i doskonalenia oraz rozwijania się pozostałych członków zespołu, świetnie sprawdziło się Code Review. Każda zmiana w kodzie była analizowana przez co najmniej 3 dodatkowe osoby, których zadaniem nie było wytykanie błędów czy niewiedzy, ale wspólna nauka i dbanie o dobrą jakość kodu całego projektu.

Podczas Code Review wymieniamy się i dyskutujemy nad sposobami rozwiązania danego problemu i poznajemy nowe punkty widzenia. Obecnie nie wyobrażam sobie pracy w projekcie, w którym Code Review nie jest stosowane.

Kolejnym ważnym elementem pisania w JS (a właściwie we wszystkich językach dynamicznych) jest testowanie. W związku z tym, że kod jest interpretowany, najbardziej trywialny błąd może wyjść na jaw dopiero w momencie, gdy faktycznie ten fragment zostanie uruchomiony! Dzięki testom jednostkowym możemy zweryfikować, czy nasze poszczególne funkcje robią dokładnie to, czego chcemy. Duża liczba testów daje nam też pewność, że dodając nowy kod lub refaktorując istniejący, niczego nie zepsuliśmy. Praktyka pisania testów oraz metodyka TDD pozwalają także poprawić jakość i architekturę kodu.

W przypadku JS ciągłe doskonalenie się jest niezwykle ważne. Całe środowisko bardzo dynamicznie się zmienia, co chwila powstają nowe biblioteki i rozwiązania, a przeglądarki zyskują kolejne możliwości w postaci API dostępnych z poziomu JSa.  
Do naszego procesu oprócz Continuous Integration, Continuous Deployment i Continuous Improvement dołączyliśmy także _Continuous Learning_.

## ? + NoSQL + Node.js + AngularJS

Obecnie wszystkie projekty, które rozpoczynamy, tworzone są z front endem pisanym w _AngularJS_, który pozwolił nam znacznie przyspieszyć i uprzyjemnić pracę nad aplikacjami SPA. Bardzo dobra znajomość JavaScriptu pozwala nam pisać programy, które nie tylko działają w przeglądarce, ponieważ JS jest językiem obecnie dostępnym już wszędzie. JS używamy również po stronie serwera, korzystając z _node.js_. W ramach Continuous Learning organizujemy jednodniowe Hackathony, podczas których mieliśmy okazję spróbować pisania aplikacji mobilnych w JS (_PhoneGap_, _Ionic_) lub innych technologii (_Go_). Pierwszy serwer w _node.js_ rownież powstał podczas jednego z Hackathonów - wszyscy w ekspresowym tempie mieli okazję poznać dobre i złe strony tej technologii.

Przejście od pisania desktopowych aplikacji do tworzenia _SPA_ w _AngularJS_ nie było dla nas proste. Podczas tej drogi wiele razy musieliśmy wyjść poza naszą strefę komfortu i pokonać wiele przeszkód. Ale czy właśnie nie na tym polega bycie progamistą? Zdecydowanie było warto!
